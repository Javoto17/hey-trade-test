
# **Hey Trade Test**

## Resumen del Proyecto

Este proyecto es una aplicación móvil desarrollada en **React Native** que permite a los usuarios explorar una lista de películas, añadir o quitar películas de su lista de favoritos, y visualizar los detalles de cada película. Además, cuenta con una implementación eficiente del manejo de estado de las llamadas utilizando **React Query** .

## Features

- [x] **Lista de Películas**: Explora un catálogo de películas con información detallada.
- [x] **Favoritos**: Añade o quita películas de la lista de favoritos. El estado de cada película favorita se gestiona a través de mutaciones con **React Query**.
- [x] **Página de Detalles de Película**: Visualiza información detallada sobre una película seleccionada.
- [x] **Scroll infinito**: Para la paginación se ha optado por ir cargando las páginas de resultados según se hace scroll, usando `useInfiniteQuery`
- [x] **Búsqueda de películas**
- [x] **Tests de integración**
- [x] **Tests de unitarios**
- [ ] **Detalles de Actores**
- [ ]  **Categorías**



## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Javoto17/hey-trade-test.git
```

2. Navega al directorio del proyecto:

```bash
cd hey-trade-test
```

3. Instala las dependencias:

```bash
npm install
```

## Configuración del Entorno

1. Crea un archivo `.env` en la raíz del proyecto.

2. Añade las siguientes variables de entorno (modifica según sea necesario):

```bash
EXPO_PUBLIC_API_URL="https://api.themoviedb.org/3/"
EXPO_PUBLIC_API_TOKEN=tu-api-key
```

3. Ejecuta la aplicación en modo de desarrollo:

```bash
npm run start
```
