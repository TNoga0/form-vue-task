<template>
  <div>
    <input type="text" id="search-input" v-model="searchText" @input="highlightSearch" placeholder="Search..." :class="{'highlight': isSearchHighlighted}" />

    <div v-for="(field, index) in fields" :key="index" class="input-group">
      <input
        type="text"
        v-model="field.value"
        @input="countVowels(index)"
        :class="{'highlight': field.isHighlighted}"
      />
      <span>{{ field.vowelCount }} vowels</span>
      <button class="remove-field-button" @click="removeField(index)" :disabled="fields.length === 1">Remove</button>
    </div>

    <button id="add-field-button" @click="addField" :disabled="fields.length >= 10">Add Field</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Field {
  value: string;
  vowelCount: number;
  isHighlighted: boolean;
}

export default defineComponent({
  setup() {
    const fields = ref<Field[]>([
      { value: '', vowelCount: 0, isHighlighted: false },
      { value: '', vowelCount: 0, isHighlighted: false },
      { value: '', vowelCount: 0, isHighlighted: false }
    ]);
    const searchText = ref('');
    const isSearchHighlighted = ref(false);

    const countVowels = (index: number) => {
      const vowels = fields.value[index].value.match(/[aeiou]/gi);
      fields.value[index].vowelCount = vowels ? vowels.length : 0;
    };

    const addField = () => {
      fields.value.push({ value: '', vowelCount: 0, isHighlighted: false });
    };

    const removeField = (index: number) => {
      if (fields.value.length > 1) {
        fields.value.splice(index, 1);
      }
    };

    const highlightSearch = () => {
      if (searchText.value) {
        let exactMatchFound = false;
        fields.value.forEach(field => {
          if (field.value) {
            field.isHighlighted = field.value.includes(searchText.value) || searchText.value.includes(field.value);

            if (field.value === searchText.value) {
              exactMatchFound = true;
            }
          } else {
            field.isHighlighted = false;
          }
        });
        isSearchHighlighted.value = exactMatchFound;
      } else {
        fields.value.forEach(field => {
          field.isHighlighted = false;
        });
        isSearchHighlighted.value = false;
      }
    };

    return { fields, addField, removeField, countVowels, searchText, highlightSearch, isSearchHighlighted };
  }
});
</script>

<style>
.highlight {
  background-color: green;
}
</style>