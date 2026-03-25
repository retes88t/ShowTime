Pasos para publicar el sitio web ShowTime en GitHub Pages
==========================================================

URL del sitio: https://retes88t.github.io/ShowTime/

Prerequisitos
-------------
1. Tener Node.js instalado
2. Tener GitHub CLI (gh) instalado: brew install gh
3. Tener las dependencias instaladas: npm install

Paso 1. Autenticarse con GitHub
--------------------------------
Ejecutar en la terminal:

    gh auth login

Seguir las instrucciones interactivas:
- Seleccionar GitHub.com
- Seleccionar HTTPS como protocolo
- Autenticarse via navegador web

Luego configurar git para usar las credenciales de gh:

    gh auth setup-git

Para verificar que estas autenticado:

    gh auth status

Paso 2. Publicar el sitio
--------------------------
Ejecutar:

    npm run deploy

Este comando hace dos cosas automaticamente:
1. Compila el proyecto (npm run build) generando la carpeta dist/
2. Publica el contenido de dist/ en la rama gh-pages usando el paquete gh-pages

Paso 3. Verificar
------------------
Esperar 1-2 minutos y visitar:

    https://retes88t.github.io/ShowTime/

Notas
-----
- El archivo .env con VITE_APPS_SCRIPT_URL debe estar configurado antes de publicar
- La configuracion de base en vite.config.ts ya esta en '/ShowTime/'
- La app usa HashRouter (#/) para compatibilidad con GitHub Pages
- Si hay errores de autenticacion, ejecutar: gh auth login --web
