const packages = [
  {
    id: 'basico',
    name: 'Paquete $10',
    price: 10,
    description: 'Acceso limitado a pocos archivos de vista previa.',
  },
  {
    id: 'intermedio',
    name: 'Paquete $20',
    price: 20,
    description: 'Acceso intermedio con más contenido disponible.',
  },
  {
    id: 'completo',
    name: 'Paquete $30',
    price: 30,
    description: 'Guía completa con acceso total a todo.',
  },
];

const priority = { basico: 1, intermedio: 2, completo: 3 };

export function UserCatalog({ courses, selectedPackage, onPackageChange }) {
  const visibleCourses = courses.filter(
    (course) => priority[course.packageLevel] <= priority[selectedPackage]
  );

  return (
    <section className="panel">
      <h2>Catálogo de Usuario</h2>
      <p>Selecciona tu paquete para ver la vista previa de recursos disponibles.</p>

      <div className="card-row">
        {packages.map((pack) => (
          <article className="card" key={pack.id}>
            <h3>{pack.name}</h3>
            <p>{pack.description}</p>
            <button
              className={selectedPackage === pack.id ? 'button button-active' : 'button'}
              type="button"
              onClick={() => onPackageChange(pack.id)}
            >
              Ver como {pack.name}
            </button>
          </article>
        ))}
      </div>

      <ul className="catalog-list">
        {visibleCourses.map((course) => (
          <li key={course.id} className="catalog-item">
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <p><strong>Precio:</strong> ${course.price}</p>
            <a href={course.link} target="_blank" rel="noreferrer">
              Abrir enlace
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
