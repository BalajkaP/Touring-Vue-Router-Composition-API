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
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    // Tento ROUTE(PATH) param bychom mohli zjistit takto v template:
    // {{ $route.params.id }}
    // Zde ukázka ROUTE param with Params as Props. It says to vue-router:
    // Send in our route params as component props to the component.
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
