<script>
  //Import the Fusioncharts library
  import FusionCharts from "fusioncharts";

  //Import the chart modules
  import Charts from "fusioncharts/fusioncharts.charts";

  //Import the theme as fusion
  import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

  //Import the Svelte component
  import SvelteFC, { fcRoot } from "svelte-fusioncharts";

  // Always set FusionCharts as the first parameter
  fcRoot(FusionCharts, Charts, FusionTheme);
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>