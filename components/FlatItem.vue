<template>
  <div class="flat-item">
    <FlatIcon class="flat-item_icon"/>
    <div class="flat-item_info-wrapper">
      <div class="flat-item_info">
        <div class="flat-item_name">{{ flat.name }}</div>
      </div>
      <div class="flat-item_elems">
        <div class="flat-item_el">
          {{ flat.square }}
        </div>
        <div class="flat-item_el">
          {{ flat.floor }}<span>из 17 <span class="flat-item_el_additional-info">этаж</span></span>
        </div>
        <div class="flat-item_el">
          {{ flat.price }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FlatIcon from '~/assets/images/flat.svg';
import type { Flat } from '../types/flat';

defineProps<{ flat: Flat }>();
</script>

<style lang="sass" scoped>
@use "../assets/styles/variables"

.flat-item
  display: flex
  justify-content: space-between
  width: 100%
  padding: 16px 0 24px
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1)
.flat-item_icon
  flex-shrink: 0
  padding: 9px 7px 8px
.flat-item_info-wrapper
  display: flex
  width: calc(100% - 100px)
.flat-item_info
  display: flex
  flex-direction: row
  width: 43%
.flat-item_el_additional-info
  display: none
.flat-item_elems
  display: flex
  flex-direction: row
  column-gap: 20px
  width: 57%
.flat-item_name
  min-width: 140px
.flat-item_el
  display: flex
  flex: 0 1 120px
  column-gap: 4px
  max-width: 120px
  min-width: 0
  span
    color: rgba(11, 23, 57, 0.2)

@media (max-width: 1160px)
  .flat-item
    font-size: 14px
@media (max-width: 960px)
  .flat-item
    flex-direction: row-reverse
    margin-bottom: 4px
    padding: 16px 24px
    
    box-shadow: unset
    box-sizing: border-box
    border: 1px solid rgba(0, 0, 0, 0.1)
    border-radius: 8px

    background: rgba(255, 255, 255, 1)
    font-size: 14px
  .flat-item_info-wrapper
    flex-direction: column
  .flat-item_elems
    width: 100%
  .flat-item_el
    flex: unset
  .flat-item_name
    margin-bottom: 16px
  .flat-item_el_additional-info
    display: inline-flex
</style>
