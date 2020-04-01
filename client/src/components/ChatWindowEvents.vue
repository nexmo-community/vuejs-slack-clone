<template>
  <div class="py-4 flex-auto overflow-y-auto" ref="chatWindow">
    <template v-if="!!events.length">
      <div class="px-6 hover:bg-gray-100" v-for="event in events" v-bind:key="'event' + event.id">
        <div v-if="event.type === 'text'">
          <strong>{{ members.get(event.from).display_name }}</strong> on <strong>{{ event.timestamp.split("T")[0] }}</strong> at <strong>{{ event.timestamp.split("T")[1].split(".")[0] }}</strong> says {{ event.body.text }}
        </div>
        <div v-else-if="event.type === 'member:joined'">
          <strong>{{ event.body.user.display_name }}</strong> has joined <strong>#{{ event.conversation.display_name }}</strong>.
        </div>
      </div>
    </template>
    <Loading v-else-if="!error" message="Loading messages..." />
    <Error v-else :error="error" />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Error from '@/components/Error.vue'

export default {
  name: 'ChatWindowEvents',
  components: {
    Loading,
    Error
  },
  props: {
    user: Object,
    conversation: Object,
    members: Map,
  },
  data () {
    return {
      events: [],
      error: null
    }
  },
  mounted () {
    this.getEventHistory()
    this.registerListeners()
  },
  methods: {
    registerListeners () {
      const { conversation } = this.$props

      conversation.on('text', (user, event) => {
        this.events.push(event)
      })

      conversation.on("member:joined", (user, event) => {
        this.events.push(event)
      })
    },
    getEventHistory () {
      this.$props.conversation
        .getEvents({ page_size: 40, order: 'desc' })
        .then(eventsPage => {
          eventsPage.items.forEach(event => {
            this.events.unshift(event)
          })
        })
        .catch(err => {
          this.error = { title: 'Chat Service Error', message: err.message }
        })
    },
  },
}
</script>
