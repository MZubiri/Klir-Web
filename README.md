# Klir Web — Landing Page Oficial y Políticas

Sitio web oficial, documentación y políticas de privacidad para **Klir**, la aplicación de limpieza y organización de galería para Android.

## Características del Sitio

- **Diseño Sólido y Minimalista**: Paleta sobria sin gradientes artificiales, tipografía limpia y diseño responsive.
- **Demo Interactiva en Vivo**: Simulación del swipe con tarjetas táctiles (Conservar / Borrar / Favoritas) directamente en el navegador.
- **Política de Privacidad Integral**: Documentación técnica adaptada a las directrices de seguridad de datos de Google Play Store (`READ_MEDIA_IMAGES` / `READ_MEDIA_VIDEO`).
- **Términos de Uso**: Términos para licenciamiento y compras integradas (Klir Pro).
- **Listo para GitHub Pages**: Sin dependencias de compilación, HTML/CSS/JS nativo de alto rendimiento.

## Estructura de Archivos

```
KLIR.WEB/
├── index.html        # Landing page principal con demo interactiva
├── privacy.html      # Política de Privacidad oficial para Play Store
├── terms.html        # Términos y Condiciones de Uso
├── styles.css        # Estilos sobrios con colores sólidos
├── app.js            # Lógica de la demo interactiva y acordeones
├── .nojekyll         # Compatibilidad directa con GitHub Pages
└── assets/
    ├── logo.svg              # Logotipo vectorial de Klir
    ├── favicon.svg           # Favicon para el navegador
    └── google-play-badge.svg # Insignia de Google Play
```

## Publicación en GitHub Pages

1. Ve a **Settings > Pages** en este repositorio de GitHub.
2. En **Source**, selecciona **Deploy from a branch**.
3. Selecciona la rama `main` (o `master`) y la carpeta `/ (root)`.
4. Guarda y en menos de 1 minuto el sitio estará publicado en `https://mzubiri.github.io/Klir-Web/`.
