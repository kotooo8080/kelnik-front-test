<template>
  <h1>Квартиры</h1>
  <div class="main">
    <div class="main_flats-blk">
      <SortingList />
      <FlatsList />
    </div>
    <div class="main_filters-blk">
      <FiltersBlk />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFlatsStore } from '~/stores/flats';
const flatsStore = useFlatsStore();

// Подгружаем данные перед рендером страницы
await flatsStore.fetchFlats();
</script>

<style lang="sass" scoped>
.main
  display: flex
  flex-direction: row
  justify-content: space-between
  column-gap: 80px

.main_flats-blk
  width: calc(69% - 80px)
.main_filters-blk
  max-width: 399px
  width: 100%

@media (max-width: 1160px)
  .main
    column-gap: 40px
  .main_flats-blk
    width: calc(69% - 40px)
    min-width: 520px
</style>
