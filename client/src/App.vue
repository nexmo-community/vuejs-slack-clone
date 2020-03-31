<template>
  <div id="app">
    <Nexmo v-if="!!server.status && server.status === 'ok'" :server="server" />
    <template v-else>
      <Loading v-if="!error" message="Connecting..." />
      <Error v-else :error="error" />
    </template>
  </div>
</template>

<script>
import Nexmo from '@/components/Nexmo.vue'
import Error from '@/components/Error.vue'
import Loading from '@/components/Loading.vue'
import ServerService from '@/services/Server'

export default {
  name: 'App',
  components: {
    Nexmo,
    Error,
    Loading
  },
  data () {
    return {
      server: {},
      error: null
    }
  },
  mounted () {
    this.getServerStatus()
  },
  methods: {
    getServerStatus () {
      ServerService.fetchStatus()
        .then((response) => {
          this.server = response.data
        })
        .catch((err) => {
          this.error = { title: 'Couldn\'t connect to Server', message: 'There may be a problem with your connection. Please check and try again.', reason: err.reason }
        })
    }
  }
}
</script>
