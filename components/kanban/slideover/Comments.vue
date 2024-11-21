<template>
  <div>
    <UiInput
      placeholder="Leave the comment"
      v-model="commentRef"
      @keyup.enter="writeComment"
    />

    <UiSkeleton v-if="isLoading" class="w-full h-[76-px] rounded mt-5" />
    <div
      v-else-if="card"
      v-for="comment in card?.comments"
      :key="comment.$id"
      class="flex items-start mt-5"
    >
      <Icon name="radix-icons:chat-bubble" size="25" class="mr-3 mt-1" />
      <div class="border-border bg-black/20 roundedp-3 w-full">
        <div class="text-sm mb-2">
          Comment {{ dayjs(comment.$createdAt).format("HH:mm") }}
          {{ comment.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import type { IDeal } from "~/types/deals.types";
import { useComments } from "./useComments";

import { useCreateComment } from "./useCreateComment";

const { data, refetch, isLoading } = useComments();
const { commentRef, writeComment } = useCreateComment({ refetch });

const card = data as unknown as IDeal;
</script>

<style scoped></style>
