# Kiusys

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Frontend Stack

- Nuxt 3
- Tailwind
- TypeScript

## Instalación

```bash
npm install
npm run postinstall
npm run prepare:husky
```

## Development Build

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

Para iniciar un servidor local y visualizar el contenido del build:

```bash
npm run preview
```

## Commits

El proyecto cuenta con [Husky](https://typicode.github.io/husky/) para correr scripts al momento de hacer commits (Git Hooks). En caso de que alguno estos arroje error, el commit se cancela. Para mantener un estándar de la forma en que se realizan los *commits*, se ha usado dos herramientas [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) y [lint-stage](https://github.com/okonet/lint-staged).

### Conventional Commits

Al momento de realizar un commit, este script verifica que el commit message se ajuste a los estándares de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

```bash
<type>[optional scope]: <description>

feat: add TheText component to support text blocks
```

Algunos posibles **types**

- feat
- fix
- test
- refactor
- chore
- docs
- build
- style

### lint-stage

Este script evalua que el código en *stage* cumpla con ciertas condiciones. Para este proyecto, es necesario que tanto ESLint como TypeScript no arrojen ningún error/advertencia.

## TypeScript

Para aprovechar todos los benficios del tipado y mantener un estándar alto en la calidad del código, se ha usado TypeScript.

## Tailwind

Todos los estilos del proyecto se manejarán con la ayuda de [Taildwind](https://tailwindcss.com/) y **PostCSS**. En los archivos **SFC** de Vue, se puede usar una sintaxis similar a las de SCCS:

```html
<style scoped lang="postcss">
    .component-name {
        &__element {
            @apply bg-red-400;
        }
    }
</style>
```

## Manejo de estilos

Para los estilos de cada componente se usa la metodología [BEM](https://getbem.com/) y todos irán siempre en la etiqueta `<style scoped lang="postcss"></style>`.

Puede haber **excepciones** donde se necesiten tener estilos computados, en cuyo caso la lógica de los mismos se debe ejecutar dentro del setup.

```html
<template>
    <div class="header" :class="classes">
        <div class="header__container">
            The Header
        </div>
    </div>
</template>

<script setup lang="ts">
    interface HeaderProps = {
        isDark: boolean;
    } 

    const props = defineProps<HeaderProps>()

    const classes = computed(() => ({ 'header--dark' : props.isDark }))
</script>

<style scoped lang="postcss">
    .header {
        @apply text-slate-900;

        &__container {
            @apply container;
        }

        &--dark {
            @apply text-slate-200;
        }
    }
</style>
```

## Content Models

En Contentful, todos los content models deberían tener como ID el mismo nombre que el componente (adapter) en Vue. Ejemplo:

```bash
TheFooter.tsx => Content Model ID: TheFooter
TheHeader.tsx => Content Model ID: TheHeader
```

## Componentes

### Types

Los types pueden ser generados con el siguiente comando:

```bash
npm run contentful:generate-types
```
Esto exportará toda el espacio de Contentful y creará los types basado en esa información. El contenido puede ser encontrado en **/contentful**

Nota: Debería correrse el comando anterior cada vez que sea crea un content model o se actualiza uno.

### Components

Los componentes se cargan dinámicamente dependiendo de la información que envíe el gestor de contenidos [Contentful](https://www.contentful.com/).

Todos los componentes que se carguen dinámicamente deben ser registrados globalmente para que Nuxt pueda reconocerlos. Por lo anterior, deben estar localizados en la carpeta:

```bash
components/global
```

Para el nombramiento, es necesario usar nombres compuestos para que no haya conflictos con los tags nativos de HTML. Para el proyecto, los componentes tendrán como prefijo "The".

```bash
TheHeaderUI.vue
TheFooterUI.vue
```

Hay dos tipos de componentes en el proyecto: **UI Components** y **Adapters (Functional Components)**

### UI Components

Son los componentes que incluyen exclusivamente la UI de la feature que se esté desarrollando. Son agnosticos frente al gestor de contenido que se use.

Las props deben estar correctamente tipeadas y en un archivo independiente para que el Adapter las pueda usar.

Este componente nunca se debe usarse directamente por algo más que no sea el Adapter.

TheFooterUI.vue:

```html
<script setup lang="ts">

import type { TheFooterUIProps } from './TheFooterUIProps'

defineProps<TheFooterUIProps>()

</script>
```

TheFooterUIProps.ts:

```ts
export interface TheFooterUIProps {
    title: string;
}
```

### Adapter Component

Es un componente funcional que no maneja estado alguno. Es el intermediario entre **Contentful** y la UI. Se encarga de transformar la información que recibe del gestor de contenidos en el formato definido por las props del UI Component.

Las props de este componente se definen usando el autogenerador de types.

```bash
npm run contentful:generate-types
```

```ts
import type { FunctionalComponent } from 'vue'

import type { TheHeaderUIProps } from './TheHeaderUIProps'
import { TheHeaderUI } from '#components'
import { TypeTheHeader } from 'contentful/types'

/**
 *
 * @param props The props object received by the content manager
 * @returns The Vue UI component with transformed data
 */
const TheHeader: FunctionalComponent<TypeTheHeader<'WITHOUT_UNRESOLVABLE_LINKS', ''>> = (
  props
) => {
  const dataUI: TheHeaderUIProps = {
    src: props.fields.logo?.fields.file?.url || '',
    alt: props.fields.title || props.fields.logo?.fields.description
  }

  return (
    <TheHeaderUI {...dataUI} />
  )
}

export default TheHeader
```

## SWR - Stale-while-revalidate

Este patrón de diseño consiste entregar la versión en caché mientras se regenera una nueva versión en el servidor (SSR). Para ello, se establece un límite de tiempo.

El flujo sería el siguiente:

1. Se establece un tiempo de revalidación de 60 segundos.
2. Nuxt genera el primer build y almacena en caché las rutas predefinidas si estas existen.
3. Un usuario visita la ruta /ejemplo.
4. El servidor responde con lo que haya almacenado en caché.
5. El servidor evalua si, desde el último renderizado de /ejemplo ha pasado más de 60 segundos.
   1. Si no ha pasado más de 60 segundos, no regenera nada y sigue enviando lo que hay en caché.
   2. Si ha pasado más de 60 segundos, regenera la ruta /ejemplo y actualiza el caché con esta nueva versión.
6. En todos los requests posteriores, el servidor realiza este mismo proceso (4-5).

La implementación de este patrón de diseño, en herramientas como Nuxt o Next, se denomina **ISR - Incremental Static Regeneration**

En el caso de Nuxt, se implementa de la siguiente manera:

```ts
export default defineNuxtConfig({
  routeRules: {
    // Enable stale-while-revalidate
    '/**': { swr: 60 }
  },
})
```

## SSG - Static Site Generation

Este enfoque se centra en generar todas las rutas durante el build del sitio web. No hay SSR, por lo que todo el contenido es estático.

En Nuxt es posible hacerlo de la siguiente manera:

```ts
export default defineNuxtConfig({
  ssr: true,
  nitro: {
     prerender: {
       routes: ['/the-route']
     }
   }
})
```

O usando rutas generadas dinámicamente desde un API:

```ts
export default defineNuxtConfig({
  ssr: true,
  hooks: {
    async 'nitro:config' (nitroConfig) {
      const slugs = await getRoutes()

      nitroConfig.prerender?.routes?.push(...slugs)
    }
  }
})

const getRoutes = async () => {
  const response = await fetch('https://api/routes')
  const data: Array<{ createdAt: string, route: string; id: string }> = await response.json()
  const routes = data.map(route => route.route)
  return routes
}
```

Posteriormente, se puede regenerar usando el comando

```bash
npm run generate
```

Es necesario tener en cuenta que no es posible regenerar solo una ruta. Este proceso regenera todas las rutas, incluso si solo una de ellas tiene información actualizada.
