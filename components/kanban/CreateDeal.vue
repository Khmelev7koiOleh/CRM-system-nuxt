<script setup lang="ts">
import { ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { v4 as uuid } from "uuid";
import { defineProps } from "vue";
import { DB_ID, COLLECTIONS_DEALS } from "~~/utils/app.constants";
import type { IDeal } from "~/types/deals.types";
import { useForm } from "vee-validate";
const isOpen = ref(false);

interface IDealFormState extends Pick<IDeal, "name" | "price"> {
  customer: {
    email: string;
    name: string;
  };
  status: string;
}

const props = defineProps({
  status: {
    type: String,
    default: "",
  },
  refetch: {
    type: Function,
  },
});

const { handleSubmit, defineField, handleReset } = useForm<IDealFormState>({
  initialValues: {
    status: props.status,
  },
});

const [name, nameAttrs] = defineField("name");
const [price, priceAttrs] = defineField("price");
const [customerEmail, customerEmailAttrs] = defineField("customer.email");
const [customerName, customerNameAttrs] = defineField("customer.name");

const { mutate, isPending } = useMutation({
  mutationKey: ["create a new deal"],
  mutationFn: (data: IDealFormState) =>
    DB.createDocument(DB_ID, COLLECTIONS_DEALS, uuid(), data),

  onSuccess(data) {
    props.refetch && props.refetch();
    handleReset();
  },
});

const onSubmit = handleSubmit((values) => {
  mutate(values);
});
</script>
<template>
  <div class="text-center mb-2">
    <button
      class="transition-all opacity-10 hover:text-purple-500 rounded-full"
    >
      <Icon
        v-if="isOpen"
        @click="isOpen = !isOpen"
        name="radix-icons:arrow-up"
        class="fade-in-100 fade-out-0"
        size="35"
      />

      <Icon
        v-if="!isOpen"
        @click="isOpen = !isOpen"
        name="radix-icons:plus-circled"
        class="fade-in-100 fade-out-0"
        size="35"
      />
    </button>
  </div>

  <form v-if="isOpen" class="form" @submit="onSubmit">
    <UiInput
      placeholder="Name"
      v-bind="nameAttrs"
      v-model="name"
      class="input"
      type="text"
    />
    <UiInput
      placeholder="Price"
      v-bind="priceAttrs"
      v-model="price"
      class="input"
      type="text"
    />
    <UiInput
      placeholder="Email"
      v-bind="customerEmailAttrs"
      v-model="customerEmail"
      class="input"
      type="email"
    />
    <UiInput
      placeholder="Company"
      v-model="customerName"
      v-bind="customerNameAttrs"
      class="input"
      type="text"
    />
    <button class="btn" :disabled="isPending">
      {{ isPending ? "Creating..." : "Create" }}
    </button>
  </form>
</template>

<style scoped>
.input {
  @apply border-[#161c26] placeholder:text-[#748092] rounded-md p-2 mb-2 focus:border-border transition-colors duration-300 ease-in-out;
}
.btn {
  @apply text-xs border py-1 px-2 border-[#161c26] hover:border-[#482c65] transition-colors text-[#aebed5] hover:text-white duration-300 ease-in-out;
}
.form {
  @apply mb-3 block;
  animation: show 0.3s ease-in-out;
}

@keyframes show {
  from {
    @apply border-[#a282c83d];
    transform: translateY(-35px);
    opacity: 0.4;
  }
  90% {
    @apply border-[#a282c83d];
  }
  to {
    @apply border-transparent;
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
