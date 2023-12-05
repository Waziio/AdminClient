<script>

import router from "../../router.js";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    profile_picture: {
      type: String,
      default: "../../public/images/nadir.jpg"
    }
  },
  methods: {
    onClickClient(id) {
      router.push({path: `/client/${id}`, props: {id: id}})
    },
  },
};
</script>

<template>
  <div class="card" @click="onClickClient(id)">
    <div class="container-pdp">
      <img class="pdp" :src="profile_picture" alt="" />
    </div>
    <div class="country">
      <img class="flag" src="../../public//images/France.png" alt="" />
    </div>
    <div class="infosClient">{{ lastname }} {{ firstname }}</div>
  </div>
</template>

<style scoped>
.card {
  /* background-image: linear-gradient(to top, #73bdee 0%, #579fe2 100%); */
  background-color: var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 13vw;
  height: 30vh;
  border-radius: 5%;
  box-shadow: 0px 0px 50px -5px rgba(0, 0, 0, 0.75);
  cursor: pointer;
  overflow: hidden;
  transition: height 0.3s, opacity 0.3s;
}

.card:hover {
  height: 33vh;
  box-shadow: 0px 0px 50px -5px rgba(0, 0, 0, 0.75);
}

.container-pdp {
  width: 70%;
  padding-top: 15%;
  /* padding-bottom: 5%; */
}

.country {
  width: 10%;
  padding-top: 2%;
  padding-bottom: 2%;
}

.flag {
  max-width: 100%;
  border-radius: 50%;
  border: none;
  -webkit-box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.75);
}

.infosClient {
  padding-bottom: 15%;
  font-size: large;
  font-weight: bold;
  color: white;
  text-align: center;
}

.pdp {
  border-radius: 50%;
  max-width: 100%;
}
</style>
