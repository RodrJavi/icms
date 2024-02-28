<script lang="ts" setup>
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");

const login = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (!error) {
    navigateTo("/");
  }
};
</script>

<template>
  <h2>Login</h2>

  <form @submit.prevent="login()">
    <JInput
      label="Email"
      type="email"
      placeholder="email@email.com"
      v-model="email" />

    <JInput label="Password" type="password" v-model="password" />

    <button type="submit">Log in</button>
  </form>
</template>
