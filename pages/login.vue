<script setup lang="ts">
import { useAuthStore, useIsLoadingStore } from "~/store/auth.store";
import { v4 as uuid } from "uuid";
import { useSeoMeta, useRouter, ref, watch } from "#imports"; // Ensure to import these as needed

useSeoMeta({
  title: "Login",
});

const emailRef = ref("");
const passwordRef = ref("");
const nameRef = ref("");

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

// Function to handle login
const login = async () => {
  try {
    isLoadingStore.set(true);
    await account.createEmailPasswordSession(emailRef.value, passwordRef.value);

    const response = await account.get();
    if (response) {
      authStore.set({
        email: response.email,
        status: true,
        name: response.name,
      });
      await router.push("/");
    }
  } catch (error) {
    console.error("Login error:", error); // Handle error appropriately
  } finally {
    isLoadingStore.set(false);
  }
};

// Function to handle registration
const register = async () => {
  try {
    isLoadingStore.set(true);
    await account.create(
      uuid(), // Generate a unique ID for the user
      emailRef.value, // Ensure email is correctly assigned to the second argument
      passwordRef.value, // Password as the third argument
      nameRef.value // Name as the optional fourth argument
    );
    await login(); // Log in automatically after registration
  } catch (error) {
    console.error("Registration error:", error); // Handle error appropriately
  } finally {
    isLoadingStore.set(false);
  }
};

// Watcher for debugging email input (optional)
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
          type="text"
          class="mb-4"
        />
        <div class="flex justify-center items-center gap-5">
          <UiButton
            type="button"
            class="bg-gray-800 text-white rounded hover:bg-gray-700"
            @click="login"
            >Login</UiButton
          >
          <UiButton
            type="button"
            class="bg-gray-800 text-white rounded hover:bg-gray-700"
            @click="register"
            >Register</UiButton
          >
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
