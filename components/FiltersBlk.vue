<template>
  <div class="filters">
    <!-- Кнопки по комнатам -->
    <div class="filters_rooms">
      <button
        v-for="roomNum in 4"
        :key="roomNum"
        class="filters_room"
        :class="{
          '__active': roomNum === flatsStore.activeRoom,
          '__inactive': !flatsStore.availableRooms.includes(roomNum)
        }"
        @click="flatsStore.toggleRoom(roomNum)"
      >
        {{ roomNum }}к
      </button>
    </div>

    <!-- Цена -->
    <div class="filters_scale-wrapper">
      <span>Стоимость квартиры, <span class="ruble">₽</span></span>
      <div class="filters_scale">
        <div class="filters_scale_top">
          <div class="filters_scale_top_item">
            <span>от</span>
            <input
              type="number"
              v-model.number="flatsStore.priceRange[0]"
              :min="0"
              :max="flatsStore.priceRange[1]"
            />
          </div>
          <div class="filters_scale_top_item">
            <span>до</span>
            <input
              type="number"
              v-model.number="flatsStore.priceRange[1]"
              :min="flatsStore.priceRange[0]"
              :max="10000000"
            />
          </div>
        </div>
        <RangeSlider
          :min="0"
          :max="10000000"
          v-model="flatsStore.priceRange"
        />
      </div>
    </div>

    <div class="filters_scale-wrapper">
      <span>Площадь, м²</span>
      <div class="filters_scale">
        <div class="filters_scale_top">
          <div class="filters_scale_top_item">
            <span>от</span>
            <input
              type="number"
              v-model.number="flatsStore.squareRange[0]"
              :min="0"
              :max="flatsStore.squareRange[1]"
            />
          </div>
          <div class="filters_scale_top_item">
            <span>до</span>
            <input
              type="number"
              v-model.number="flatsStore.squareRange[1]"
              :min="flatsStore.squareRange[0]"
              :max="100"
            />
          </div>
        </div>
        <RangeSlider
          :min="0"
          :max="100"
          v-model="flatsStore.squareRange"
        />
      </div>
    </div>

    <!-- Сброс -->
    <button class="filters_btn" @click="flatsStore.resetFilters">
      Сбросить параметры <ClearIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useFlatsStore } from '~/stores/flats';
import ClearIcon from '~/assets/images/clear.svg';

const flatsStore = useFlatsStore();
</script>

<style lang="sass" scoped>
@use "../assets/styles/variables"

.filters
  margin-top: -55px
  padding: 40px
  border-radius: 10px
  background-image: linear-gradient(45deg, rgba(#AEE4B2, 0.3), rgba(#95D0A1, 0.3))
.filters_btn
  padding: 5px 16px 7px
  border: none
  background-color: transparent
.filters_rooms
  display: flex
  flex-direction: row
  flex-wrap: wrap
  column-gap: 16px
  margin-bottom: 24px
.filters_room
  display: flex
  align-items: center
  justify-content: center
  width: 44px
  height: 44px
  font-size: 16px
  border-radius: 50%
  background-color: variables.$white
  cursor: pointer

  &.__active
    color: variables.$white
    background-color: variables.$accent-green
    box-shadow: 0px 6px 20px 0px rgba(149, 208, 161, 1)
  &.__inactive
    pointer-events: none
    color: variables.$light-grey
.filters_scale-wrapper
  font-size: 14px
  font-weight: 400
  line-height: 20px
.filters_scale
  display: flex
  flex-direction: column
  margin: 8px 0 24px
.filters_scale_top
  display: flex
  flex-direction: row
  margin-bottom: 6px
.filters_scale_top_item
  display: flex
  align-items: flex-end
  flex: 1 1 0
  gap: 4px

  span
    flex-shrink: 0 
    font-size: 16px
    color: rgba(11, 23, 57, 0.2)

  input
    flex: 1 1 auto 
    min-width: 40px
    max-width: 100%
    background-color: transparent
    border: none
    font-size: 16px
  input[type=number]:focus
    outline: none
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button
    -webkit-appearance: none
    margin: 0
  input[type=number]
    -moz-appearance: textfield
  input[type=number]::-ms-clear,
  input[type=number]::-ms-reveal
    display: none
  span
    margin-right: 8px
    color: rgba(11, 23, 57, 0.2)

@media (max-width: 1024px)
  .filters_rooms
    row-gap: 8px

@media (max-width: 960px)
  .filters
    padding: 20px 19px
  .filters_scale-wrapper, .filters_btn
    font-size: 13px
  .filters_scale_top_item span
    font-size: 14px
</style>
