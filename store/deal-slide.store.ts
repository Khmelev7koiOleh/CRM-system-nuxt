import type { ICard } from "~/components/kanban/kanban.types";

const defaultValue: { card: ICard | null; isOpen: boolean } = {
  card: null,
  isOpen: false,
};

export const useDealSlideStore = defineStore("deal-slide", {
  state: () => defaultValue,
  actions: {
    clear() {
      this.$patch(defaultValue);
    },
    set(card: ICard) {
      const mutableCard = { ...card }; // Create a shallow copy to make it mutable
      mutableCard.status = "newStatus"; // Modify the copy
      this.$patch({ card: mutableCard, isOpen: true }); // Update the store with the new card
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
});
