<script lang="ts" setup>
import { XBreadcrumb } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Layout' }, { text: 'Aspect Ratio' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Aspect Ratio</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="flex items-center mb-2">
      Video
      <code class="text-sm text-gray-700 bg-gray-300 ml-2 px-2 rounded">aspect-video</code>
    </div>

    <iframe
      src="https://www.youtube.com/embed/QhBnZ6NPOY0"
      title="Naruto"
      allowfullscreen
      class="w-full max-w-140 aspect-video"
    ></iframe>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="flex items-center mb-2">
      4 by 3
      <code class="text-sm text-gray-700 bg-gray-300 ml-2 px-2 rounded">aspect-4/3</code>
    </div>

    <img
      src="https://bit.ly/naruto-sage"
      alt="Naruto"
      class="w-full max-w-100 object-cover aspect-4/3"
    />
  </div>
</template>
