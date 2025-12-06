# E-Commerce Thesis - Next.js Partial Pre-rendering

Implementación de un sitio web de e-commerce utilizando **Next.js 15** con el método de renderizado **Partial Pre-rendering (PPR)** como parte de una investigación de tesis comparativa sobre métodos de renderizado web modernos.

## 📋 Descripción del Proyecto

Este proyecto forma parte de la tesis "Análisis comparativo de los métodos de renderizado web PRR, Islands y Resumability para la elaboración de un e-commerce en 2025" de la Universidad Latinoamericana de Ciencia y Tecnología, Costa Rica.

El objetivo es evaluar el rendimiento del método **Partial Pre-rendering (PPR)** implementado en Next.js, comparándolo con:
- **Islands Architecture** en Astro
- **Resumability** en Qwik

### ¿Qué es Partial Pre-rendering?

Partial Pre-rendering (PPR) es un método experimental de Next.js que combina contenido estático pre-renderizado con contenido dinámico mediante Streaming y Suspense. Las páginas se sirven instantáneamente con un shell estático mientras las regiones interactivas se cargan progresivamente, eliminando el tiempo de espera tradicional del renderizado completo.

## 🚀 Características

- ✅ Flujo completo de e-commerce (Home, Products, Product Detail, Checkout)
- ✅ Autenticación de usuario simulada
- ✅ Carrito de compras con persistencia local
- ✅ Historial de órdenes
- ✅ Búsqueda y filtrado de productos
- ✅ Integración con Fake Store API
- ✅ Diseño responsivo con Tailwind CSS y shadcn/ui
- ✅ Optimizado para mediciones de rendimiento (Core Web Vitals)

## 📊 Métricas Evaluadas

El proyecto fue diseñado específicamente para medir:
- **LCP** (Largest Contentful Paint)
- **INP** (Interaction to Next Paint)
- **CLS** (Cumulative Layout Shift)
- **SI** (Speed Index)
- **TBT** (Total Blocking Time)

## 🛠️ Tecnologías Utilizadas

- **Framework:** Next.js 15.5.1 (App Router con PPR experimental)
- **React:** 19.1.0
- **Estilos:** Tailwind CSS 3.4.17
- **Componentes UI:** shadcn/ui (Radix UI primitives)
- **State Management:** TanStack Query 5.83.0
- **API:** Fake Store API
- **Deployment:** Vercel
- **TypeScript:** 5.8.3

## 📦 Instalación
```bash
# Clonar el repositorio
git clone https://github.com/frankramirezsoto/ecommerce-thesis-nextjs-ppr.git

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

El proyecto estará disponible en `http://localhost:3000`

## 🏗️ Scripts Disponibles
```bash
npm run dev          # Modo desarrollo con PPR habilitado
npm run build        # Build de producción optimizado
npm run start        # Ejecutar build de producción localmente
npm run lint         # Linter con configuración de Next.js
```

## 📁 Estructura del Proyecto
```
├── app/                      # App Router de Next.js
│   ├── (shop)/              # Grupo de rutas con layout compartido
│   │   ├── layout.tsx       # Layout con Navbar y CartDrawer
│   │   ├── page.tsx         # Página de inicio (Home)
│   │   ├── products/        # Catálogo de productos
│   │   ├── product/[id]/    # Detalle de producto dinámico
│   │   ├── checkout/        # Proceso de compra
│   │   └── orders/          # Historial de órdenes
│   ├── auth/                # Autenticación
│   ├── layout.tsx           # Root layout con providers
│   └── globals.css          # Estilos globales
├── components/              # Componentes React
│   ├── ui/                 # Componentes base de shadcn/ui
│   ├── providers/          # Context providers (Auth, Cart)
│   ├── auth/               # Componentes de autenticación
│   ├── checkout/           # Componentes de checkout
│   ├── home/               # Componentes de home
│   ├── orders/             # Componentes de órdenes
│   ├── products/           # Componentes de productos
│   ├── CartDrawer.tsx      # Drawer del carrito
│   ├── Navbar.tsx          # Barra de navegación
│   └── ProductCard.tsx     # Card de producto
├── lib/                    # Utilidades y configuraciones
│   ├── api.ts              # Cliente API de Fake Store
│   ├── storage.ts          # Manejo de localStorage
│   └── utils.ts            # Funciones utilitarias
├── hooks/                  # Custom hooks
├── types/                  # Definiciones TypeScript
└── docs/                   # Documentación adicional
    └── react-19-compatibility.md
```

## 🌐 Demo en Vivo

**Sitio desplegado:** [https://ecommerce-thesis-nextjs-ppr.vercel.app/](https://ecommerce-thesis-nextjs-ppr.vercel.app/)

**Repositorio:** [https://github.com/frankramirezsoto/ecommerce-thesis-nextjs-ppr](https://github.com/frankramirezsoto/ecommerce-thesis-nextjs-ppr)

## 📝 Metodología de Investigación

### Implementación de PPR

Cada ruta del proyecto exporta `experimental_ppr = true` para habilitar el Partial Pre-rendering. El contenido estático se sirve instantáneamente mientras las regiones interactivas (cart, autenticación) se cargan mediante Suspense boundaries.
```typescript
// Ejemplo de implementación PPR
export const experimental_ppr = true;

export default async function ProductsPage() {
  const products = await api.getAllProducts();
  
  return (
    <Suspense fallback={<LoadingState />}>
      <ProductsContent products={products} />
    </Suspense>
  );
}
```

### Páginas Implementadas
1. **Home** - Página principal con productos destacados
2. **Products** - Catálogo completo con filtros y búsqueda
3. **Product Detail** - Información detallada del producto
4. **Checkout** - Proceso de pago completo

### Mediciones Realizadas
- 5 repeticiones por combinación (método × página × dispositivo)
- Mediciones en dispositivos móviles y de escritorio
- Herramientas: Google Lighthouse y Chrome DevTools Performance

## 🔬 Resultados de la Investigación

Según los resultados obtenidos en la tesis:

**Dispositivo Móvil:**
- ⚠️ TBT elevado (108.00 ms promedio)
- ✅ INP competitivo (21.20 ms promedio)
- ✅ CLS aceptable (0.0231 promedio)
- ⚠️ Speed Index moderado (2.27 s promedio)

**Dispositivo Escritorio:**
- ✅ TBT perfecto (0.00 ms)
- ✅ INP óptimo (16.00 ms promedio)
- ✅ CLS excelente (0.016 promedio)
- ✅ Speed Index competitivo (0.72 s promedio)

**Puntuación Final:** 0.58 (tercera posición entre los tres métodos evaluados)

### Hallazgos Clave

El método PPR mostró un comportamiento diferenciado entre dispositivos:

- **En móvil:** El TBT elevado (108.00 ms) indica que el hydration parcial aún genera bloqueos del hilo principal, aunque menores que el SSR tradicional.
- **En escritorio:** Rendimiento excelente con TBT de 0.00 ms, demostrando que la mayor capacidad computacional permite ejecutar hydration sin bloqueos perceptibles.
- **Limitación principal:** A pesar de combinar contenido estático y dinámico, PPR no elimina completamente la sobrecarga de hydration que afecta especialmente a dispositivos móviles.

## 🔧 Configuración Especial

### Compatibilidad con React 19

Este proyecto utiliza React 19.1.0. Todas las dependencias fueron auditadas para garantizar compatibilidad. Ver [`docs/react-19-compatibility.md`](./docs/react-19-compatibility.md) para detalles completos.

### Configuración de Next.js
```javascript
// next.config.mjs
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    ppr: 'incremental', // Habilita PPR de forma incremental
  },
};
```

### Revalidación de Datos
```typescript
// Revalidación cada hora para datos estáticos
export const revalidate = 3600;
```

## 📚 Conceptos Técnicos Clave

### Suspense Boundaries

Las páginas utilizan React Suspense para marcar los límites entre contenido estático y dinámico:
```typescript
<Suspense fallback={<LoadingState />}>
  <DynamicContent />
</Suspense>
```

### Client Components

Los componentes interactivos utilizan la directiva `'use client'` para hydration del lado del cliente:
```typescript
'use client';

export function CartDrawer() {
  // Lógica interactiva del carrito
}
```

### Server Components

Los componentes de servidor obtienen datos directamente sin JavaScript del cliente:
```typescript
// Por defecto en App Router - Server Component
export default async function ProductsPage() {
  const products = await api.getAllProducts();
  return <ProductsList products={products} />;
}
```

## 👨‍🎓 Autor

**Franklin Josué Ramirez Soto**
- Universidad Latinoamericana de Ciencia y Tecnología
- Programa de Bachillerato en Ingeniería Informática
- Año: 2025

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos como parte de un trabajo de investigación de tesis.

## 🔗 Proyectos Relacionados

- [E-Commerce Astro (Islands)](https://github.com/frankramirezsoto/ecommerce-thesis-astro-islands)
- [E-Commerce Qwik (Resumability)](https://github.com/frankramirezsoto/ecommerce-thesis-qwik-resumable)

## 📖 Referencias

- [Next.js Partial Pre-rendering Documentation](https://nextjs.org/docs/app/api-reference/next-config-js/partial-prerendering)
- [React 19 Documentation](https://react.dev/)
- [Fake Store API](https://fakestoreapi.com/)
- [Core Web Vitals](https://web.dev/vitals/)

---

**Nota:** Este proyecto utiliza la Fake Store API para datos de productos de prueba. No se requiere configuración de backend adicional. Los datos de usuario, carrito y órdenes se almacenan en `localStorage` para propósitos de demostración.