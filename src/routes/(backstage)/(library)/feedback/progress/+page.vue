<script lang="ts" setup>
import { XBreadcrumb, XCard, XSpinner, XProgressBar, XProgressCircle } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'Progress' }]" />

  <h1 class="text-4xl font-extrabold my-4">Progress</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Spinner</h2>

    <XCard>
      <div class="flex items-center justify-center gap-4">
        <XSpinner class="w-4 h-4" />
        <XSpinner />
        <XSpinner class="w-12 h-12" />
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">ProgressBar</h2>

    <XCard>
      <XProgressBar />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">ProgressCircle</h2>

    <XCard>
      <XProgressCircle :percentage="72">72%</XProgressCircle>
    </XCard>
  </section>
</template>
