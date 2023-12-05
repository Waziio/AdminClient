<script>
import InputText from "primevue/inputtext";
import Field from "primevue/fieldset";
import ToggleButton from "primevue/togglebutton";
import Btn from "primevue/button";
import axios from "axios";
import router from "../../router.js";
import Message from "primevue/message";
import ConfirmDialog from "primevue/confirmdialog";
import FileUpload from "primevue/fileupload";

export default {
  methods: {
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    setColorToggleBtn() {
      if (this.toggleColor === "bg-primary h-full border-primary-800 border-1") {
        this.toggleColor = "bg-bluegray-400 h-full border-bluegray-800 border-1";
      } else {
        this.toggleColor = "bg-primary h-full border-primary-800 border-1";
      }
    },

    setLoading() {
      if (this.loading) {
        this.loading = false;
      } else {
        this.loading = true;
      }
    },
    confirmDialog() {
      this.$confirm.require({
        message: "Êtes-vous sûr(e) de supprimer ce client ?",
        header: `Supprimer ${this.client.lastname} ${this.client.firstname} ?`,
        icon: "pi pi-exclamation-circle",
        acceptClass: "bg-red-600 pr-4 text-white font-bold",
        acceptLabel: "Oui",

        accept: () => {
          this.deleteClient();
        },
        reject: () => {},
      });
    },
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
    async imgToBase64(event) {
      let image = event.files[0];
      let encode = await this.convertToB64(image);
      let base64 = encode.split("base64,")[1];
      this.uploadText = image.name;
      this.pp = base64;
    },

    updateClient() {
      this.setLoading();
      const body = {
        lastname: this.client.lastname,
        firstname: this.client.firstname,
        date: this.date,
        mail: this.client.mail,
        address: this.client.address,
        city: this.client.city,
        postalcode: this.client.postalcode,
        country: this.client.country,
      };
      if (this.pp) {
        this.client.profile_picture = "data:image/png;base64," + this.pp;
        body.profile_picture = this.pp;
      }
      const token = localStorage.getItem("token");
      axios({
        method: "put",
        url: `http://localhost:8000/client/${this.client.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      })
        .then(async (result) => {
          console.log(result);
          await this.delay(1000);
          this.success = true;
          this.setLoading();
          this.isEdit = false;
          this.setColorToggleBtn();
          this.uploadText = "Choisir une image";
          await this.delay(3500);
          this.success = false;
        })
        .catch(async (err) => {
          console.log(err);
          this.errormsg = "Erreur, paramètre(s) invalide(s)";
          this.error = true;
          await this.delay(3000);
          this.loading = false
          this.error = false;
        });
    },

    deleteClient() {
      const token = localStorage.getItem("token");
      axios({
        method: "delete",
        url: `http://localhost:8000/client/${this.client.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async () => {
          this.deleteLoading = true;
          this.deleted = true;
          await this.delay(1000);
          router.push("/client");
        })
        .catch(async (err) => {
          console.log(err);
          this.errormsg = "Une erreur est survenue";
          this.error = true;
          await this.delay(3000);
          this.loading = false
          this.error = false;
        });
    },
  },
  props: {
    client: {
      type: Object,
      required: true,
    },
  },

  components: {
    InputText,
    Field,
    ToggleButton,
    Btn,
    Message,
    ConfirmDialog,
    FileUpload,
  },

  watch: {
    client: {
      immediate: true,
      handler(value) {
        if (value) {
          // client dispo
          this.isClientLoaded = true;
          // formattage date
          let date_api = new Date(this.client.date);
          let day = date_api.getDate() < 10 ? "0" + date_api.getDate().toString() : date_api.getDate().toString();
          let month = date_api.getMonth() < 10 ? "0" + date_api.getMonth().toString() : date_api.getMonth().toString();
          let year = date_api.getFullYear().toString();
          let date = `${year}-${month}-${day}`;
          this.date = date;
        }
      },
    },
  },

  data() {
    return {
      isEdit: false,
      toggleColor: "bg-primary h-full border-primary-800 border-1",
      date: null,
      loading: false,
      success: false,
      deleted: false,
      deleteLoading: false,
      pp: null,
      uploadText: "Choisir une image",
      isClientLoaded: false,
      error: false,
      errormsg: "",
    };
  },
};
</script>

<template>
  <router-link to="/client"><Btn class="text-sm mt-7 absolute left-0 top-0 ml-5" icon="pi pi-arrow-left" size="small" label="Liste des clients" text></Btn></router-link>

  <div class="flex w-6 mx-auto align-items-center justify-content-center gap-3">
    <h1 class="text-6xl text-primary">AdminClient</h1>
    <font-awesome-icon icon="users-gear" class="text-6xl" style="color: #64b5f6" />
  </div>

  <div class="absolute right-0 mr-4 top-0 mt-3">
    <Message v-if="success" :sticky="false" :closable="false" severity="success">Informations mises à jour !</Message>
    <Message v-if="error" :sticky="false" :closable="false" severity="error">{{ errormsg }}</Message>
    <Message v-if="deleted" :sticky="false" :closable="false" severity="error">Client supprimé ...</Message>
  </div>
  <ConfirmDialog></ConfirmDialog>
  <div class="w-3 ml-auto flex align-items-center" id="buttons">
    <ToggleButton v-model="isEdit" on-icon="pi pi-times" off-icon="pi pi-user-edit" style="color: black" :class="toggleColor" @click="setColorToggleBtn" onLabel="Annuler" offLabel="Modifier" />
    <Btn class="text-sm ml-2 h-full" icon="pi pi-trash" size="small" label="Supprimer" @click="confirmDialog()" :loading="deleteLoading" severity="danger"></Btn>
  </div>

  <div id="fiche">
    <Field class="field">
      <template #legend>
        <div class="flex align-items-center text-primary">
          <span class="pi pi-user mr-2"></span>
          <span class="font-bold text-lg">Fiche de {{ client.lastname }} {{ client.firstname }}</span>
        </div>
      </template>
      <div class="grid" id="field">
        <div class="col-6 m-auto flex align-items-center flex-column gap-5">
          <img class="max-w-20rem border-circle" :src="client.profile_picture" />
          <FileUpload v-if="isEdit" mode="basic" name="profile_picture" accept="image/*" @select="imgToBase64" chooseLabel="Choisir une photo" />
        </div>
        <template v-if="isEdit">
          <div class="col-6 flex flex-column align-items-center gap-4" id="infos">
            <div class="grid align-items-center gap-8">
              <label class="col" for="lastname">Nom :</label>
              <InputText class="col" id="lastname" v-model="client.lastname" />
            </div>

            <div class="grid align-items-center gap-8">
              <label class="col" for="firstname">Prénom :</label>
              <InputText class="col" id="firstname" v-model="client.firstname" />
            </div>

            <div class="grid align-items-center gap-8">
              <label class="col" for="date">Date de naissance :</label>
              <InputText class="col" id="date" v-model="date" />
            </div>

            <div class="grid align-items-center gap-8">
              <label class="col" for="mail">Adresse email :</label>
              <InputText class="col" id="mail" v-model="client.mail" />
            </div>

            <div class="grid align-items-center gap-8">
              <label class="col" for="address">Adresse :</label>
              <InputText class="col" id="address" v-model="client.address" />
            </div>

            <div class="grid align-items-center gap-8">
              <label class="col" for="city">Ville :</label>
              <InputText class="col" id="city" v-model="client.city" />
            </div>

            <div class="grid align-items-center gap-8">
              <label class="col" for="postalcode">Code postal :</label>
              <InputText class="col" id="postalcode" v-model="client.postalcode" />
            </div>

            <div class="grid align-items-center gap-8">
              <label class="col" for="country">Pays :</label>
              <InputText class="col" id="country" v-model="client.country" />
            </div>
          </div>
        </template>

        <template v-else>
          <div class="col-6 flex flex-column align-items-center gap-3" id="infos">
            <div class="grid align-items-center gap-8">
              <label class="col" for="lastname">Nom :</label>
              <p class="col" id="lastname">{{ client.lastname }}</p>
            </div>

            <div class="grid align-items-center gap-8">
              <label class="col" for="firstname">Prénom :</label>
              <p class="col" id="firstname">{{ client.firstname }}</p>
            </div>

            <div class="grid align-items-center gap-8">
              <label class="col" for="date">Date de naissance :</label>
              <p class="col" id="date">{{ date }}</p>
            </div>

            <div class="grid align-items-center gap-8">
              <label class="col" for="mail">Adresse email :</label>
              <p class="col" id="mail">{{ client.mail }}</p>
            </div>

            <div class="grid align-items-center gap-8">
              <label class="col" for="address">Adresse :</label>
              <p class="col" id="address">{{ client.address }}</p>
            </div>

            <div class="grid align-items-center gap-8">
              <label class="col" for="city">Ville :</label>
              <p class="col" id="city">{{ client.city }}</p>
            </div>

            <div class="grid align-items-center gap-8">
              <label class="col" for="postalcode">Code postal :</label>
              <p class="col" id="postalcode">{{ client.postalcode }}</p>
            </div>

            <div class="grid align-items-center gap-8">
              <label class="col" for="country">Pays :</label>
              <p class="col" id="country">{{ client.country }}</p>
            </div>
          </div>
        </template>
      </div>
      <Btn v-if="isEdit" class="text-sm mt-7" icon="pi pi-save" size="small" label="Sauvegarder" @click="updateClient" :loading="loading"></Btn>
    </Field>
  </div>
</template>

<style scoped>
#field {
  width: 100%;
}

#fiche {
  width: 95%;
  margin-left: auto;
  margin-right: auto;
}
.grid {
  width: 90%;
  /* height: max-content; */
  line-height: 0%;
}

#buttons {
  height: 35px;
}
</style>

<style>
.p-fieldset .p-fieldset-legend {
  margin-right: auto;
}
</style>
