<script lang="ts" setup>
import type { Database } from "@/types/supabase";

const supabase = useSupabaseClient<Database>();

const title = ref("");
const body = ref("");

async function submit() {
  const { error } = await supabase
    .from("articles")
    .insert({ title: title.value, body: body.value });

  if (error) {
    console.error(error);
  } else {
    console.log("Article created");
  }
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <header class="flex items-end justify-between p-2 border-b">
      <h1 class="text-2xl font-semibold">New Article</h1>
      <Button type="submit" form="create-article">Create article</Button>
    </header>

    <main class="grid grid-cols-2 gap-2 flex-1">
      <form
        @submit.prevent="submit()"
        class="border-r px-4"
        id="create-article">
        <JInput label="Title" type="text" v-model="title" />
        <JTextArea label="Body" v-model="body" />
        <input type="file" name="" id="" />
      </form>

      <div class="p-2">
        <p>
          {{ body }}
        </p>
      </div>
    </main>
  </div>
</template>
