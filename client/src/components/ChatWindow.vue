<template>
  <div class="flex flex-col min-h-screen max-h-screen bg-white overflow-hidden">
    <ChatWindowHeader :channelName="'#' + conversation.display_name"/>
    <ChatWindowEvents :conversation="conversation" :user="user" :members="members" />
    <ChatWindowFooter :conversation="conversation" />
  </div>
</template>

<script>
import ChatWindowHeader from '@/components/ChatWindowHeader.vue'
import ChatWindowEvents from '@/components/ChatWindowEvents.vue'
import ChatWindowFooter from '@/components/ChatWindowFooter.vue'

export default {
  name: 'ChatWindow',
  props: {
    app: Object,
    conversation: Object
  },
  components: {
    ChatWindowHeader,
    ChatWindowEvents,
    ChatWindowFooter
  },
  data () {
    return {
      user: {},
      members: new Map(),
    }
  },
  mounted () {
    this.user = this.$props.app.me
    this.fetchMembers()
  },
  methods: {
    fetchMembers () {
      this.members = this.$props.conversation.members
    }
  }
}
</script>