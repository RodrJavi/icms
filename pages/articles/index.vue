<script lang="ts" setup>
import type { Database } from "@/types/supabase";

const client = useSupabaseClient<Database>();

const { data: articles } = await useAsyncData("articles", async () => {
  const { data } = await client.from("articles").select("id, head, created_by");

  return data;
});
</script>

<template>
  <h1>Articles</h1>

  <ul>
    <li v-for="article in articles" :key="article.id">
      <NuxtLink class="text-green-500" :to="`/articles/${article.id}`">
        {{ article.head }}
      </NuxtLink>
    </li>
  </ul>
</template>
