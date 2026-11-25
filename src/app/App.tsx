export function App() {
  return (
    <main className="tosabus-layout">
      <section className="tosabus-tarjeta" aria-labelledby="titulo-panel">
        <div className="tosabus-tarjeta-contenido">
          <span className="tosabus-detalle-dorado" aria-hidden="true" />
          <h1 className="tosabus-titulo" id="titulo-panel">
            Panel de administración de TosaBus
          </h1>
          <p className="tosabus-texto-secundario">
            Demostración del tema visual: colores, tipografía Inter y espaciado.
            Las pantallas de administración se implementarán en tareas
            posteriores.
          </p>
          <div>
            <button className="tosabus-boton-principal" type="button">
              Continuar
            </button>
          </div>
          <p className="tosabus-insignia-exito" role="status">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8.5 6.5 12 13 4.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Éxito: tema visual aplicado
          </p>
        </div>
      </section>
    </main>
  );
}
