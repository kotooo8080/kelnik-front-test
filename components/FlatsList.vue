<template>
  <div class="flats-list">
    <ul class="flats-list_flats">
      <li v-for="flat in visibleItems" :key="flat.id">
        <FlatItem :flat="flat" />
      </li>
    </ul>

    <button
      v-if="visibleCount < flatsStore.filteredFlats.length"
      class="btn"
      @click="showMore"
    >
      Загрузить еще
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFlatsStore } from '~/stores/flats'

const flatsStore = useFlatsStore()

const visibleCount = ref(5)

// Показываем только часть отфильтрованных квартир
const visibleItems = computed(() => {
  return flatsStore.filteredFlats.slice(0, visibleCount.value)
})

const showMore = () => {
  visibleCount.value += 20
}
</script>

<style lang="sass" scoped>
@use "../assets/styles/variables"

.flats-list_flats
  margin-bottom: 48px
</style>