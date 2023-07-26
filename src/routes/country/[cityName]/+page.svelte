<script lang="ts">
	import Card from '../../Card.svelte';

	export let data;
	const { weatherApiReturn } = data;
	console.log(weatherApiReturn);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Card {weatherApiReturn} />
