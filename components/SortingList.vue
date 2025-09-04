<template>
  <div class="sorting">
    <div class="sorting_info">
      <span>Планировка</span>
      <span>Квартира</span>
    </div>
    <div class="sorting_info">
      <button
        v-for="sort in sorts"
        :key="sort.id"
        class="sorting_sort"
        :class="{ '__active': flatsStore.sortField === sort.id }"
        @click="flatsStore.setSort(sort.id)"
      >
        <span v-html="sort.name" />
        <span class="sorting_sort_arrows">
          <ArrowIcon
            class="sorting_sort_arrow"
            :class="{ '__active': flatsStore.sortField === sort.id && flatsStore.sortOrder === 'asc' }"
          />
          <ArrowIcon
            class="sorting_sort_arrow __reverse"
            :class="{ '__active': flatsStore.sortField === sort.id && flatsStore.sortOrder === 'desc' }"
          />
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowIcon from '~/assets/images/arrow.svg';
import { useSortsConfig } from '~/utils/sorts';
import { useFlatsStore } from '~/stores/flats';

const sorts = useSortsConfig();
const flatsStore = useFlatsStore();
</script>

<style lang="sass" scoped>
@use "../assets/styles/variables"

.sorting
  display: flex
  justify-content: space-between
  width: 100%
  margin-top: 48px
  padding-bottom: 16px
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1)

.sorting_info
  display: flex
  flex-direction: row
  column-gap: 20px
  width: calc(57% - 57px)

  font-size: 14px
  font-weight: 400
  line-height: 20px
.sorting_sort
  display: flex
  align-items: center
  column-gap: 8px
  flex: 0 1 120px
  
  max-width: 120px
  min-width: 0
  font-family: 'PT-Root-UI', sans-serif
  &.__active
    color: variables.$accent-green
.sorting_sort_arrows
  display: flex
  flex-direction: column
  row-gap: 2px
.sorting_sort_arrow
  fill: variables.$light-grey
  &.__active
    fill: variables.$accent-green
  &.__reverse
    transform: rotate(180deg)

@media (max-width: 960px)
  .sorting
    margin-top: 24px
    box-shadow: unset
  .sorting_info:first-child
    display: none
</style>
