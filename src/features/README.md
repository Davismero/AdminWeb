# Funcionalidades (`src/features`)

Cada funcionalidad del panel vive en su propia carpeta, con los componentes,
hooks y tipos que le son exclusivos. El nombre de la carpeta usa el lenguaje del
dominio del DERCAS en español, por ejemplo: `rutas`, `paradas`, `flota`,
`conductores`, `viajes`, `reservas`, `boletos`, `pagos`, `reportes`.

## Convención

```text
src/features/<funcionalidad>/
├── components/   # Componentes visuales de esa funcionalidad
├── hooks/        # Hooks de React exclusivos de la funcionalidad
├── types.ts      # Tipos del dominio compartidos dentro de la funcionalidad
└── <Funcionalidad>Page.tsx
```

- Una funcionalidad no importa archivos internos de otra funcionalidad. Si dos
  funcionalidades necesitan lo mismo, el elemento se sube a `src/shared/`.
- Los datos (rutas, horarios, tarifas, asientos) se obtienen desde la API a
  través de `src/services/api.ts`. Nunca se escriben en el código.
- Los textos que ve el usuario van en español.
- Las pantallas de administración llegan a partir de T-08; en T-01 solo se crea
  esta convención de carpetas.

## Notas para T-01

Este README documenta la convención para que las carpetas no queden vacías sin
explicación. La primera funcionalidad se crea junto a su pantalla en la tarea
que corresponda del DERCAS.
