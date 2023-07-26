<script lang="ts">
	import { onMount } from 'svelte';

	let hasLocationPermission = false;

	onMount(async () => {
		const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
		hasLocationPermission = permissionStatus.state === 'granted';
	});
</script>

{#if hasLocationPermission}
	<slot />
{:else}
	<p>You have not granted permission to access your location.</p>
{/if}
