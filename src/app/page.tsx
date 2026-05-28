"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Zap,
  Users,
  LineChart,
  ArrowRight,
  Check,
  ChevronDown,
  PhoneCall,
  Menu,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Play,
  Send,
  Sparkles,
  MessageSquare,
  Bot,
  Layers,
  CheckCircle,
  HelpCircle,
  Database,
  Building,
  Briefcase,
  Share2,
} from "lucide-react";

// Types for chat messages in Sofía simulator
interface ChatMessage {
  id: string;
  sender: "client" | "sofia" | "system" | "bruno";
  text: string;
  timestamp: string;
}

// Types for form values
interface FormValues {
  userName: string;
  whatsapp: string;
  email: string;
  mensaje: string;
}

// Interactive Neural Particles constellation background for Hero
function NeuralParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    // Scale particle count based on screen size
    const particleCount = Math.min(55, Math.floor((width * height) / 16000));

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.15,
      });
    }

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(5, 255, 195, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        if (mouse.x > -500) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(5, 255, 195, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />;
}

// 3D Tilt Card wrapper component with running border neon beam
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const maxTilt = 8;
    const rotateX = -(mouseY / (height / 2)) * maxTilt;
    const rotateY = (mouseX / (width / 2)) * maxTilt;

    setCoords({ rotateX, rotateY, scale: 1.02 });
  };

  const handleMouseLeave = () => {
    setCoords({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card-3d rounded-xl transition-all duration-200 ease-out relative overflow-hidden group p-[1px] ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale3d(${coords.scale}, ${coords.scale}, ${coords.scale})`,
        boxShadow: coords.scale > 1 
          ? "0 25px 50px -15px rgba(0, 242, 254, 0.25), 0 0 20px -3px rgba(5, 255, 195, 0.1)"
          : "0 4px 20px -10px rgba(0,0,0,0.6)",
      }}
    >
      {/* Rotating border gradient (Border Beam) - Centered 2000px square to guarantee coverage on all aspect ratios */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2000px] h-[2000px] bg-[conic-gradient(from_0deg,transparent_30%,#00f2fe_50%,#05ffc3_60%,transparent_80%)] animate-[spin_6s_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      ></div>

      {/* Card content container with solid background covering the rotating gradient, leaving a 1px border */}
      <div className="relative w-full h-full bg-[#12141C]/95 rounded-[11px] p-8 flex flex-col justify-between card-3d-inner z-10">
        {children}
      </div>
    </div>
  );
}

// Reusable 3D Tilt Wrapper component without card border/padding
function TiltWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const maxTilt = 8;
    const rotateX = -(mouseY / (height / 2)) * maxTilt;
    const rotateY = (mouseX / (width / 2)) * maxTilt;

    setCoords({ rotateX, rotateY, scale: 1.02 });
  };

  const handleMouseLeave = () => {
    setCoords({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card-3d transition-all duration-200 ease-out relative ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale3d(${coords.scale}, ${coords.scale}, ${coords.scale})`,
      }}
    >
      <div className="card-3d-inner w-full h-full">
        {children}
      </div>
    </div>
  );
}

// Custom Bruno Gold Logo SVG
function BrunoLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_2px_8px_rgba(193,154,91,0.2)]"
      >
        <path
          d="M85 45C85 61.57 69.33 75 50 75C44.42 75 39.14 73.88 34.45 71.86L15 78L21.75 60.1C17.47 55.77 15 50.62 15 45C15 28.43 30.67 15 50 15C69.33 15 85 28.43 85 45Z"
          stroke="#C19A5B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M38 35H62V46C62 52.63 56.63 58 50 58C43.37 58 38 52.63 38 46V35Z"
          stroke="#C19A5B"
          strokeWidth="3"
        />
        <path d="M50 58V68" stroke="#C19A5B" strokeWidth="3" />
        <path d="M43 68H57" stroke="#C19A5B" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M40.5 43C43.5 43 45.5 41.5 49.5 41.5C53.5 41.5 56.5 43 59.5 43"
          stroke="#D4574E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// Custom Tech Neon Cursor Component (Cyan/Mint)
function TechCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        setVisible(true);
        isMoving = true;
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-cursor-hover]")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    let animationFrameId: number;
    const render = () => {
      // Lerp for the outer ring following the inner dot with smoothing
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (mediaQuery.matches) {
      document.body.classList.add("custom-cursor-none");
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("mouseenter", handleMouseEnter);
      window.addEventListener("mouseover", handleMouseOver);
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      document.body.classList.remove("custom-cursor-none");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Center dot (instant position) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 hidden md:block"
        style={{
          backgroundColor: hovered ? "var(--color-acento-secundario)" : "var(--color-acento-primario)",
          boxShadow: hovered 
            ? "0 0 8px var(--color-acento-secundario), 0 0 16px var(--color-acento-secundario)" 
            : "0 0 4px var(--color-acento-primario)",
        }}
      />
      {/* Outer ring (lerp smooth lag position) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out hidden md:block"
        style={{
          width: hovered ? "48px" : clicked ? "18px" : "28px",
          height: hovered ? "48px" : clicked ? "18px" : "28px",
          borderColor: hovered ? "var(--color-acento-secundario)" : "var(--color-acento-primario)",
          backgroundColor: hovered ? "rgba(5, 255, 195, 0.04)" : "transparent",
          boxShadow: hovered ? "0 0 12px rgba(5, 255, 195, 0.15)" : "none",
        }}
      />
    </>
  );
}

// Log Terminal entries helper
interface LogEntry {
  id: string;
  time: string;
  tag: string;
  text: string;
  type: "success" | "info" | "process";
}

export default function OptiCoreLanding() {
  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Ref for sectors video to play in slow motion
  const sectoresVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (sectoresVideoRef.current) {
      sectoresVideoRef.current.playbackRate = 0.5; // 0.5x slow motion
    }
  }, []);

  // Form states
  const [formValues, setFormValues] = useState<FormValues>({
    userName: "",
    whatsapp: "",
    email: "",
    mensaje: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<FormValues>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  // Testimonials track index
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Sofía Chat Simulator states
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [fallbackCount, setFallbackCount] = useState(0);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "sys-1",
      sender: "system",
      text: "⚠️ Esta es una demostración interactiva rápida. El agente inmobiliario en producción califica leads y agenda visitas en tu CRM de forma autónoma.",
      timestamp: "10:00",
    },
    {
      id: "1",
      sender: "sofia",
      text: "¡Hola! Soy Sofía, el agente de automatización inmobiliaria de OptiCore. ¿Estás buscando comprar, vender o alquilar una propiedad? 🏢",
      timestamp: "10:00",
    },
  ]);

  // Bruno Chat Simulator states
  const [brunoUserInput, setBrunoUserInput] = useState("");
  const [isBrunoTyping, setIsBrunoTyping] = useState(false);
  const [brunoFallbackCount, setBrunoFallbackCount] = useState(0);
  const brunoChatAreaRef = useRef<HTMLDivElement>(null);

  const [brunoChatMessages, setBrunoChatMessages] = useState<ChatMessage[]>([
    {
      id: "sys-b1",
      sender: "system",
      text: "⚠️ Esta es una demostración interactiva rápida. El asistente de restaurante real en producción califica comensales, gestiona reservas en tu sistema y responde preguntas del menú.",
      timestamp: "10:00",
    },
    {
      id: "b1",
      sender: "bruno",
      text: "¡Hola! Soy Bruno, el asistente WhatsApp de tu restaurante. 🍔 ¿Querés consultar el menú, reservar una mesa o saber los especiales del día?",
      timestamp: "10:00",
    },
  ]);

  // Terminal Simulator states
  const logTerminalRef = useRef<HTMLDivElement>(null);
  const [terminalLogs, setTerminalLogs] = useState<LogEntry[]>([
    { id: "1", time: "12:00:01", tag: "SYS_CORE", text: "Iniciando OptiCore Engine v1.2...", type: "info" },
    { id: "2", time: "12:00:03", tag: "AGENTE_CRM", text: "Conectado a la base de datos neuronal", type: "success" },
    { id: "3", time: "12:00:05", tag: "INTEGRACION", text: "Canal de WhatsApp Business activo", type: "success" },
  ]);

  // Self-scrolling live logs emulator effect
  useEffect(() => {
    const logDatabase = [
      { tag: "AGENTE_INM", text: "Nuevo interesado calificado - Presupuesto: USD 180k - Inmobiliaria Revolux", type: "success" },
      { tag: "CRM_RELAY", text: "Lead sincronizado con HubSpot CRM. Nivel de interés: ALTO", type: "success" },
      { tag: "AUTO_REPORTS", text: "Leyendo remito de carga PDF en segundo plano...", type: "process" },
      { tag: "PDF_PARSER", text: "Datos extraídos de Factura #5524: 100% de coincidencia", type: "success" },
      { tag: "AGENTE_VENTAS", text: "Videollamada agendada automáticamente en Calendly con Carlos M.", type: "success" },
      { tag: "TELEGRAM_ALERTA", text: "Notificación enviada al canal operativo: Nuevo cliente agendado", type: "info" },
      { tag: "AGENTE_ECOMMERCE", text: "Abandono de carrito recuperado vía WhatsApp - MarkoShop", type: "success" },
      { tag: "ERP_SYNC", text: "Sincronizando existencias de stock con WooCommerce", type: "process" },
      { tag: "SYS_HEALTH", text: "Limpieza de memoria caché neuronal - Estado: Óptimo", type: "info" },
    ];

    const interval = setInterval(() => {
      const randomLog = logDatabase[Math.floor(Math.random() * logDatabase.length)];
      const now = new Date();
      const timeString = now.toTimeString().split(" ")[0];
      const newEntry: LogEntry = {
        id: Math.random().toString(),
        time: timeString,
        tag: randomLog.tag,
        text: randomLog.text,
        type: randomLog.type as "success" | "info" | "process",
      };

      setTerminalLogs((prev) => {
        const nextLogs = [...prev, newEntry];
        if (nextLogs.length > 10) nextLogs.shift(); // Keep container clean
        return nextLogs;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom of terminal
  useEffect(() => {
    if (logTerminalRef.current) {
      logTerminalRef.current.scrollTop = logTerminalRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  // Scroll to bottom of Bruno chat
  useEffect(() => {
    if (brunoChatAreaRef.current) {
      brunoChatAreaRef.current.scrollTop = brunoChatAreaRef.current.scrollHeight;
    }
  }, [brunoChatMessages, isBrunoTyping]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (formErrors[name as keyof FormValues]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  // Conversational response logic for Sofía
  const getSofiaResponse = (input: string, currentFallbackCount: number): string => {
    const text = input.toLowerCase();

    if (text.match(/(hola|buenas|buen dia|buenos dias|buenas tardes|buenas noches|hola sofia|hola!)/)) {
      return "¡Hola! Un gusto saludarte. Soy Sofía, el agente autónomo inmobiliario de OptiCore. Estoy diseñada para calificar leads y agendar visitas en tu CRM directo desde WhatsApp. ¿Querés que simulemos una calificación de presupuesto? 🏢";
    }

    if (text.match(/(comprar|alquilar|buscar|departamento|casa|lote|propiedad|zona|presupuesto)/)) {
      return "¡Perfecto! Te puedo ayudar a filtrar opciones. Contame: ¿en qué zona estás buscando la propiedad y cuál es tu presupuesto estimado en dólares? 💵";
    }

    if (text.match(/(visita|visitar|agendar|ver la propiedad|reunion|reunión|cita|verla)/)) {
      return "Excelente. Tengo acceso al calendario de visitas de los asesores. Confirmame qué día de la semana te queda mejor (por ejemplo, viernes a la tarde) y te agendo automáticamente. 📅";
    }

    if (text.match(/(humano|asesor|contacto|hablar con alguien|atencion|soporte|telefono|dueño)/)) {
      return "Sin problema. Ya le avisé al encargado de OptiCore por Telegram o WhatsApp. Te va a estar escribiendo en un minuto. Mientras tanto, consultame lo que quieras. 📱";
    }

    // Dynamic looping fallbacks for Sofía (PNL Hooks)
    if (currentFallbackCount === 0) {
      return "Esa es una buena consulta. En producción, me conecto con tu base de datos de propiedades (e.g. Tokko Broker) y envío al cliente las fichas en PDF según lo que solicitan. ¿Querés ver cómo se vería esto con los datos de tu propia inmobiliaria? Dejanos tu contacto en el formulario de abajo para armar tu demo personalizada. 🍷";
    } else if (currentFallbackCount === 1) {
      return "Veo que querés evaluar mi capacidad operativa, ¡excelente! 😉 Además de chatear, realizo seguimiento automático a leads fríos, actualizo etiquetas en tu CRM (HubSpot, Salesforce) y te alerto por Telegram o WhatsApp si hay un interesado de alto valor listo para firmar. Si querés ver el panel de control detrás de escena, podés agendar una videollamada de 5 minutos en el botón de abajo. Te va a fascinar.";
    } else {
      return "Ese es un punto clave de la integración. La IA real de OptiCore se calibra al tono, objeciones y cartera de tu agencia. Para resolver tus dudas técnicas específicas, te recomiendo agendar una sesión estratégica rápida con nuestro director haciendo click en el botón 'Agendar videollamada' al lado del formulario. ¿Te sumás? 🚀";
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || userInput;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "client",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setUserInput("");
    setIsTyping(true);

    setTimeout(() => {
      const textLower = text.toLowerCase();
      const isKeyword = textLower.match(/(hola|buenas|buen dia|buenos dias|buenas tardes|buenas noches|hola sofia|hola!|comprar|alquilar|buscar|departamento|casa|lote|propiedad|zona|presupuesto|visita|visitar|agendar|ver la propiedad|reunion|reunión|cita|verla|humano|asesor|contacto|hablar con alguien|atencion|soporte|telefono|dueño)/);

      const responseText = getSofiaResponse(text, fallbackCount);
      
      if (!isKeyword) {
        setFallbackCount((prev) => Math.min(prev + 1, 2));
      }

      const sofiaMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "sofia",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChatMessages((prev) => [...prev, sofiaMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Conversational response logic for Bruno
  const getBrunoResponse = (input: string, currentFallbackCount: number): string => {
    const text = input.toLowerCase();

    if (text.match(/(hola|buenas|buen dia|buenos dias|buenas tardes|buenas noches|hola bruno|hola!)/)) {
      return "¡Hola! Un gusto saludarte. Soy Bruno, el asistente autónomo de WhatsApp para tu restaurante. Estoy diseñado para tomar reservas, responder dudas sobre el menú y agendar todo directo en tu sistema. ¿Querés que simulemos una reserva? 🍽️";
    }

    if (text.match(/(reserva|reservar|mesa|comensales|personas|comer|cenar|almorzar|turno)/)) {
      return "¡Excelente! Te ayudo a agendar tu mesa al instante. Decime: ¿para cuántas personas sería, qué día y en qué horario te gustaría venir? 📅";
    }

    if (text.match(/(menu|menú|carta|plato|comida|comer|beber|bebida|vino|especial)/)) {
      return "¡Buenísimo! Tenemos platos de autor, pastas caseras y una carta de vinos seleccionada. Te puedo enviar el PDF del menú o el link a la carta digital interactiva al instante. ¿Te gustaría ver cómo se vería con la carta de tu propio restaurante? Dejanos tus datos en el formulario de abajo. 🍔";
    }

    if (text.match(/(humano|mozo|encargado|asesor|contacto|hablar con alguien|atencion|soporte|telefono|dueño)/)) {
      return "Sin problema. Ya le avisé al gerente del local por Telegram o WhatsApp. Te va a estar escribiendo en un minuto. Mientras tanto, consultame lo que quieras. 📱";
    }

    // Dynamic looping fallbacks for Bruno (PNL Hooks)
    if (currentFallbackCount === 0) {
      return "Esa es una excelente pregunta. En producción, me conecto con tu sistema de reservas (Woki, Restorando o Planner) y verifico la disponibilidad de mesas en tiempo real según la cantidad de personas. ¿Querés ver cómo se vería esto adaptado a tu local? Escribí tus datos en el formulario de abajo para armarte una demo gratis. 🍷";
    } else if (currentFallbackCount === 1) {
      return "Veo que te interesa evaluar mi capacidad de respuesta, ¡buenísimo! 😉 Además de reservar, puedo responder dudas sobre alérgenos (platos sin TACC, veganos), si somos pet-friendly, o si tenemos estacionamiento. Si querés ver el panel de administración detrás de escena, podés agendar una videollamada de 5 minutos en el botón de abajo. ¡Te va a encantar!";
    } else {
      return "Este es un punto clave de la integración. El asistente de restaurante real se conecta con tu canal de WhatsApp oficial y se calibra al menú y estilo de tu negocio. Para resolver tus dudas técnicas y hablar de costos, te sugiero agendar una sesión estratégica rápida con nuestro director en el botón 'Agendar videollamada' al lado del formulario. ¿Te sumás? 🚀";
    }
  };

  const handleBrunoSendMessage = (textToSend?: string) => {
    const text = textToSend || brunoUserInput;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "client",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setBrunoChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setBrunoUserInput("");
    setIsBrunoTyping(true);

    setTimeout(() => {
      const textLower = text.toLowerCase();
      const isKeyword = textLower.match(/(hola|buenas|buen dia|buenos dias|buenas tardes|buenas noches|hola bruno|hola!|reserva|reservar|mesa|comensales|personas|comer|cenar|almorzar|turno|menu|menú|carta|plato|comida|comer|beber|bebida|vino|especial|humano|mozo|encargado|asesor|contacto|hablar con alguien|atencion|soporte|telefono|dueño)/);

      const responseText = getBrunoResponse(text, brunoFallbackCount);
      
      if (!isKeyword) {
        setBrunoFallbackCount((prev) => Math.min(prev + 1, 2));
      }

      const brunoMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bruno",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setBrunoChatMessages((prev) => [...prev, brunoMsg]);
      setIsBrunoTyping(false);
    }, 1200);
  };

  const handleBrunoKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBrunoSendMessage();
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormValues> = {};
    if (!formValues.userName.trim()) {
      errors.userName = "Tu nombre es requerido.";
    }
    if (!formValues.whatsapp.trim()) {
      errors.whatsapp = "El WhatsApp es requerido.";
    }
    if (!formValues.email.trim()) {
      errors.email = "El correo electrónico es requerido.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formValues.email)) {
        errors.email = "Ingresá un correo electrónico válido.";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus("submitting");
    setServerErrorMessage("");

    try {
      const cleanedWhatsapp = formValues.whatsapp.startsWith("+")
        ? formValues.whatsapp
        : `+54 ${formValues.whatsapp}`;

      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formValues,
          whatsapp: cleanedWhatsapp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
        setServerErrorMessage(data.error || "Hubo un error al enviar el formulario.");
      }
    } catch (error) {
      console.error(error);
      setFormStatus("error");
      setServerErrorMessage("Error de conexión. Intentá de nuevo.");
    }
  };

  return (
    <div className="flex-1 flex flex-col relative selection:bg-acento-primario selection:text-bg-primary">
      {/* Custom Tech Neon Cursor */}
      <TechCursor />

      {/* Grid overlay & ambient lights in background */}
      <div className="grid-overlay"></div>

      {/* HERO & HEADER WRAPPER WITH NEURAL BACKGROUND */}
      <div className="relative w-full overflow-hidden bg-transparent z-10">
        {/* Background Video with Dark Filter */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-20"
          >
            <source src="/12680994_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10]/80 via-transparent to-[#0B0C10]"></div>
        </div>

        {/* Interactive Neural Particles background */}
        <NeuralParticles />
        
        {/* Glows for Hero */}
        <div className="absolute top-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-acento-primario/10 blur-[130px] pointer-events-none animate-glow-1 z-0"></div>
        <div className="absolute top-[35%] left-[-15%] w-[450px] h-[450px] rounded-full bg-acento-purple/8 blur-[120px] pointer-events-none animate-glow-2 z-0"></div>

        {/* HEADER / NAVIGATION */}
        <header className="w-full max-w-[1200px] mx-auto px-6 py-6 md:py-8 flex justify-between items-center z-50 relative">
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <span className="logo-icon text-acento-primario">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" rx="1.5" fill="url(#header-brand-grad)" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" fill="url(#header-brand-grad)" opacity="0.8" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" fill="url(#header-brand-grad)" opacity="0.8" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" fill="url(#header-brand-grad)" />
                <path d="M10 6.5H14M6.5 10V14M17.5 10V14M10 17.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="header-brand-grad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00f2fe" />
                    <stop offset="1" stopColor="#05ffc3" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="font-display text-2xl font-bold tracking-tight text-text-primario group-hover:text-acento-primario transition-colors">
              OptiCore<span className="text-acento-primario font-display">.ai</span>
            </span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
            <a href="#que-hacemos" className="text-text-secundario hover:text-text-primario transition-colors duration-200">
              Qué hacemos
            </a>
            <a href="#sectores" className="text-text-secundario hover:text-text-primario transition-colors duration-200">
              Sectores
            </a>
            <a href="#servicios" className="text-text-secundario hover:text-text-primario transition-colors duration-200">
              Servicios
            </a>
            <a href="#como-funciona" className="text-text-secundario hover:text-text-primario transition-colors duration-200">
              Proceso
            </a>
            <a href="#casos" className="text-text-secundario hover:text-text-primario transition-colors duration-200">
              Casos
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://calendly.com/fabrizzio-joel-c/opticore-call"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-transparent border border-border-sutil rounded-lg text-xs font-bold uppercase tracking-wider text-acento-primario hover:bg-bg-hover hover:border-acento-primario hover:scale-105 transition-all duration-200 focus:outline-none shadow-md"
            >
              Agendar Llamada
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text-primario focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-[9995] bg-[#0B0C10] flex flex-col p-6 border-b border-border-sutil animate-fadeIn">
            <div className="flex justify-between items-center mb-10">
              <span className="font-display text-2xl font-bold text-text-primario">
                OptiCore<span className="text-acento-primario font-display">.ai</span>
              </span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-text-primario">✕</button>
            </div>
            <nav className="flex flex-col gap-6 text-lg font-semibold mb-8">
              <a href="#que-hacemos" onClick={() => setMobileMenuOpen(false)} className="text-text-secundario hover:text-text-primario">Qué hacemos</a>
              <a href="#sectores" onClick={() => setMobileMenuOpen(false)} className="text-text-secundario hover:text-text-primario">Sectores</a>
              <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="text-text-secundario hover:text-text-primario">Servicios</a>
              <a href="#como-funciona" onClick={() => setMobileMenuOpen(false)} className="text-text-secundario hover:text-text-primario">Proceso</a>
              <a href="#casos" onClick={() => setMobileMenuOpen(false)} className="text-text-secundario hover:text-text-primario">Casos</a>
            </nav>
            <a
              href="https://calendly.com/fabrizzio-joel-c/opticore-call"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-acento-primario text-bg-primary font-bold rounded-lg text-center shadow-lg"
            >
              Agendar Llamada
            </a>
          </div>
        )}

        {/* 1. HERO SECTION */}
        <section className="relative w-full max-w-[1200px] mx-auto px-6 pt-10 pb-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          {/* Left Column (Hero Content) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-bg-card/75 border border-border-sutil rounded-full text-xs font-semibold tracking-wider text-text-secundario mb-6 uppercase shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-acento-primario animate-pulse"></span>
              Agencia de Automatización de Procesos con I.A
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primario leading-[1.08] tracking-[-0.015em] mb-6">
              Liberá 15+ horas semanales de tu equipo eliminando <br />
              <span className="bg-gradient-to-r from-acento-primario to-acento-secundario bg-clip-text text-transparent font-display font-bold text-glow-cyan">las tareas manuales y repetitivas.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secundario font-normal leading-relaxed mb-8 max-w-[620px]">
              Dejá de renegar con sistemas lentos e ineficientes que no se conectan entre sí. Diseñamos e implementamos sistemas de IA a medida que automatizan tu administración, atención al cliente y ventas en 30 días.
            </p>

            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <a
                href="https://calendly.com/fabrizzio-joel-c/opticore-call"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-acento-primario text-bg-primary font-bold text-center rounded-lg shadow-[0_4px_20px_rgba(0,242,254,0.3)] transition-cta hover-cta flex items-center justify-center gap-2 focus:outline-none"
              >
                Agendar Sesión Estratégica
                <ArrowRight className="w-5 h-5 stroke-[2]" />
              </a>
              <a
                href="https://wa.me/5493517302559?text=Hola!%20Quiero%20saber%20más%20sobre%20los%20agentes%20de%20IA%20para%20mi%20empresa."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-transparent border border-border-sutil text-text-primario font-semibold text-center hover:bg-bg-hover hover:border-text-secundario rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                Escribinos por WhatsApp
              </a>
            </div>

            <div className="w-full text-xs text-text-muted flex flex-wrap gap-x-6 gap-y-3 border-t border-border-sutil pt-6">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-acento-primario" />
                Para Consultorías, Inmobiliarias y Rubros Locales
              </span>
            </div>
          </div>

          {/* Right Column (Hero Visual Mockup - Self Scrolling Logging Console) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[420px] aspect-[4/3] bg-[#0E1017] border border-border-sutil rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
              {/* Mockup Header */}
              <div className="bg-[#12141C] border-b border-border-sutil py-3 px-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#f43f5e]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#eab308]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#05ffc3]"></span>
                </div>
                <div className="text-[10px] text-text-secundario font-mono">OptiCore Engine v1.2</div>
              </div>

              {/* Mockup Body (Stats overview) */}
              <div className="p-4 grid grid-cols-2 gap-4 border-b border-border-sutil bg-[#10121A]/50">
                <div className="bg-[#12141C] border border-border-sutil p-3 rounded-lg">
                  <span className="text-[9px] uppercase tracking-wider text-text-muted font-bold block mb-1">Eficiencia Operativa</span>
                  <span className="text-xl font-bold text-acento-secundario font-display text-glow-mint">+342%</span>
                </div>
                <div className="bg-[#12141C] border border-border-sutil p-3 rounded-lg">
                  <span className="text-[9px] uppercase tracking-wider text-text-muted font-bold block mb-1">Horas Libres / Mes</span>
                  <span className="text-xl font-bold text-text-primario font-display">180hs</span>
                </div>
              </div>

              {/* Mockup Logging Console */}
              <div
                ref={logTerminalRef}
                className="flex-1 p-4 overflow-y-auto font-mono text-[9px] leading-relaxed flex flex-col gap-2 bg-[#08090C]"
              >
                {terminalLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`flex gap-2 transition-all duration-300 ${
                      log.type === "success" 
                        ? "text-acento-secundario" 
                        : log.type === "process" 
                          ? "text-acento-purple" 
                          : "text-acento-primario"
                    }`}
                  >
                    <span className="text-text-muted">[{log.time}]</span>
                    <span className="font-bold">[{log.tag}]</span>
                    <span className="text-text-primario">{log.text}</span>
                  </div>
                ))}
              </div>

              {/* Mockup Footer status */}
              <div className="bg-[#12141C] border-t border-border-sutil px-4 py-2 flex items-center gap-2 text-[9px] text-text-secundario">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse-fast"></span>
                <span>OptiCore Agent Core funcionando de forma segura</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 1.5 SECTOR MARQUEE */}
      <div className="w-full bg-[#12141C]/50 border-y border-border-sutil py-5 relative z-10 overflow-hidden select-none">
        <div className="animate-marquee flex gap-12 text-sm font-semibold tracking-wider text-text-secundario uppercase">
          <span className="flex items-center gap-3">Concesionarias <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">Inmobiliarias <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">Centros de Estética <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">Clínicas Dentales <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">Estudios Contables <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">E-commerce <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">Agentes de I.A a medida <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">WhatsApp Business Oficial <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">Setup en 3-7 días <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">Atención automática 24/7 <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>

          {/* Repeated items to loop cleanly */}
          <span className="flex items-center gap-3">Concesionarias <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">Inmobiliarias <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">Centros de Estética <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">Clínicas Dentales <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">Estudios Contables <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">E-commerce <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">Agentes de I.A a medida <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">WhatsApp Business Oficial <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">Setup en 3-7 días <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
          <span className="flex items-center gap-3">Atención automática 24/7 <span className="w-2 h-2 rounded-full bg-acento-primario"></span></span>
        </div>
      </div>

      {/* 3. PROBLEMA - SOLUCIÓN SECTION */}
      <section id="problema-solucion" className="w-full bg-[#12141C]/30 border-y border-border-sutil py-16 md:py-24 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 align-center">
          {/* Problem */}
          <div className="flex flex-col justify-center text-left">
            <span className="inline-flex items-center px-3 py-1 bg-error/10 border border-error rounded-full text-xs font-bold text-error uppercase tracking-wider mb-6 w-max">
              El Estado Actual
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primario mb-4 leading-tight">
              El Cuello de Botella Manual
            </h2>
            <p className="text-text-secundario text-base md:text-lg mb-8 leading-relaxed">
              Hacer crecer tu facturación no debería significar quemar a tu equipo con tareas administrativas pesadas.
            </p>
            
            <ul className="space-y-6 text-sm text-text-secundario">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-error/25 border border-error text-error flex items-center justify-center shrink-0 font-bold">✕</span>
                <div>
                  <strong className="text-text-primario">Sistemas Obsoletos:</strong> Software lento y viejo que no se conecta entre sí, obligando a tu equipo a copiar y pegar datos manualmente entre planillas y CRM.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-error/25 border border-error text-error flex items-center justify-center shrink-0 font-bold">✕</span>
                <div>
                  <strong className="text-text-primario">Fuga de Tiempo:</strong> Tu personal pasa horas contestando los mismos mensajes repetitivos por WhatsApp, descuidando el cierre de nuevas ventas.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-error/25 border border-error text-error flex items-center justify-center shrink-0 font-bold">✕</span>
                <div>
                  <strong className="text-text-primario">Crecimiento Estancado:</strong> Si para procesar más volumen necesitas contratar el doble de empleados administrativos, tu empresa se vuelve lenta e insostenible.
                </div>
              </li>
            </ul>
          </div>

          <TiltCard className="w-full">
            <span className="inline-flex items-center px-3 py-1 bg-success/15 border border-success rounded-full text-xs font-bold text-success uppercase tracking-wider mb-6 w-max">
              Con OptiCore AI
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primario mb-4 leading-tight">
              La Operación Autónoma
            </h2>
            <p className="text-text-secundario text-base mb-8 leading-relaxed">
              Delegas la complejidad técnica y el trabajo administrativo en sistemas autónomos estables.
            </p>
            
            <ul className="space-y-6 text-sm text-text-secundario">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-success/20 border border-success text-success flex items-center justify-center shrink-0 font-bold">✓</span>
                <div>
                  <strong className="text-text-primario">Adiós a la Burocracia:</strong> Los remitos, facturas y reportes se procesan, leen y archivan al instante en tu base de datos, sin errores ni demoras.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-success/20 border border-success text-success flex items-center justify-center shrink-0 font-bold">✓</span>
                <div>
                  <strong className="text-text-primario">Respuestas en Segundos:</strong> Agentes de IA atienden, filtran y califican a cada prospecto en WhatsApp las 24/7. Tu equipo solo interviene cuando el cliente está listo para comprar.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-success/20 border border-success text-success flex items-center justify-center shrink-0 font-bold">✓</span>
                <div>
                  <strong className="text-text-primario">Escalabilidad Real:</strong> Multiplicas tu volumen de operaciones y clientes manteniendo tu estructura actual ágil, rápida y eficiente.
                </div>
              </li>
            </ul>
          </TiltCard>
        </div>
      </section>

      {/* 3.5 CASOS DE USO POR SECTOR (3D Tilt Cards) */}
      <section id="sectores" className="w-full py-16 md:py-24 relative overflow-hidden z-10">
        {/* Background Video with Dark Filter */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video 
            ref={sectoresVideoRef}
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-15"
          >
            <source src="/18743334-hd_1920_1080_60fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-black/40 to-[#0B0C10]"></div>
        </div>

        {/* Wider wrapper for card spacing */}
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-widest text-acento-primario font-bold mb-3 block">SOLUCIONES ADAPTADAS</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primario tracking-tight mb-4">
            Elegí el sector de tu empresa
          </h2>
          <p className="text-text-secundario text-base md:text-lg max-w-[580px] mx-auto leading-relaxed">
            Cuatro rubros, agentes especializados. Cada agente queda entrenado para las tareas que de verdad mueven la aguja en tu sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch perspective-container">
          {/* Inmobiliaria */}
          <TiltCard>
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="px-3 py-1 bg-acento-primario/10 border border-acento-primario/30 rounded-full text-xs font-bold text-acento-primario uppercase tracking-wider">
                  Inmobiliaria
                </span>
                <span className="flex items-center gap-1.5 text-xs text-text-secundario">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse-fast"></span>
                  Disponible
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-text-primario mb-6 leading-snug">
                Califica interesados, agenda visitas y filtra consultas de alquileres.
              </h3>
              <ul className="space-y-4 text-xs text-text-secundario mb-8">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-acento-primario shrink-0" />
                  <span>Filtra consultas por presupuesto, zona y avales antes de pasarlo a un asesor.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-acento-primario shrink-0" />
                  <span>Agenda visitas a propiedades directo desde WhatsApp integrando tu calendario.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-acento-primario shrink-0" />
                  <span>Envía fichas de propiedades en PDF automáticamente según requerimientos.</span>
                </li>
              </ul>
            </div>
            <a
              href="https://wa.me/5493517302559?text=Hola%20OptiCore%2C%20quiero%20conocer%20el%20agente%20para%20inmobiliarias."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 border border-border-sutil hover:border-acento-primario rounded-lg text-center text-xs font-bold uppercase tracking-wider text-text-primario hover:bg-bg-hover transition-colors"
            >
              Consultar agente Inmobiliario
            </a>
          </TiltCard>

          {/* E-commerce */}
          <TiltCard>
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="px-3 py-1 bg-acento-primario/10 border border-acento-primario/30 rounded-full text-xs font-bold text-acento-primario uppercase tracking-wider">
                  E-commerce
                </span>
                <span className="flex items-center gap-1.5 text-xs text-text-secundario">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse-fast"></span>
                  Disponible
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-text-primario mb-6 leading-snug">
                Responde consultas, informa envíos y recupera carritos abandonados 24/7.
              </h3>
              <ul className="space-y-4 text-xs text-text-secundario mb-8">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-acento-primario shrink-0" />
                  <span>Informa el estado del envío a clientes leyendo el ERP al instante.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-acento-primario shrink-0" />
                  <span>Responde dudas complejas sobre stock, medidas y especificaciones.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-acento-primario shrink-0" />
                  <span>Envía recordatorios amigables de compra ante abandonos en pasarelas.</span>
                </li>
              </ul>
            </div>
            <a
              href="https://wa.me/5493517302559?text=Hola%20OptiCore%2C%20quiero%20conocer%20el%20agente%20para%20e-commerce."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 border border-border-sutil hover:border-acento-primario rounded-lg text-center text-xs font-bold uppercase tracking-wider text-text-primario hover:bg-bg-hover transition-colors"
            >
              Consultar agente E-commerce
            </a>
          </TiltCard>

          {/* Automotriz */}
          <TiltCard>
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="px-3 py-1 bg-acento-purple/10 border border-acento-purple/30 rounded-full text-xs font-bold text-acento-purple uppercase tracking-wider">
                  Automotriz
                </span>
                <span className="flex items-center gap-1.5 text-xs text-text-secundario">
                  <span className="w-2 h-2 rounded-full bg-acento-purple"></span>
                  Piloto Cerrado
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-text-primario mb-6 leading-snug">
                Califica interesados en vehículos, financiamiento y coordina test drives.
              </h3>
              <ul className="space-y-4 text-xs text-text-secundario mb-8">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-acento-primario shrink-0" />
                  <span>Entrega presupuestos aproximados y cotizaciones automáticas.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-acento-primario shrink-0" />
                  <span>Filtra interesados consultando vehículo usado como parte de pago.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-acento-primario shrink-0" />
                  <span>Asigna test drives en la agenda del equipo comercial directamente.</span>
                </li>
              </ul>
            </div>
            <a
              href="https://wa.me/5493517302559?text=Hola%20OptiCore%2C%20quiero%20conocer%20el%20piloto%20automotriz."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 border border-border-sutil hover:border-acento-purple rounded-lg text-center text-xs font-bold uppercase tracking-wider text-text-primario hover:bg-bg-hover transition-colors"
            >
              Consultar Piloto Automotriz
            </a>
          </TiltCard>

          {/* Restaurante */}
          <TiltCard>
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="px-3 py-1 bg-acento-primario/10 border border-acento-primario/30 rounded-full text-xs font-bold text-acento-primario uppercase tracking-wider">
                  Restaurante
                </span>
                <span className="flex items-center gap-1.5 text-xs text-text-secundario">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse-fast"></span>
                  Disponible
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-text-primario mb-6 leading-snug">
                Automatiza reservas, responde preguntas del menú y coordina pedidos.
              </h3>
              <ul className="space-y-4 text-xs text-text-secundario mb-8">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-acento-primario shrink-0" />
                  <span>Toma reservas verificando disponibilidad en tiempo real e insertando los datos en tu sistema.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-acento-primario shrink-0" />
                  <span>Muestra la carta digital, responde preguntas frecuentes e indica alérgenos al instante.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-acento-primario shrink-0" />
                  <span>Califica comensales y canaliza pedidos en piloto automático directo al chat de WhatsApp.</span>
                </li>
              </ul>
            </div>
            <a
              href="https://wa.me/5493517302559?text=Hola%20OptiCore%2C%20quiero%20conocer%20el%20agente%20para%20restaurantes."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 border border-border-sutil hover:border-acento-primario rounded-lg text-center text-xs font-bold uppercase tracking-wider text-text-primario hover:bg-bg-hover transition-colors"
            >
              Consultar agente Gastronómico
            </a>
          </TiltCard>
        </div>
      </div>
      </section>

      {/* 2. QUÉ HACEMOS SECTION (3D Tilt Service Cards) */}
      <section id="que-hacemos" className="w-full py-16 md:py-24 max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-acento-primario font-bold mb-3 block">INFRAESTRUCTURA DE IA</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primario tracking-tight mb-4">
            La arquitectura que tu empresa necesita
          </h2>
          <p className="text-text-secundario text-base md:text-lg max-w-[620px] mx-auto leading-relaxed">
            Reemplazamos sistemas antiguos e ineficientes por agentes autónomos de IA que eliminan las tareas repetitivas y hacen ganar tiempo a tu equipo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-container">
          {/* Card 1 */}
          <TiltCard>
            <div>
              <div className="w-14 h-14 bg-bg-hover border border-acento-primario/30 rounded-xl flex items-center justify-center mb-6 shadow-inner">
                <Layers className="w-7 h-7 text-acento-primario" />
              </div>
              <h3 className="font-display text-2xl font-bold text-text-primario mb-4">
                Carga y Procesamiento de Datos sin Errores
              </h3>
              <p className="text-sm text-text-secundario leading-relaxed mb-6">
                Olvidate de copiar y pegar datos a mano. Automatizamos la lectura de facturas, remitos, PDFs y la carga de información directa en tu CRM o ERP de inmediato y con total precisión.
              </p>
            </div>
            <div className="border-t border-border-sutil pt-4 text-xs font-mono text-acento-primario">
              OPERACIÓN AUTOMÁTICA Y SIN ERRORES
            </div>
          </TiltCard>

          {/* Card 2 */}
          <TiltCard>
            <div>
              <div className="w-14 h-14 bg-bg-hover border border-acento-primario/30 rounded-xl flex items-center justify-center mb-6 shadow-inner">
                <Bot className="w-7 h-7 text-acento-primario" />
              </div>
              <h3 className="font-display text-2xl font-bold text-text-primario mb-4">
                Atención y Ventas Automáticas 24/7
              </h3>
              <p className="text-sm text-text-secundario leading-relaxed mb-6">
                Filtramos y calificamos a cada interesado en WhatsApp al instante. Tu equipo comercial solo interviene cuando el cliente está precalificado y listo para comprar.
              </p>
            </div>
            <div className="border-t border-border-sutil pt-4 text-xs font-mono text-acento-primario">
              RESPUESTAS EN SEGUNDOS 24/7
            </div>
          </TiltCard>

          {/* Card 3 */}
          <TiltCard>
            <div>
              <div className="w-14 h-14 bg-bg-hover border border-acento-primario/30 rounded-xl flex items-center justify-center mb-6 shadow-inner">
                <Database className="w-7 h-7 text-acento-primario" />
              </div>
              <h3 className="font-display text-2xl font-bold text-text-primario mb-4">
                Respuestas Inmediatas con Información Real
              </h3>
              <p className="text-sm text-text-secundario leading-relaxed mb-6">
                Tus agentes de IA acceden en milisegundos a todo el catálogo, documentación técnica, políticas o stock de tu empresa para responder consultas complejas idéntico a tu mejor empleado.
              </p>
            </div>
            <div className="border-t border-border-sutil pt-4 text-xs font-mono text-acento-primario">
              CEREBRO DE DATOS PROPIO
            </div>
          </TiltCard>
        </div>
      </section>

      {/* 4. IMPLEMENTACIÓN VS MENTORÍA CARDS */}
      <section id="servicios" className="w-full bg-[#12141C]/20 border-y border-border-sutil py-16 md:py-24 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-acento-primario font-bold mb-3 block">MÉTODO DE TRABAJO</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primario tracking-tight mb-4">
              Dos formas de transformar tu empresa
            </h2>
            <p className="text-text-secundario text-base md:text-lg max-w-[600px] mx-auto leading-relaxed">
              Elige si prefieres que desarrollemos tu arquitectura llave en mano o que te formemos para dominar la Inteligencia Artificial.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch max-w-[1000px] mx-auto">
            {/* Card 1: Implementación */}
            <div className="relative w-full h-full flex flex-col">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-acento-primario text-bg-primary text-[10px] font-black uppercase tracking-wider px-5 py-1 rounded-full shadow-md z-20">
                DONE FOR YOU
              </span>
              <TiltCard className="flex-1 w-full h-full">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primario mb-4">
                    Implementación Llave en Mano
                  </h3>
                  <p className="text-sm text-text-secundario leading-relaxed mb-6">
                    Nos encargamos del diseño de arquitectura, programación de agentes, integraciones en CRM y mantenimiento completo del sistema.
                  </p>
                  
                  <div className="border-t border-border-sutil py-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-acento-primario block mb-2">Para quién es:</span>
                    <p className="text-xs text-text-secundario leading-relaxed">
                      Dueños de empresas que buscan delegar la parte técnica al 100%. Querés un sistema activo, estable y facturando sin tener que escribir una sola línea de código o aprender a usar herramientas complejas. Vos aprobás la estrategia, nosotros entregamos.
                    </p>
                  </div>

                  <ul className="space-y-4 text-xs text-text-secundario mb-8 border-t border-border-sutil pt-6">
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-acento-primario shrink-0" />
                      <span>Auditoría completa de tus procesos operativos actuales</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-acento-primario shrink-0" />
                      <span>Desarrollo de agente de WhatsApp/Telegram a medida</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-acento-primario shrink-0" />
                      <span>CRM con automatizaciones y seguimiento programado</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-acento-primario shrink-0" />
                      <span>Mantenimiento, soporte técnico y optimización permanente</span>
                    </li>
                  </ul>

                  <div className="bg-[#1A1D2B]/50 border border-border-sutil p-5 rounded-xl mb-6">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-text-primario">
                      <ShieldCheck className="w-4 h-4 text-acento-secundario" />
                      <span>Garantía de Ahorro OptiCore</span>
                    </div>
                    <p className="text-[10px] text-text-secundario leading-relaxed">
                      Si en los primeros 30 días el sistema no libera un mínimo de 15 horas semanales de trabajo operativo de tu personal, trabajamos gratis a nuestro cargo.
                    </p>
                  </div>
                </div>

                <div>
                  <a
                    href="https://calendly.com/fabrizzio-joel-c/opticore-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-acento-primario text-bg-primary font-bold text-center rounded-lg shadow-lg block focus:outline-none hover:scale-[1.02] transition-transform"
                  >
                    Quiero la Implementación
                  </a>
                </div>
              </TiltCard>
            </div>

            {/* Card 2: Mentoría */}
            <div className="relative w-full h-full flex flex-col">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#12141C] border border-border-sutil text-text-secundario text-[10px] font-black uppercase tracking-wider px-5 py-1 rounded-full shadow z-20">
                DONE WITH YOU
              </span>
              <TiltCard className="flex-1 w-full h-full">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primario mb-4">
                    Mentoría e Incubadora de Agencias
                  </h3>
                  <p className="text-sm text-text-secundario leading-relaxed mb-6">
                    Te capacitamos a ti o a tu equipo y te proveemos la infraestructura probada para crear sistemas autónomos comerciales.
                  </p>
                  
                  <div className="border-t border-border-sutil py-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-acento-purple block mb-2">Para quién es:</span>
                    <p className="text-xs text-text-secundario leading-relaxed">
                      Personas que quieren aprender a crear sistemas de I.A y vivir de eso. Te formamos paso a paso para que construyas tu propio ecosistema de automatización, lances tu agencia técnica y repliques esta misma estructura con tus futuros clientes.
                    </p>
                  </div>

                  <ul className="space-y-4 text-xs text-text-secundario mb-8 border-t border-border-sutil pt-6">
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-acento-purple shrink-0" />
                      <span>12 sesiones 1:1 de 60 minutos con tutor asignado</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-acento-purple shrink-0" />
                      <span>Acceso de por vida al campus de aprendizaje técnico</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-acento-purple shrink-0" />
                      <span>Plantillas y repositorios de código / prompts maestros</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-acento-purple shrink-0" />
                      <span>Comunidad de implementadores e integraciones en vivo</span>
                    </li>
                  </ul>

                  <div className="bg-[#1A1D2B]/50 border border-border-sutil p-5 rounded-xl mb-6">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-text-primario">
                      <ShieldCheck className="w-4 h-4 text-acento-purple" />
                      <span>Garantía de Transferencia</span>
                    </div>
                    <p className="text-[10px] text-text-secundario leading-relaxed">
                      30 días de cobertura total para asegurar que dominás el sistema de automatización y la arquitectura técnica de integración.
                    </p>
                  </div>
                </div>

                <div>
                  <a
                    href="https://calendly.com/fabrizzio-joel-c/opticore-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-transparent border border-border-sutil hover:border-acento-purple text-text-primario font-bold text-center rounded-lg block focus:outline-none hover:bg-bg-hover hover:scale-[1.02] transition-all"
                  >
                    Quiero la Mentoría
                  </a>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CÓMO FUNCIONA (Timeline) */}
      <section id="como-funciona" className="w-full py-16 md:py-24 max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-widest text-acento-primario font-bold mb-3 block">TIEMPOS DE ENTREGA</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primario tracking-tight mb-4">
            Activo en automático en menos de 7 días
          </h2>
          <p className="text-text-secundario text-base md:text-lg max-w-[540px] mx-auto leading-relaxed">
            La instalación del sistema la hacemos nosotros de punta a punta. Vos solo necesitás tu WhatsApp Business — del resto nos encargamos.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-[1px] border-t border-dashed border-acento-primario/30 z-0"></div>

          {/* Phase 1 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-bg-card border-2 border-acento-primario rounded-full flex items-center justify-center font-display text-2xl font-bold text-acento-primario shadow mb-6">
              1
            </div>
            <h3 className="font-display text-lg font-bold text-text-primario mb-3">Conocemos tu empresa</h3>
            <p className="text-xs text-text-secundario leading-relaxed max-w-[240px]">
              Hacemos un diagnóstico preciso para identificar cómo trabajás hoy: qué tareas repetitivas te consumen el día y dónde se escapan leads.
            </p>
          </div>

          {/* Phase 2 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-bg-card border-2 border-acento-primario rounded-full flex items-center justify-center font-display text-2xl font-bold text-acento-primario shadow mb-6">
              2
            </div>
            <h3 className="font-display text-lg font-bold text-text-primario mb-3">Diseñamos tu solución</h3>
            <p className="text-xs text-text-secundario leading-relaxed max-w-[240px]">
              Armamos el agente a tu medida: qué va a responder, cómo va a calificar y con qué herramientas se conecta. Vos aprobás, nosotros construimos.
            </p>
          </div>

          {/* Phase 3 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-bg-card border-2 border-acento-primario rounded-full flex items-center justify-center font-display text-2xl font-bold text-acento-primario shadow mb-6">
              3
            </div>
            <h3 className="font-display text-lg font-bold text-text-primario mb-3">Construimos y conectamos</h3>
            <p className="text-xs text-text-secundario leading-relaxed max-w-[240px]">
              Desarrollamos el agente y lo integramos con tus herramientas comerciales. Todo el trabajo técnico corre por nuestra cuenta.
            </p>
          </div>

          {/* Phase 4 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-bg-card border-2 border-acento-primario rounded-full flex items-center justify-center font-display text-2xl font-bold text-acento-primario shadow mb-6">
              4
            </div>
            <h3 className="font-display text-lg font-bold text-text-primario mb-3">Activamos y acompañamos</h3>
            <p className="text-xs text-text-secundario leading-relaxed max-w-[240px]">
              Ponemos tu sistema a funcionar, te mostramos cómo monitorearlo y seguimos optimizando para que rinda al máximo desde el día uno.
            </p>
          </div>
        </div>
      </section>

      {/* SOFÍA LIVE CHAT DEMO SECTION */}
      <section id="demo-realestate" className="w-full bg-[#12141C]/40 border-y border-border-sutil py-16 md:py-24 relative overflow-hidden z-10">
        {/* Background Video with Dark Filter */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-20"
          >
            <source src="/8471103-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#0B0C10]/60"></div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left: Pain & PNL Copy */}
          <div className="lg:col-span-7 text-left">
            <span className="text-xs uppercase tracking-widest text-acento-primario font-bold mb-3 block">DEMO DE DEMOSTRACIÓN</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primario mb-6 leading-tight">
              Tu agencia inmobiliaria <br />
              <span className="bg-gradient-to-r from-acento-primario to-acento-secundario bg-clip-text text-transparent font-display font-bold">nunca pierde un lead mientras dormís.</span>
            </h2>
            <p className="text-text-secundario text-base md:text-lg mb-8 leading-relaxed">
              Cada semana, cientos de interesados mandan el mismo mensaje. Tu equipo los atiende tarde, se olvida de hacer seguimiento, y el cliente se va con la competencia. El Agente Inmobiliario de OptiCore resuelve esto hoy de forma autónoma.
            </p>

            <ul className="space-y-6 text-sm text-text-secundario mb-8">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-bg-hover border border-border-sutil rounded-lg flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-acento-primario" />
                </div>
                <div>
                  <strong className="text-text-primario block mb-1">Califica e interactúa 24/7</strong>
                  <span>El agente chatea, detecta requerimientos y asienta datos de clientes sin hacerlos esperar.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-bg-hover border border-border-sutil rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-acento-primario" />
                </div>
                <div>
                  <strong className="text-text-primario block mb-1">Tus asesores solo cierran tratos</strong>
                  <span>Filtra a curiosos. Cuando un lead es asignado a tu equipo comercial, ya fue pre-calificado por presupuesto y zona.</span>
                </div>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="px-6 py-3.5 bg-acento-primario text-bg-primary font-bold rounded-lg shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none"
              >
                Solicitar agente Inmobiliario
              </a>
              <a
                href="https://sofia.somosopticore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-transparent border border-acento-primario text-acento-primario font-bold hover:bg-bg-hover rounded-lg transition-all flex items-center gap-2"
              >
                Ir a la web de Sofía
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://calendly.com/fabrizzio-joel-c/opticore-call"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-transparent border border-border-sutil text-text-primario font-semibold hover:bg-bg-hover rounded-lg transition-all flex items-center gap-2"
              >
                Agendar videollamada
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Live Chat Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <TiltWrapper className="w-full max-w-[350px]">
              <div className="w-full aspect-[9/18.5] bg-[#0E0704] border-[7px] border-border-sutil rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-3 flex flex-col overflow-hidden">
              {/* Header */}
              <div className="bg-[#1A0F0A] border-b border-border-sutil pt-8 pb-3 px-3 -mx-3 -mt-3 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-bg-card border border-border-sutil flex items-center justify-center font-display text-sm font-bold text-acento-primario">
                  S
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-text-primario flex items-center gap-1.5">
                    Sofía
                    <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse-fast"></span>
                  </div>
                  <div className="text-[10px] text-text-secundario">Asistente Inmobiliario OptiCore</div>
                </div>
              </div>

              {/* Chat Messages */}
              <div
                ref={chatAreaRef}
                className="flex-1 py-4 flex flex-col gap-3 overflow-y-auto text-xs font-sans min-h-[220px]"
              >
                {chatMessages.map((msg) => {
                  if (msg.sender === "system") {
                    return (
                      <div key={msg.id} className="self-center bg-bg-card border border-border-sutil text-text-muted text-[9px] py-1.5 px-3.5 rounded-lg text-center max-w-[90%] font-medium leading-relaxed">
                        {msg.text}
                      </div>
                    );
                  }
                  return (
                    <div
                      key={msg.id}
                      className={`max-w-[85%] p-3 rounded-[18px] shadow-sm leading-relaxed ${
                        msg.sender === "client"
                          ? "self-end bg-[#085C42] text-[#F5E6D3] rounded-tr-[4px]"
                          : "self-start bg-bg-card border border-border-sutil text-text-primario rounded-tl-[4px]"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <div className="text-[8px] text-right mt-1 text-text-muted">
                        {msg.timestamp}
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="self-start max-w-[80%] bg-bg-card border border-border-sutil p-3 rounded-[18px] rounded-tl-[4px] shadow-sm flex items-center gap-1">
                    <span className="text-[10px] text-text-secundario font-semibold">Sofía está escribiendo</span>
                    <span className="flex gap-0.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-acento-primario animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-acento-primario animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-acento-primario animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </span>
                  </div>
                )}
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                <button
                  onClick={() => handleSendMessage("Quiero buscar propiedades para comprar")}
                  disabled={isTyping}
                  className="bg-bg-card hover:bg-bg-hover text-text-secundario hover:text-text-primario border border-border-sutil px-2.5 py-1.5 rounded-full text-[10px] focus:outline-none transition-colors"
                >
                  🏢 Buscar Propiedades
                </button>
                <button
                  onClick={() => handleSendMessage("Quiero agendar una visita a un departamento")}
                  disabled={isTyping}
                  className="bg-bg-card hover:bg-bg-hover text-text-secundario hover:text-text-primario border border-border-sutil px-2.5 py-1.5 rounded-full text-[10px] focus:outline-none transition-colors"
                >
                  📅 Agendar Visita
                </button>
              </div>

              {/* Chat Input */}
              <div className="border-t border-border-sutil pt-2 pb-1.5 -mx-3 -mb-3 bg-[#1A0F0A] px-3 flex gap-2 items-center">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isTyping}
                  placeholder="Escribí un mensaje..."
                  className="flex-1 h-9 bg-bg-card border border-border-sutil rounded-full px-4 text-xs text-text-primario placeholder-text-muted focus:outline-none focus:border-acento-primario disabled:opacity-50 transition-colors"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isTyping || !userInput.trim()}
                  className="w-9 h-9 rounded-full bg-acento-primario hover:bg-acento-primario/90 text-bg-primary font-bold flex items-center justify-center transition-colors focus:outline-none disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </TiltWrapper>
        </div>
      </div>
    </section>

      {/* BRUNO LIVE CHAT DEMO SECTION */}
      <section id="demo-bruno" className="w-full bg-[#150D0A]/40 border-y border-border-sutil py-16 md:py-24 relative overflow-hidden z-10">
        {/* Background Video with Dark Filter */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-20"
          >
            <source src="/5657100-hd_2048_1080_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#0B0C10]/60"></div>
        </div>

        <div className="absolute top-[25%] left-[5%] w-[400px] h-[400px] rounded-full bg-acento-primario/5 blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] rounded-full bg-acento-secundario/5 blur-[110px] pointer-events-none z-0"></div>

        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left: Live Chat Mockup (in TiltWrapper) */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <TiltWrapper className="w-full max-w-[350px]">
              <div className="w-full aspect-[9/18.5] bg-[#1A0F0A] border-[7px] border-[#3D2820] rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-3 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-[#2B1810] border-b border-[#3D2820] pt-8 pb-3 px-3 -mx-3 -mt-3 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#3A2218] border border-[#C19A5B]/30 flex items-center justify-center">
                    <BrunoLogo className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs font-bold text-[#F5E6D3] flex items-center gap-1.5">
                      Bruno
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8FAA5B] animate-pulse-fast"></span>
                    </div>
                    <div className="text-[10px] text-[#B8A282]">Asistente Gastronómico OptiCore</div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div
                  ref={brunoChatAreaRef}
                  className="flex-1 py-4 flex flex-col gap-3 overflow-y-auto text-xs font-sans min-h-[220px]"
                >
                  {brunoChatMessages.map((msg) => {
                    if (msg.sender === "system") {
                      return (
                        <div key={msg.id} className="self-center bg-[#2B1810] border border-[#3D2820] text-[#B8A282] text-[9px] py-1.5 px-3.5 rounded-lg text-center max-w-[90%] font-medium leading-relaxed font-sans">
                          {msg.text}
                        </div>
                      );
                    }
                    return (
                      <div
                        key={msg.id}
                        className={`max-w-[85%] p-3 rounded-[18px] shadow-sm leading-relaxed text-left ${
                          msg.sender === "client"
                            ? "self-end bg-[#085C42] text-[#F5E6D3] rounded-tr-[4px]"
                            : "self-start bg-[#2B1810] border border-[#3D2820] text-[#F5E6D3] rounded-tl-[4px]"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <div className="text-[8px] text-right mt-1 text-[#6B5847]">
                          {msg.timestamp}
                        </div>
                      </div>
                    );
                  })}

                  {isBrunoTyping && (
                    <div className="self-start max-w-[80%] bg-[#2B1810] border border-[#3D2820] p-3 rounded-[18px] rounded-tl-[4px] shadow-sm flex items-center gap-1">
                      <span className="text-[10px] text-[#B8A282] font-semibold">Bruno está escribiendo</span>
                      <span className="flex gap-0.5 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C19A5B] animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C19A5B] animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C19A5B] animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Suggestions */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  <button
                    onClick={() => handleBrunoSendMessage("Quiero ver el menú del restaurante")}
                    disabled={isBrunoTyping}
                    className="bg-[#2B1810] hover:bg-[#3A2218] text-[#B8A282] hover:text-[#F5E6D3] border border-[#3D2820] px-2.5 py-1.5 rounded-full text-[10px] focus:outline-none transition-colors"
                  >
                    🍔 Ver el Menú
                  </button>
                  <button
                    onClick={() => handleBrunoSendMessage("Quiero reservar una mesa para 4 personas")}
                    disabled={isBrunoTyping}
                    className="bg-[#2B1810] hover:bg-[#3A2218] text-[#B8A282] hover:text-[#F5E6D3] border border-[#3D2820] px-2.5 py-1.5 rounded-full text-[10px] focus:outline-none transition-colors"
                  >
                    📅 Reservar Mesa
                  </button>
                </div>

                {/* Chat Input */}
                <div className="border-t border-[#3D2820] pt-2 pb-1.5 -mx-3 -mb-3 bg-[#2B1810] px-3 flex gap-2 items-center">
                  <input
                    type="text"
                    value={brunoUserInput}
                    onChange={(e) => setBrunoUserInput(e.target.value)}
                    onKeyDown={handleBrunoKeyPress}
                    disabled={isBrunoTyping}
                    placeholder="Escribí un mensaje..."
                    className="flex-1 h-9 bg-[#1A0F0A] border border-[#3D2820] rounded-full px-4 text-xs text-[#F5E6D3] placeholder-[#6B5847] focus:outline-none focus:border-[#C19A5B] disabled:opacity-50 transition-colors"
                  />
                  <button
                    onClick={() => handleBrunoSendMessage()}
                    disabled={isBrunoTyping || !brunoUserInput.trim()}
                    className="w-9 h-9 rounded-full bg-[#C19A5B] hover:bg-[#C19A5B]/90 text-[#1A0F0A] font-bold flex items-center justify-center transition-colors focus:outline-none disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </TiltWrapper>
          </div>

          {/* Right: Pain & PNL Copy */}
          <div className="lg:col-span-7 text-left order-1 lg:order-2">
            <span className="text-xs uppercase tracking-widest text-[#C19A5B] font-bold mb-3 block">DEMO GASTRONÓMICA</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primario mb-6 leading-tight">
              Automatizá reservas y consultas <br />
              <span className="text-[#C19A5B] font-display font-bold text-glow-gold">sin quemar a tu equipo de sala.</span>
            </h2>
            <p className="text-text-secundario text-base md:text-lg mb-8 leading-relaxed">
              Responder WhatsApp durante las horas pico del servicio es imposible. O tus mozos descuidan las mesas o los clientes se quedan esperando y reservan en otro lado. El Asistente WhatsApp Bruno atiende consultas al instante y de forma autónoma.
            </p>

            <ul className="space-y-6 text-sm text-text-secundario mb-8">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-bg-hover border border-border-sutil rounded-lg flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-[#C19A5B]" />
                </div>
                <div>
                  <strong className="text-text-primario block mb-1">Muestra la carta y especiales del día</strong>
                  <span>Bruno envía el link de tu menú digital o el archivo PDF según los requerimientos del comensal.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-bg-hover border border-border-sutil rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-[#C19A5B]" />
                </div>
                <div>
                  <strong className="text-text-primario block mb-1">Toma y registra reservas en tu agenda</strong>
                  <span>Pregunta cantidad de personas, día y hora. Verifica tu disponibilidad real e inserta la mesa directo en tu software gastronómico.</span>
                </div>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="px-6 py-3.5 bg-[#C19A5B] text-[#1A0F0A] font-bold rounded-lg shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none"
              >
                Solicitar agente Bruno
              </a>
              <a
                href="https://bruno.somosopticore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-transparent border border-[#C19A5B] text-[#C19A5B] font-bold hover:bg-[#3A2218]/30 rounded-lg transition-all flex items-center gap-2"
              >
                Ir a la web de Bruno
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://calendly.com/fabrizzio-joel-c/opticore-call"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-transparent border border-border-sutil text-text-primario font-semibold hover:bg-bg-hover rounded-lg transition-all flex items-center gap-2"
              >
                Agendar videollamada
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ARMA TU AGENTE A MEDIDA SECTION */}
      <section id="agente-medida" className="w-full py-16 md:py-24 relative overflow-hidden z-10">
        {/* Background Video with Dark Filter */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-15"
          >
            <source src="/7691548-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-black/45 to-[#0B0C10]"></div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-acento-primario font-bold mb-3 block">MÁXIMA PERSONALIZACIÓN</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primario tracking-tight mb-4">
            Armá tu agente a medida
          </h2>
          <p className="text-text-secundario text-base md:text-lg max-w-[620px] mx-auto leading-relaxed">
            No creemos en plantillas rígidas. Tu empresa es única: tiene sus propios problemas, su tono de voz y sus propias herramientas. Diseñamos una solución que encaja al 100%.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-container">
          {/* Card 1: Tono y Personalidad */}
          <TiltCard>
            <div>
              <div className="w-12 h-12 bg-bg-hover border border-acento-primario/30 rounded-xl flex items-center justify-center mb-6 shadow-inner">
                <Sparkles className="w-6 h-6 text-acento-primario" />
              </div>
              <h3 className="font-display text-lg font-bold text-text-primario mb-3">Tono y Personalidad</h3>
              <p className="text-xs text-text-secundario leading-relaxed">
                ¿Querés que sea formal, técnico, cercano, persuasivo o divertido? Calibramos la I.A. para que se comunique exactamente como lo haría el mejor vendedor de tu marca.
              </p>
            </div>
          </TiltCard>

          {/* Card 2: Tu Conocimiento */}
          <TiltCard>
            <div>
              <div className="w-12 h-12 bg-bg-hover border border-acento-primario/30 rounded-xl flex items-center justify-center mb-6 shadow-inner">
                <Database className="w-6 h-6 text-acento-primario" />
              </div>
              <h3 className="font-display text-lg font-bold text-text-primario mb-3">Tus Datos y Catálogo</h3>
              <p className="text-xs text-text-secundario leading-relaxed">
                Entrenamos al agente con tus PDFs de propiedades, menús del restaurante, documentos de stock, preguntas frecuentes y catálogos, garantizando respuestas precisas y sin inventos.
              </p>
            </div>
          </TiltCard>

          {/* Card 3: Tus Reglas */}
          <TiltCard>
            <div>
              <div className="w-12 h-12 bg-bg-hover border border-acento-primario/30 rounded-xl flex items-center justify-center mb-6 shadow-inner">
                <ShieldCheck className="w-6 h-6 text-acento-primario" />
              </div>
              <h3 className="font-display text-lg font-bold text-text-primario mb-3">Tus Reglas Operativas</h3>
              <p className="text-xs text-text-secundario leading-relaxed">
                Definimos los filtros de calificación exactos: el agente solo derivará el lead si cumple tus criterios de presupuesto, zona, comensales u horario, ahorrándole tiempo a tu equipo.
              </p>
            </div>
          </TiltCard>

          {/* Card 4: Tus Herramientas */}
          <TiltCard>
            <div>
              <div className="w-12 h-12 bg-bg-hover border border-acento-primario/30 rounded-xl flex items-center justify-center mb-6 shadow-inner">
                <Layers className="w-6 h-6 text-acento-primario" />
              </div>
              <h3 className="font-display text-lg font-bold text-text-primario mb-3">Tus Software Integrados</h3>
              <p className="text-xs text-text-secundario leading-relaxed">
                Conectamos al agente con tus herramientas diarias: HubSpot, Tokko Broker, sistemas de reservas (Woki), Google Sheets, pasarelas de pago, o alertas en tiempo real vía Telegram o WhatsApp.
              </p>
            </div>
          </TiltCard>
        </div>
      </div>
      </section>

      {/* 6. CASOS DE ÉXITO SECTION */}
      <section id="casos" className="w-full py-16 md:py-24 max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-acento-primario font-bold mb-3 block">CASOS DE ÉXITO</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primario tracking-tight mb-4">
            Resultados reales y medibles
          </h2>
          <p className="text-text-secundario text-base md:text-lg max-w-[620px] mx-auto leading-relaxed">
            Cómo ayudamos a empresas y negocios a reducir la carga administrativa y escalar su capacidad.
          </p>
        </div>

        <div className="relative max-w-[800px] mx-auto px-4 md:px-0">
          {/* Left Arrow */}
          <button
            onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-1 md:left-[-60px] top-[45%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-[#12141C]/90 hover:bg-[#1A1D2B] border border-acento-primario hover:border-acento-secundario text-acento-primario hover:text-acento-secundario rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:shadow-[0_0_20px_rgba(5,255,195,0.4)] transition-all duration-200 focus:outline-none cursor-pointer"
            aria-label="Opinión anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
            className="absolute right-1 md:right-[-60px] top-[45%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-[#12141C]/90 hover:bg-[#1A1D2B] border border-acento-primario hover:border-acento-secundario text-acento-primario hover:text-acento-secundario rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:shadow-[0_0_20px_rgba(5,255,195,0.4)] transition-all duration-200 focus:outline-none cursor-pointer"
            aria-label="Opinión siguiente"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <TiltCard className="mx-8 md:mx-0">
            <div className="relative w-full h-full text-left">
              <span className="absolute top-0 right-0 text-6xl text-border-sutil font-serif select-none leading-none">“</span>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-acento-primario/20 flex items-center justify-center font-bold text-acento-primario font-display text-lg">
                  {testimonials[activeTestimonial].name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primario">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-xs text-text-muted">{testimonials[activeTestimonial].role}</p>
                </div>
              </div>

              <div className="text-xl font-bold font-display text-acento-secundario text-glow-mint mb-4">
                {testimonials[activeTestimonial].metric}
              </div>

              <p className="text-sm sm:text-base text-text-secundario italic leading-relaxed">
                {testimonials[activeTestimonial].desc}
              </p>
            </div>
          </TiltCard>

          {/* Testimonial Controls */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeTestimonial === index ? "bg-acento-primario w-6" : "bg-border-sutil hover:bg-text-muted"
                }`}
                aria-label={`Mostrar testimonio ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* 6.5 DETRÁS DE OPTICORE (EL FUNDADOR) */}
      <section id="fundador" className="w-full py-16 md:py-24 max-w-[900px] mx-auto px-6 relative z-10">
        <TiltCard className="w-full relative overflow-hidden">
          {/* Decorative glow lights */}
          <div className="absolute top-[-20%] right-[-10%] w-[250px] h-[250px] rounded-full bg-acento-primario/10 blur-[80px] pointer-events-none z-0"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[250px] h-[250px] rounded-full bg-acento-purple/8 blur-[80px] pointer-events-none z-0"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
            {/* Avatar Column */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-acento-primario p-1 shadow-[0_0_25px_rgba(0,242,254,0.2)] bg-bg-card flex items-center justify-center mb-4 overflow-hidden">
                <img 
                  src="/fabrizzio.jpg" 
                  alt="Fabrizzio Joel C." 
                  className="w-full h-full rounded-full object-cover" 
                />
              </div>
              <h3 className="font-display text-lg font-bold text-text-primario">Fabrizzio Joel C.</h3>
              <p className="text-xs text-acento-primario font-mono uppercase tracking-wider mt-1">Founder de OptiCore</p>
            </div>

            {/* Content Column */}
            <div className="md:col-span-8 flex flex-col items-start justify-center">
              <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold mb-3 block">CONOCÉ AL FUNDADOR</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primario mb-4 leading-tight">
                Una relación humana en un mundo automatizado
              </h2>
              <p className="text-sm text-text-secundario leading-relaxed mb-6">
                ¡Hola! Soy Fabrizzio Joel, creador de OptiCore. Diseñé esta agencia con una obsesión clara: ayudar a los dueños de empresas a recuperar su tiempo libre y erradicar los sistemas lentos o procesos manuales obsoletos que queman a su equipo.
              </p>
              <p className="text-sm text-text-secundario leading-relaxed mb-6">
                Sé que delegar la operación en Inteligencia Artificial puede generar dudas. Por eso, no te vendemos tecnología complicada que no entendés; te acompañamos en persona a implementar sistemas estables que generen rentabilidad real.
              </p>
              
              <div className="flex flex-wrap gap-4 w-full">
                <a
                  href="https://instagram.com/fabrizziojoel.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#12141C] hover:bg-[#1C1F2E] border border-[#E1306C]/40 hover:border-[#E1306C] text-text-primario text-xs font-bold rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-[#E1306C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  Seguime en Instagram
                </a>
                <a
                  href="https://calendly.com/fabrizzio-joel-c/opticore-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-acento-primario hover:bg-acento-primario/90 text-bg-primary text-xs font-bold rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
                >
                  Agendar llamada directa
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </TiltCard>
      </section>

      {/* 7. FAQ SECTION */}
      <section id="faq" className="w-full py-16 md:py-24 max-w-[800px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-acento-primario font-bold mb-3 block">PREGUNTAS FRECUENTES</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primario tracking-tight mb-4">
            Preguntas que ya nos hicieron
          </h2>
        </div>

        <div className="space-y-1">
          {faqData.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="border-b border-border-sutil py-4 transition-all duration-300">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left py-2 font-display text-base sm:text-lg font-bold text-text-primario hover:text-acento-primario transition-colors duration-200 focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-text-secundario shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-acento-primario" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm sm:text-base text-text-secundario leading-relaxed pb-2 pr-6">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. CONTACT FORM CARD */}
      <section id="contacto" className="w-full bg-[#12141C]/20 border-t border-border-sutil py-16 md:py-24 relative overflow-hidden z-10">
        {/* Background Video with Dark Filter */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-20"
          >
            <source src="/11206661-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Ambient bottom glow */}
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-acento-secundario/8 blur-[140px] pointer-events-none animate-glow-1 z-0"></div>
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <span className="text-xs uppercase tracking-widest text-acento-primario font-bold mb-3 block">CONSULTORÍA INICIAL</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primario tracking-tight mb-4">
            Empezá a automatizar tu empresa hoy
          </h2>
          <p className="text-text-secundario text-base md:text-lg max-w-[600px] mx-auto mb-12 leading-relaxed">
            Completá el formulario en 30 segundos y te mostramos cómo liberar horas semanales con IA a medida.
          </p>

          <div className="max-w-[560px] mx-auto text-left">
            {formStatus === "success" ? (
              <div className="bg-[#8FAA5B] border border-border-sutil text-[#1a1d2b] p-8 rounded-xl flex flex-col items-center text-center shadow-xl animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#1a1d2b] flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-[#8FAA5B] stroke-[3]" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-[#1a1d2b]">
                  ¡Solicitud Enviada!
                </h3>
                <p className="text-sm font-semibold max-w-[360px] leading-relaxed mb-6">
                  Te escribimos por WhatsApp en menos de 24 horas hábiles para coordinar tu sesión estratégica.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="px-4 py-2 border border-[#1a1d2b] text-xs font-black rounded uppercase tracking-wider hover:bg-[#1a1d2b]/10 transition-colors focus:outline-none"
                >
                  Volver a ver formulario
                </button>
              </div>
            ) : (
              <div className="bg-[#12141C] border border-border-sutil p-6 sm:p-8 rounded-xl shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formStatus === "error" && (
                    <div className="p-4 bg-error/20 border border-error text-[#F5E6D3] text-xs font-semibold rounded-md">
                      ⚠️ {serverErrorMessage || "Hubo un error al procesar tu solicitud. Por favor, reintentá."}
                    </div>
                  )}

                  {/* Nombre */}
                  <div>
                    <label htmlFor="userName" className="block text-xs font-semibold uppercase tracking-wider text-text-secundario mb-2">
                      Tu nombre *
                    </label>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      required
                      value={formValues.userName}
                      onChange={handleInputChange}
                      className={`w-full bg-[#0B0C10] border rounded px-4 py-3 text-sm text-text-primario focus:outline-none focus:border-acento-primario transition-colors ${
                        formErrors.userName ? "border-error" : "border-border-sutil"
                      }`}
                      placeholder="Ej. Carlos Mendoza"
                    />
                    {formErrors.userName && (
                      <p className="text-xs text-error mt-1.5">{formErrors.userName}</p>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label htmlFor="whatsapp" className="block text-xs font-semibold uppercase tracking-wider text-text-secundario mb-2">
                      Teléfono WhatsApp *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-[13px] text-sm font-semibold text-text-muted">+54</span>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        required
                        value={formValues.whatsapp}
                        onChange={handleInputChange}
                        className={`w-full bg-[#0B0C10] border rounded pl-12 pr-4 py-3 text-sm text-text-primario focus:outline-none focus:border-acento-primario transition-colors ${
                          formErrors.whatsapp ? "border-error" : "border-border-sutil"
                        }`}
                        placeholder="351 1234567"
                      />
                    </div>
                    {formErrors.whatsapp ? (
                      <p className="text-xs text-error mt-1.5">{formErrors.whatsapp}</p>
                    ) : (
                      <span className="text-[10px] text-text-muted mt-1.5 block">Con código de área, sin 0 ni 15.</span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-text-secundario mb-2">
                      Email de contacto *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formValues.email}
                      onChange={handleInputChange}
                      className={`w-full bg-[#0B0C10] border rounded px-4 py-3 text-sm text-text-primario focus:outline-none focus:border-acento-primario transition-colors ${
                        formErrors.email ? "border-error" : "border-border-sutil"
                      }`}
                      placeholder="carlos@empresa.com"
                    />
                    {formErrors.email && (
                      <p className="text-xs text-error mt-1.5">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Mensaje opcional */}
                  <div>
                    <label htmlFor="mensaje" className="block text-xs font-semibold uppercase tracking-wider text-text-secundario mb-2">
                      Mensaje opcional
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formValues.mensaje}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-[#0B0C10] border border-border-sutil rounded px-4 py-3 text-sm text-text-primario focus:outline-none focus:border-acento-primario transition-colors resize-none"
                      placeholder="Contanos a qué se dedica tu empresa y qué tareas querés automatizar"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="flex-1 py-4 bg-acento-primario text-bg-primary font-bold rounded-lg shadow-lg transition-cta hover-cta flex items-center justify-center gap-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-bg-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        <>
                          Probar Demo WhatsApp
                          <ArrowRight className="w-5 h-5 stroke-[2]" />
                        </>
                      )}
                    </button>

                    {/* Calendly */}
                    <a
                      href="https://calendly.com/fabrizzio-joel-c/opticore-call"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-4 bg-transparent border border-acento-primario text-acento-primario font-bold rounded-lg shadow-lg hover:bg-bg-hover hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none text-sm"
                    >
                      Agendar videollamada
                      <PhoneCall className="w-5 h-5 stroke-[1.5]" />
                    </a>
                  </div>

                  <p className="text-[10px] sm:text-xs text-text-muted text-center leading-relaxed">
                    Te contactamos en menos de 24 horas hábiles. Cero spam, cero correos basura. Odiamos eso tanto como vos.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="w-full bg-[#07080B] border-t border-border-sutil pt-16 pb-8 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Logo column */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            <a href="#" className="flex items-center gap-3 mb-4 group focus:outline-none">
              <span className="logo-icon text-acento-primario">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" fill="url(#footer-brand-grad)" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" fill="url(#footer-brand-grad)" opacity="0.8" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" fill="url(#footer-brand-grad)" opacity="0.8" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" fill="url(#footer-brand-grad)" />
                  <path d="M10 6.5H14M6.5 10V14M17.5 10V14M10 17.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="footer-brand-grad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00f2fe" />
                      <stop offset="1" stopColor="#05ffc3" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="font-display text-2xl font-bold tracking-tight text-text-primario group-hover:text-acento-primario transition-colors">
                OptiCore<span className="text-acento-primario font-display">.ai</span>
              </span>
            </a>
            <p className="text-xs text-text-muted font-medium mb-1">Automatización Operativa Inteligente.</p>
            <p className="text-[10px] text-text-muted max-w-[280px] leading-relaxed">
              Desarrollamos infraestructura de Inteligencia Artificial para delegar las tareas administrativas de tu empresa de forma autónoma.
            </p>
          </div>

          {/* Links columns */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6 text-left">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-primario mb-4">Navegación</h4>
              <ul className="space-y-2.5 text-xs text-text-secundario">
                <li><a href="#que-hacemos" className="hover:text-text-primario transition-colors">Qué hacemos</a></li>
                <li><a href="#sectores" className="hover:text-text-primario transition-colors">Sectores</a></li>
                <li><a href="#como-funciona" className="hover:text-text-primario transition-colors">Proceso</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-primario mb-4">Servicios</h4>
              <ul className="space-y-2.5 text-xs text-text-secundario">
                <li><a href="#servicios" className="hover:text-text-primario transition-colors">Done-For-You</a></li>
                <li><a href="#servicios" className="hover:text-text-primario transition-colors">Done-With-You</a></li>
                <li><a href="https://sofia.somosopticore.com" target="_blank" rel="noopener noreferrer" className="hover:text-text-primario transition-colors">Sofía Inmobiliaria</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-primario mb-4">Legal</h4>
              <ul className="space-y-2.5 text-xs text-text-secundario">
                <li><a href="#" className="hover:text-text-primario transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-text-primario transition-colors">Privacidad</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom footer copyright */}
        <div className="max-w-[1200px] mx-auto px-6 border-t border-border-sutil pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-text-muted text-center sm:text-left">
            © 2026 OptiCore.ai es un producto de OptiCore. Hecho con ⚙️ en Córdoba, Argentina.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button in Brand Colors */}
      <a
        href="https://wa.me/5493517302559?text=Hola!%20Quiero%20saber%20más%20sobre%20los%20agentes%20de%20IA%20de%20OptiCore."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[9990] flex items-center justify-center w-14 h-14 bg-acento-primario hover:bg-acento-primario/90 text-bg-primary rounded-full shadow-[0_4px_20px_rgba(0,242,254,0.4)] hover:scale-110 transition-all duration-300 group focus:outline-none border border-border-sutil pointer-events-auto"
      >
        <span className="absolute inset-0 rounded-full border border-acento-primario animate-ping opacity-25"></span>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.579 1.968 14.12 .94 11.5 .94c-5.44 0-9.866 4.372-9.87 9.802 0 1.63.43 3.21 1.24 4.62l-1.024 3.74 3.83-1.002zM17.487 14.4c-.27-.13-1.58-.77-1.82-.85-.24-.09-.41-.13-.58.12-.17.25-.66.83-.81.99-.15.17-.3.19-.57.06-.27-.13-1.14-.42-2.17-1.32-.8-.7-1.33-1.57-1.49-1.84-.15-.27-.02-.41.11-.54.13-.13.27-.3.4-.46.13-.16.18-.27.27-.45.09-.17.04-.32-.02-.45-.07-.13-.58-1.39-.8-1.9-.21-.52-.43-.45-.58-.45h-.5c-.17 0-.45.06-.68.32-.24.25-.9.87-.9 2.13 0 1.26.93 2.47 1.06 2.64.13.17 1.83 2.76 4.43 3.86.62.26 1.1.42 1.48.54.62.2 1.18.17 1.63.1.5-.07 1.58-.64 1.8-1.25.22-.61.22-1.13.15-1.25-.07-.09-.27-.13-.54-.27z" />
        </svg>
        <span className="absolute right-16 bg-bg-card border border-border-sutil text-text-primario text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
          Chatear con OptiCore
        </span>
      </a>
    </div>
  );
}

// 5 Testimonials details list
const testimonials = [
  {
    name: "Carlos Mendoza",
    role: "Director Inmobiliaria Revolux",
    metric: "2.4x citas agendadas",
    desc: "«El agente califica los leads automáticamente, filtra por requisitos y agenda visitas sin que yo tenga que mover un dedo. Dejé de responder las mismas preguntas de siempre y ahora me enfoco en cerrar negocios.»",
  },
  {
    name: "Elena Rostova",
    role: "Jefa de Operaciones Distribuidora FastFlow",
    metric: "45 horas libres / mes",
    desc: "«Automatizamos la lectura de facturas y remitos en PDF con la I.A de OptiCore. Ahora se cargan en el ERP en segundos con total precisión y cero errores.»",
  },
  {
    name: "Martín Silva",
    role: "Socio Director Consultoría Nexus Partners",
    metric: "80% ahorro de tiempo",
    desc: "«El sistema autónomo lee expedientes e historial para armar borradores de informes técnicos de 20 páginas. Redujimos la entrega de 5 días a unas horas.»",
  },
  {
    name: "Rodrigo Almeida",
    role: "Fundador de MarkoShop E-commerce",
    metric: "4 → 1 agente de soporte",
    desc: "«Pasé de tener 4 personas respondiendo WhatsApp horas y horas a solo 1 supervisando el sistema. Se paga sola en el primer mes. Muy buena inversión, vale cada centavo.»",
  },
];

// 5 FAQ details
const faqData = [
  {
    q: "¿Qué herramientas pueden conectar los agentes de IA?",
    a: "Podemos conectar prácticamente cualquier herramienta moderna con API (HubSpot, Salesforce, WooCommerce, Shopify, Gmail, Google Sheets, Slack, Telegram, WhatsApp, ERPs internos y bases de datos SQL/NoSQL). Si tu software tiene API, podemos automatizarlo.",
  },
  {
    q: "¿Los clientes se dan cuenta de que están hablando con una Inteligencia Artificial?",
    a: "Nuestros agentes se entrenan específicamente con tu tono de marca, histórico de chats e información real. Las respuestas son tan contextuales y fluidas que la mayoría de los usuarios no detecta que interactúa con una IA. No obstante, si se lo pregunta directamente, el agente responde con honestidad.",
  },
  {
    q: "¿Qué pasa si la IA no sabe responder una consulta compleja?",
    a: "El agente está programado para detectar si una consulta excede su conocimiento o requiere intervención humana. En esos casos, detiene la automatización, te notifica por Telegram/WhatsApp con todo el contexto y te deriva el chat para que responda un humano.",
  },
  {
    q: "¿Cuánto tiempo toma el desarrollo de un agente a medida?",
    a: "La fase de diseño y estructuración toma entre 24 y 48 horas. Una vez aprobada, el desarrollo, testeo en sandbox y despliegue final llave en mano se realiza en un total de 3 a 7 días hábiles.",
  },
  {
    q: "¿Qué garantía ofrecen sobre la automatización?",
    a: "Ofrecemos una Garantía de Ahorro OptiCore de 30 días: si en el primer mes de funcionamiento tu sistema autónomo no libera un mínimo de 15 horas semanales de carga operativa de tu personal, trabajamos gratis a nuestro costo hasta lograrlo.",
  },
];
