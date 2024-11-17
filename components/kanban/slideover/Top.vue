<script setup lang="ts">
import dayjs from "dayjs";
import { useDealSlideStore } from "~/store/deal-slide.store";

const store = useDealSlideStore();
</script>

<template>
  <div class="border-border bg-black/20 rounded p-3">
    <div class="uppercase bold text-xl mb-4">About deal</div>
    <KanbanSlideoverLabel label-text="name">
      <h2>{{ store.card?.name }}</h2>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="price">
      {{ convertCurrency(store.card?.price || 0) }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="status">
      <UiBadge variant="outline">
        {{ store.card?.status }}
      </UiBadge>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="customer">
      {{ store.card?.companyName }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="date">
      {{ dayjs(store.card?.$createdAt).format("DD/MM/YYYY") }}
    </KanbanSlideoverLabel>
  </div>
</template>

<style scoped></style>
