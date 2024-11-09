<script setup lang="ts"></script>

<template>
  <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
    <NuxtLink to="/" class="mb-10 block">
      <NuxtImg width="100px" src="/favicon.ico" class="mx-auto" />
    </NuxtLink>

    <!-- Uncomment the following line if the UiButton component is defined -->
    <!-- <UiButton>Send</UiButton> -->

    <button
      class="absolute top-5 right-5 transition-colors hover:text-purple-400"
    >
      <Icon name="line-md:log-out" size="20" />
    </button>

    <!-- Include LayoutMenu component here, if intended -->
    <LayoutMenu />
  </aside>
</template>

<style scoped></style>
