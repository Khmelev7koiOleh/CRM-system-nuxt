<script setup lang="ts">
import type { ICard, IColumn } from "~/components/kanban/kanban.types";
import { useKanbanQuery } from "~/components/kanban/useKanbanQuery";
import { convertCurrency } from "~/utils/converCurrency";
import dayjs from "dayjs";
import { tryResolveModule } from "nuxt/kit";
import type { EnumStatus } from "~/types/deals.types";

import { DB } from "~~/utils/appwrite";
import { COLLECTION_DEALS, DB_ID } from "~~/utils/app.constants";

import { useMutation } from "@tanstack/vue-query";
import { generateColumnStyle } from "~/components/kanban/generate-gradient";

import { useDealSlideStore } from "~~/store/deal-slide.store";

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useKanbanQuery();

const store = useDealSlideStore();

type TypeMutationVariables = {
  docId: string;
  status?: EnumStatus;
};

const { mutate } = useMutation({
  mutationKey: ["move card"],
  mutationFn: ({ docId, status }: TypeMutationVariables) =>
    DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
      status,
    }),

  onSuccess: () => {
    refetch();
  },
});

const handelDragStart = (card: ICard, column: IColumn) => {
  dragCardRef.value = card;
  sourceColumnRef.value = column;
};

function handleDragOver(event: DragEvent) {
  event.preventDefault();
}

function handleDrop(targetColumn: IColumn) {
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({ docId: dragCardRef.value.id, status: targetColumn.id });
  }
}
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-3xl mb-5">CRM-System</h1>

    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-10">
        <div
          v-for="(column, index) in data"
          :key="column.id"
          @dragover="handleDragOver"
          @drop="handleDrop(column)"
          class="min-h-screen"
        >
          <div
            class="rounded-md bg-slate-700 py-1 px-5 mb-3 text-center"
            :style="generateColumnStyle(index, data?.length)"
          >
            {{ column.name }}
          </div>

          <div>
            <KanbanCreateDeal :refetch="refetch" :status="column.id" />
            <UiCard
              class="mb-5"
              draggable="true"
              v-for="(card, index) in column.items"
              :key="card.id"
              @dragstart="handelDragStart(card, column)"
            >
              <UiCardHeader role="button" @click="store.set(card)">
                <UiCardTitle>{{ card.name }}</UiCardTitle>

                <UiCardDescription>{{
                  convertCurrency(card.price)
                }}</UiCardDescription>
              </UiCardHeader>
              <UiCardContent>Company {{ card.companyName }}</UiCardContent>
              <UiCardFooter>{{
                dayjs(card.$createdAt).format("DD.MM.YYYY")
              }}</UiCardFooter>
              <!-- <UiCardFooter>{{
                dayjs(card.$createdAt).fromNow()
              }}</UiCardFooter> -->
            </UiCard>
          </div>
        </div>
      </div>
      <KanbanSlideover />
    </div>
  </div>
</template>

<style scoped></style>
