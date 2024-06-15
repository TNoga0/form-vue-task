// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import DynamicForm from './DynamicForm.vue';

describe('DynamicForm', () => {
  it('renders the correct number of input fields with the additional search field', async () => {
    const wrapper = mount(DynamicForm);
    await wrapper.vm.$nextTick();
    const inputFields = wrapper.findAll('input');
    expect(inputFields.length).toBe(4);
  });

  it('adds a new field when the "Add Field" button is clicked', async () => {
    const wrapper = mount(DynamicForm);
    await wrapper.vm.$nextTick();
    const addButton = wrapper.find('#add-field-button');
    await addButton.trigger('click');
    await wrapper.vm.$nextTick();
    const inputFields = wrapper.findAll('input');
    expect(inputFields.length).toBe(5);
  });

  it('removes a field when the "Remove" button is clicked', async () => {
    const wrapper = mount(DynamicForm);
    await wrapper.vm.$nextTick();
    const removeButton = wrapper.find('.remove-field-button');
    await removeButton.trigger('click');
    await wrapper.vm.$nextTick();
    const inputFields = wrapper.findAll('input');
    expect(inputFields.length).toBe(3);
  });
});