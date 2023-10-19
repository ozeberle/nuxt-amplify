<template>
  <div ref="componentRef" class="dropdown-passenger">
    <button class="dropdown-passenger__button" type="button" @click="showButtton">
      {{ passengerText }} {{ passengerCount }} <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div v-show="show" class="dropdown-passenger__content">
      <ul>
        <li v-for="(value,key) in passenger" :key="key" class="dropdown-passenger__content__li">
          <div class="dropdown-passenger__content__li__title-item">
            <span>{{ value.title }}</span>
            <span>{{ value.subtitle }}</span>
          </div>
          <div class="dropdown-passenger__content__li__button">
            <button :disabled="validateButton(value)" @click="setPassengerItem(value.type,-1)">
              <IconUI name="circle_minus" />
            </button>
            {{ getPassengerTextItem(value.type) }}
            <button :disabled="validateButtonRigth(value) || validateMaxCount" @click="setPassengerItem(value.type,1)">
              <IconUI name="circle_plus" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DropdownPassengerUIProps, ItemPassengerProps, TypePassenger } from './DropdownPassengerUIProps'
import { IconUI } from '#components'

defineProps<DropdownPassengerUIProps>()
const _aChilds = [TypePassenger.Baby, TypePassenger.BabySeat]
const passenger = ref<Array<ItemPassengerProps>>([{
  count: 1,
  title: 'Adulto',
  subtitle: '(16+)',
  type: TypePassenger.Adult
},
{
  count: 0,
  title: 'Joven',
  subtitle: '(12-15)',
  type: TypePassenger.Young
},
{
  count: 0,
  title: 'Niño',
  subtitle: '(2-11)',
  type: TypePassenger.Child
}, {
  count: 0,
  title: 'Bebé',
  subtitle: '(en el regazo)',
  type: TypePassenger.Baby
},
{
  count: 0,
  title: 'Bebé',
  subtitle: '(in Seat)',
  type: TypePassenger.BabySeat
}])

const show = ref<boolean>(false)
const componentRef = ref()
useDetectOutsideClick(componentRef, () => {
  show.value = false
  emit('change', passenger.value)
})
const emit = defineEmits(['change'])

const showButtton = () => {
  show.value = !show.value
}
// const onSave = () => {
//   emit('change', inputValue.value)
// }
const passengerText = computed(() => {
  const _totalP = useSumBy(passenger.value, p => p.count)

  return _totalP === 1 ? 'Pasajero' : 'Pasajeros'
})
const passengerCount = computed(() => {
  const _totalP = useSumBy(passenger.value, p => p.count)

  return _totalP
})

const validateMaxCount = computed(() => passengerCount.value === 9)

const countBabys = computed(() => {
  return useSumBy(useFilter(passenger.value, (j:ItemPassengerProps) => _aChilds.includes(j.type)), i => i.count)
})
const countAdult = computed(() => {
  return useSumBy(useFilter(passenger.value, (j:ItemPassengerProps) => j.type === TypePassenger.Adult), i => i.count)
})

const validateButton = (value: ItemPassengerProps) => {
  let minAdult = false
  switch (value.type) {
    case TypePassenger.Adult:
      minAdult = (value.count === 1)
      minAdult = (countAdult.value === countBabys.value)

      return minAdult

    default:
      return value.count === 0
  }
}
const validateButtonRigth = (value: ItemPassengerProps) => {
  let minBaby = false
  switch (value.type) {
    case TypePassenger.Baby:
    case TypePassenger.BabySeat:

      minBaby = (countAdult.value === countBabys.value)

      return minBaby
    default:
      return value.count === 9
  }
}

const setPassengerItem = (key: TypePassenger, count: number) => {
  if (passengerCount.value === 9 && count === 1) { return }

  const _item = useFind(passenger.value, (item: ItemPassengerProps) => item.type === key)
  if (_item) {
    const _result = _item.count + count
    if (_item.type === TypePassenger.Adult) {
      if ((countAdult.value + count) >= countBabys.value && _result > 0) { _item.count = _item.count + count }
    } else if (_item.type === TypePassenger.Baby || _item.type === TypePassenger.BabySeat) {
      if (countAdult.value >= (countBabys.value + count) && _result >= 0) {
        _item.count = _item.count + count
      }
    } else if (_result >= 0) { _item.count = _item.count + count }
  }
}

const getPassengerTextItem = (key: TypePassenger) => {
  const _item = useFind(passenger.value, (item: ItemPassengerProps) => item.type === key)
  return _item?.count
}

</script>

<style lang="postcss" scoped>
.dropdown-passenger {
  @apply relative;

  &__button{
    @apply text-[14px];
    @apply border rounded-sm border-[#21212133] border-solid;
    @apply rounded-lg text-sm py-[4px] px-[8px] text-center inline-flex items-center;
  }

  &__content {
    @apply absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow p-[12px] w-[207px];

    &__li{
      @apply grid grid-cols-2 items-center px-[8px] py-[4px];

      &__title-item {
        @apply flex flex-col;

        & :nth-child(1){
          @apply text-[14px] font-normal;
        }
        & :nth-child(2){
          @apply text-[12px];
        }
      }
      &__button {
        @apply flex justify-around;

      }
    }

    & button{
      @apply  border-0;
    }

    & button[disabled] svg{
      color: #666666;
    }

  }

}

</style>
