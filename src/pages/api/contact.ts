
import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name")?.toString();
    const email = data.get("email")?.toString();
    const message = data.get("message")?.toString();

    if (!name || !email || !message) {
        return new Response(
            JSON.stringify({
                message: "Missing required fields",
            }),
            { status: 400 }
        );
    }

    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey) {
        return new Response(
            JSON.stringify({
                message: "Missing Resend API Key",
            }),
            { status: 500 }
        );
    }

    const resend = new Resend(apiKey);
    const adminEmail = import.meta.env.ADMIN_EMAIL || "info@rdrp.io"; // Fallback to info@rdrp.io

    try {
        const { data: resendData, error } = await resend.emails.send({
            from: "RdRp Website <onboarding@resend.dev>", // Must be verified domain or onboarding
            to: [adminEmail],
            subject: `New Contact Form Submission from ${name}`,
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
            replyTo: email,
        });

        if (error) {
            console.error(error);
            return new Response(
                JSON.stringify({
                    message: error.message,
                }),
                { status: 500 }
            );
        }

        return new Response(
            JSON.stringify({
                message: "Message sent successfully!",
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({
                message: "Failed to send message",
            }),
            { status: 500 }
        );
    }
};
