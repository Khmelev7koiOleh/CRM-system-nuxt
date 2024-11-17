<template>
  <div></div>
</template>

<script setup lang="ts">
import { useDealSlideStore } from "~/store/deal-slide.store";

const store = useDealSlideStore();

const isLocalOpen = computed({
  get: () => store.isOpen,
  set: (value) => {
    store.isOpen = value;
  },
});
</script>

<style scoped></style>
