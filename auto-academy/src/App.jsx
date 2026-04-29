import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const PACKAGES = [
  {
    id: "basic",
    name: "Básico",
    price: 10,
    color: "#3b82f6",
    description: "Acceso limitado a archivos esenciales",
    features: [
      "Hasta 5 cursos/manuales",
      "Acceso básico a iDrive",
      "Soporte por email",
      "Actualizaciones mensuales",
    ],
    maxItems: 5,
    badge: "Popular",
  },
  {
    id: "pro",
    name: "Profesional",
    price: 20,
    color: "#8b5cf6",
    description: "Acceso ampliado con contenido premium",
    features: [
      "Hasta 15 cursos/manuales",
      "Acceso completo a iDrive",
      "Soporte prioritario",
      "Actualizaciones semanales",
      "Manuales técnicos avanzados",
    ],
    maxItems: 15,
    badge: "Recomendado",
  },
  {
    id: "complete",
    name: "Guía Completa",
    price: 30,
    color: "#f59e0b",
    description: "Todo el contenido disponible sin límites",
    features: [
      "Acceso ilimitado a todo",
      "Todos los enlaces iDrive",
      "Soporte 24/7",
      "Actualizaciones diarias",
      "Manuales técnicos completos",
      "Videos y guías exclusivas",
      "Certificado de finalización",
    ],
    maxItems: 999,
    badge: "Completo",
  },
];

const INITIAL_COURSES = [
  {
    id: 1,
    title: "Mecánica Básica de Vehículos",
    category: "Mecánica",
    package: "basic",
    link: "https://idrive.example.com/mechanica-basica",
    description: "Aprende los fundamentos de la mecánica automotriz",
    image: "🔧",
    preview: true,
  },
  {
    id: 2,
    title: "Manual del Propietario - Toyota 2024",
    category: "Manuales",
    package: "basic",
    link: "https://idrive.example.com/toyota-2024",
    description: "Manual completo del propietario Toyota modelo 2024",
    image: "📖",
    preview: true,
  },
  {
    id: 3,
    title: "Diagnóstico Electrónico Automotriz",
    category: "Cursos",
    package: "pro",
    link: "https://idrive.example.com/diagnostico-electronico",
    description: "Curso avanzado de diagnóstico electrónico vehicular",
    image: "💻",
    preview: true,
  },
  {
    id: 4,
    title: "Manual de Transmisiones Automáticas",
    category: "Manuales",
    package: "pro",
    link: "https://idrive.example.com/transmisiones-auto",
    description: "Guía completa de transmisiones automáticas modernas",
    image: "⚙️",
    preview: true,
  },
  {
    id: 5,
    title: "Sistemas de Frenos ABS",
    category: "Mecánica",
    package: "pro",
    link: "https://idrive.example.com/frenos-abs",
    description: "Todo sobre sistemas de frenos antibloqueo",
    image: "🛑",
    preview: false,
  },
  {
    id: 6,
    title: "Electricidad y Electrónica Vehicular",
    category: "Cursos",
    package: "complete",
    link: "https://idrive.example.com/electricidad-vehicular",
    description: "Curso completo de sistemas eléctricos del vehículo",
    image: "⚡",
    preview: true,
  },
  {
    id: 7,
    title: "Manual Completo - Honda Civic 2024",
    category: "Manuales",
    package: "complete",
    link: "https://idrive.example.com/honda-civic-2024",
    description: "Manual técnico completo Honda Civic generación 2024",
    image: "📋",
    preview: true,
  },
  {
    id: 8,
    title: "Inyección Electrónica de Combustible",
    category: "Cursos",
    package: "complete",
    link: "https://idrive.example.com/inyeccion-electronica",
    description: "Dominio total de sistemas de inyección electrónica",
    image: "🔌",
    preview: false,
  },
  {
    id: 9,
    title: "Suspensión y Dirección Hidráulica",
    category: "Mecánica",
    package: "complete",
    link: "https://idrive.example.com/suspension-direccion",
    description: "Sistemas de suspensión y dirección hidráulica",
    image: "🏎️",
    preview: false,
  },
  {
    id: 10,
    title: "Manual de Aire Acondicionado Automotriz",
    category: "Manuales",
    package: "complete",
    link: "https://idrive.example.com/aclimatizacion-auto",
    description: "Reparación y mantenimiento de AC vehicular",
    image: "❄️",
    preview: false,
  },
];

const SALES_DATA = [
  { name: "Ene", ventas: 12, ingresos: 360 },
  { name: "Feb", ventas: 19, ingresos: 570 },
  { name: "Mar", ventas: 25, ingresos: 750 },
  { name: "Abr", ventas: 32, ingresos: 960 },
  { name: "May", ventas: 28, ingresos: 840 },
  { name: "Jun", ventas: 41, ingresos: 1230 },
];

const PACKAGE_DATA = [
  { name: "Básico", value: 35, color: "#3b82f6" },
  { name: "Profesional", value: 40, color: "#8b5cf6" },
  { name: "Completo", value: 25, color: "#f59e0b" },
];

function Badge({ children, color = "#3b82f6" }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 700,
        background: color,
        color: "#fff",
        textTransform: "uppercase",
        letterSpacing: 0.5,
      }}
    >
      {children}
    </span>
  );
}

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 16,
              width: "100%",
              maxWidth: 520,
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "18px 24px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1f2937" }}>
                {title}
              </h3>
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 22,
                  cursor: "pointer",
                  color: "#6b7280",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                }}
                onMouseEnter={(e) => (e.target.style.background = "#f3f4f6")}
                onMouseLeave={(e) => (e.target.style.background = "none")}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: 24 }}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Navbar({ role, onLogout, onNavigate, currentPage, cartCount }) {
  const navItems =
    role === "admin"
      ? [
          { key: "dashboard", label: "Dashboard" },
          { key: "manage", label: "Gestionar Cursos" },
          { key: "add", label: "Agregar Curso" },
          { key: "sales", label: "Ventas" },
        ]
      : [
          { key: "home", label: "Inicio" },
          { key: "courses", label: "Cursos" },
          { key: "packages", label: "Paquetes" },
          { key: "cart", label: "Carrito" },
        ];

  return (
    <nav
      style={{
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          onClick={() => onNavigate(role === "admin" ? "dashboard" : "home")}
        >
          <span style={{ fontSize: 28 }}>🚗</span>
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: -0.5,
            }}
          >
            Auto<span style={{ color: "#3b82f6" }}>Academy</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              style={{
                background: currentPage === item.key ? "#3b82f6" : "transparent",
                border: "none",
                color: currentPage === item.key ? "#fff" : "#cbd5e1",
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (currentPage !== item.key) e.target.style.background = "#334155";
              }}
              onMouseLeave={(e) => {
                if (currentPage !== item.key) e.target.style.background = "transparent";
              }}
            >
              {item.label}
              {item.key === "cart" && cartCount > 0 && (
                <span
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                    fontSize: 11,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 6,
                    fontWeight: 700,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Badge color={role === "admin" ? "#ef4444" : "#10b981"}>
            {role === "admin" ? "Admin" : "Usuario"}
          </Badge>
          <button
            onClick={onLogout}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              padding: "6px 14px",
              borderRadius: 8,
              fontSize: 13,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

function LoginScreen({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username.trim()) {
      setError("Ingresa un nombre de usuario");
      return;
    }
    if (selectedRole === "admin" && password !== "admin123") {
      setError("Contraseña de administrador incorrecta");
      return;
    }
    setError("");
    onLogin(selectedRole || "user", username);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: "40px 36px",
          width: "100%",
          maxWidth: 440,
          boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🚗</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1f2937", margin: 0 }}>
            Auto<span style={{ color: "#3b82f6" }}>Academy</span>
          </h1>
          <p style={{ color: "#6b7280", marginTop: 8, fontSize: 14 }}>
            Plataforma de cursos y manuales vehiculares
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          {["user", "admin"].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              style={{
                flex: 1,
                padding: "16px 12px",
                borderRadius: 14,
                border: `2px solid ${selectedRole === role ? "#3b82f6" : "#e5e7eb"}`,
                background: selectedRole === role ? "#eff6ff" : "#fff",
                cursor: "pointer",
                transition: "all 0.3s",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 6 }}>{role === "admin" ? "🛡️" : "👤"}</div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: selectedRole === role ? "#1d4ed8" : "#6b7280",
                }}
              >
                {role === "admin" ? "Administrador" : "Usuario"}
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
                {role === "admin" ? "Gestionar contenido" : "Comprar y aprender"}
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
            Usuario
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu nombre de usuario"
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 10,
              border: "2px solid #e5e7eb",
              fontSize: 14,
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
          />
        </div>

        {selectedRole === "admin" && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña de admin"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 10,
                border: "2px solid #e5e7eb",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
            <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>Demo: admin123</p>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "#fef2f2",
              color: "#dc2626",
              padding: "10px 16px",
              borderRadius: 10,
              fontSize: 13,
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            ⚠️ {error}
          </motion.div>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
            color: "#fff",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: "0 4px 15px rgba(59,130,246,0.4)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 8px 25px rgba(59,130,246,0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(59,130,246,0.4)";
          }}
        >
          Iniciar Sesión
        </button>
      </motion.div>
    </div>
  );
}

function AdminDashboard({ courses }) {
  const totalCourses = courses.length;
  const basicCount = courses.filter((c) => c.package === "basic").length;
  const proCount = courses.filter((c) => c.package === "pro").length;
  const completeCount = courses.filter((c) => c.package === "complete").length;

  const statsCards = [
    { label: "Total Cursos", value: totalCourses, icon: "📚", color: "#3b82f6", bg: "#eff6ff" },
    { label: "Paquete Básico", value: basicCount, icon: "📘", color: "#3b82f6", bg: "#eff6ff" },
    { label: "Paquete Pro", value: proCount, icon: "📗", color: "#8b5cf6", bg: "#f5f3ff" },
    { label: "Paquete Completo", value: completeCount, icon: "📙", color: "#f59e0b", bg: "#fffbeb" },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#1f2937", marginBottom: 24 }}>
          📊 Panel de Administración
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          {statsCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: card.bg,
                borderRadius: 16,
                padding: "20px 24px",
                border: `1px solid ${card.color}20`,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: card.color }}>{card.value}</div>
              <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 600, marginTop: 4 }}>
                {card.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 24,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1f2937", marginBottom: 20 }}>
              📈 Ventas por Mes
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip style={{ borderRadius: 10, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} />
                <Bar dataKey="ventas" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1f2937", marginBottom: 20 }}>
              🎯 Distribución por Paquete
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={PACKAGE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PACKAGE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 10 }}>
              {PACKAGE_DATA.map((item) => (
                <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: item.color }} />
                  <span style={{ fontSize: 12, color: "#6b7280" }}>{item.name} {item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ManageCourses({ courses, onDelete, onTogglePreview }) {
  const [filterPackage, setFilterPackage] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = courses.filter((c) => {
    const matchPackage = filterPackage === "all" || c.package === filterPackage;
    const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchPackage && matchSearch;
  });

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#1f2937", marginBottom: 24 }}>
          📚 Gestionar Cursos y Manuales
        </h2>

        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="text"
            placeholder="🔍 Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: 200,
              padding: "10px 16px",
              borderRadius: 10,
              border: "2px solid #e5e7eb",
              fontSize: 14,
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
          />
          {["all", "basic", "pro", "complete"].map((pkg) => (
            <button
              key={pkg}
              onClick={() => setFilterPackage(pkg)}
              style={{
                padding: "8px 16px",
                borderRadius: 10,
                border: "none",
                background: filterPackage === pkg ? "#3b82f6" : "#f3f4f6",
                color: filterPackage === pkg ? "#fff" : "#6b7280",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {pkg === "all" ? "Todos" : PACKAGES.find((p) => p.id === pkg)?.name}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: 40, color: "#9ca3af", fontSize: 14 }}>
              No se encontraron cursos
            </div>
          )}
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                border: "1px solid #e5e7eb",
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: 32 }}>{course.image}</span>
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1f2937" }}>{course.title}</div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>
                  {course.category} ·{" "}
                  {course.package === "basic" ? "Básico" : course.package === "pro" ? "Pro" : "Completo"}
                </div>
                <a
                  href={course.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 11, color: "#3b82f6", textDecoration: "none", wordBreak: "break-all" }}
                >
                  🔗 {course.link.substring(0, 50)}...
                </a>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  onClick={() => onTogglePreview(course.id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "none",
                    background: course.preview ? "#dcfce7" : "#f3f4f6",
                    color: course.preview ? "#16a34a" : "#6b7280",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {course.preview ? "✅ Visible" : "👁️ Oculto"}
                </button>
                <button
                  onClick={() => onDelete(course.id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "none",
                    background: "#fef2f2",
                    color: "#dc2626",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  🗑️
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function AddCourse({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    category: "Mecánica",
    package: "basic",
    link: "",
    description: "",
    image: "",
    preview: true,
  });
  const [success, setSuccess] = useState(false);

  const emojis = ["📖", "🔧", "💻", "⚡", "🛑", "⚙️", "📋", "🔌", "🏎️", "❄️", "🔩", "🛠️", "📐", "🚙"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.link.trim()) return;
    onAdd({ ...form, id: Date.now() });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setForm({ title: "", category: "Mecánica", package: "basic", link: "", description: "", image: "📖", preview: true });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: "#1f2937", marginBottom: 24 }}>
        ➕ Agregar Nuevo Curso / Manual
      </h2>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "#dcfce7",
            color: "#16a34a",
            padding: "12px 20px",
            borderRadius: 12,
            marginBottom: 20,
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          ✅ Curso agregado exitosamente
        </motion.div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 28,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          border: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 20,
          }}
        >
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
              Título del Curso *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Ej: Mecánica de Motores V8"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 10,
                border: "2px solid #e5e7eb",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
              Categoría
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 10,
                border: "2px solid #e5e7eb",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
                background: "#fff",
              }}
            >
              <option>Mecánica</option>
              <option>Cursos</option>
              <option>Manuales</option>
              <option>Electrónica</option>
              <option>Diagnóstico</option>
              <option>Carrocería</option>
              <option>Seguridad</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
              Paquete
            </label>
            <select
              value={form.package}
              onChange={(e) => setForm({ ...form, package: e.target.value })}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 10,
                border: "2px solid #e5e7eb",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
                background: "#fff",
              }}
            >
              <option value="basic">🔵 Básico ($10)</option>
              <option value="pro">🟣 Profesional ($20)</option>
              <option value="complete">🟡 Guía Completa ($30)</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
              Icono
            </label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setForm({ ...form, image: emoji })}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    border: form.image === emoji ? "2px solid #3b82f6" : "2px solid #e5e7eb",
                    background: form.image === emoji ? "#eff6ff" : "#fff",
                    fontSize: 20,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
              Enlace iDrive *
            </label>
            <input
              type="url"
              required
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="https://idrive.example.com/curso-nuevo"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 10,
                border: "2px solid #e5e7eb",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
              Descripción
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe el contenido del curso o manual..."
              rows={3}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 10,
                border: "2px solid #e5e7eb",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
                resize: "vertical",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20 }}>
          <input
            type="checkbox"
            id="preview"
            checked={form.preview}
            onChange={(e) => setForm({ ...form, preview: e.target.checked })}
            style={{ width: 18, height: 18 }}
          />
          <label htmlFor="preview" style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>
            Hacer visible para usuarios inmediatamente
          </label>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(135deg, #10b981, #059669)",
            color: "#fff",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            marginTop: 24,
            boxShadow: "0 4px 15px rgba(16,185,129,0.3)",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
        >
          ✅ Agregar Curso / Manual
        </button>
      </form>
    </motion.div>
  );
}

function AdminSales() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: "#1f2937", marginBottom: 24 }}>
        💰 Reporte de Ventas
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        {[
          { label: "Ingresos Totales", value: "$4,710", icon: "💵", color: "#10b981" },
          { label: "Total Ventas", value: "157", icon: "📦", color: "#3b82f6" },
          { label: "Clientes Activos", value: "89", icon: "👥", color: "#8b5cf6" },
          { label: "Tasa Conversión", value: "67%", icon: "📊", color: "#f59e0b" },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "20px 24px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              border: "1px solid #e5e7eb",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: item.color }}>{item.value}</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{item.label}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          border: "1px solid #e5e7eb",
        }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1f2937", marginBottom: 20 }}>
          📉 Ingresos Mensuales
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={SALES_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar dataKey="ingresos" fill="#10b981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

function UserHome({ courses, onNavigate }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div
        style={{
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          borderRadius: 20,
          padding: "40px 32px",
          marginBottom: 32,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            alignItems: "center",
          }}
        >
          <div>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Badge color="#3b82f6" style={{ marginBottom: 16, display: "inline-block" }}>
                🏆 Plataforma #1 en Cursos Vehiculares
              </Badge>
              <h1
                style={{
                  fontSize: 36,
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.2,
                  margin: "16px 0",
                }}
              >
                Aprende Mecánica
                <br />
                <span style={{ color: "#3b82f6" }}>Automotriz</span> Online
              </h1>
              <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.6, margin: "16px 0 24px" }}>
                Accede a cursos, manuales y guías técnicas de vehículos. Desde mecánica básica hasta
                diagnóstico electrónico avanzado.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  onClick={() => onNavigate("packages")}
                  style={{
                    padding: "14px 28px",
                    borderRadius: 12,
                    border: "none",
                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(59,130,246,0.4)",
                  }}
                >
                  Ver Paquetes
                </button>
                <button
                  onClick={() => onNavigate("courses")}
                  style={{
                    padding: "14px 28px",
                    borderRadius: 12,
                    border: "2px solid rgba(255,255,255,0.2)",
                    background: "transparent",
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Explorar Cursos
                </button>
              </div>
            </motion.div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                fontSize: 120,
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
                textAlign: "center",
              }}
            >
              🚗
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        {[
          { icon: "📚", label: "Cursos", value: courses.length },
          {
            icon: "📖",
            label: "Manuales",
            value: courses.filter((c) => c.category === "Manuales").length,
          },
          {
            icon: "🎓",
            label: "Categorías",
            value: [...new Set(courses.map((c) => c.category))].length,
          },
          { icon: "💰", label: "Desde", value: "$10" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              border: "1px solid #e5e7eb",
            }}
          >
            <div style={{ fontSize: 30, marginBottom: 8 }}>{stat.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#1f2937" }}>{stat.value}</div>
            <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#1f2937", marginBottom: 16 }}>
          🔥 Cursos Destacados
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {courses
            .filter((c) => c.preview)
            .slice(0, 6)
            .map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ y: -4 }}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: 20,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                }}
                onClick={() => onNavigate("courses")}
              >
                <div
                  style={{
                    fontSize: 40,
                    marginBottom: 12,
                    background: "#f8fafc",
                    borderRadius: 10,
                    padding: 12,
                    textAlign: "center",
                  }}
                >
                  {course.image}
                </div>
                <Badge
                  color={
                    course.package === "basic"
                      ? "#3b82f6"
                      : course.package === "pro"
                      ? "#8b5cf6"
                      : "#f59e0b"
                  }
                >
                  {course.package === "basic" ? "Básico" : course.package === "pro" ? "Pro" : "Completo"}
                </Badge>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: "#1f2937", margin: "10px 0 6px" }}>
                  {course.title}
                </h4>
                <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5 }}>{course.description}</p>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

function PackagesPage({ courses, onAddToCart }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: "#1f2937", marginBottom: 8 }}>
          Elige tu Plan de Aprendizaje
        </h2>
        <p style={{ color: "#6b7280", fontSize: 16 }}>
          Accede a cursos, manuales y guías técnicas vehiculares desde iDrive
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24,
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        {PACKAGES.map((pkg, i) => {
          const courseCount = courses.filter((c) => c.package === pkg.id).length;
          const isPopular = pkg.id === "pro";
          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              style={{
                background: isPopular ? "linear-gradient(135deg, #1e293b, #0f172a)" : "#fff",
                borderRadius: 20,
                padding: "32px 28px",
                boxShadow: isPopular
                  ? "0 20px 40px rgba(59,130,246,0.3)"
                  : "0 4px 20px rgba(0,0,0,0.08)",
                border: isPopular ? "2px solid #3b82f6" : "1px solid #e5e7eb",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {pkg.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    padding: "4px 14px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 700,
                    background: isPopular ? "#3b82f6" : pkg.color,
                    color: "#fff",
                  }}
                >
                  {pkg.badge}
                </div>
              )}

              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    background: `${pkg.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    margin: "0 auto 12px",
                  }}
                >
                  {pkg.id === "basic" ? "📘" : pkg.id === "pro" ? "📗" : "📙"}
                </div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: isPopular ? "#fff" : "#1f2937",
                    margin: "0 0 8px",
                  }}
                >
                  {pkg.name}
                </h3>
                <p style={{ fontSize: 13, color: isPopular ? "#94a3b8" : "#9ca3af" }}>{pkg.description}</p>
              </div>

              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <span style={{ fontSize: 48, fontWeight: 900, color: isPopular ? "#fff" : "#1f2937" }}>
                  ${pkg.price}
                </span>
                <span style={{ fontSize: 14, color: isPopular ? "#94a3b8" : "#9ca3af" }}> / mes</span>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
                {pkg.features.map((feat, j) => (
                  <li
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 0",
                      fontSize: 13,
                      color: isPopular ? "#cbd5e1" : "#4b5563",
                      borderBottom: "1px solid " + (isPopular ? "rgba(255,255,255,0.1)" : "#f3f4f6"),
                    }}
                  >
                    <span style={{ color: "#10b981", fontWeight: 700 }}>✓</span>
                    {feat}
                  </li>
                ))}
              </ul>

              <div
                style={{
                  textAlign: "center",
                  marginBottom: 16,
                  fontSize: 12,
                  color: isPopular ? "#94a3b8" : "#9ca3af",
                }}
              >
                {courseCount} cursos disponibles
              </div>

              <button
                onClick={() => onAddToCart(pkg)}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: 12,
                  border: isPopular ? "none" : `2px solid ${pkg.color}`,
                  background: isPopular ? "linear-gradient(135deg, #3b82f6, #2563eb)" : "transparent",
                  color: isPopular ? "#fff" : pkg.color,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  if (!isPopular) {
                    e.target.style.background = pkg.color;
                    e.target.style.color = "#fff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isPopular) {
                    e.target.style.background = "transparent";
                    e.target.style.color = pkg.color;
                  }
                }}
              >
                Seleccionar Plan
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function CoursesPage({ courses, selectedPackage, onAddToCart, onViewLink }) {
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["all", ...new Set(courses.map((c) => c.category))];

  const filtered = courses.filter((c) => {
    const matchCat = filterCategory === "all" || c.category === filterCategory;
    const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPkg = !selectedPackage || c.package === selectedPackage;
    return matchCat && matchSearch && matchPkg;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: "#1f2937", marginBottom: 8 }}>
        📚 Catálogo de Cursos y Manuales
      </h2>
      {selectedPackage && (
        <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 20 }}>
          Mostrando cursos del paquete{" "}
          <strong style={{ color: PACKAGES.find((p) => p.id === selectedPackage)?.color }}>
            {PACKAGES.find((p) => p.id === selectedPackage)?.name}
          </strong>
        </p>
      )}

      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="🔍 Buscar cursos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: 200,
            padding: "10px 16px",
            borderRadius: 10,
            border: "2px solid #e5e7eb",
            fontSize: 14,
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
          onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
        />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: 10,
              border: "none",
              background: filterCategory === cat ? "#3b82f6" : "#f3f4f6",
              color: filterCategory === cat ? "#fff" : "#6b7280",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {cat === "all" ? "Todos" : cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "#9ca3af" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
          <p style={{ fontSize: 16, fontWeight: 600 }}>No se encontraron cursos</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {filtered.map((course, i) => {
            const pkgInfo = PACKAGES.find((p) => p.id === course.package);
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    background: `linear-gradient(135deg, ${pkgInfo.color}15, ${pkgInfo.color}08)`,
                    padding: "24px 20px",
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: 48 }}>{course.image}</span>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      marginBottom: 8,
                    }}
                  >
                    <Badge color={pkgInfo.color}>{pkgInfo.name}</Badge>
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>{course.category}</span>
                  </div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: "#1f2937", margin: "8px 0", lineHeight: 1.3 }}>
                    {course.title}
                  </h4>
                  <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5, marginBottom: 16 }}>
                    {course.description}
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => onViewLink(course)}
                      style={{
                        flex: 1,
                        padding: "10px 14px",
                        borderRadius: 10,
                        border: "2px solid #3b82f6",
                        background: "transparent",
                        color: "#3b82f6",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      👁️ Vista Previa
                    </button>
                    {!selectedPackage && (
                      <button
                        onClick={() => onAddToCart(pkgInfo)}
                        style={{
                          flex: 1,
                          padding: "10px 14px",
                          borderRadius: 10,
                          border: "none",
                          background: "linear-gradient(135deg, #10b981, #059669)",
                          color: "#fff",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        🛒 Comprar
                      </button>
                    )}
                    {selectedPackage && (
                      <a
                        href={course.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          flex: 1,
                          padding: "10px 14px",
                          borderRadius: 10,
                          border: "none",
                          background: `linear-gradient(135deg, ${pkgInfo.color}, ${pkgInfo.color}cc)`,
                          color: "#fff",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                          textAlign: "center",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        🔗 Abrir en iDrive
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

function CartPage({ cart, onRemove, onCheckout }) {
  if (cart.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#1f2937", marginBottom: 8 }}>
          Tu carrito está vacío
        </h3>
        <p style={{ color: "#9ca3af", fontSize: 14 }}>
          Explora nuestros paquetes y cursos para comenzar
        </p>
      </motion.div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: "#1f2937", marginBottom: 24 }}>🛒 Mi Carrito</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {cart.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 12,
                  background: `${item.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  flexShrink: 0,
                }}
              >
                {item.id === "basic" ? "📘" : item.id === "pro" ? "📗" : "📙"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1f2937" }}>Paquete {item.name}</div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>
                  {item.maxItems === 999 ? "Acceso ilimitado" : `Hasta ${item.maxItems} archivos`}
                </div>
              </div>
              <div style={{ fontWeight: 800, fontSize: 20, color: "#1f2937" }}>${item.price}</div>
              <button
                onClick={() => onRemove(i)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  border: "none",
                  background: "#fef2f2",
                  color: "#dc2626",
                  fontSize: 16,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </motion.div>
          ))}
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            border: "1px solid #e5e7eb",
            position: "sticky",
            top: 84,
          }}
        >
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1f2937", marginBottom: 20 }}>Resumen</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #f3f4f6",
              fontSize: 14,
              color: "#6b7280",
            }}
          >
            <span>Subtotal</span>
            <span>${total}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #f3f4f6",
              fontSize: 14,
              color: "#6b7280",
            }}
          >
            <span>Descuento</span>
            <span style={{ color: "#10b981" }}>-$0</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "16px 0",
              fontSize: 20,
              fontWeight: 800,
              color: "#1f2937",
            }}
          >
            <span>Total</span>
            <span>${total}</span>
          </div>
          <button
            onClick={onCheckout}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(16,185,129,0.3)",
            }}
          >
            💳 Proceder al Pago
          </button>
          <p style={{ textAlign: "center", fontSize: 11, color: "#9ca3af", marginTop: 12 }}>
            Pagos seguros · Acceso inmediato · Soporte incluido
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("");
  const [currentPage, setCurrentPage] = useState("home");
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [cart, setCart] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [previewCourse, setPreviewCourse] = useState(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleLogin = (r, u) => {
    setRole(r);
    setUsername(u);
    setIsLoggedIn(true);
    setCurrentPage(r === "admin" ? "dashboard" : "home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
    setUsername("");
    setCurrentPage("home");
    setCart([]);
    setSelectedPackage(null);
  };

  const handleNavigate = (page) => {
    if (page === "packages") setSelectedPackage(null);
    setCurrentPage(page);
  };

  const handleAddCourse = (course) => {
    setCourses((prev) => [...prev, course]);
  };

  const handleDeleteCourse = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const handleTogglePreview = (id) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, preview: !c.preview } : c)));
  };

  const handleAddToCart = (pkg) => {
    if (!cart.find((c) => c.id === pkg.id)) {
      setCart((prev) => [...prev, pkg]);
    }
  };

  const handleRemoveFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setCart([]);
    }, 2000);
  };

  const handleViewLink = (course) => {
    setPreviewCourse(course);
  };

  const renderAdmin = () => {
    switch (currentPage) {
      case "dashboard":
        return <AdminDashboard courses={courses} />;
      case "manage":
        return <ManageCourses courses={courses} onDelete={handleDeleteCourse} onTogglePreview={handleTogglePreview} />;
      case "add":
        return <AddCourse onAdd={handleAddCourse} />;
      case "sales":
        return <AdminSales />;
      default:
        return <AdminDashboard courses={courses} />;
    }
  };

  const renderUser = () => {
    switch (currentPage) {
      case "home":
        return <UserHome courses={courses} onNavigate={handleNavigate} />;
      case "courses":
        return (
          <CoursesPage
            courses={courses}
            selectedPackage={selectedPackage}
            onAddToCart={handleAddToCart}
            onViewLink={handleViewLink}
          />
        );
      case "packages":
        return <PackagesPage courses={courses} onAddToCart={handleAddToCart} />;
      case "cart":
        return <CartPage cart={cart} onRemove={handleRemoveFromCart} onCheckout={handleCheckout} />;
      default:
        return <UserHome courses={courses} onNavigate={handleNavigate} />;
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Navbar
        role={role}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        cartCount={cart.length}
      />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {role === "admin" ? renderAdmin() : renderUser()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Modal isOpen={!!previewCourse} onClose={() => setPreviewCourse(null)} title="Vista Previa del Curso">
        {previewCourse && (
          <div>
            <div style={{ textAlign: "center", padding: 24, background: "#f8fafc", borderRadius: 14, marginBottom: 20 }}>
              <span style={{ fontSize: 64 }}>{previewCourse.image}</span>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              <Badge
                color={
                  previewCourse.package === "basic"
                    ? "#3b82f6"
                    : previewCourse.package === "pro"
                    ? "#8b5cf6"
                    : "#f59e0b"
                }
              >
                {previewCourse.package === "basic"
                  ? "Básico"
                  : previewCourse.package === "pro"
                  ? "Pro"
                  : "Completo"}
              </Badge>
              <span
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  background: "#f3f4f6",
                  padding: "2px 10px",
                  borderRadius: 20,
                }}
              >
                {previewCourse.category}
              </span>
            </div>
            <h4 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", marginBottom: 8 }}>
              {previewCourse.title}
            </h4>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, marginBottom: 20 }}>
              {previewCourse.description}
            </p>
            <div
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: 10,
                padding: 14,
                marginBottom: 20,
              }}
            >
              <div style={{ fontSize: 12, color: "#3b82f6", fontWeight: 600, marginBottom: 4 }}>🔗 Enlace iDrive:</div>
              <a
                href={previewCourse.link}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 13, color: "#2563eb", wordBreak: "break-all" }}
              >
                {previewCourse.link}
              </a>
            </div>
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: 10,
                padding: 14,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 20 }}>ℹ️</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>Acceso mediante paquete</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>
                  Adquiere el paquete{" "}
                  {previewCourse.package === "basic"
                    ? "Básico"
                    : previewCourse.package === "pro"
                    ? "Profesional"
                    : "Guía Completa"}{" "}
                  para acceder a este contenido
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={checkoutSuccess} onClose={() => setCheckoutSuccess(false)} title="¡Compra Exitosa!">
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            style={{ fontSize: 72, marginBottom: 16 }}
          >
            🎉
          </motion.div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: "#1f2937", marginBottom: 8 }}>
            ¡Gracias por tu compra!
          </h3>
          <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 24 }}>
            Tu acceso a los cursos y manuales ha sido activado. Revisa tu email para más detalles.
          </p>
          <button
            onClick={() => {
              setCheckoutSuccess(false);
              setCurrentPage("courses");
            }}
            style={{
              padding: "12px 32px",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            📚 Ver mis Cursos
          </button>
        </div>
      </Modal>

      <footer style={{ background: "#1e293b", color: "#94a3b8", padding: "32px 20px", marginTop: 48, textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>🚗</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
            Auto<span style={{ color: "#3b82f6" }}>Academy</span>
          </div>
          <p style={{ fontSize: 13, marginBottom: 16 }}>Plataforma líder en cursos y manuales vehiculares online</p>
          <div style={{ borderTop: "1px solid #334155", paddingTop: 16, fontSize: 12 }}>
            © 2025 AutoAcademy. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
