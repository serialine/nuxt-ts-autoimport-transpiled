<script lang="ts">
// import { ref } from 'vue';
// import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const a = ref();
    async function b() {
      return await Promise.resolve();
    }
    return { a, b };
  },
});
</script>

<template>
  <div class="container">{{ a }} test</div>
</template>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
