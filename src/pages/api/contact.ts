
export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        const data = await request.formData();
        const name = data.get("name");
        const email = data.get("email");
        const message = data.get("message");
        const subject = data.get("subject") || "New Inquiry from rdrp.io";

        // Access environment variables (Cloudflare or Local)
        // @ts-ignore
        const env = locals.runtime?.env || import.meta.env;
        const apiKey = env.RESEND_API_KEY;
        const toEmail = env.CONTACT_EMAIL || "shoichi.sakaguchi@gmail.com";

        if (!apiKey) {
            console.error("RESEND_API_KEY is missing");
            return new Response(JSON.stringify({ error: "Server Configuration Error" }), { status: 500 });
        }

        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                { status: 400 }
            );
        }

        const resend = new Resend(apiKey);

        const { data: emailData, error } = await resend.emails.send({
            from: "rdrp.io Contact <onboarding@resend.dev>",
            to: [toEmail],
            reply_to: email.toString(),
            subject: `[rdrp.io] ${subject} - from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        if (error) {
            console.error("Resend Error:", error);
            return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
        }

        return new Response(
            JSON.stringify({ message: "Email sent successfully!", id: emailData?.id }),
            { status: 200 }
        );
    } catch (e: any) {
        console.error("API Error:", e);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
};
