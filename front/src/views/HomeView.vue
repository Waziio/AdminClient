<template>
  <div class="flex w-6 mx-auto align-items-center justify-content-center gap-3">
    <h1 class="text-6xl text-primary">AdminClient</h1>
    <font-awesome-icon icon="users-gear" class="text-6xl" style="color: #64b5f6" />
  </div>
  
  <div class="absolute right-0 mr-4 top-0 mt-5">
    <Message v-if="success" :sticky="false" :closable="false" class="" severity="success">Client créé avec succès !</Message>
  </div>
  <div>
    <div class="absolute left-0 ml-4 top-0 mt-5">
      <Btn class="text-sm ml-2 h-full" icon="pi pi-list" @click="setVisible" label="Menu" outlined></Btn>
    </div>
    <Sidebar v-model:visible="visible">
      <div class="flex flex-column justify-content-center mt-5 gap-8">
        <div class="flex flex-column gap-2 text-center">
          <p class="text-5xl font-bold m-0">{{ this.lastname_user }}</p>
          <p class="text-5xl m-0">{{ this.firstname_user }}</p>
        </div>

        <div class="flex flex-column gap-5 w-10 mx-auto">
          <Popup v-model:visible="formVisible" header="Ajouter un client" :style="{ width: '50vw' }">
            <FormAddClient :visible="formVisible" @formVisible="setFormVisible" @sidebarVisible="setVisible" @refreshClient="getClients" @messageAddSuccess="showAddMsg"></FormAddClient>
          </Popup>
          <Btn class="text-sm ml-2 h-full" icon="pi pi-user-plus" @click="setFormVisible" label="Ajouter un client"></Btn>
          <Btn class="text-sm ml-2 h-full" icon="pi pi-user-edit" @click="updateAccount" label="Mon compte" severity="success"></Btn>
          <Btn class="text-sm ml-2 h-full" icon="pi pi-user-minus" @click="logout" label="Déconnexion" :loading="logoutLoad" severity="danger"></Btn>
        </div>
      </div>
    </Sidebar>
  </div>
  <ListClients :clients="clients" />
  <router-view></router-view>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import Btn from "primevue/button";
import Sidebar from "primevue/sidebar";
import Popup from "primevue/dialog";

// Components
import ListClients from "../components/ListClients.vue";
import { b64ToPng } from "../utils.js";
import router from "../../router.js";
import FormAddClient from "../components/FormAddClient.vue";
import Message from "primevue/message";

export default defineComponent({
  name: "HomeView",

  components: {
    ListClients,
    Btn,
    Sidebar,
    Popup,
    FormAddClient,
    Message,
  },

  methods: {
    async showAddMsg() {
      this.success = true;
      await this.delay(3000);
      this.success = false;
    },
    setVisible() {
      if (this.visible == true) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    },
    setFormVisible() {
      console.log(this.formVisible);
      if (this.formVisible == true) {
        this.formVisible = false;
      } else {
        this.formVisible = true;
      }
      console.log(this.formVisible);
    },
    async logout() {
      this.logoutLoad = true;
      localStorage.clear();
      await this.delay(1000);
      router.push("/login");
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    getClients() {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:8000/client", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          let data = result.data;
          data.forEach((client) => {
            if (client.profile_picture) {
              client.profile_picture = b64ToPng(client.profile_picture);
            }
          });
          this.clients = data;
        })
        .catch((err) => console.log(err));
    },
  },

  mounted() {
    this.getClients();
  },

  data() {
    return {
      clients: null,
      visible: false,
      lastname_user: localStorage.getItem("lastname_user"),
      firstname_user: localStorage.getItem("firstname_user"),
      logoutLoad: false,
      formVisible: false,
      success: false,
    };
  },
});
</script>

<style>
.p-dialog-title {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  font-weight: "bold";
}
</style>
