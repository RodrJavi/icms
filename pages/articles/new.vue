<script lang="ts" setup>
import type { Database } from "@/types/supabase";
import { marked } from "marked";

const supabase = useSupabaseClient<Database>();

const head = ref("");
const subHead = ref("");
const editorString = ref("# hello");
const editorStringHtml = computed(() => marked(editorString.value));
const fileName = ref("test");

function changeFileName(e) {
  let path = e;
  let array = path.split("\\");
  fileName.value = array[array.length - 1];
}

async function submit() {
  const { error } = await supabase.from("articles").insert({
    head: head.value,
    subhead: subHead.value,
    body: editorString.value,
  });

  const photo = event.target.files[0];
  const { data } = await supabase.storage
    .from("images")
    .upload("cars/avatar1.png", photo, {
      cacheControl: "3600",
      upsert: false,
    });

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
        class="border-r px-4 flex flex-col"
        id="create-article">
        <JInput label="Head" type="text" v-model="head" />
        <JInput label="Subhead" type="text" v-model="subHead" />
        <!-- <JTextArea label="Body" v-model="body" /> -->
        <MonacoEditor v-model="editorString" lang="markdown" class="flex-1" />
        <input
          type="file"
          name="articleCover"
          id="coverPhoto"
          @change="
            (e) => {
              changeFileName(e.target.value);
            }
          " />
        {{ fileName }}
      </form>

      <div class="p-2 prose" v-html="editorStringHtml"></div>
    </main>
  </div>
</template>
