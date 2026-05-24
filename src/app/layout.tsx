import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "OptiCore AI | Automatización de Procesos y Eficiencia Operativa",
  description: "Automatiza los procesos repetitivos de tu empresa con agentes de Inteligencia Artificial a medida. Libera 15+ horas semanales por empleado sin incrementar la plantilla.",
  openGraph: {
    title: "OptiCore AI | Automatización de Procesos y Eficiencia",
    description: "Automatiza los procesos repetitivos de tu empresa con agentes de Inteligencia Artificial a medida. Libera 15+ horas semanales por empleado.",
    type: "website",
    locale: "es_AR",
    url: "https://somosopticore.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org business details
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "OptiCore AI",
    "image": "https://somosopticore.com/og-image.jpg",
    "url": "https://somosopticore.com",
    "telephone": "+5493517302559",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Córdoba",
      "addressCountry": "AR"
    },
    "description": "Agencia de automatización de procesos operativos y desarrollo de agentes de Inteligencia Artificial a medida para agencias, inmobiliarias y e-commerce."
  };

  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans text-[#F5F7FA] bg-[#0B0C10]">
        {children}
      </body>
    </html>
  );
}
