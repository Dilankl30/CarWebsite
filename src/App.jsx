import { useState } from 'react';
import { seedCourses } from './data/seedCourses';
import { RoleSwitcher } from './components/RoleSwitcher';
import { AdminPanel } from './components/AdminPanel';
import { UserCatalog } from './components/UserCatalog';

export default function App() {
  const [role, setRole] = useState('usuario');
  const [selectedPackage, setSelectedPackage] = useState('basico');
  const [courses, setCourses] = useState(seedCourses);

  const createCourse = (course) => {
    setCourses((prev) => [
      {
        id: crypto.randomUUID(),
        ...course,
      },
      ...prev,
    ]);
  };

  return (
    <main className="container">
      <header>
        <h1>Plataforma de Cursos y Manuales de Vehículos</h1>
        <p>Roles iniciales: Administrador (gestión de enlaces) y Usuario (vista previa por paquete).</p>
      </header>

      <RoleSwitcher role={role} onChange={setRole} />

      {role === 'admin' ? (
        <AdminPanel onCreateCourse={createCourse} />
      ) : (
        <UserCatalog
          courses={courses}
          selectedPackage={selectedPackage}
          onPackageChange={setSelectedPackage}
        />
      )}
    </main>
  );
}
