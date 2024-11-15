<script setup lang="ts">
import type { ICard, IColumn } from "~/components/kanban/kanban.types";
import { useKanbanQuery } from "~/components/kanban/useKanbanQuery";
import { convertCurrency } from "~/utils/converCurrency";
import dayjs from "dayjs";
const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useKanbanQuery();

// watch(
//   () => data.value,
//   () => {
//     refetch();
//   }
// );
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-3xl mb-5">CRM-System</h1>

    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-10">
        <div v-for="(column, index) in data" :key="column.id">
          <div class="rounded-md bg-slate-700 py-1 px-5 mb-3 text-center">
            {{ column.name }}
          </div>

          <div>
            <KanbanCreateDeal :refetch="refetch" :status="column.id" />
            <UiCard
              class="mb-5"
              draggable="true"
              v-for="(card, index) in column.items"
              :key="card.id"
            >
              <UiCardHeader role="button">
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
    </div>
  </div>
</template>

<style scoped></style>
