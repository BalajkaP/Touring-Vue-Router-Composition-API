<script setup>
import { useRouter } from "vue-router";
import { defineProps } from "vue";

defineProps(["event"]);
// Returns the router instance. Equivalent to using $router inside templates.
const router = useRouter();

//Klasická funkce
const register = () => {
  // Call to API
  // If registered sucessfuly then redirect to event details
  // Zde předpokládáme že API call je úspěšný.
  // router.push naviguje na jinou stránku podle jména routy
  // opět zde netřeba specifikovat id, protože je již v URL a router si ho vezme sám. Tj. netřeba pod name tento řádek: 
  // id: props.event.id 
  router.push({
    name: "EventDetails",
  });
};
</script>
<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>
