const roles = [
  { key: 'usuario', label: 'Vista Usuario' },
  { key: 'admin', label: 'Vista Administrador' },
];

export function RoleSwitcher({ role, onChange }) {
  return (
    <section className="panel">
      <h2>Selecciona un rol</h2>
      <div className="inline-buttons">
        {roles.map((item) => (
          <button
            key={item.key}
            className={role === item.key ? 'button button-active' : 'button'}
            onClick={() => onChange(item.key)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}
