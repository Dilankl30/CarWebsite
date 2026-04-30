import "./App.css";

const PACKAGES = [
  {
    id: "basic",
    name: "Paquete Básico",
    price: 10,
    color: "#2563eb",
    description: "Ideal para iniciar con contenido esencial.",
    features: [
      "Hasta 5 cursos",
      "Guías introductorias",
      "Actualizaciones mensuales",
    ],
    accessLevel: "Vista previa limitada",
  },
  {
    id: "pro",
    name: "Paquete Profesional",
    price: 20,
    color: "#7c3aed",
    description: "Más contenido técnico para avanzar más rápido.",
    features: [
      "Hasta 15 cursos",
      "Contenido premium",
      "Actualizaciones semanales",
    ],
    accessLevel: "Vista previa intermedia",
  },
  {
    id: "complete",
    name: "Paquete Completo",
    price: 30,
    color: "#f59e0b",
    description: "Acceso total para dominar todos los módulos.",
    features: [
      "Todos los cursos disponibles",
      "Material avanzado y exclusivo",
      "Actualizaciones frecuentes",
    ],
    accessLevel: "Vista previa completa",
  },
];

const COURSES = [
  {
    id: 1,
    title: "Diagnóstico Electrónico Automotriz",
    package: "pro",
    driveUrl: "https://drive.google.com/drive/folders/diagnostico-electronico",
  },
  {
    id: 2,
    title: "Mecánica Básica de Vehículos",
    package: "basic",
    driveUrl: "https://drive.google.com/drive/folders/mecanica-basica",
  },
  {
    id: 3,
    title: "Manual Completo - Honda Civic 2024",
    package: "complete",
    driveUrl: "https://drive.google.com/drive/folders/honda-civic-2024",
  },
  {
    id: 4,
    title: "Sistemas de Frenos ABS",
    package: "pro",
    driveUrl: "https://drive.google.com/drive/folders/frenos-abs",
  },
  {
    id: 5,
    title: "Electricidad y Electrónica Vehicular",
    package: "complete",
    driveUrl: "https://drive.google.com/drive/folders/electricidad-vehicular",
  },
];

function App() {
  return (
    <div className="landing">
      <header className="hero">
        <p className="tag">AutoAcademy · Catálogo público</p>
        <h1>Explora todo lo que ofrecemos sin registrarte</h1>
        <p>
          Los visitantes pueden visualizar la información general de los cursos y paquetes. Para abrir
          enlaces de Drive y acceder al material, deben registrarse y adquirir uno de los 3 paquetes.
        </p>
      </header>

      <section className="packages">
        {PACKAGES.map((pkg) => (
          <article key={pkg.id} className="card" style={{ borderTopColor: pkg.color }}>
            <h2>{pkg.name}</h2>
            <p className="price">USD ${pkg.price}</p>
            <p>{pkg.description}</p>
            <ul>
              {pkg.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <span className="badge" style={{ background: pkg.color }}>
              {pkg.accessLevel}
            </span>
          </article>
        ))}
      </section>

      <section className="catalog">
        <h3>Cursos disponibles (solo vista informativa)</h3>
        <p>Los enlaces de Google Drive están protegidos hasta que el usuario tenga un paquete activo.</p>
        <div className="course-grid">
          {COURSES.map((course) => (
            <article key={course.id} className="course-item">
              <div>
                <strong>{course.title}</strong>
                <small>Incluido en: {PACKAGES.find((pkg) => pkg.id === course.package)?.name}</small>
              </div>
              <button type="button" aria-label={`Acceso bloqueado para ${course.title}`}>
                🔒 Acceso al Drive bloqueado
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
