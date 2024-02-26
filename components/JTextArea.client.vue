<script lang="ts" setup>
const props = defineProps<{
  label: string;
  placeholder?: string;
}>();

const modelValue = defineModel({ default: "" });
</script>

<template>
  <label class="flex flex-col">
    <span class="block">{{ label }}</span>
    <textarea
      class="border border-gray-300 rounded-md px-2 py-1 h-40"
      :placeholder="props.placeholder"
      v-model="modelValue">
    </textarea>
  </label>
</template>
