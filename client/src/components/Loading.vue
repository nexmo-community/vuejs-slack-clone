<template>
  <div class="w-screen h-screen fixed block top-0 left-0 bg-white opacity-75 z-50 flex">
    <span class="text-green-500 opacity-75 top-1/2 m-auto text-center">
      <font-awesome-icon icon="circle-notch" class="fa-spin fa-5x mb-2"/>
      <p class="text-base">
        {{ message }}
      </p>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    message: String
  }
}
</script>