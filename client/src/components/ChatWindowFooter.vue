<template>
  <div class="px-4">
    <textarea
      v-bind:class="{ 
        'disabled:opacity-75': isSending,
        'bg-gray-300': isSending,
        'border-gray-400': isSending,
        'border-gray-400': !isSending
      }"
      v-bind:disabled="isSending"
      v-bind:value="inputMessage"
      v-on:input="inputMessage = $event.target.value"
      v-on:keydown.enter.exact.prevent
      v-on:keyup.enter.exact="sendMessage"
      v-on:keyup="typingEvents"
      type="text"
      :placeholder="'Message ' + conversation.display_name"
      class="w-full rounded border text-sm border-gray-700 overflow-hidden py-2 px-4 resize-none"
      rows="1"
      ref="inputBox"
    >
    </textarea>
    <div class="grid grid-cols-10 h-6 text-xs">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatWindowFooter',
  props: {
    conversation: Object,
  },
  data () {
    return {
      inputMessage: '',
      isSending: false
    }
  },
  methods: {
    typingEvents () {
      this.resizeInput()
    },
    resizeInput () {
      const inputRows = this.inputMessage.split(/\r?\n/).length
      this.$refs.inputBox.rows = inputRows
    },
    sendMessage () {
      if (this.inputMessage.replace(/\s/g,'').length > 0) {
        this.isSending = true

        this.$props.conversation
          .sendText(this.inputMessage.trim())
          .then(() => {
            this.isSending = false
            this.$nextTick(() => {
              this.$refs.inputBox.focus()
              this.inputMessage = ''
              this.resizeInput()
            });
          })
          .catch(err => {
            console.error(err) // eslint-disable-line no-console
          })
      }
    }
  }
}
</script>

<style scoped>
textarea:focus{
  outline: none;
}
</style>