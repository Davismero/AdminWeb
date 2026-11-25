# Panel web de TosaBus (AdminWeb)

Panel de administración del proyecto **TosaBus**: herramienta complementaria
para que los administradores gestionen rutas, flota, viajes, reservas,
pagos y reportes.

Esta primera entrega corresponde a **T-01: crear la estructura del repositorio
y el entorno con Docker y PostgreSQL** y cubre **RNF-13 (despliegue
reproducible con Docker siguiendo la guía de instalación)**. Por ahora el panel
solo muestra un texto de ejemplo. El tema visual (colores y tipografía) llega en
T-02 y las pantallas de administración a partir de T-08.

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
├── styles/       # Estilos globales (reset.css); los tokens llegan en T-02
├── test/         # Configuración global de las pruebas
└── main.tsx      # Punto de entrada
```

Fuera de `src/`: `vite.config.ts` (desarrollo y compilación),
`vitest.config.ts` (pruebas con jsdom), `eslint.config.js` y
`.prettierrc.json` (calidad de código), `Dockerfile`, `nginx.conf` y
`.dockerignore` (despliegue reproducible).

## Alcance de esta tarea

- **Incluye:** estructura del repositorio, TypeScript estricto, ESLint,
  Prettier, Vitest, React Testing Library, cliente base de la API, Docker y
  documentación.
- **No incluye:** paleta de marca ni tipografía (T-02), autenticación (T-03 a
  T-05) ni pantallas de rutas, flota o ventas (T-08 en adelante).
