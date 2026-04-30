import { useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "./firebase";
import "./App.css";

const PACKAGES = [
  { id: "basic", name: "Básico", price: 10, sales: 52, description: "Ideal para iniciar en diagnóstico automotriz.", includes: ["5 cursos esenciales", "Guías PDF base", "1 clase en vivo/mes"] },
  { id: "pro", name: "Profesional", price: 20, sales: 78, description: "Profundiza en electrónica y reparación avanzada.", includes: ["15 cursos", "Casos reales de taller", "Soporte prioritario"] },
  { id: "complete", name: "Completo", price: 30, sales: 35, description: "Ruta total para dominar el área automotriz.", includes: ["Todo el catálogo", "Nuevos lanzamientos", "Mentoría mensual"] },
];

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
  const [authMessage, setAuthMessage] = useState("");
  const [expanded, setExpanded] = useState([1]);

  const packageById = useMemo(() => Object.fromEntries(PACKAGES.map((p) => [p.id, p])), []);
  const featured = useMemo(() => [...PACKAGES].sort((a,b)=>b.sales-a.sales).slice(0,2), []);

  const toggleSection = (id) => setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const filteredCatalog = CATALOG.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()));

  const canOpenCourse = (pkg) => {
    if (role === "admin") return true;
    if (!activePkg) return false;
    if (activePkg === "complete") return true;
    if (activePkg === "pro") return pkg !== "complete";
    return pkg === "basic";
  };

  return (
    <div className="appShell">
      <div className="promo">¡Queda 1 día! Añade habilidades por solo 9,99 US$ hasta el 1 de mayo.</div>
      <header className="topNav">
        <div className="brand" onClick={() => setView("home")}>AutoAcademy</div>
        <button onClick={() => setView("home")}>Inicio</button>
        <button onClick={() => setView("catalog")}>Explorar</button>
        <button onClick={() => setView("resources")}>Recursos</button>
        <div className="searchBox"><input placeholder="Buscar cursos" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
        <button className="outline" onClick={() => { setAuthMode("login"); setAuthOpen(true); }}>Iniciar sesión</button>
        <button className="fill" onClick={() => { setAuthMode("register"); setAuthOpen(true); }}>Regístrate</button>
      </header>

      {view === "home" && (
        <>
          <section className="hero">
            <div>
              <p className="crumb">Negocios &gt; Industria &gt; Ingeniería eléctrica</p>
              <h1>Motores Eléctricos - Diagnóstico y Reparación</h1>
              <p>Seleccionar, operar y analizar motores eléctricos con enfoque automotriz.</p>
              <p className="meta">⭐ 4.8 · 1287 estudiantes · Actualizado 04/2026 · Español</p>
              <div className="ctaRow">
                <button className="fill" onClick={() => setView("packages")}>Ver paquetes</button>
                <button className="outline" onClick={() => setView("catalog")}>Ver catálogo</button>
              </div>
            </div>
            <aside className="priceCard">
              <h3>Acceso por suscripción</h3>
              <p className="big">Desde 10,00 US$ / mes</p>
              <p>Paquete activo: <b>{activePkg ? packageById[activePkg].name : "Ninguno"}</b></p>
              <button className="fill" onClick={() => setView("packages")}>Comprar ahora</button>
            </aside>
          </section>

          <section className="section">
            <h2>Paquetes más comprados</h2>
            <div className="packages">
              {featured.map((p) => (
                <article key={p.id} className="pkg featured">
                  <small className="tag">Top ventas · {p.sales} compras</small>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <p className="big">US$ {p.price}</p>
                  <ul>{p.includes.map((i) => <li key={i}>{i}</li>)}</ul>
                </article>
              ))}
            </div>
          </section>

          <section className="section">
            <h2>Índice del curso (visible en Inicio)</h2>
            <p>{CURRICULUM.length} secciones · {CURRICULUM.reduce((a, s) => a + s.lessons, 0)} clases · {CURRICULUM.reduce((a, s) => a + s.min, 0)} min total</p>
            <div className="accordion">
              {CURRICULUM.map((s) => (
                <div key={s.id} className="accItem">
                  <button className="accHeader" onClick={() => toggleSection(s.id)}><span>{s.title}</span><span>{s.lessons} clases · {s.min} min</span></button>
                  {expanded.includes(s.id) && <div className="accBody"><div>Lección principal</div><div>{s.preview ? <a href="#">Vista previa</a> : "Incluida con compra"}</div></div>}
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {view === "packages" && (
        <section className="section">
          <h2>Elige tu paquete</h2>
          <div className="packages">
            {PACKAGES.map((p) => (
              <article key={p.id} className={`pkg ${selectedPkg === p.id ? "selected" : ""}`}>
                <h3>{p.name}</h3><p>{p.description}</p><p className="big">US$ {p.price}</p>
                <ul>{p.includes.map((i) => <li key={i}>{i}</li>)}</ul>
                <button onClick={() => setSelectedPkg(p.id)} className="outline">Seleccionar</button>
              </article>
            ))}
          </div>
          <button className="fill" onClick={() => { setActivePkg(selectedPkg); setView("catalog"); }}>Confirmar compra (demo)</button>
        </section>
      )}

      {view === "catalog" && <section className="section"><h2>Catálogo de cursos</h2><div className="catalogGrid">{filteredCatalog.map((c)=><article key={c.id} className="courseCard"><h3>{c.title}</h3><p>{c.category} · Paquete {packageById[c.package].name}</p>{canOpenCourse(c.package)?<a href={c.driveUrl} target="_blank" rel="noreferrer">Abrir contenido</a>:<button disabled>🔒 Compra para acceder</button>}</article>)}</div></section>}
      {view === "resources" && <section className="section"><h2>Recursos</h2><p>Zona de recursos y novedades.</p></section>}

      {authOpen && (
        <div className="modalBack" onClick={() => setAuthOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{authMode === "login" ? "Iniciar sesión" : "Crear cuenta"}</h3>
            {!isFirebaseConfigured && <p className="warn">Configura variables VITE_FIREBASE_* para activar autenticación real.</p>}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!isFirebaseConfigured || !auth) {
                  setAuthMessage("Firebase no está configurado en este entorno.");
                  return;
                }
                try {
                  if (authMode === "register") {
                    const userCredential = await createUserWithEmailAndPassword(auth, authForm.email, authForm.password);
                    await sendEmailVerification(userCredential.user);
                    setAuthMessage("Registro exitoso. Revisa tu correo para confirmar tu cuenta.");
                  } else {
                    await signInWithEmailAndPassword(auth, authForm.email, authForm.password);
                    setAuthMessage("Sesión iniciada correctamente.");
                    setRole("user");
                    setAuthOpen(false);
                  }
                } catch (error) {
                  setAuthMessage(error.message);
                }
              }}
              className="authForm"
            >
              {authMode === "register" && (
                <input
                  placeholder="Nombre"
                  value={authForm.name}
                  onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                />
              )}
              <input
                placeholder="Correo"
                value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              />
              <input
                placeholder="Contraseña"
                type="password"
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              />
              <button className="fill" type="submit">
                {authMode === "login" ? "Entrar" : "Registrarme"}
              </button>
            </form>
            <button
              className="outline googleBtn"
              onClick={async () => {
                if (!isFirebaseConfigured || !auth || !googleProvider) {
                  setAuthMessage("Firebase no está configurado en este entorno.");
                  return;
                }
                try {
                  await signInWithPopup(auth, googleProvider);
                  setRole("user");
                  setAuthMessage("Sesión con Google iniciada.");
                  setAuthOpen(false);
                } catch (error) {
                  setAuthMessage(error.message);
                }
              }}
            >
              Continuar con Google
            </button>
            {!!authMessage && <p className="authMsg">{authMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
