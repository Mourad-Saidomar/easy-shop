<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <article class="shadow-sm">
    <div class="card glass-effect p-3 rounded-4">
      <div class="card-body gap-3">
        <span class="col-2 text-bg-primary rounded-3 p-2 text-center">{{ icon }}</span>
        <h3 class="h5 fw-bold my-3 text-white">{{ title }}</h3>
        <p class="mb-0 text-white">{{ text }}</p>
      </div>
    </div>
  </article>
</template>
