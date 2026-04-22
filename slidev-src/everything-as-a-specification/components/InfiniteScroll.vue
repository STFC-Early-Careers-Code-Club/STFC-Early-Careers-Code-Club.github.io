<template>
  <div
    class="marquee-container"
    :style="{ '--scroll-duration': duration }"
  >
    <div class="marquee-content flex items-center">
      <slot />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  duration?: string
}>(), {
  duration: '15s'
})
</script>

<style scoped>
.marquee-container {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
}

.marquee-content {
  width: max-content;
  animation: scroll-marquee var(--scroll-duration) linear infinite;
}

@keyframes scroll-marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    /* Shifts exactly half the total width (one full set of items) */
    transform: translateX(-50%);
  }
}
</style>
