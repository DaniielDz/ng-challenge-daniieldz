# ng-challenge-daniieldz

Mini aplicación React para el challenge técnico de **Nimble Gravity**, que consume una API REST para mostrar posiciones laborales abiertas y enviar postulaciones.

## ¿Qué hace la aplicación?

1. Obtiene los datos del candidato desde la API usando el email configurado en las variables de entorno.
2. Lista las posiciones laborales disponibles.
3. Permite ingresar la URL de un repositorio de GitHub y enviar la postulación a cualquier posición.
4. Maneja estados de carga, error y éxito en la UI.

## Tech Stack

| Tecnología   | Versión | Rol                    |
| ------------ | ------- | ---------------------- |
| React        | 19      | Framework UI           |
| TypeScript   | 5.9     | Tipado estático        |
| Vite         | 7       | Bundler / dev server   |
| Tailwind CSS | 4       | Estilos utility-first  |
| Lucide React | -       | Íconos                 |
| Sonner       | -       | Toasts de notificación |

## Estructura del proyecto

```
src/
├── App.tsx                          # Orquestador principal
├── index.css                        # @theme tokens + reset global
├── main.tsx                         # Entry point
├── types/
│   └── index.ts                     # Tipos: Candidate, Job, ApplyPayload
├── services/
│   └── api.ts                       # Funciones fetch: getCandidateByEmail, getJobsList, applyToJob
├── components/
│   └── layout/
│       ├── AppHeader.tsx
│       └── AppFooter.tsx
└── features/
    ├── candidate/
    │   ├── index.ts                 # Barrel export
    │   ├── components/
    │   │   ├── CandidateCard.tsx    # Muestra datos del candidato
    │   │   └── CandidateSection.tsx # Maneja estados loading/error/data
    │   └── hooks/
    │       └── useCandidate.ts      # Fetch del candidato por email
    └── jobs/
        ├── index.ts                 # Barrel export
        ├── components/
        │   ├── JobList.tsx          # Lista posiciones con estados
        │   └── JobItem.tsx          # Item individual + form de postulación
        └── hooks/
            └── useJobs.ts           # Fetch de la lista de jobs
```

La arquitectura sigue el patrón **feature-sliced design**: cada dominio de la aplicación (candidate, jobs) es autónomo y agrupa sus propios componentes, hooks y barrel exports.

## Instalación y uso

### Requisitos previos

- Node.js ≥ 18
- npm ≥ 9

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/ng-challenge-daniieldz.git
cd ng-challenge-daniieldz

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env y completar VITE_CANDIDATE_EMAIL con tu email

# 4. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Variables de entorno

| Variable               | Descripción                                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `VITE_CANDIDATE_EMAIL` | Email registrado en Nimble Gravity. Se usa para obtener los datos del candidato via GET `/api/candidate/get-by-email`. |

## Scripts disponibles

| Script            | Descripción                                         |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo con HMR            |
| `npm run build`   | Compila TypeScript y genera el bundle de producción |
| `npm run preview` | Previsualiza el build de producción localmente      |
| `npm run lint`    | Ejecuta ESLint sobre el código fuente               |

## API

Base URL: `https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net`

| Método | Endpoint                                | Descripción                   |
| ------ | --------------------------------------- | ----------------------------- |
| GET    | `/api/candidate/get-by-email?email=...` | Obtiene datos del candidato   |
| GET    | `/api/jobs/get-list`                    | Lista las posiciones abiertas |
| POST   | `/api/candidate/apply-to-job`           | Envía una postulación         |

Todos los errores de la API devuelven un body JSON con un campo `message` descriptivo que se muestra directamente en la UI.

## Decisiones de diseño

- **Tailwind v4 inline** — se usa `@theme` para definir los tokens del design system (`--color-brand`, etc.) y clases utility directamente en los componentes, sin CSS custom adicional.
- **Feature-sliced design** — los dominios `candidate` y `jobs` son módulos independientes. Agregar un nuevo feature no requiere tocar los existentes.
- **Barrel exports** — cada feature expone un `index.ts` para mantener los imports de `App.tsx` limpios y desacoplados de la estructura interna.
- **Manejo de errores** — el servicio API lee siempre el body de la respuesta de error y lo propaga como mensaje legible hacia la UI via `sonner`.
