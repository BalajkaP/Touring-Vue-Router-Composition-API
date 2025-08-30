import { createRouter, createWebHistory } from "vue-router";
import EventList from "@/views/EventList.vue";
import EventLayout from "@/views/event/Layout.vue";
import EventDetails from "@/views/event/Details.vue";
import EventRegister from "@/views/event/Register.vue";
import EventEdit from "@/views/event/Edit.vue";
import About from "@/views/About.vue";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    props: true,
    component: EventLayout,
    children: [
      {
        path: "",
        name: "EventDetails",
        component: EventDetails,
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister,
      },
      {
        path: "edit",
        name: "EventEdit",
        component: EventEdit,
      },
    ],
  },
  // 3. řešení pro více komplexnější redirect: Když někdo zadá omylem 
  // /event/:id ale my máme v routes definovanou /events/:id .
  // Pčed tímto jsme měli nahoře /event/:id, ale změnili jsme to na /events/:id
  // a abychom nezpůsobili uživatelům 404, tak přidáme tento redirect.
  // Tento redirect přesměruje na správnou adresu.
  // Princip: 
  // This defines a route pattern that the router should watch for
  // /event/ is the fixed part of the URL
  // :afterEvent is a parameter name - it will capture whatever comes 
  // after /event/
  // (.*) is a regex pattern that means "capture everything" (any characters, any length)
  // Line 2: redirect: (to) => {
  // This says "when someone visits a URL matching the above pattern, redirect them somewhere else"
  // (to) is a function parameter - it's an object containing information about the route the user is trying to visit
  // The to object includes details like the URL parameters, query strings, etc 
  // Line 3: return { path: "/events/" + to.params.afterEvent };
  // This builds the new URL to redirect to
  // to.params.afterEvent gets the value that was captured by the :afterEvent parameter
  // It combines /events/ with whatever was captured
  // Returns an object with the new path
  {
    path: "/event/:afterEvent(.*)",
    redirect: (to) => {
      return { path: "/events/" + to.params.afterEvent };
    },
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
