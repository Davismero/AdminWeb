# Compartido (`src/shared`)

Aquí va el código reutilizable por dos o más funcionalidades del panel. No es un
cajón de sastre: todo lo que se agregue debe tener más de un consumidor o ser un
elemento claramente transversal.

## Convención

```text
src/shared/
├── components/   # Componentes visuales usados por varias funcionalidades
├── hooks/        # Hooks genéricos reutilizables
├── lib/          # Utilidades puras (formatos, validaciones)
└── types.ts      # Tipos compartidos del dominio
```

- Los componentes compartidos reciben datos por props; no conocen endpoints ni
  reglas de negocio de una funcionalidad concreta.
- Los tokens visuales (colores, tipografía) se definen en T-02 en `src/styles/`,
  no aquí.
- La identidad de compañía se deriva del token del usuario en el servidor
  (RF-40): en el panel no se guarda ni se envía un `companyId` manipulable.
- En T-01 no hay aún componentes compartidos; este README documenta la
  convención para las tareas posteriores.
