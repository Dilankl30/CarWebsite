import { useMemo, useState } from "react";
import "./App.css";

const PACKAGES = [
  {
    id: "basic",
    name: "Paquete Básico",
    price: 10,
    color: "#2563eb",
    description: "Ideal para iniciar con contenido esencial.",
    features: ["Hasta 5 cursos", "Guías introductorias", "Actualizaciones mensuales"],
  },
  {
    id: "pro",
    name: "Paquete Profesional",
    price: 20,
    color: "#7c3aed",
    description: "Más contenido técnico para avanzar más rápido.",
    features: ["Hasta 15 cursos", "Contenido premium", "Actualizaciones semanales"],
  },
  {
    id: "complete",
    name: "Paquete Completo",
    price: 30,
    color: "#f59e0b",
    description: "Acceso total para dominar todos los módulos.",
    features: ["Todos los cursos disponibles", "Material avanzado", "Actualizaciones frecuentes"],
  },
];

const INITIAL_COURSES = [
  { id: 1, title: "Diagnóstico Electrónico Automotriz", package: "pro", driveUrl: "https://drive.google.com/drive/folders/diagnostico-electronico" },
  { id: 2, title: "Mecánica Básica de Vehículos", package: "basic", driveUrl: "https://drive.google.com/drive/folders/mecanica-basica" },
  { id: 3, title: "Manual Completo - Honda Civic 2024", package: "complete", driveUrl: "https://drive.google.com/drive/folders/honda-civic-2024" },
];

function App() {
  const [mode, setMode] = useState("public"); // public | user | admin
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [purchasedPackage, setPurchasedPackage] = useState(null);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [newTitle, setNewTitle] = useState("");
  const [newPackage, setNewPackage] = useState("basic");
  const [newUrl, setNewUrl] = useState("");

  const packageById = useMemo(
    () => Object.fromEntries(PACKAGES.map((pkg) => [pkg.id, pkg])),
    []
  );

  const canAccessCourse = (coursePkg) => {
    if (!purchasedPackage) return false;
    if (purchasedPackage === "complete") return true;
    if (purchasedPackage === "pro") return coursePkg === "basic" || coursePkg === "pro";
    return coursePkg === "basic";
  };

  const handlePurchase = () => {
    if (!selectedPackage) return;
    setPurchasedPackage(selectedPackage);
    alert(`Compra simulada completada: ${packageById[selectedPackage].name}`);
  };

  const addCourse = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;
    setCourses((prev) => [
      ...prev,
      { id: Date.now(), title: newTitle.trim(), package: newPackage, driveUrl: newUrl.trim() },
    ]);
    setNewTitle("");
    setNewUrl("");
  };

  return (
    <div className="landing">
      <header className="hero">
        <p className="tag">AutoAcademy · Catálogo</p>
        <h1>Vista pública + acceso admin y compra de paquetes</h1>
        <p>
          Modo público: solo visualización. Modo usuario: puede seleccionar y comprar paquete.
          Modo admin: gestiona cursos.
        </p>

        <div className="mode-switch">
          <button onClick={() => setMode("public")} className={mode === "public" ? "active" : ""}>Visitante</button>
          <button onClick={() => setMode("user")} className={mode === "user" ? "active" : ""}>Usuario</button>
          <button onClick={() => setMode("admin")} className={mode === "admin" ? "active" : ""}>Administrador</button>
        </div>
      </header>

      <section className="packages">
        {PACKAGES.map((pkg) => (
          <article key={pkg.id} className="card" style={{ borderTopColor: pkg.color }}>
            <h2>{pkg.name}</h2>
            <p className="price">USD ${pkg.price}</p>
            <p>{pkg.description}</p>
            <ul>{pkg.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            {mode === "user" ? (
              <button onClick={() => setSelectedPackage(pkg.id)} className="action-btn">
                Seleccionar paquete
              </button>
            ) : (
              <span className="badge" style={{ background: pkg.color }}>Solo información</span>
            )}
          </article>
        ))}
      </section>

      {mode === "user" && (
        <section className="catalog">
          <h3>Compra de paquete</h3>
          <p>Paquete seleccionado: {selectedPackage ? packageById[selectedPackage].name : "Ninguno"}</p>
          <button className="action-btn" disabled={!selectedPackage} onClick={handlePurchase}>
            Comprar (simulación)
          </button>
          <p className="muted">Activo: {purchasedPackage ? packageById[purchasedPackage].name : "Sin paquete"}</p>
        </section>
      )}

      {mode === "admin" && (
        <section className="catalog">
          <h3>Panel administrador - Gestionar cursos</h3>
          <form className="admin-form" onSubmit={addCourse}>
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Título del curso" />
            <select value={newPackage} onChange={(e) => setNewPackage(e.target.value)}>
              {PACKAGES.map((pkg) => <option key={pkg.id} value={pkg.id}>{pkg.name}</option>)}
            </select>
            <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="URL de Drive" />
            <button className="action-btn" type="submit">Agregar curso</button>
          </form>
        </section>
      )}

      <section className="catalog">
        <h3>Cursos disponibles</h3>
        <p>Visitante: bloqueado. Usuario con paquete: acceso según nivel. Admin: visualización completa.</p>
        <div className="course-grid">
          {courses.map((course) => {
            const allowed = mode === "admin" || (mode === "user" && canAccessCourse(course.package));
            return (
              <article key={course.id} className="course-item">
                <div>
                  <strong>{course.title}</strong>
                  <small>Incluido en: {packageById[course.package]?.name}</small>
                </div>
                {allowed ? (
                  <a href={course.driveUrl} target="_blank" rel="noreferrer" className="action-btn">Abrir Drive</a>
                ) : (
                  <button type="button" disabled>🔒 Acceso bloqueado</button>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
