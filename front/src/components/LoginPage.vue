<script>
import router from "../../router.js";
import InputText from "primevue/inputtext";
import Btn from "primevue/button";
import axios from "axios";

export default {
  methods: {
    submitForm(event) {
      event.preventDefault();
      this.loading = true;
      const body = {
        mail: this.mail,
        password: this.password,
      };

      axios
        .post("http://localhost:8000/login", body)
        .then((res) => {
          localStorage.setItem("isConnected", true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("lastname_user", res.data.lastname);
          localStorage.setItem("firstname_user", res.data.firstname);
          router.push("/client");
        })
        .catch((error) => {
          this.loading = false;
          console.log(error)
        });
    },
  },
  components: {
    InputText,
    Btn,
  },
  data() {
    return {
      mail: "",
      password: "",
      loading: false,
    };
  },
};
</script>

<template>
  <div class="flex w-6 mx-auto align-items-center justify-content-center gap-3">
    <h1 class="text-6xl text-primary">AdminClient</h1>
    <font-awesome-icon icon="users-gear" class="text-6xl" style="color: #64b5f6"/>
  </div>

  <form class="w-4 mt-5 mx-auto">
    <div class="grid row-gap-4">
      <h2 class="col-12 font-bold text-2xl text-primary-600">Connexion</h2>

      <div class="col-12 row-2 card flex justify-content-center">
        <span class="p-float-label">
          <InputText id="username" v-model="mail" type="email" required />
          <label for="username">Email</label>
        </span>
      </div>

      <div class="col-12 card flex justify-content-center">
        <span class="p-float-label">
          <InputText id="password" v-model="password" type="password" required />
          <label for="username">Mot de passe</label>
        </span>
      </div>

      <div class="col-12 flex justify-content-center">
        <Btn type="submit" icon="pi pi-user" label="Se connecter" size="normal" :loading="loading" @click="submitForm"></Btn>
      </div>
    </div>
  </form>
  <router-link to="/signup"><Btn class="text-sm mt-7" size="small" label="Pas de compte ?" text></Btn></router-link>
  <router-view></router-view>
</template>

<style scoped></style>
