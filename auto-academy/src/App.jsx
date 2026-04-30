import { useMemo, useState } from "react";
import "./App.css";

const PACKAGES = [
  { id: "basic", name: "Básico", price: 10 },
  { id: "pro", name: "Profesional", price: 20 },
  { id: "complete", name: "Completo", price: 30 },
];

const COURSE = {
  title: "Motores Eléctricos - Diagnóstico y Reparación",
  subtitle: "Seleccionar, operar y analizar motores eléctricos con enfoque automotriz.",
  rating: 4.8,
  students: 1287,
  updated: "04/2026",
  language: "Español",
  learn: [
    "Principio de funcionamiento del motor eléctrico",
    "Partes y pruebas clave con multímetro y osciloscopio",
    "Diagnóstico de fallas frecuentes en talleres",
    "Conexiones, par-velocidad y deslizamiento",
  ],
};

const CURRICULUM = [
  { id: 1, title: "Bienvenida", lessons: 1, min: 1, preview: true },
  { id: 2, title: "Introducción - Principio de funcionamiento", lessons: 1, min: 5 },
  { id: 3, title: "Partes del motor eléctrico", lessons: 1, min: 9 },
  { id: 4, title: "Campo magnético giratorio", lessons: 1, min: 7 },
  { id: 5, title: "Velocidad sincrónica y deslizamiento", lessons: 2, min: 12 },
];

const CATALOG = [
  { id: 1, title: "Inyección directa Jetronic", category: "Electrónica", package: "pro", driveUrl: "https://drive.google.com/drive/folders/jetronic" },
  { id: 2, title: "Mecánica básica automotriz", category: "Mecánica", package: "basic", driveUrl: "https://drive.google.com/drive/folders/mecanica" },
  { id: 3, title: "Diagnóstico avanzado por marcas", category: "Diagnóstico", package: "complete", driveUrl: "https://drive.google.com/drive/folders/diagnosis" },
];

export default function App() {
  const [view, setView] = useState("home");
  const [role, setRole] = useState("public");
  const [activePkg, setActivePkg] = useState(null);
  const [selectedPkg, setSelectedPkg] = useState("basic");
  const [query, setQuery] = useState("");
  const [authMode, setAuthMode] = useState("login");
  const [authOpen, setAuthOpen] = useState(false);
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [expanded, setExpanded] = useState([1]);

  const packageById = useMemo(() => Object.fromEntries(PACKAGES.map((p) => [p.id, p])), []);

  const toggleSection = (id) => {
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const filteredCatalog = CATALOG.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()));

  const canOpenCourse = (pkg) => {
    if (role === "admin") return true;
    if (!activePkg) return false;
    if (activePkg === "complete") return true;
    if (activePkg === "pro") return pkg !== "complete";
    return pkg === "basic";
  };

  const submitAuth = (e) => {
    e.preventDefault();
    setRole("user");
    setAuthOpen(false);
  };

  const handleBuy = () => {
    setActivePkg(selectedPkg);
    setView("catalog");
  };

  return (
    <div className="appShell">
      <div className="promo">¡Queda 1 día! Añade habilidades por solo 9,99 US$ hasta el 1 de mayo.</div>
      <header className="topNav">
        <div className="brand" onClick={() => setView("home")}>AutoAcademy</div>
        <button onClick={() => setView("home")}>Inicio</button>
        <button onClick={() => setView("catalog")}>Explorar</button>
        <button onClick={() => setView("course")}>Curso Automotriz</button>
        <button onClick={() => setView("resources")}>Recursos</button>
        <div className="searchBox">
          <input placeholder="Buscar cursos" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <button className="outline" onClick={() => { setAuthMode("login"); setAuthOpen(true); }}>Iniciar sesión</button>
        <button className="fill" onClick={() => { setAuthMode("register"); setAuthOpen(true); }}>Regístrate</button>
      </header>

      {view === "home" && (
        <section className="hero">
          <div>
            <p className="crumb">Negocios &gt; Industria &gt; Ingeniería eléctrica</p>
            <h1>{COURSE.title}</h1>
            <p>{COURSE.subtitle}</p>
            <p className="meta">⭐ {COURSE.rating} · {COURSE.students} estudiantes · Actualizado {COURSE.updated} · {COURSE.language}</p>
            <div className="ctaRow">
              <button className="fill" onClick={() => setView("packages")}>Ver paquetes</button>
              <button className="outline" onClick={() => setView("course")}>Ver índice del curso</button>
            </div>
          </div>
          <aside className="priceCard">
            <h3>Acceso por suscripción</h3>
            <p className="big">Desde 10,00 US$ / mes</p>
            <p>Paquete activo: <b>{activePkg ? packageById[activePkg].name : "Ninguno"}</b></p>
            <button className="fill" onClick={() => setView("packages")}>Comprar ahora</button>
          </aside>
        </section>
      )}

      {view === "course" && (
        <section className="section">
          <h2>Contenido del curso</h2>
          <p>{CURRICULUM.length} secciones · {CURRICULUM.reduce((a, s) => a + s.lessons, 0)} clases · {CURRICULUM.reduce((a, s) => a + s.min, 0)} min total</p>
          <div className="accordion">
            {CURRICULUM.map((s) => (
              <div key={s.id} className="accItem">
                <button className="accHeader" onClick={() => toggleSection(s.id)}>
                  <span>{s.title}</span>
                  <span>{s.lessons} clases · {s.min} min</span>
                </button>
                {expanded.includes(s.id) && (
                  <div className="accBody">
                    <div>Lección principal</div>
                    <div>{s.preview ? <a href="#">Vista previa</a> : "Incluida con compra"}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {view === "packages" && (
        <section className="section">
          <h2>Elige tu paquete</h2>
          <div className="packages">
            {PACKAGES.map((p) => (
              <article key={p.id} className={`pkg ${selectedPkg === p.id ? "selected" : ""}`}>
                <h3>{p.name}</h3>
                <p className="big">US$ {p.price}</p>
                <button onClick={() => setSelectedPkg(p.id)} className="outline">Seleccionar</button>
              </article>
            ))}
          </div>
          <button className="fill" onClick={handleBuy}>Confirmar compra (demo)</button>
        </section>
      )}

      {view === "catalog" && (
        <section className="section">
          <h2>Catálogo de cursos</h2>
          <div className="catalogGrid">
            {filteredCatalog.map((c) => (
              <article key={c.id} className="courseCard">
                <h3>{c.title}</h3>
                <p>{c.category} · Paquete {packageById[c.package].name}</p>
                {canOpenCourse(c.package) ? <a href={c.driveUrl} target="_blank" rel="noreferrer">Abrir contenido</a> : <button disabled>🔒 Compra para acceder</button>}
              </article>
            ))}
          </div>
        </section>
      )}

      {view === "resources" && (
        <section className="section">
          <h2>Recursos</h2>
          <p>Zona de recursos, noticias y eventos próximos. Aquí luego cargamos contenido real.</p>
        </section>
      )}

      {authOpen && (
        <div className="modalBack" onClick={() => setAuthOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{authMode === "login" ? "Iniciar sesión" : "Crear cuenta"}</h3>
            <form onSubmit={submitAuth} className="authForm">
              {authMode === "register" && <input placeholder="Nombre" value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} />}
              <input placeholder="Correo" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} />
              <input placeholder="Contraseña" type="password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} />
              <button className="fill" type="submit">{authMode === "login" ? "Entrar" : "Registrarme"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
