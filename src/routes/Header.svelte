<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';

	const API_KEY = import.meta.env.VITE_GEOLOCATION_API;
	let searchInput: string = '';
	let searchList: [] = [];
	async function GETLocation(value: string) {
		console.log(value);

		try {
			const response = await fetch(
				`https://api.geoapify.com/v1/geocode/search?text=${value}&apiKey=${API_KEY}`
			);
			const data = await response.json();
			searchList = data.features;
			console.log(data);
			
			return searchList;

		} catch (error) {
			console.error(error);
			throw new Error('Error while fetching data from Geoapify API')
		}
	}
</script>

<header class="flex flex-col">



	<div class="corner ">
		<a href="https://github.com/PiwkaNorbert">
			<img src={github} alt="GitHub" />
		</a>
	</div>

	<nav>
		<form
			class="flex"
			on:submit={(event) => {
				event.preventDefault();
				if (event?.target === null) return;
				searchInput = event?.target?.search.value;
				GETLocation(searchInput);
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				fill="currentColor"
				viewBox="0 0 256 256"
				class="search-icon"
				><path
					d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
				/></svg
			>
			<input type="search"  placeholder="Search for a Country" name="search" />
		</form>
		{#if searchList && searchInput.length > 0}
		<ul>
		{#each searchList as items }
				{#if items.properties.country}
						<li>
							<a
								href="/country?search&lon={items.properties.lon}&lat={items.properties.lat}"
								aria-current={page.pathname === '/country/{items.properties.country}'}
							>
								{items.properties.city}, {items.properties.state}, {items.properties.country}
							</a>
						</li>
						{/if}
						{/each}
					</ul>
		{/if}
	</nav>
</header>


<style>
	*{
		box-sizing: border-box;

	}
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
		align-self: end;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: hsl(var(--color-sec) / 80%);
		position: relative;

	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}
	form {
		display: flex;
		align-items: center;
		position: relative;
		width: 420px;

		border: solid var(--border-md) hsl(var(--color-bg));
		box-shadow: 4px 4px 0 hsl(var(--color-bg));
	}
	form svg {
		width: 2em;
		height: 2em;
		display: block;
		position: absolute;
		padding: 0.2em;
		left: 0.6em;
	}
	form input {
		width: 100%;
		background-color: hsl(var(--color-bg) / 60%);
		padding-left: 3em;
		color: hsl(var(--color-text));
		height: 3em;
		/* all: unset; */
		/* border: solid var(--border-md) hsl(var(--color-bg)); */
	}

	 ul {
		padding: 0;
		margin: 0;
		list-style: none;
		top: 56px;
		width: 420px;
		position: absolute;
		background-color: hsl(var(--color-bg));
		border-inline: solid var(--border-md) hsl(var(--color-bg));
		box-shadow: 4px 4px 0 hsl(var(--color-bg));

		display: grid;
		
		align-items: center;

	}
	li {
		width: 420px;
		background-color: hsl(var(--color-bg));

		


	}

	li:hover {
		background: hsl(var(--color-accent)/20% );
		width: 420px;
	}
	li > a {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		text-decoration: none;
		color: hsl(var(--color-text));
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0.5rem 1rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	.search-icon {
		color: hsl(var(--color-sec));
	}
</style>
