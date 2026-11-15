# Sitio corporativo Entel Networks

Sitio estático adaptable, en español, compuesto por HTML, CSS y JavaScript sin proceso de compilación. El dominio de destino es `https://entelcloud.com.mx/`; los metadatos canónicos y Open Graph apuntan a esa URL. La identidad usa azul marino, azul corporativo y verde turquesa; el isotipo N tiene una animación de giro horizontal que se reduce si el visitante prefiere menos movimiento.

## Contenido preparado

- `index.html`: portada, Quiénes somos, soluciones, enfoque, fabricantes, clientes, contacto y pie con redes.
- `assets/css/site.css`: estilos responsive, navegación móvil, animaciones y accesibilidad básica.
- `assets/js/site.js`: menú móvil y año dinámico.
- `.github/workflows/deploy-hostinger.yml`: flujo de publicación FTPS al hacer push a `main` o al iniciarlo manualmente.

La sección Quiénes somos recupera la especificación acordada: «Somos el aliado que conecta la estrategia», «la forma en que construimos cada relación y cada solución» y «que la tecnología se note en lo que tu negocio puede lograr». También presenta «Un proceso claro. Resultados que evolucionan.»

## Datos que faltan para habilitar despliegue

Confirma en hPanel, en el sitio/dominio correcto, dentro de **Archivos → Cuentas FTP**:

1. Host o IP FTP que Hostinger muestra.
2. Usuario FTP (se recomienda una cuenta dedicada solo a la carpeta pública del sitio).
3. Puerto FTPS disponible. El puerto FTP habitual es 21, pero debes confirmar protocolo y puerto para tu cuenta.
4. Ruta destino exacta que sirve el dominio, a menudo `/public_html/` o `/domains/DOMINIO/public_html/`.
5. Que el sitio sea HTML/PHP personalizado y el plan admita FTP/FTPS. El constructor Hostinger Website Builder no usa este flujo.
6. URLs oficiales de Facebook, Instagram, X y YouTube. El sitio ya enlaza el contacto y la política de privacidad publicados en `entelcloud.com.mx`; confirma si esas rutas se conservarán en la nueva versión.
7. Confirmación final de marca: el paquete representa el isotipo con una N tipográfica provisional; conviene sustituirlo por el logo oficial blanco del Brand Kit antes de la publicación pública.

No compartas la contraseña FTP en un chat, issue, archivo, commit ni captura. La contraseña no se puede recuperar desde hPanel; si no la tienes, cámbiala allí.

## Configurar GitHub Actions de forma segura

1. En GitHub abre `lvarela-glitch/Web_Entel_Networks` → **Settings → Environments → New environment** y crea `production`.
2. Si tu plan permite protección de entorno, configura un revisor requerido para `production`. Así un push no pasa directo al hosting sin aprobación del despliegue. Si la opción no aparece, deja los secretos sin configurar hasta que autorices la primera publicación.
3. En `Settings → Secrets and variables → Actions`, agrega como **Repository secrets** (o secretos del entorno `production`):
   - `HOSTINGER_FTP_SERVER`: el host/IP FTP de hPanel.
   - `HOSTINGER_FTP_USERNAME`: el usuario de la cuenta FTP dedicada.
   - `HOSTINGER_FTP_PASSWORD`: contraseña FTP/FTPS.
4. Después de aprobar el primer despliegue, en **Variables** de Actions o del entorno agrega `HOSTINGER_DEPLOY_ENABLED` con valor `true` y:
   - `HOSTINGER_SERVER_PATH`: ruta remota exacta terminada en `/`, por ejemplo `/public_html/` solo si hPanel confirma que ésa corresponde a este dominio.
   - `HOSTINGER_FTP_PORT`: puerto FTPS confirmado (si no configuras variable, el flujo usa 21).
5. Activa Actions y, tras autorizar la publicación inicial, integra esta estructura en `main`. Los pushes posteriores a `main` publican el sitio; también puedes usar **Actions → Publicar sitio Entel en Hostinger → Run workflow**.
6. Revisa el resultado en **Actions** y luego abre el dominio con una recarga completa. Conserva una copia de los archivos actuales del directorio web antes de la primera sincronización: `entelcloud.com.mx` ya tiene un sitio activo y el despliegue puede reemplazar archivos del directorio destino.

Los valores de autenticación viven en GitHub Secrets, que GitHub oculta en los logs. La carpeta destino y el puerto son configuración no secreta y viven en Actions Variables. No agregues tokens de GitHub al workflow: `contents: read` limita el token automático a descargar el código durante la ejecución.

## Primera incorporación al repositorio vacío

1. Descarga y descomprime `Entel_Web_GitHub_Hostinger.zip`.
2. Antes de añadirlo al dominio, revisa la vista previa local abriendo `index.html` en un navegador. Verifica los enlaces oficiales, redes, privacidad, correo y logo.
3. En el repositorio, sube los archivos y carpetas conservando sus rutas (`index.html`, `assets/` y `.github/workflows/`). Puedes hacerlo desde **Add file → Upload files** o mediante Git: copia el contenido de este paquete al clon local, ejecuta `git add .`, `git commit -m "Agregar sitio corporativo Entel Networks"` y `git push origin main`.
4. El workflow queda bloqueado por defecto con la variable `HOSTINGER_DEPLOY_ENABLED`. No la crees ni configures las credenciales hasta revisar el destino y autorizar expresamente la publicación inicial.
5. Para más control, en Hostinger hPanel también puede existir **Advanced → Git**, que conecta GitHub y redepliega con cada push sin secretos FTP en Actions. La disponibilidad depende del tipo de sitio y plan; no actives simultáneamente dos despliegues a la misma carpeta.

## Limitaciones conocidas antes de producción

- Los wordmarks de fabricantes/clientes son texto enlazado, no archivos de logos. El logo oficial Entel y los logos autorizados de clientes se deben añadir desde activos corporativos aprobados.
- La política de privacidad y el contacto enlazan a las rutas actuales de `entelcloud.com.mx`. Los enlaces de redes sociales siguen pendientes de confirmar y reemplazar por las cuentas oficiales de Entel.
- El portafolio incluye enlaces externos; valida que cada enlace y nombre de fabricante siga vigente antes de publicar.
- El flujo propuesto copia este sitio estático directamente. No necesita Node ni comando de build.
