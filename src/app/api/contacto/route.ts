import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "El cuerpo de la solicitud debe ser un JSON válido." },
        { status: 400 }
      );
    }

    const {
      userName,
      whatsapp,
      email,
      mensaje = "",
    } = body;

    // Server-side validation
    if (!userName || !userName.trim()) {
      return NextResponse.json({ error: "Tu nombre es requerido." }, { status: 400 });
    }
    if (!whatsapp || !whatsapp.trim()) {
      return NextResponse.json({ error: "El número de WhatsApp es requerido." }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ error: "El correo electrónico es requerido." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "El correo electrónico no es válido." }, { status: 400 });
    }

    // Read webhook URL (falls back to the main somosopticore endpoint or Bruno endpoint for test safety)
    const webhookUrl = process.env.WEBHOOK_OPTICORE_CONTACTO_URL || "https://n8n.somosopticore.com/webhook/opticore-contacto";
    
    // Relay to webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim(),
        mensaje: mensaje.trim(),
        submittedAt: new Date().toISOString(),
        referrer: request.headers.get("referer") || "direct",
      }),
    });

    if (!response.ok) {
      console.error(`Error de n8n webhook: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: "El servidor de recepción no respondió correctamente. Reintentá." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error procesando contacto OptiCore:", error);
    return NextResponse.json(
      { error: "Hubo un problema interno en el servidor." },
      { status: 500 }
    );
  }
}
