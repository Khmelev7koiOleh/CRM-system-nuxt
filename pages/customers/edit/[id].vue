<script setup lang="ts">
import { storage, DB } from "@/utils/appwrite"; // Import appwrite services
import { v4 as uuid } from "uuid"; // Import uuid for unique file ids
import { useMutation, useQuery } from "@tanstack/vue-query";
import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from "@/utils/app.constants";
import type { ICustomer } from "~/types/deals.types";
import { account } from "~~/utils/appwrite";

const config = useRuntimeConfig();
const endpoint = config.public.appwriteEndpoint;
const projectId = config.public.appwriteProjectId;

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

interface ICustomerFormState
  extends Pick<ICustomer, "avatar_url" | "email" | "name" | "from_source"> {}

const router = useRouter();
useHead({
  title: "Edit Customer | CRM System",
});

const route = useRoute();
const customerId = route.params.id as string;

const { handleSubmit, defineField, setFieldValue, setValues, values } =
  useForm<ICustomerFormState>();

const { data, isSuccess } = useQuery({
  queryKey: ["getCustomer", customerId],
  queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId),
});

watch(isSuccess, () => {
  const initialData = data.value as unknown as ICustomerFormState;
  setValues({
    email: initialData.email,
    name: initialData.name,
    avatar_url: initialData.avatar_url,
    from_source: initialData.from_source,
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

const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
  mutationKey: ["uploadImage"],
  mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuid(), file),

  onSuccess(data) {
    const response = storage.getFileDownload(STORAGE_ID, data.$id);
    setFieldValue("avatar_url", response);
  },
});

const onSubmit = handleSubmit((values) => {
  mutate(values);
});

function handleFileChange(event: InputFileEvent) {
  const file = event.target.files?.[0];
  if (file) {
    uploadImage(file);
  }
}
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">
      <span class="mr-2">Editing</span>
      {{ (data as unknown as ICustomerFormState)?.name }}
    </h1>

    <form @submit="onSubmit" class="form">
      <UiInput
        placeholder="Apellation"
        v-model="name"
        v-bind="nameAttrs"
        type="text"
        class="input"
      />
      <UiInput
        placeholder="Email"
        v-model="email"
        v-bind="emailAttrs"
        type="text"
        class="input"
      />
      <UiInput
        placeholder="From"
        v-model="from_source"
        v-bind="from_sourceAttrs"
        type="text"
        class="input"
      />

      <img
        v-if="values.avatar_url || isUploadImagePending"
        :src="values.avatar_url"
        alt=""
        width="50"
        height="50"
        class="rounded-full my-4"
      />

      <div class="grid w-full max-w-sm items-center gap-1.5 input">
        <label>
          <div class="text-sm mb-2">Logo</div>
          <UiInput
            type="file"
            @change="handleFileChange"
            :disabled="isUploadImagePending"
          />
        </label>
      </div>

      <UiButton :disabled="isPending" variant="secondary" class="mt-3">
        {{ isPending ? "Loading..." : "Save" }}
      </UiButton>
    </form>
  </div>
</template>

<style scoped>
.input {
  @apply border-[#161c26] mb-4 placeholder:text-[#748092] focus:border-border transition-colors;
}
</style>
