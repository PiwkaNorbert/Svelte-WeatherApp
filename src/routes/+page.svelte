<script lang="ts">
	import { onMount } from 'svelte';
	import type { Root } from '../Utils/Interfaces';
	import LocationCheck from '$lib/components/LocationCheck.svelte';
	import Card from './Card.svelte';

	export let latitude: number;
	export let longitude: number;
	let weatherApiReturn: Root;
	const api = import.meta.env.VITE_API_KEY;

	onMount(() => {
		getPosition();
	});

	async function getPosition() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				latitude = pos.coords.latitude;
				longitude = pos.coords.longitude;
				getWeatherByCoords(latitude, longitude);
			});
		} else {
			console.log('Geolocation is not supported by this browser.');
		}
	}
	export async function getWeatherByCoords(latitude: number, longitude: number) {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api}`
		);
		weatherApiReturn = await res.json();

		return weatherApiReturn;
	}
	export async function getWeatherBySearch(location: string) {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}`
		);
		weatherApiReturn = await res.json();

		return weatherApiReturn;
	}

	// function to convert kalvin to calcius
	function convertKelvinToCelsius(kelvin: number) {
		if (kelvin < 0) {
			return 'below absolute zero (0 K)';
		} else {
			return (kelvin - 273.15).toFixed();
		}
	}
	const convertMetersToKilometers = (meters: number) => (meters / 1000).toFixed(1);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
	<section class="flex flex-col align-center justify-center">
		<!-- JSX -->
		<!-- if weatherApiReturn not null bind object  -->
		{#if !weatherApiReturn}
			<p>Search for a city or allow location</p>

			<br />
			<button on:click={getPosition}>Allow</button>
		{/if}
		{#if weatherApiReturn}
			<h1>{weatherApiReturn.name}</h1>
			<div class="weather__temperature gap-2">
				<div
					style={`mask: url("src/lib/images/weatherIcons/${weatherApiReturn.weather[0].icon}.svg") no-repeat center; -webkit-mask: url("src/lib/images/weatherIcons/${weatherApiReturn.weather[0].icon}.svg") no-repeat center; -webkit-mask-size: contain; mask-size: contain; `}
					class="text-current"
				/>
				<p>{convertKelvinToCelsius(weatherApiReturn.main.temp)}&deg;C</p>
			</div>
			<p class="weather__description text-xl">{weatherApiReturn.weather[0].description}</p>
			<div class="text-sm flex gap-4">
				<p class="m-0">
					<picture>
						<div
							style="margin-bottom: 4px; mask: url(src/lib/images/weatherIcons/thermometer-0.svg) no-repeat center; -webkit-mask: url(src/lib/images/weatherIcons/thermometer-0.svg) no-repeat center; -webkit-mask-size: contain; mask-size: contain; background: hsl(var(--color-sec)/ 80%);	height:24px; width: 24px; "
						/>
					</picture>

					<span class="font-bold">
						{convertKelvinToCelsius(weatherApiReturn.main.temp_min)}&deg;C
					</span>
				</p>

				<p class="m-0">
					<picture>
						<div
							style="margin-bottom: 4px;  mask: url(src/lib/images/weatherIcons/thermometer-0.svg) no-repeat center; -webkit-mask: url(src/lib/images/weatherIcons/thermometer-full.svg) no-repeat center; -webkit-mask-size: contain; mask-size: contain; background: hsl(var(--color-sec)/ 80%);	height:24px; width: 24px; "
						/>
					</picture>
					<span class="font-bold"
						>{convertKelvinToCelsius(weatherApiReturn.main.temp_max)}&deg;C</span
					>
				</p>
			</div>
			<br />
			<hr style="width: 100%; " />

			<div class="text-sm gap-4 flex align-center justify-center">
				<p>
					Feels like
					<span class="font-bold">
						{convertKelvinToCelsius(weatherApiReturn.main.feels_like)}&deg;C
					</span>
				</p>
				<p>
					Humidity
					<span class="font-bold">
						{weatherApiReturn.main.humidity}%
					</span>
				</p>
				<p>
					Visibility <span class="font-bold">
						{convertMetersToKilometers(weatherApiReturn.visibility)}km
					</span>
				</p>
			</div>
			<!--  -->

			<div class="flex gap-4 align-center justify-center text-sm">
				<div class="flex align-center justify-center h-7">
					<svg data-v-7bdd0738="" data-v-3208ab85="" class="w-full h-full" viewBox="0 0 96 96"
						><g
							data-v-7bdd0738=""
							transform="translate(0,96) scale(0.100000,-0.100000)"
							fill="currentColor"
							stroke="none"
							><path
								data-v-7bdd0738=""
								d="M351 854 c-98 -35 -179 -108 -227 -202 -27 -53 -29 -65 -29 -172 0
				-107 2 -119 29 -172 38 -75 104 -141 180 -181 58 -31 66 -32 176 -32 110 0
				118 1 175 32 77 40 138 101 178 178 31 57 32 65 32 175 0 110 -1 118 -32 176
				-40 76 -106 142 -181 179 -49 25 -71 29 -157 32 -73 2 -112 -1 -144 -13z m259
				-80 c73 -34 126 -86 161 -159 24 -50 29 -73 29 -135 0 -62 -5 -85 -29 -135
				-57 -119 -161 -185 -291 -185 -130 0 -234 66 -291 185 -24 50 -29 73 -29 135
				0 130 66 234 185 291 82 40 184 41 265 3z"
							/><path
								data-v-7bdd0738=""
								d="M545 600 c-35 -35 -68 -60 -80 -60 -27 0 -45 -18 -45 -45 0 -33 -50
				-75 -89 -75 -18 0 -41 -5 -53 -11 -20 -11 -20 -11 3 -35 12 -13 33 -24 46 -24
				17 0 23 -6 23 -23 0 -13 10 -33 23 -45 30 -28 47 -13 47 43 0 32 6 47 28 68
				15 15 37 27 48 27 26 0 44 18 44 44 0 12 26 47 60 81 l60 61 -28 27 -28 27
				-59 -60z"
							/></g
						></svg
					>
					<p>
						{weatherApiReturn.main.pressure}hPa
					</p>
				</div>
				<div class="flex align-center justify-center gap-1">
					<svg
						data-v-47880d39=""
						viewBox="0 0 1000 1000"
						enable-background="new 0 0 1000 1000"
						class="h-5"
						xml:space="preserve"
						style="transform: rotate(250deg);"
						><g data-v-47880d39="" fill="currentColor"
							><path
								data-v-47880d39=""
								d="M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z"
							/><path
								data-v-47880d39=""
								d="M817.2,990c-8.3,0-16.6-3.3-26.5-9.9L497.2,769.5c-5-3.3-18.2-3.3-23.2,0L210.3,976.7c-19.9,16.6-41.5,14.9-51.4,0c-6.6-9.9-8.3-21.6-3.3-38.1L449.1,39.8C459,13.3,477.3,10,483.9,10c6.6,0,24.9,3.3,34.8,29.8l325,898.7c5,14.9,5,28.2-1.7,38.1C837.1,985,827.2,990,817.2,990z M485.6,716.4c14.9,0,28.2,5,39.8,11.6l255.4,182.4L485.6,92.9l-267,814.2l223.9-177.4C454.1,721.4,469,716.4,485.6,716.4z"
							/></g
						></svg
					>
					<p>
						{weatherApiReturn.wind.speed}m/s
					</p>
				</div>
			</div>

			<!-- 
			<h3>clouds</h3>
			{#each Object.entries(weatherApiReturn.clouds) as [k, v]}
				<h3>{k}</h3>
				<p>{v}</p>
			{/each}

			<h3>dt</h3>
			<p>{weatherApiReturn.dt}</p>

			<h3>sys</h3>
			{#each Object.entries(weatherApiReturn.sys) as [k, v]}
				<h3>{k}</h3>
				<p>{v}</p>
			{/each}

			<h3>timezone</h3>
			<p>{weatherApiReturn.timezone}</p>

			<h3>id</h3>
			
			<h3>cod</h3>
			<p>{weatherApiReturn.cod}</p>-->
			<!-- <p>{weatherApiReturn.id}</p> -->
		{/if}
	</section>
</main>

<style>
	:root {
		--black: 208 48% 6%;
		--border-md: 4px;
		--theme-border: hsl(var(--black));
	}
	main {
		display: grid;
		justify-content: center;
		align-items: center;

		margin-top: 5rem;
	}
	section {
		padding: 1em;
		width: 420px;
		box-sizing: border-box;

		background: hsl(var(--color-bg) / 60%);
		/* border-radius: 16px; */
		backdrop-filter: blue(20px);
		-webkit-backdorp-filter: blur(20px);

		border: solid var(--border-md) hsl(var(--color-bg));
		box-shadow: 4px 4px 0 hsl(var(--color-bg));
	}
	@media only screen and (max-width: 500px) {
		section {
			max-width: 100%;
			border-radius: 0px;
		}
	}

	h1 {
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
		margin: 0.5em 0;
	}

	span {
		font-weight: 800;
		color: hsl(var(--color-text) / 80%);
	}
	svg {
		color: hsl(var(--color-pri) / 90%);
	}
	p {
		color: hsl(var(--color-sec) / 70%);
	}
	.text-current {
		background: hsl(var(--color-pri) / 90%);
		/* mask the svg to have a color */

		/* dont repeat */
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		/* center the mask */
		-webkit-mask-position: center;
		mask-position: center;
		/* size the mask */
		-webkit-mask-size: contain;
		mask-size: contain;
		height: 64px;
		aspect-ratio: 1/1;
	}
	.weather__temperature {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
	.weather__description {
		margin: 0.5em 0;
		text-transform: capitalize;
		color: hsl(var(--color-accent));
	}

	svg path {
		fill: hsl(var(--color-pri) / 90%);
	}

	.weather__temperature p {
		font-weight: 700;
		font-size: 2rem;
		margin: 0;
	}
</style>
