<template>
  <div class="border-b flex px-6 py-2 items-center">
    <div class="flex flex-col">
      <h4 class="text-grey-darkest mb-1 font-extrabold">{{ channelName }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatWindowHeader',
  props: {
    channelName: String,
    members: Number
  }
}
</script>
