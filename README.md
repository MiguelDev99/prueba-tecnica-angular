
# Prueba Técnica - Miguel Ojeda

Este proyecto es parte de una prueba técnica en Angular. Se trata de una aplicación web que consume la API de Spotify para buscar artistas, ver sus álbumes y canciones, con una interfaz atractiva basada en un diseño de Figma.

## 🛠 Tecnologías utilizadas

- **Angular 18** (Componentes standalone)
- **Tailwind CSS** para estilos rápidos y responsivos
- **Spotify Web API**
- **RxJS** para manejo de flujos reactivos
- **Git & GitHub** para control de versiones

## ✨ Funcionalidades

- 🔍 Búsqueda de artistas
- 💽 Visualización de álbumes de un artista
- 🎵 Listado de canciones de un álbum
- 🔐 Autenticación real con Spotify
- 📂 Visualización y gestión de playlists del usuario
- ➕ Añadir playlists públicas a la cuenta del usuario

## 🚀 Instalación y ejecución

1. Clona el repositorio:
   git clone https://github.com/MiguelDev99/prueba-tecnica-angular.git
   cd prueba-tecnica-angular

2. Instala las dependencias:
   npm install

3. Inicia la aplicación:
   ng serve --host 127.0.0.1

4. Abre el navegador en [http://127.0.0.1:4200](http://127.0.0.1:4200)

## 🔐 Acceso a la aplicación

La autenticación con Spotify ya está implementada utilizando **OAuth 2.0 con PKCE**, el flujo recomendado por Spotify para aplicaciones del lado del cliente (SPA).

Para ingresar a la aplicación, es necesario iniciar sesión con una cuenta de Spotify.

> Se proporciona una cuenta de prueba para facilitar el acceso durante la evaluación técnica:

- **Correo electrónico:** `pruebamiguelojeda@gmail.com`
- **Contraseña:** `Prueba123*`

Al hacer clic en el botón de login, se abrirá la ventana de autenticación oficial de Spotify. Se recomienda ingresar **manualmente el correo y la contraseña** en el formulario de Spotify, en lugar de usar opciones como "Continuar con Google", para evitar redirecciones adicionales o solicitud de códigos de verificación.

Una vez autenticado, podrás:
- Buscar artistas
- Ver sus álbumes y canciones
- Visualizar tus playlists
- Añadir playlists públicas a tu cuenta

## 🎨 Diseño de Interfaz

La interfaz está basada en el siguiente diseño de Figma de la comunidad:

👉 [Musium Music App UI - Figma](https://www.figma.com/community/file/1143115506742537849/musium-music-app-ui)

El logo fue extraído de este UI Kit.

## 📦 Estructura del Proyecto

La aplicación fue desarrollada con una estructura modular basada en buenas prácticas. Se implementó manejo de errores en las peticiones a la API y se utilizó programación reactiva con RxJS para una mejor gestión del flujo de datos.

## 📝 Notas

- El login con Spotify se implementó utilizando OAuth 2.0.
- Ya se permite visualizar las playlists del usuario autenticado y añadir playlists públicas.