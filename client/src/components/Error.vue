<template>
  <div class="flex h-screen">
    <div class="m-auto text-center w-2/3">
      <font-awesome-layers class="fa-10x mb-10">
        <font-awesome-icon icon="globe-americas" transform="grow-4" class="text-gray-500"/>
        <font-awesome-icon :icon="['far', 'circle']" transform="grow-5" class="outline text-white"/>
        <font-awesome-icon icon="times" class="cross text-red-500" transform="shrink-8 right-5 up-5"/>
      </font-awesome-layers>
      <h1 class="text-3xl mb-3 text-gray-800">{{ error.title }}</h1>
      <p class="text-base text-gray-800">{{ error.message }}</p>
      <p class="invisible">{{ error.reason }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    error: Object
  }
}
</script>

<style scoped>
.outline path {
  stroke: white;
  stroke-width: 20px;
}
.cross path {
  stroke: white;
  stroke-width: 20px;
}
</style>