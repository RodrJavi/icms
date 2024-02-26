<script lang="ts" setup>
import type { Database } from "@/types/supabase";

const client = useSupabaseClient<Database>();

const { data: articles } = await useAsyncData("articles", async () => {
  const { data } = await client
    .from("Articles")
    .select("id, title, created_at");

  return data;
});
</script>

<template>
  <h1>Articles</h1>

  <ul>
    <li v-for="article in articles" :key="article.id">
      <NuxtLink class="text-green-500" :to="`/articles/${article.id}`">
        {{ article.title }}
      </NuxtLink>
    </li>
  </ul>
</template>
