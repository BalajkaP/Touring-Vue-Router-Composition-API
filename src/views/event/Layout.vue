<script setup>
import { onMounted, ref, defineProps, computed } from "vue";
import EventService from "@/services/EventService.js";
// JDE VLASTNĚ TAKY O LAYOUT PRO PODSTRÁNKY DETAILS, EDIT, REGISTER
// KTERÉ JSOU VNOŘENÉ POD TUTO LAYOUT STRÁNKU. To jest stejný princip jako hlavní layout App.vue, který má vnořené podstránky (EventList, About)
// Princip předání ID je stejný jako to bylo předtím pro DetailsView
const props = defineProps(["id"]);

const id = computed(() => props.id);

const event = ref(null);
// event zde není props, ale data fetched from API
// fetched based on id prop. Takže stačí klasická proměnná event,
// páč si ji načteme z API přímo zde v Layout.vue
onMounted(() => {
  EventService.getEvent(id.value)
    .then((response) => {
      event.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>
<template>
  <!-- SUPER DÚLEŽITÉ: Musím odtud taky předat propsu EVENT do těch dalších 
  podstránek, jako EventDetails, atd. To udělám hromadně níže v:
  <router-view :event="event" /> -->
  <!-- V tom router-link nepotřebuji params: { id: event.id }, jako to bylo v 
  EventCard, páč VUE ví, že ID je potřeba nejen pro EventLayout, ale taky pro children, a to díky path: "/event/:id" v route EventLayout   -->
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>
