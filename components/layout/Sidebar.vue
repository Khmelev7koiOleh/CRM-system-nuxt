<script setup lang="ts">
import { useAuthStore, useIsLoadingStore } from "~/store/auth.store";

const isLoadingStore = useIsLoadingStore();
const store = useAuthStore();
const router = useRouter();

const logout = async () => {
  isLoadingStore.set(true);
  await account.deleteSession("current");
  store.clear();
  router.push("/login");
  isLoadingStore.set(false);
};
</script>

<template>
  <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
    <NuxtLink to="/" class="mb-10 block">
      <NuxtImg width="100px" src="/icon-green.png" class="mx-auto" />
    </NuxtLink>

    <button
      class="absolute top-5 right-5 transition-colors hover:text-purple-400"
    >
      <Icon name="line-md:log-out" size="20" @click="logout" />
    </button>

    <!-- Include LayoutMenu component here, if intended -->
    <LayoutMenu />
  </aside>
</template>

<style scoped></style>
