<script>
import InputText from "primevue/inputtext";
import FileUpload from "primevue/fileupload";
import Btn from "primevue/button";
import { default_pp } from "@/utils";
import axios from "axios";

export default {
    props: {
    visible: {
      type: Boolean
    }
  },
  components: {
    InputText,
    FileUpload,
    Btn,
  },
  methods: {
    convertToB64(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    },
    async onUpload(event) {
      const encode = await this.convertToB64(event.files[0]);
      let base64 = encode.split("base64,")[1];
      this.profile_picture = base64;
    },

    handleClick() {
      console.log("aaaag");
    },

    addClient() {
      const token = localStorage.getItem("token");
      const body = {
        lastname: this.lastname,
        firstname: this.firstname,
        date: this.date,
        mail: this.mail,
        address: this.address,
        city: this.city,
        postalcode: this.postalcode,
        country: this.country,
        profile_picture: this.profile_picture ? this.profile_picture : default_pp,
      }

      axios({
        method: "post",
        url: `http://localhost:8000/client`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      }).then(async () => {
        this.loading = true;
        this.$emit('formVisible')
        this.$emit('sidebarVisible')
        this.$emit('refreshClient')
        this.$emit('messageAddSuccess')
      })
    },
  },
  data() {
    return {
      lastname: null,
      firstname: null,
      date: null,
      mail: null,
      address: null,
      city: null,
      postalcode: null,
      country: null,
      profile_picture: null,
      loading: false
    };
  },
};
</script>

<template>
  <div class="grid mt-4 row-gap-5">
    <div class="col-4 card flex justify-content-center">
      <span class="p-float-label">
        <InputText id="lastname" v-model="lastname" required />
        <label for="lastname">Nom</label>
      </span>
    </div>

    <div class="col-4 card flex justify-content-center">
      <span class="p-float-label">
        <InputText id="firstname" v-model="firstname" required />
        <label for="firstname">Prénom</label>
      </span>
    </div>

    <div class="col-4 card flex justify-content-center">
      <span class="p-float-label">
        <InputText id="date" v-model="date" type="date" required />
        <label for="date"></label>
      </span>
    </div>

    <div class="col-4 card flex justify-content-center">
      <span class="p-float-label">
        <InputText id="mail" v-model="mail" type="email" required />
        <label for="mail">Adresse Mail</label>
      </span>
    </div>

    <div class="col-4 card flex justify-content-center">
      <span class="p-float-label">
        <InputText id="address" v-model="address" required />
        <label for="address">Adresse</label>
      </span>
    </div>

    <div class="col-4 card flex justify-content-center">
      <span class="p-float-label">
        <InputText id="city" v-model="city" required />
        <label for="city">Ville</label>
      </span>
    </div>

    <div class="col-4 card flex justify-content-center">
      <span class="p-float-label">
        <InputText id="postalcode" v-model="postalcode" type="" required />
        <label for="postalcode">Code postal</label>
      </span>
    </div>

    <div class="col-4 card flex justify-content-center">
      <span class="p-float-label">
        <InputText id="country" v-model="country" required />
        <label for="country">Pays</label>
      </span>
    </div>

    <div class="col-4 card flex justify-content-center">
      <span class="p-float-label">
        <FileUpload mode="basic" name="profile_picture" accept="image/*"  @select="onUpload" chooseLabel="Choisir une photo" />
        <label for="country"></label>
      </span>
    </div>

    <div class="col-12 card flex justify-content-center">
      <Btn type="submit" icon="pi pi-user-plus" label="Créer" size="small" :loading="loading" @click="addClient"></Btn>
    </div>
  </div>
</template>
