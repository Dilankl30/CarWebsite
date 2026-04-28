export const seedCourses = [
  {
    id: crypto.randomUUID(),
    title: 'Manual básico de diagnóstico automotriz',
    price: 10,
    description: 'Introducción rápida a herramientas y lectura de fallas.',
    link: 'https://idrive.example.com/manual-basico',
    packageLevel: 'basico',
  },
  {
    id: crypto.randomUUID(),
    title: 'Guía intermedia de reparación de motores',
    price: 20,
    description: 'Procedimientos prácticos para mantenimiento preventivo.',
    link: 'https://idrive.example.com/guia-intermedia',
    packageLevel: 'intermedio',
  },
  {
    id: crypto.randomUUID(),
    title: 'Biblioteca completa de manuales y cursos',
    price: 30,
    description: 'Acceso total a todo el material disponible.',
    link: 'https://idrive.example.com/guia-completa',
    packageLevel: 'completo',
  },
];
