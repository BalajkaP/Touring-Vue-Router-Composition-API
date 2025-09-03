<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { inject } from "vue";

// Props EVENT je jako PROPS už definován v EventCard.vue, ale taky v Details.vue a Edit.vue. Tady v Register.vue ho taky potřebuji, takže ho musím znovu definovat. 
const props = defineProps(["event"]);
const router = useRouter();
// Definice GStore je v main.js. GStore je globální stavová proměnná.
// Je to globální úložiště pro data, která mohou být sdílena mezi různými komponentami aplikace. With this I make GStore available in this component.
const GStore = inject("GStore");

const register = () => {
  // Call to API
  // If registered then create message, resetovat message za 3s, redirect to event details
  GStore.flashMessage =
    "You are successfully registered for " + props.event.title;
  setTimeout(() => {
    GStore.flashMessage = "";
  }, 3000);
  router.push({
    name: "EventDetails",
  });
};
</script>
<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>
