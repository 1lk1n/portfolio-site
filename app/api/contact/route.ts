import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { getResendClient } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "validation", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { name, phone, email, comment } = parsed.data;

    const supabase = createSupabaseAdmin();
    const { error: dbError } = await supabase.from("contacts").insert({
      name,
      phone,
      email,
      comment,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json({ ok: false, error: "database" }, { status: 500 });
    }

    const resend = getResendClient();
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
    const ownerEmail = process.env.OWNER_EMAIL ?? "ilkin.ibadzada@gmail.com";

    const [ownerResult, userResult] = await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: ownerEmail,
        subject: `Новое сообщение с портфолио от ${name}`,
        html: `
          <h2>Новая заявка с сайта</h2>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Сообщение:</strong></p>
          <p>${comment.replace(/\n/g, "<br>")}</p>
        `,
      }),
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Копия вашего сообщения — Ilkin Ibadov",
        html: `
          <h2>Спасибо за обращение!</h2>
          <p>Здравствуйте, ${name}!</p>
          <p>Мы получили ваше сообщение и свяжемся с вами в ближайшее время.</p>
          <hr>
          <p><strong>Ваше сообщение:</strong></p>
          <p>${comment.replace(/\n/g, "<br>")}</p>
          <hr>
          <p>С уважением,<br>Ilkin Ibadov</p>
        `,
      }),
    ]);

    if (ownerResult.error || userResult.error) {
      console.error("Resend owner email error:", ownerResult.error);
      console.error("Resend user copy error:", userResult.error);
      return NextResponse.json(
        {
          ok: false,
          error: "email",
          details: {
            owner: ownerResult.error?.message,
            user: userResult.error?.message,
          },
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
