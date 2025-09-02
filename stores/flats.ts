import { defineStore } from 'pinia';
import type { Flat } from '../types/flat';

interface FlatsState {
  flats: Flat[]
  sortField: keyof Flat | null
  sortOrder: 'asc' | 'desc'
  activeRoom: number | null
  priceRange: [number, number]
  squareRange: [number, number]
};

export const useFlatsStore = defineStore('flats', {
  state: (): FlatsState => ({
    flats: [],
    sortField: null,
    sortOrder: 'asc',
    activeRoom: null,
    priceRange: [0, 10000000],
    squareRange: [0, 100]
  }),

  getters: {
    sortedFlats (state): Flat[] {
      if (!state.sortField) return state.flats;

      return [...state.flats].sort((a, b) => {
        let A = a[state.sortField as keyof Flat];
        let B = b[state.sortField as keyof Flat];

        A = parseFloat(String(A).replace(/\s/g, '').replace(',', '.'));
        B = parseFloat(String(B).replace(/\s/g, '').replace(',', '.'));

        if (state.sortOrder === 'asc') {
          return A > B ? 1 : A < B ? -1 : 0;
        } else {
          return A < B ? 1 : A > B ? -1 : 0;
        }
      })
    },

    filteredFlats (state): Flat[] {
      return this.sortedFlats.filter(f => {
        const square = parseFloat(f.square.replace(',', '.'));
        const price = parseInt(f.price.replace(/\s/g, ''), 10);

        const inRoom = state.activeRoom ? f.rooms === state.activeRoom : true;
        const inSquare = square >= state.squareRange[0] && square <= state.squareRange[1];
        const inPrice = price >= state.priceRange[0] && price <= state.priceRange[1];

        return inRoom && inSquare && inPrice;
      })
    },

    availableRooms (state): number[] {
      return [...new Set(state.flats.map(f => f.rooms))].sort((a, b) => a - b);
    }
  },

  actions: {
    async fetchFlats () {
      try {
        const flats = await $fetch<Flat[]>('/api/flats');
        this.flats = flats;
      } catch (err) {
        console.error('Ошибка при загрузке квартир:', err);
      }
    },
    setSort (field: keyof Flat) {
      if (this.sortField === field) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortField = field;
        this.sortOrder = 'asc';
      }
    },

    toggleRoom (room: number) {
      this.activeRoom = this.activeRoom === room ? null : room;
    },

    setPriceRange (range: [number, number]) {
      this.priceRange = range;
    },

    setSquareRange (range: [number, number]) {
      this.squareRange = range;
    },

    resetFilters () {
      this.activeRoom = null;
      this.priceRange = [0, 10000000];
      this.squareRange = [0, 100];
    }
  }
});
