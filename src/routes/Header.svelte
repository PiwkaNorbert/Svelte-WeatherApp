<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';

	export let searchInput;
</script>

<header>
	<div class="corner" />

	<nav>
		<form
			class="flex"
			on:submit={(event) => {
				event.preventDefault();
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
			<input
				type="search"
				placeholder="Search for a Country"
				on:change={(event) => {
					// bind the value from the input to the searchInput variable
					if (event?.target === null) return;
					searchInput = event.target.value;
					console.log(searchInput);
				}}
			/>
		</form>
	</nav>

	<div class="corner">
		<a href="https://github.com/PiwkaNorbert">
			<img src={github} alt="GitHub" />
		</a>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
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
		box-sizing: border-box;

		border: solid var(--border-md) hsl(var(--color-bg));
		box-shadow: 4px 4px 0 hsl(var(--color-bg));
	}
	form svg {
		width: 2em;
		height: 2em;
		display: block;
		position: absolute;
		padding: 0.2em;
		box-sizing: border-box;
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
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
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
		padding: 0 0.5rem;
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