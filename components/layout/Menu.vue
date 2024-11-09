<script setup lang="ts">
import { MENU_DATA } from "./menu.data";
</script>
<template>
  <div>
    <NuxtLink
      v-for="item in MENU_DATA"
      :key="item.name"
      :to="item.url"
      class="flex items-center gap-4 rounded-md p-3 hover:bg-accent hover:text-purple-800 cursor-pointer"
    >
      <Icon :name="item.icon" size="20" />
      <span>{{ item.name }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped></style>
