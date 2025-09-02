export function useSortsConfig () {
  return [
    { id: 'square', name: 'S, м²', isActive: false, order: false },
    { id: 'floor', name: 'Этаж', isActive: false, order: false },
    { id: 'price', name: 'Цена, <span class="ruble">₽</span>', isActive: false, order: false }
  ];
};