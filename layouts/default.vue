<template>
  <div class="default-layout">
    <div class="default-layout_content">
      <slot />
      <button v-if="isVisible" @click="scrollToTop" class="default-layout_btn">
        <LongArrowIcon />
      </button>
    </div>
  </div>
</template>

<script setup>
import LongArrowIcon from '~/assets/images/long-arrow.svg';
import { useScrollToTop } from "@/composables/useScrollToTop";
const { isVisible, scrollToTop } = useScrollToTop(0);
</script>

<style lang="sass" scoped>
@use "../assets/styles/variables"

.default-layout
  position: relative
  display: flex
  flex-direction: row
  justify-content: center
  padding: 96px 80px
.default-layout_content
  width: 100%
  max-width: 1280px
.default-layout_btn
  position: absolute
  bottom: 32px
  right: 32px
  width: 40px
  height: 40px

  border: none
  border-radius: 50%
  background: unset
  background-image: linear-gradient(45deg, #AEE4B2, #95D0A1)

@media (max-width: 1160px)
  .default-layout
    padding: 48px 54px
</style>
