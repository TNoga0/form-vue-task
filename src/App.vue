<template>
  <div id="app">
    <DynamicForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DynamicForm from './components/DynamicForm.vue';

export default defineComponent({
  components: {
    DynamicForm
  }
});
</script>