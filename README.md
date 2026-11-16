# Entel Networks · sitio web

Esta rama contiene la versión actual del sitio para `https://entelcloud.com.mx/`. El sitio es estático: `index.html` contiene el diseño, estilos y scripts; los logos locales están junto al archivo. No requiere build.

## Publicación y futuras modificaciones

El workflow `.github/workflows/deploy-hostinger.yml` publica por FTPS cuando hay un push a `main`. Está bloqueado hasta que `HOSTINGER_DEPLOY_ENABLED` se configure como `true`.

Después de activar la configuración, las modificaciones futuras se hacen en GitHub mediante commits a `main`; GitHub Actions las sincroniza con la carpeta web configurada en Hostinger. No se necesita sustituir archivos manualmente desde hPanel.

## Configuración pendiente en GitHub

En hPanel, abre **Websites → Administrar → Cuentas FTP** para consultar el host, usuario, puerto y ruta FTP del dominio. La contraseña no se muestra; si no se conserva, cámbiala allí. No publiques ni envíes la contraseña por chat.

En GitHub, abre **Settings → Environments → production** y agrega estos Environment secrets:

- `HOSTINGER_FTP_SERVER`
- `HOSTINGER_FTP_USERNAME`
- `HOSTINGER_FTP_PASSWORD`

Agrega estas Environment variables:

- `HOSTINGER_DEPLOY_ENABLED` = `true` (solo después de verificar el destino)
- `HOSTINGER_SERVER_PATH` = ruta exacta que sirve `entelcloud.com.mx`, terminada en `/`
- `HOSTINGER_FTP_PORT` = puerto FTPS mostrado en hPanel (si no se agrega, el workflow usa 21)

Verifica que el hosting sea un sitio HTML/PHP personalizado y que la ruta corresponda a este dominio. Antes de la primera ejecución, guarda una copia del contenido actual de esa carpeta. Después, abre **Actions → Publicar sitio Entel en Hostinger** y revisa el resultado.

## Estructura

- `index.html`: sitio actual de Entel Networks
- `*.webp`: logos optimizados para carga rápida
- `.github/workflows/deploy-hostinger.yml`: publicación FTPS automática
