import { useState } from 'react';

const initialForm = {
  title: '',
  description: '',
  price: 10,
  packageLevel: 'basico',
  link: '',
};

export function AdminPanel({ onCreateCourse }) {
  const [form, setForm] = useState(initialForm);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.link.trim()) {
      return;
    }

    onCreateCourse({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      link: form.link.trim(),
      price: Number(form.price),
    });

    setForm(initialForm);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="panel">
      <h2>Panel de Administrador</h2>
      <p>Aquí puedes agregar nuevos cursos/libros con enlace de redirección (iDrive).</p>
      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Título
          <input name="title" value={form.title} onChange={onChange} required />
        </label>

        <label>
          Descripción
          <textarea name="description" value={form.description} onChange={onChange} rows={3} />
        </label>

        <label>
          Precio (USD)
          <select name="price" value={form.price} onChange={onChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </label>

        <label>
          Nivel de paquete
          <select name="packageLevel" value={form.packageLevel} onChange={onChange}>
            <option value="basico">Básico</option>
            <option value="intermedio">Intermedio</option>
            <option value="completo">Completo</option>
          </select>
        </label>

        <label>
          Enlace iDrive
          <input name="link" type="url" value={form.link} onChange={onChange} required />
        </label>

        <button type="submit" className="button button-active">
          Guardar recurso
        </button>
      </form>
    </section>
  );
}
