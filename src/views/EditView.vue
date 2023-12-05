<template>
  <EditClient :client="client"></EditClient>
  <router-view></router-view>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";

// Components
import EditClient from "../components/EditClient.vue";
import { b64ToPng, default_pp } from "@/utils";

export default defineComponent({
  name: "EditView",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    EditClient,
  },

  setup(props) {
    const client = ref({});

    const getClient = () => {
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:8000/client/${props.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          console.log(result.data);
          let data = result.data;
          console.log("data " + data);
          if (data.profile_picture) {
            data.profile_picture = b64ToPng(data.profile_picture);
          } else {
            data.profile_picture = default_pp;
          }
          client.value = data;
        })
        .catch((err) => console.log(err));
    };

    getClient();

    return {
      client,
    };
  },
});
</script>

<style></style>
