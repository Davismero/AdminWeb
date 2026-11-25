# Panel web de TosaBus (AdminWeb)

Panel de administración del proyecto **TosaBus**: herramienta complementaria
para que los administradores gestionen rutas, flota, viajes, reservas,
pagos y reportes.

Esta entrega incluye **T-01: crear la estructura del repositorio y el entorno
con Docker y PostgreSQL** (**RNF-13**, despliegue reproducible) y **T-02:
definir el tema visual (colores y tipografía)** (**RNF-07**, interfaz clara y en
español). Las pantallas de administración llegan a partir de T-08.

## Requisitos

- Node.js 22.12 o superior (se ha probado con Node 26 en local). La imagen de
  compilación usa `node:22-alpine`.
- npm 10 o superior.
- Opcional: Docker con el daemon en funcionamiento para construir y ejecutar la
  imagen de producción.

En PowerShell de Windows, si el alias `npm.ps1` está bloqueado por la política
de ejecución, usa `npm.cmd` y `npx.cmd` en lugar de `npm` y `npx`.

## Variables de entorno

Copia el archivo de ejemplo y ajusta la URL del backend:

```powershell
Copy-Item .env.example .env.local
```

| Variable       | Descripción                                                                                 | Valor de ejemplo               |
| -------------- | ------------------------------------------------------------------------------------------- | ------------------------------ |
| `VITE_API_URL` | URL base de la API REST del backend. Solo se expone al navegador; **no contiene secretos**. | `http://localhost:3000/api/v1` |

La identidad de la compañía se toma del token del usuario en el servidor
(RF-40), nunca de un parámetro del panel. No se almacenan datos de tarjeta
(RF-22). Los archivos `.env` están excluidos del repositorio; solo se versiona
`.env.example`.

## Ejecución local

```powershell
npm.cmd install
npm.cmd run dev
```

La aplicación se abre en `http://localhost:5173`. Vite recarga la página al
modificar los archivos de `src/`.

## Compilación

```powershell
npm.cmd run build
npm.cmd run preview
```

`npm run build` ejecuta la comprobación de tipos (`tsc -b`) y luego genera la
versión estática en `dist/`. `npm run preview` sirve esa versión en local.

## Calidad y pruebas

```powershell
npm.cmd run lint   # ESLint + comprobación de formato con Prettier
npm.cmd run test   # Vitest + React Testing Library (jsdom)
```

- `npm.cmd run lint:fix` corrige automáticamente lo que ESLint y Prettier
  pueden corregir.
- `npm.cmd run format` aplica Prettier a todo el repositorio.
- `npm.cmd run test:watch` deja las pruebas en modo observación.

## Ejecución con Docker (RNF-13)

Desde la raíz del repositorio:

```powershell
docker build -t tosabus-admin-web .
docker run --rm -p 8080:80 tosabus-admin-web
```

El panel queda disponible en `http://localhost:8080`.

El `Dockerfile` es multi-etapa:

1. **build**: `node:22-alpine` instala dependencias con `npm ci` y ejecuta
   `npm run build`.
2. **serve**: `nginx:alpine` sirve `dist/` y redirige las rutas desconocidas a
   `index.html` (`try_files $uri /index.html`) para que funcione el enrutamiento
   del lado del cliente.

`VITE_API_URL` se lee al compilar, así que hay que definirlo antes de ejecutar
la construcción de la imagen (por ejemplo, creando `.env.local` previamente).
No incluyas secretos en la imagen.

## Estructura de carpetas

```text
src/
├── app/          # Composición raíz de la aplicación (App.tsx y su prueba)
├── features/     # Funcionalidades del dominio: ver su README
├── shared/       # Código reutilizable: ver su README
├── services/     # Cliente base de la API (api.ts)
├── styles/       # tokens.css (paleta y tipografía) y tema.css (estilos base)
├── test/         # Configuración global de las pruebas
└── main.tsx      # Punto de entrada
```

Fuera de `src/`: `vite.config.ts` (desarrollo y compilación),
`vitest.config.ts` (pruebas con jsdom), `eslint.config.js` y
`.prettierrc.json` (calidad de código), `Dockerfile`, `nginx.conf` y
`.dockerignore` (despliegue reproducible).

## Tema visual (T-02, RNF-07)

Los colores y la tipografía se definen **una sola vez** en
[`src/styles/tokens.css`](src/styles/tokens.css) y se aplican en
[`src/styles/tema.css`](src/styles/tema.css). Nunca escribas un color
hexadecimal a mano en un componente: usa las variables CSS.

| Uso                                | Variable                     | Valor     |
| ---------------------------------- | ---------------------------- | --------- |
| Primario (botones, barra superior) | `--tosabus-verde`            | `#1F7A33` |
| Énfasis / presionado               | `--tosabus-verde-oscuro`     | `#14532D` |
| Acento (solo detalles)             | `--tosabus-dorado`           | `#F5B700` |
| Informativo (mapa, iconos)         | `--tosabus-azul`             | `#2E93D1` |
| Fondo de pantallas                 | `--tosabus-crema`            | `#F5F9F3` |
| Superficies (tarjetas)             | `--tosabus-blanco`           | `#FFFFFF` |
| Texto principal                    | `--tosabus-texto`            | `#1B2A1F` |
| Texto secundario                   | `--tosabus-texto-secundario` | `#5A6B5E` |
| Bordes y divisores                 | `--tosabus-borde`            | `#D6E0D4` |
| Éxito                              | `--tosabus-exito`            | `#2E7D32` |
| Advertencia                        | `--tosabus-advertencia`      | `#ED6C02` |
| Error                              | `--tosabus-error`            | `#C62828` |

Reglas de uso: texto blanco sobre verde y texto oscuro sobre dorado (nunca
blanco sobre dorado); el azul cielo solo para iconos, mapa y elementos
informativos; contraste mínimo recomendado de 4.5:1; esquinas redondeadas de
8–12 px y espaciado en múltiplos de 8. El color nunca es la única señal: éxito,
advertencia y error llevan icono y texto (el éxito usa un check).

La tipografía es **Inter** con respaldo del sistema (`system-ui`). Los archivos
locales de Inter 400/500/700 se añadirán más adelante en `src/assets/fonts/`;
hoy no se referencia ningún asset inexistente.

## Alcance de esta tarea

- **Incluye:** estructura del repositorio, TypeScript estricto, ESLint,
  Prettier, Vitest, React Testing Library, cliente base de la API, Docker,
  tokens visuales (paleta, tipografía y reglas de contraste) y documentación.
- **No incluye:** autenticación (T-03 a T-05), pantallas de rutas, flota o
  ventas (T-08 en adelante) ni archivos binarios de la fuente Inter.
