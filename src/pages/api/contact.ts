
export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

// The endpoint is public and unauthenticated, so treat every field as hostile.
// Edge rate limiting belongs in a Cloudflare WAF rule on /api/contact; these
// checks only stop the cheap, high-volume cases and cap what reaches Resend.
const MAX_NAME = 200;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;

// Deliberately permissive: reject obvious junk, never a real address.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asText(value: FormDataEntryValue | null): string {
    return typeof value === "string" ? value.trim() : "";
}

/** Collapse CR/LF so submitted text cannot break out of a header line. */
function strip(value: string): string {
    return value.replace(/[\r\n]+/g, " ");
}

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        const data = await request.formData();

        // Honeypot: hidden in the form, so only a bot fills it. Answer 200 so
        // the bot cannot tell it was rejected, but send nothing.
        if (asText(data.get("website"))) {
            return new Response(
                JSON.stringify({ message: "Email sent successfully!" }),
                { status: 200 },
            );
        }

        const name = asText(data.get("name"));
        const email = asText(data.get("email"));
        const message = asText(data.get("message"));
        const subject = asText(data.get("subject")) || "New Inquiry from rdrp.io";

        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                { status: 400 },
            );
        }
        if (!EMAIL_RE.test(email) || email.length > MAX_NAME) {
            return new Response(
                JSON.stringify({ error: "Please enter a valid email address." }),
                { status: 400 },
            );
        }
        if (
            name.length > MAX_NAME ||
            subject.length > MAX_SUBJECT ||
            message.length > MAX_MESSAGE
        ) {
            return new Response(
                JSON.stringify({ error: "That message is too long to send." }),
                { status: 413 },
            );
        }

        // Access environment variables (Cloudflare or Local)
        // @ts-ignore
        const env = locals.runtime?.env || import.meta.env;
        const apiKey = env.RESEND_API_KEY;
        const toEmail = env.CONTACT_EMAIL || "shoichi.sakaguchi@gmail.com";

        if (!apiKey) {
            console.error("RESEND_API_KEY is missing");
            return new Response(
                JSON.stringify({ error: "Server Configuration Error" }),
                { status: 500 },
            );
        }

        const resend = new Resend(apiKey);

        const { data: emailData, error } = await resend.emails.send({
            from: "rdrp.io Contact <onboarding@resend.dev>",
            to: [toEmail],
            // NOTE: the SDK maps `replyTo` -> the API's `reply_to`. This was
            // spelled `reply_to` here, which the SDK ignored, so replies went
            // to the Resend sender instead of the person who wrote in.
            replyTo: email,
            // Strip CR/LF from submitted text before it reaches a header line.
            subject: `[rdrp.io] ${strip(subject)} - from ${strip(name)}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        if (error) {
            console.error("Resend Error:", error);
            return new Response(
                JSON.stringify({ error: "Failed to send email" }),
                { status: 500 },
            );
        }

        return new Response(
            JSON.stringify({ message: "Email sent successfully!", id: emailData?.id }),
            { status: 200 },
        );
    } catch (e: any) {
        console.error("API Error:", e);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 },
        );
    }
};
