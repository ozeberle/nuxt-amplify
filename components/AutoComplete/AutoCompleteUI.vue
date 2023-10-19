<template>
  <div class="autocomplete">
    <label for="search" class="title">{{ title }}</label>
    <div class="relative w-full">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <IconUI :name="iconLeft" />
      </div>
      <input
        v-model="searchTerm"
        type="text"
        class="bg-gray-50 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
        :placeholder="placeholder"
        required
        @keyup.enter="onSelected(null)"
      >
      <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3" @click="onRemoveItem">
        <IconUI v-show="searchTermSelected" name="close" />
        <IconUI v-show="!searchTermSelected" :name="iconRight" />
      </button>
      <ul
        v-if="searchTerm.length && !searchTermSelected"
        class="w-full rounded bg-white border border-gray-300  space-y-1 absolute z-10"
      >
        <li v-if="searchItems.length == 0" class="px-1 pt-1 pb-2 font-semibold ">
          Sin resultados
        </li>
        <li
          v-for="item in searchItems"
          :key="item.title"
          class="cursor-pointer hover:bg-gray-100 p-2"
          @click="onSelected(item)"
        >
          <div class="items">
            <div class="items-title">
              {{ item.title }}
            </div>
            <div class="items-subtitle">
              {{ item.subtitle }}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="helptext">
      <IconUI name="help_outline" />
      <span for="voice-search">{{ helpText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { AutoCompleteUIProps, ItemsUIProps } from './AutoCompleteUIProps'
import { IconUI } from '#components'

const props = withDefaults(defineProps<AutoCompleteUIProps>(), {
  iconLeft: 'flight_takeoff',
  iconRight: 'expand_down',
  items: Array<ItemsUIProps>
})

const emit = defineEmits(['change'])

const _searchTerm = ref('')

const searchTerm = computed<string>({
  get () {
    return _searchTerm.value
  },

  set (newValue:string) {
    searchTermSelected.value = false
    _searchTerm.value = newValue
  }
})
const searchTermSelected = ref(false)

const searchItems = computed(() => {
  if (searchTerm.value === '') {
    return []
  }

  const result = props.items.filter((i: ItemsUIProps) => {
    if (i.title.toLowerCase().includes(searchTerm.value.toLowerCase())) {
      return i
    }
    return false
  })
  return result
})

function onRemoveItem () {
  searchTermSelected.value = false
  searchTerm.value = ''
}

function onSelected (item: ItemsUIProps | null) {
  if (item) {
    searchTerm.value = item.title
    searchTermSelected.value = true
    emit('change', item)
  } else {
    const _item = searchItems.value[0]
    if (_item) {
      searchTerm.value = _item.title
      searchTermSelected.value = true
      emit('change', _item)
    }
  }
}

</script>

<style lang="postcss" scoped>
.autocomplete {
    @apply py-4;
    & .title {
      @apply py-2;
      @apply text-[14px];
    }

    & input {
        @apply text-[16px] mt-1;
        @apply border border-solid border-[--primary-color] rounded-md
    }
    & .items {
        @apply text-[14px];

        & .items-title{
            @apply font-semibold;
        }
        & .items-subtitle{

        }
    }
    & .helptext{
      @apply flex items-center pt-1;

      span{
        @apply text-[12.8px];
      }
    }
  }

</style>
