import { useMemo, useState } from "react";
import "./App.css";

const PACKAGES = [
  { id: "basic", name: "Básico", price: 10, color: "#0b7a3b", perks: ["5 cursos", "Soporte email", "Acceso básico"] },
  { id: "pro", name: "Profesional", price: 20, color: "#0f4c81", perks: ["15 cursos", "Soporte prioritario", "Nuevos contenidos"] },
  { id: "complete", name: "Completo", price: 30, color: "#cf8a14", perks: ["Cursos ilimitados", "Soporte total", "Actualizaciones premium"] },
];

const INITIAL_COURSES = [
  { id: 1, title: "Inyección directa Jetronic", category: "Electrónica", package: "pro", driveUrl: "https://drive.google.com/drive/folders/jetronic" },
  { id: 2, title: "Mecánica básica automotriz", category: "Mecánica", package: "basic", driveUrl: "https://drive.google.com/drive/folders/mecanica" },
  { id: 3, title: "Sistemas ABS y control de frenado", category: "Frenos", package: "pro", driveUrl: "https://drive.google.com/drive/folders/abs" },
  { id: 4, title: "Manual completo de diagnosis", category: "Diagnóstico", package: "complete", driveUrl: "https://drive.google.com/drive/folders/diagnosis" },
  { id: 5, title: "Electricidad avanzada por marcas", category: "Electricidad", package: "complete", driveUrl: "https://drive.google.com/drive/folders/electricidad-avanzada" },
];

export default function App() {
  const [view, setView] = useState("home");
  const [role, setRole] = useState("public");
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [activePkg, setActivePkg] = useState(null);
  const [cart, setCart] = useState([]);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [auth, setAuth] = useState({ name: "", email: "", password: "" });
  const [adminForm, setAdminForm] = useState({ title: "", category: "", package: "basic", driveUrl: "" });

  const packageById = useMemo(() => Object.fromEntries(PACKAGES.map((p) => [p.id, p])), []);

  const canOpenCourse = (pkgId) => {
    if (role === "admin") return true;
    if (!activePkg) return false;
    if (activePkg === "complete") return true;
    if (activePkg === "pro") return pkgId === "basic" || pkgId === "pro";
    return pkgId === "basic";
  };

  const buyPackage = () => {
    if (!selectedPkg) return;
    setActivePkg(selectedPkg);
    if (!cart.some((item) => item.type === "package")) {
      setCart((prev) => [...prev, { id: selectedPkg, type: "package", label: packageById[selectedPkg].name, price: packageById[selectedPkg].price }]);
    }
    setView("checkout");
  };

  const addCourse = (e) => {
    e.preventDefault();
    if (!adminForm.title || !adminForm.category || !adminForm.driveUrl) return;
    setCourses((prev) => [...prev, { id: Date.now(), ...adminForm }]);
    setAdminForm({ title: "", category: "", package: "basic", driveUrl: "" });
  };

  return (
    <div className="site">
      <header>
        <div className="topbar">
          <div>📞 800.426.6867</div><div>Contáctanos</div><div>Ventas</div><div>Apoyo</div>
        </div>
        <div className="mainnav">
          <div className="logo">AUTO<span>MOTOR</span></div>
          <nav>
            <button onClick={() => setView("home")}>Inicio</button>
            <button onClick={() => setView("catalog")}>Cursos</button>
            <button onClick={() => setView("packages")}>Paquetes</button>
            <button onClick={() => setView("checkout")}>Mi compra ({cart.length})</button>
          </nav>
          <div className="role-switch">
            <button onClick={() => setRole("public")} className={role === "public" ? "active" : ""}>Visitante</button>
            <button onClick={() => setRole("user")} className={role === "user" ? "active" : ""}>Usuario</button>
            <button onClick={() => setRole("admin")} className={role === "admin" ? "active" : ""}>Admin</button>
          </div>
        </div>
      </header>

      {view === "home" && (
        <section className="hero">
          <div>
            <p className="eyebrow">MECÁNICA AUTOMOTRIZ · FORMACIÓN PROFESIONAL</p>
            <h1>Manuales y cursos automotrices con diseño profesional</h1>
            <p>Los visitantes pueden visualizar todo el catálogo, pero los enlaces Drive solo se habilitan al registrarse y comprar un paquete.</p>
            <div className="actions">
              <button onClick={() => setView("packages")}>Comprar ahora</button>
              <button className="ghost" onClick={() => setView("catalog")}>Ver catálogo</button>
            </div>
          </div>
          <div className="hero-card">
            <h3>Acceso rápido</h3>
            <p>Paquete activo: <b>{activePkg ? packageById[activePkg].name : "Ninguno"}</b></p>
            <p>Rol actual: <b>{role === "public" ? "Visitante" : role === "user" ? "Usuario" : "Administrador"}</b></p>
          </div>
        </section>
      )}

      {view === "packages" && (
        <section className="panel">
          <h2>Selecciona uno de los 3 paquetes</h2>
          <div className="grid3">
            {PACKAGES.map((pkg) => (
              <article key={pkg.id} className="pkg" style={{ borderTopColor: pkg.color }}>
                <h3>{pkg.name}</h3><p className="price">USD ${pkg.price}</p>
                <ul>{pkg.perks.map((p) => <li key={p}>{p}</li>)}</ul>
                {role === "user" ? (
                  <button onClick={() => setSelectedPkg(pkg.id)} className={selectedPkg === pkg.id ? "selected" : ""}>Elegir</button>
                ) : <small>Regístrate como usuario para comprar.</small>}
              </article>
            ))}
          </div>
          {role === "user" && <button className="buy" onClick={buyPackage} disabled={!selectedPkg}>Continuar compra</button>}
        </section>
      )}

      {view === "catalog" && (
        <section className="panel">
          <h2>Catálogo de cursos</h2>
          <div className="courseGrid">
            {courses.map((course) => (
              <article key={course.id} className="courseCard">
                <h4>{course.title}</h4>
                <p>{course.category} · Incluido en: {packageById[course.package]?.name}</p>
                {canOpenCourse(course.package) ? (
                  <a href={course.driveUrl} target="_blank" rel="noreferrer">Abrir Drive</a>
                ) : (
                  <button disabled>🔒 Bloqueado hasta compra</button>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {view === "checkout" && (
        <section className="panel checkout">
          <h2>Checkout</h2>
          <div className="steps">
            {[1,2,3].map((s) => <button key={s} className={checkoutStep === s ? "active" : ""} onClick={() => setCheckoutStep(s)}>Paso {s}</button>)}
          </div>
          {checkoutStep === 1 && (
            <div className="formBox">
              <h3>Identificación</h3>
              <input placeholder="Nombre" value={auth.name} onChange={(e)=>setAuth({...auth, name:e.target.value})}/>
              <input placeholder="Email" value={auth.email} onChange={(e)=>setAuth({...auth, email:e.target.value})}/>
              <input placeholder="Contraseña" type="password" value={auth.password} onChange={(e)=>setAuth({...auth, password:e.target.value})}/>
            </div>
          )}
          {checkoutStep === 2 && <div className="formBox"><h3>Datos de envío</h3><input placeholder="Dirección"/><input placeholder="Ciudad"/><input placeholder="Código postal"/></div>}
          {checkoutStep === 3 && <div className="formBox"><h3>Confirmación</h3><p>Total: USD ${cart.reduce((a,b)=>a+b.price,0)}</p><button onClick={()=>alert("Compra completada (demo)")}>Finalizar</button></div>}
        </section>
      )}

      {role === "admin" && (
        <section className="panel">
          <h2>Panel administrador · Gestionar cursos</h2>
          <form className="admin" onSubmit={addCourse}>
            <input placeholder="Título" value={adminForm.title} onChange={(e)=>setAdminForm({...adminForm,title:e.target.value})}/>
            <input placeholder="Categoría" value={adminForm.category} onChange={(e)=>setAdminForm({...adminForm,category:e.target.value})}/>
            <select value={adminForm.package} onChange={(e)=>setAdminForm({...adminForm,package:e.target.value})}>{PACKAGES.map((p)=><option value={p.id} key={p.id}>{p.name}</option>)}</select>
            <input placeholder="URL Drive" value={adminForm.driveUrl} onChange={(e)=>setAdminForm({...adminForm,driveUrl:e.target.value})}/>
            <button type="submit">Agregar curso</button>
          </form>
        </section>
      )}

      <footer className="footer">
        <div><h4>Contacto</h4><p>655478302 · 915548195</p><p>libromotor@infonogocio.com</p></div>
        <div><h4>Páginas legales</h4><p>Aviso legal · Condiciones · Cookies</p></div>
        <div><h4>Atención al cliente</h4><p>Quiénes somos · Pedidos especiales</p></div>
      </footer>
    </div>
  );
}
