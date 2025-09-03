import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
// Vytvoříme reactive object pro globální stavovou proměnnou GStore
// který lze sdílet mezi komponentami pomocí provide/inject API, tj. sdílím v celé aplikaci. Použiji ho v Register.vue
const GStore = reactive({ flashMessage: "" });

const app = createApp(App);

// Takto poskytnu GStore všem komponentám v aplikaci
// aby mohly používat globální stavovou proměnnou GStore
// pomocí inject("GStore") v setup() funkci komponenty
// "GStore" je název (key), pod kterým je GStore poskytována.
app.use(router).provide("GStore", GStore);

app.mount("#app");
