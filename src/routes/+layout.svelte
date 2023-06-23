<script lang="ts">
	import Header from './Header.svelte';
	import './styles.css';
	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<div class="app">
	<QueryClientProvider client={queryClient}>
		<Header />
		<main>
			<slot />
		</main>
	</QueryClientProvider>
</div>
