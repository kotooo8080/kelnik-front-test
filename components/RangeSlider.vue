<template>
  <div class="range-slider" ref="sliderRef">
    <div class="range-slider_track"></div>
    <div class="range-slider_range" :style="rangeStyle"></div>

    <div
      class="range-slider_thumb __low"
      :style="{ left: fromPercent + '%' }"
      @mousedown.prevent="startDrag('from', $event)"
    ></div>

    <div
      class="range-slider_thumb __high"
      :style="{ left: toPercent + '%' }"
      @mousedown.prevent="startDrag('to', $event)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Ref } from 'vue';

type RangeValue = [number, number];

const sliderRef = ref<HTMLDivElement | null>(null);

const props = defineProps<{
  min?: number
  max?: number
  modelValue: RangeValue
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: RangeValue): void
}>();

// Локальная реактивная копия диапазона
const localValue = ref<RangeValue>([...props.modelValue]);

// синхронизация локальной копии с родителем
watch(
  () => props.modelValue,
  (val) => {
    if (val[0] !== localValue.value[0] || val[1] !== localValue.value[1]) {
      localValue.value = [...val];
      from.value = val[0];
      to.value = val[1];
    }
  }
);

// Также синхронизируем внутренние from/to с локальной копией
const from = ref(localValue.value[0]);
const to = ref(localValue.value[1]);

watch([from, to], () => {
  const newVal: RangeValue = [from.value, to.value];
  if (newVal[0] !== localValue.value[0] || newVal[1] !== localValue.value[1]) {
    localValue.value = newVal;
    emit('update:modelValue', newVal);
  }
});

// Вычисляем проценты для отрисовки ползунков
const fromPercent = computed(() => ((from.value - (props.min ?? 0)) / ((props.max ?? 100) - (props.min ?? 0))) * 100);
const toPercent = computed(() => ((to.value - (props.min ?? 0)) / ((props.max ?? 100) - (props.min ?? 0))) * 100);

const rangeStyle = computed(() => ({
  left: fromPercent.value + '%',
  width: toPercent.value - fromPercent.value + '%'
}));

// Перетаскивание ползунков
let dragging: 'from' | 'to' | null = null;

const onMouseMove = (e: MouseEvent) => {
  if (!dragging) return;
  const slider = sliderRef.value;
  if (!slider) return;

  const rect = slider.getBoundingClientRect();
  let percent = (e.clientX - rect.left) / rect.width;
  percent = Math.max(0, Math.min(1, percent));

  const value = Math.round((props.min ?? 0) + percent * ((props.max ?? 100) - (props.min ?? 0)));

  if (dragging === 'from') from.value = Math.min(value, to.value);
  else if (dragging === 'to') to.value = Math.max(value, from.value);
};

const onMouseUp = () => {
  dragging = null;
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
};

const startDrag = (handle: 'from' | 'to', e: MouseEvent) => {
  dragging = handle;
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

// Если props.modelValue изменится извне, обновляем локальную копию
watch(
  () => props.modelValue,
  (val) => {
    localValue.value = [...val];
    from.value = val[0];
    to.value = val[1];
  }
);
</script>

<style lang="sass" scoped>
@use "../assets/styles/variables"

.range-slider
  position: relative
  width: 100%
  height: 24px
  user-select: none

.range-slider_track
  position: absolute
  top: 50%
  left: 0
  right: 0
  height: 3px

  border-radius: 2px
  background: variables.$light-grey
  transform: translateY(-50%)

.range-slider_range
  position: absolute
  top: 50%
  height: 3px

  border-radius: 3px
  background: variables.$accent-green
  transform: translateY(-50%)

.range-slider_thumb
  position: absolute
  top: 50%
  width: 8px
  height: 8px

  border: 3px solid variables.$accent-green
  border-radius: 50%
  background: variables.$accent-green
  
  transform: translate(-50%, -50%)
  cursor: pointer
  z-index: 2
</style>