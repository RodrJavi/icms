<script lang="ts" setup>
import type { Database } from "@/types/supabase";

const route = useRoute();
const supabase = useSupabaseClient<Database>();

// this may be a problem with reactivity change to computed if it doesn't work
const { data } = await useAsyncData(route.params.id.toString(), async () => {
  const { data, error } = await supabase.from("articles").select().match({
    id: route.params.id,
  });

  return data;
});
</script>

<template>
  <div>
    <h1>Article</h1>
    <p>{{ data }}</p>
  </div>
</template>
