<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XYearPicker } from '@x/ui';

const flux = reactive({
  yearPicker: '',
});
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Library' },
      { text: 'Data Entry' },
      { text: 'Pickers' },
      { text: 'Year Pickers' },
    ]"
  />

  <div class="my-4">
    <div class="text-3xl font-bold">Year Pickers</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <XYearPicker v-model:value="flux.yearPicker" />
    </div>
  </div>
</template>
