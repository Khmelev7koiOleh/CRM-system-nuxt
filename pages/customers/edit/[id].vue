<script setup lang="ts">
import { storage } from "~~/utils/appwrite";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { v4 as uuid } from "uuid";

import {
  COLLECTION_CUSTOMERS,
  DB_ID,
  STORAGE_ID,
} from "~~/utils/app.constants";
import type { ICustomer } from "~/types/deals.types";

interface InputFileElement extends Event {
  target: HTMLInputElement;
}

interface ICustomerFormState
  extends Pick<ICustomer, "avatar_url" | "email" | "name" | "from_source"> {}

useSeoMeta({
  title: "Edit company | CRM-System",
});

const route = useRoute();
const customerId = route.params.id as string; // get the id from the route

const { handleSubmit, defineField, setFieldValue, setValues, values } =
  useForm<ICustomerFormState>({});

const { data, isSuccess } = useQuery({
  queryKey: ["get customer", customerId],
  queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId),
});

watch(isSuccess, () => {
  const initialData = data.value as unknown as ICustomerFormState;
  setValues({
    email: initialData.email,
    avatar_url: initialData.avatar_url,
    from_source: initialData.from_source || "",
    name: initialData.name,
  });
});

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [from_source, from_sourceAttrs] = defineField("from_source");

const { mutate, isPending } = useMutation({
  mutationKey: ["update customer", customerId],
  mutationFn: (data: ICustomerFormState) =>
    DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data),
});

const onSubmit = handleSubmit((values) => {
  mutate(values);
});

const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
  mutationKey: ["upload image"],
  mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuid(), file),

  /*************  ✨ Codeium Command ⭐  *************/
  /******  86b84b45-c777-4236-abd5-105da0087d1f  *******/
  onSuccess(data) {
    const response = storage.getFileDownload(
      STORAGE_ID,
      data.$id
    ) as unknown as {
      href: string;
    };
    setFieldValue("avatar_url", response.href);
  },
});
</script>
<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">
      Edit {{ (data as unknown as ICustomer)?.name }}
    </h1>
    <form action="" @submit="onSubmit" class="form">
      <UiInput
        v-model="values.name"
        v-bind="nameAttrs"
        type="text"
        placeholder="Name"
        class="input"
      />
      <UiInput
        v-model="values.email"
        v-bind="emailAttrs"
        type="email"
        placeholder="Email"
        class="input"
      />
      <UiInput
        v-model="values.from_source"
        v-bind="from_sourceAttrs"
        type="text"
        placeholder="Source"
        class="input"
      />

      <img
        v-if="values.avatar_url || isUploadImagePending"
        :src="values.avatar_url"
        alt=""
        width="50"
        height="50"
        class="rounded-full my-2"
      />
      <div class="grid w-full max-w-sm items-center gap-1.5 input">
        <label>
          <div class="text-sm mb-4">Logo</div>
          <UiInput
            type="file"
            :onchange="(e: InputFileElement) => e?.target.files?.length && uploadImage(e.target.files[0])"
            :disabled="isUploadImagePending"
          />
        </label>
      </div>
      <UiButton
        type="submit"
        variant="secondary"
        :disabled="isPending"
        class="btn mt-3"
        >{{ isPending ? "Saving..." : "Save" }}</UiButton
      >
    </form>
  </div>
</template>

<style scoped>
.input {
  @apply border-[#161c26] mb-4 placeholder:text-[#748092] p-2 focus:border-border transition-colors;
}
</style>
