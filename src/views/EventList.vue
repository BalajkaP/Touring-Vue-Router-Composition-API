<script setup>
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";
import { computed, defineProps, onMounted, ref, watch } from "vue";

const props = defineProps(["page"]);

const events = ref(null);
const totalEvents = ref(0);

// Zjistím zda mám další page, podle celkového počtu eventů a počtu eventů na stránku (2). A celkový počet eventů získám z response headeru X-Total-Count, který mi json-server posílá- viz níže v fetchEvents(): 
// totalEvents.value = response.headers["x-total-count"]
const hasNextPage = computed(() => {
	const totalPages = Math.ceil(totalEvents.value / 2);
	return props.page < totalPages;
});

const fetchEvents = () => {
	// Pokud jsem poprvé na stránce, tak se nezobrazuje v browser URL číslo page, a proto volání getEvents pošle jako props.page=1, protože v router/index.js pro EventList máme nastaveno že defaultní hodnota je 1 pokud page nemáme v URL:
	// props: (route) => ({ page: parseInt(route.query.page) || 1 })
	// Tj. takto vlastně získám správnou hodnotu props page i když v URL není.
	// ROUTER mi ji vyrobí a poprvé nastaví na 1.
	// Další navigace na Next a Previous už v URL page je, a řídí se to dle: 
	// <router-link :to="{ name: 'EventList', query: { page: page - 1 } }" níže v template.
	EventService.getEvents(2, props.page)
		.then((response) => {
			events.value = response.data;
			totalEvents.value = response.headers["x-total-count"];
		})
		.catch((error) => {
			console.log(error);
		});
};

// Platí pouze pro initial page load. Takže když kliknu na Next nebo Previous, tak už to znovu nevolá stejnou page, ale volá se to v tom watch níže.
onMounted(() => {
	fetchEvents();
});

// WATCH hlídá změnu našeho prop page, který je nastaven v router/index.js.
// Když se změní prop page (tzn. když kliknu na Next nebo Previous a tím se změní query param page v URL, což způsobí že se změní prop page v této komponentě EventList díky nastavení v router/index.js), tak se znovu zavolá fetchEvents() a načtou se nové eventy pro tu novou page.
watch(
	() => props.page,
	() => {
		events.value = null;
		fetchEvents();
	}
);
</script>

<template>
	<h1>Events for Good</h1>
	<div class="events">
		<EventCard v-for="event in events" :key="event.id" :event="event" />
        <!-- Zde je ukázka QUERY param díky query !!!!!!!! rel je název linku.
		 A to &#60; znamená znak <    -->
		<div class="pagination">
			<router-link
				id="page-prev"
				:to="{ name: 'EventList', query: { page: page - 1 } }"
				rel="prev"
				v-if="page != 1"
				>&#60; Previous</router-link
			>
        <!-- Chceme zobrazit NEXt pouze pokud máme další events. To zajistím díky v-if="hasNextPage"  -->
			<router-link
				id="page-next"
				:to="{ name: 'EventList', query: { page: page + 1 } }"
				rel="next"
				v-if="hasNextPage"
				>Next &#62;</router-link
			>
		</div>
	</div>
</template>

<style scoped>
.events {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.pagination {
	display: flex;
	width: 290px;
}

.pagination a {
	flex: 1;
	text-decoration: none;
	color: #2c3e50;
}

#page-prev {
	text-align: left;
}

#page-next {
	text-align: right;
}
</style>
