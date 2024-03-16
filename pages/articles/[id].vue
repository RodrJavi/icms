<script lang="ts" setup>
import type { Database } from "@/types/supabase";
import { marked } from "marked";

const route = useRoute();
const supabase = useSupabaseClient<Database>();

// this may be a problem with reactivity change to computed if it doesn't work
const { data } = await useAsyncData(route.params.id.toString(), async () => {
  const { data, error } = await supabase
    .from("articles")
    .select("created_at, head, subhead, body, profiles(full_name)")
    .match({
      id: route.params.id,
    })
    .single();

  if (error) navigateTo("/404");

  return data;
});

const preDate = computed(() => {
  if (!data.value) return new Date();
  return data.value.created_at;
});
const publishDate = useTimeAgo(preDate);

const formattedBody = computed(() => marked(data.value.body));
</script>

<template>
  <article>
    <h1 class="font-bold text-5xl">
      {{ data?.head }}
    </h1>
    <p class="font-semibold">
      {{ data?.subhead }}
    </p>
    <span>By {{ data?.profiles?.full_name }}</span>
    <span>Published {{ publishDate }}</span>
    <div class="p-2 prose" v-html="formattedBody"></div>
    <!-- <p>{{ data }}</p> -->
  </article>
</template>
