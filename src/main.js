import { createApp } from "vue";
import App from "./App.vue";
import router from "../router.js";
import Primevue from "primevue/config";
// import "primevue/resources/themes/saga-blue/theme.css";
import "primeflex/primeflex.css";
// import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/themes/vela-blue/theme.css"
import "primevue/resources/primevue.min.css";
import 'primeicons/primeicons.css';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUsersGear } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUsersGear)


import ConfirmationService from 'primevue/confirmationservice';

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).use(ConfirmationService).use(Primevue).mount("#app");
