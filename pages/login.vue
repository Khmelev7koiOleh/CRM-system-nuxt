<script setup lang="ts">
import { useAuthStore, useIsLoadingStore } from "~/store/auth.store";

useSeoMeta({
  title: "Login",
});

const emailRef = ref("");
const passwordRef = ref("");
const nameRef = ref("");

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  isLoadingStore.set(true);
  await account.createEmailPasswordSession(emailRef.value, passwordRef.value);

  const response = await account.get();
  if (response) {
    authStore.set({
      email: response.email,
      status: true,
      name: response.name,
    });
  }
  emailRef.value = "";
  passwordRef.value = "";
  nameRef.value = "";

  await router.push("/");
  isLoadingStore.set(false);
};

watch(emailRef, () => {
  console.log(emailRef.value);
});
</script>
<template>
  <div class="p-10 flex justify-center items-center min-h-screen w-full">
    <div class="rounded bg-gray-900 w-1/4 p-5">
      <h1 class="text-2xl font-bold text-center mb-5">Login</h1>

      <form>
        <UiInput
          v-model="emailRef"
          placeholder="Email"
          type="email"
          class="mb-4"
        />
        <UiInput
          v-model="passwordRef"
          placeholder="Password"
          type="password"
          class="mb-4"
        />

        <UiInput
          v-model="nameRef"
          placeholder="Name"
          type="name"
          class="mb-4"
        />

        <div class="flex justify-center items-center gap-5">
          <UiButton
            type="button"
            class="bg-gray-800 text-white rounded hover:bg-gray-700"
            >Login</UiButton
          >
          <UiButton
            type="button"
            class="bg-gray-800 text-white rounded hover:bg-gray-700"
            >Register</UiButton
          >
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
