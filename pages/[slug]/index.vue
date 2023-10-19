<template>
  <LayoutPage>
    <component :is="feature?.sys.contentType.sys.id!" v-for="feature in features" :key="feature?.sys.id" v-bind="feature" />
  </LayoutPage>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const route = useRoute()
const slug = route.params.slug as string

const { fetch } = useContentfulApi()
const data = await fetch(slug, locale.value, 'landingPageOd')

const title = computed(() => 'Kius')
const primaryColor = computed(() => data?.primaryColor)

useHeadSafe({
  title: title.value,
  meta: [
    {
      name: 'description',
      content: title.value
    }
  ]
})

useHead({
  bodyAttrs: {
    style: `--primary-color: ${primaryColor.value};`
  }
})

useServerSeoMeta({
  title: title.value,
  ogTitle: title.value,
  description: title.value,
  ogDescription: title.value
})

const features = computed(() => data?.features)

</script>
