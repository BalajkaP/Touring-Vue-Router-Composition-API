import { createRouter, createWebHistory } from "vue-router";
import EventList from "@/views/EventList.vue";
import EventDetails from "@/views/EventDetails.vue";
import About from "@/views/About.vue";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    // Tento QUERY param zjistíme takto. Jde o ukázku:
    // How to transform Query par=> Props Function Mode
    // Pokud není page v query, nastavíme ji na 1
    // Pokud je page v query, převedeme ji na integer
    // a předáme jako prop do EventList komponenty
    // Tím pádem nemusíme v EventList komponentě řešit $route.query.page
    // ale máme to jako normální prop page !!!!!!!!!!!!!!
    // Jde o COMPONENT PROP stejně jako v EventDetails komponentě.
    // Tady je to užitečné, protože můžeme nastavit defaultní hodnotu 1
    // a nemusíme to řešit v EventList komponentě
    // Tato cesta je použita na těch odkazech Next a Previous
    // v EventList komponentě, a na nich vidím že se mění query param page
    // <router-link :to="{ name: 'EventList', query: { page: page + 1 } }"
    // Example: http://localhost:5173/?page=2  pro Next odkaz
    // Více info: https://router.vuejs.org/guide/essentials/passing-props.html#function-mode
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    // Tento ROUTE(PATH) param bychom mohli zjistit takto v template:
    // {{ $route.params.id }}
    // Zde ukázka ROUTE param with Params as Props. It says to vue-router:
    // Send in our route params as component props to the component EventDetails.
    path: "/event/:id",
    name: "EventDetails",
    props: true,
    component: EventDetails,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
