<script>
import ClientCard from './ClientCard.vue'
import { default_pp } from '../utils.js';

export default {
  components: {
    ClientCard
  },
  props: {
    clients: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      default_pp
    }
  }
}
</script>

<template>
  <div class="clients">
    <ClientCard
      class="client"
      v-for="client in clients"
      :key="client.id"
      :id="client.id"
      :lastname="client.lastname"
      :firstname="client.firstname"
      :country="client.country"
      :profile_picture="client.profile_picture ? client.profile_picture : default_pp"
    />
  </div>
</template>

<style scoped>
.clients {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
  width: 50vw;
}

.client {
  margin: 3%;
}
</style>
