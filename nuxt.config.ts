// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // https://supabase.nuxtjs.org/
    "@nuxtjs/supabase",

    // https://tailwindcss.nuxtjs.org/
    "@nuxtjs/tailwindcss",
  ],
});
