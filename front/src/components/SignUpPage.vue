<script>
import InputText from "primevue/inputtext";
import Btn from "primevue/button";
import Message from "primevue/message";
import axios from "axios";
import router from "../../router.js";

export default {
  methods: {
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    submitForm(event) {
      event.preventDefault();
      this.loading = true;

      axios
        .post("http://localhost:8000/signup", {
          mail: this.mail,
          lastname: this.lastname,
          firstname: this.firstname,
          password: this.password,
        })
        .then(async (res) => {
          if (res.status == "200") {
            this.success = true;
            await this.delay(3000);
            router.push("/login");
          }
        })
        .catch(async () => {
          this.error = true;
          await this.delay(1000);
          this.loading = false;
          await this.delay(3000);
          this.error = false;
        });
    },
  },
  components: {
    InputText,
    Btn,
    Message,
  },

  data() {
    return {
      lastname: "",
      firstname: "",
      mail: "",
      password: "",
      loading: false,
      success: false,
      error: false,
    };
  },
};
</script>

<template>
  <div class="flex relative -mt-5">
    <div class="flex w-6 mx-auto align-items-center justify-content-center gap-3">
      <h1 class="text-6xl text-primary ">AdminClient</h1>
      <font-awesome-icon icon="users-gear" class="text-6xl" style="color: #64b5f6" />
    </div>
    <div class="absolute right-0 mr-4">
      <Message v-if="success" :sticky="false" :closable="false" class="" severity="success">Compte créé avec succès !</Message>
      <Message v-if="error" :sticky="false" :closable="false" class="" severity="error">ERREUR</Message>
    </div>
  </div>
  <form class="w-4 mt-5 mx-auto">
    <div class="grid row-gap-5">
      <h2 class="col-12 font-bold text-2xl text-primary-600">Créer un compte</h2>

      <div class="col-6 card flex justify-content-center">
        <span class="p-float-label">
          <InputText id="lastname" v-model="lastname" required />
          <label for="lastname">Nom</label>
        </span>
      </div>

      <div class="col-6 card flex justify-content-center">
        <span class="p-float-label">
          <InputText id="firstname" v-model="firstname" required />
          <label for="firstname">Prénom</label>
        </span>
      </div>

      <div class="col-6 row-2 card flex justify-content-center">
        <span class="p-float-label">
          <InputText id="username" v-model="mail" type="email" required />
          <label for="username">Email</label>
        </span>
      </div>

      <div class="col-6 card flex justify-content-center">
        <span class="p-float-label">
          <InputText id="password" v-model="password" type="password" required />
          <label for="username">Mot de passe</label>
        </span>
      </div>

      <div class="col-12 flex justify-content-center">
        <Btn type="submit" icon="pi pi-user" label="Créer" size="small" :loading="loading" @click="submitForm"></Btn>
      </div>
    </div>
  </form>
  <router-link to="/login"><Btn class="text-sm mt-7" size="small" label="Déjà un compte ?" text></Btn></router-link>
  <router-view></router-view>
</template>

<style scoped></style>
