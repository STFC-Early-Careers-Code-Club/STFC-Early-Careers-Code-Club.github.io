<template>
  <div class="slidev-layout">
    <slot />

    <div class="grid grid-cols-2 gap-4">
      <div>
        <slot name="left" />
      </div>
      <div>
        <slot name="right" />
      </div>
    </div>
  </div>
</template>