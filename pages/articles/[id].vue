<script lang="ts" setup>
import type { Database } from "@/types/supabase";

const route = useRoute();
const supabase = useSupabaseClient<Database>();

// this may be a problem with reactivity change to computed if it doesn't work
const { data } = await useAsyncData(route.params.id.toString(), async () => {
  const { data, error } = await supabase
    .from("articles")
    .select("created_at, title, body, profiles(full_name)")
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
</script>

<template>
  <article>
    <h1>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Non culpa ex at
      reiciendis. Totam nobis molestias assumenda dolor tempore alias.
    </h1>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum, excepturi?
    </p>
    <span>By {{ data?.profiles?.full_name }}</span>
    <span>Published {{ data?.created_at }}</span>
    <p>{{ data }}</p>
    {{ publishDate }}
  </article>
</template>
