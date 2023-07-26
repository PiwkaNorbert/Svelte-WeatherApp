<script lang="ts">
	export let kelvin: number;

	function convertKelvinToCelsius(kelvin: number) {
		if (kelvin < 0) {
			return 'below absolute zero (0 K)';
		} else {
			return (kelvin - 273.15).toFixed();
		}
	}
</script>

<p>{convertKelvinToCelsius(kelvin)}</p>
