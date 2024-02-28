import tailwindTypography from "@tailwindcss/typography";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  tailwindcss: {
    config: {
      plugins: [tailwindTypography],
    },
  },
  modules: [
    // https://supabase.nuxtjs.org/
    "@nuxtjs/supabase",

    // https://tailwindcss.nuxtjs.org/
    "@nuxtjs/tailwindcss",

    "nuxt-monaco-editor",
  ],
});
