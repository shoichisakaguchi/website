import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;

    if (!name || !email || !message) {
        return new Response(
            JSON.stringify({ message: "Missing required fields" }),
            { status: 400 }
        );
    }

    // Cloudflare Env var should be populated
    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
        console.error("RESEND_API_KEY is missing");
        return new Response(JSON.stringify({ message: "Server configuration error" }), { status: 500 });
    }

    const resend = new Resend(RESEND_API_KEY);

    try {
        const { error } = await resend.emails.send({
            from: "RdRp Summit Contact <onboarding@resend.dev>", // TODO: Verify domain and update
            to: ["shoichi.sakaguchi@ompu.ac.jp"], // TODO: Update to real destination
            reply_to: email,
            subject: `New Message from ${name}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        });

        if (error) {
            console.error("Resend Error:", error);
            return new Response(JSON.stringify({ message: "Failed to send email" }), { status: 500 });
        }

        return new Response(JSON.stringify({ message: "Success" }), { status: 200 });
    } catch (e) {
        console.error("Internal Error:", e);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
};
