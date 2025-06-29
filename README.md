# Fran's Budget Tools 🧮

**Fran's Budget Tools** es una aplicación de presupuesto personal construida con tecnologías modernas como Nuxt 3, Pinia y Zod. Permite registrar **ingresos** y **expensas**, y calcula automáticamente tu **capacidad de ahorro mensual**, con una interfaz amigable y minimalista basada en Nuxt UI y Tailwind CSS.

---

## 🚀 Tecnologías

- [Nuxt 3](https://nuxt.com/) (`compatibilityVersion: 4`)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) – Gestión de estado
- [Zod](https://zod.dev/) – Validación de formularios y datos
- [Nuxt UI](https://ui.nuxt.com/) – Componentes UI
- [Tailwind CSS](https://tailwindcss.com/) – Estilos utilitarios
- [Nuxt i18n](https://i18n.nuxtjs.org/) – Internacionalización
- [Husky + Lint Staged + Commitizen](https://typicode.github.io/husky/#/) – Workflow de commits y linting

---

## 📦 Instalación

Cloná el repo y levantá el proyecto local:

```bash
git clone https://github.com/Mokenuf/budget-app.git
cd budget-app

npm install
npm run dev
```

---

## 📂 Scripts útiles

| Comando            | Descripción                                 |
| ------------------ | ------------------------------------------- |
| `npm run dev`      | Inicia el servidor de desarrollo            |
| `npm run build`    | Compila la aplicación para producción       |
| `npm run generate` | Genera sitio estático (SSG)                 |
| `npm run lint`     | Ejecuta ESLint + Prettier                   |
| `npm run lint:fix` | Aplica fixes automáticos de lint y prettier |
| `npm run commit`   | Inicia flujo de commit con Commitizen       |

---

## 🧪 Estado actual

- ✅ UI básica funcional
- ✅ Registro y listado de **ingresos** y **expensas**
- ✅ Cálculo automático de ahorro mensual
- ✅ Estructura extensible con Pinia + Zod
- ❌ Sin persistencia de datos todavía

---

## 🔜 Próximos pasos

- [ ] **Integrar Supabase** como base de datos y autenticación
- [ ] Crear server routes en Nuxt 3 (`/server/api`)
- [ ] Permitir CRUD persistente de datos
- [ ] Exportar reportes (PDF, Excel)
- [ ] Agregar soporte para múltiples monedas

---

## 🤓 Motivación

Este proyecto nace como un ejercicio personal para aplicar lo aprendido en mi trabajo diario con Vue 2, y llevarlo a un stack moderno basado en Nuxt 3. También sirve como base para experimentar con buenas prácticas, composables reutilizables y flujo de trabajo profesional en proyectos Vue.

---

## 📄 Licencia

MIT – libre para usar, modificar y compartir.
