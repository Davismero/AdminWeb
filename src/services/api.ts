/**
 * Cliente base de la API del panel de administración.
 *
 * T-01 solo prepara la estructura: todavía no se consume ningún endpoint.
 * La compañía se toma del token en el servidor (RF-40), por lo que este cliente
 * nunca envía `companyId`; tampoco maneja datos de tarjeta (RF-22).
 */

const urlBase = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');

export function urlApi(ruta: string): string {
  return `${urlBase}${ruta.startsWith('/') ? ruta : `/${ruta}`}`;
}

export async function apiFetch<T>(
  ruta: string,
  opciones: RequestInit = {},
): Promise<T> {
  const cabeceras = new Headers(opciones.headers);

  if (!cabeceras.has('Content-Type')) {
    cabeceras.set('Content-Type', 'application/json');
  }

  const respuesta = await fetch(urlApi(ruta), {
    ...opciones,
    headers: cabeceras,
  });

  if (!respuesta.ok) {
    throw new Error(
      `Error de la API: ${respuesta.status} ${respuesta.statusText}`,
    );
  }

  return respuesta.json() as Promise<T>;
}
