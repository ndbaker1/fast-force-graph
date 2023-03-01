<script lang="ts">
	import interactiveForceGraph from '$lib/graph-frontends/force-graph';
	import { parseJSON } from '$lib/utils';

	let loaded = false;
	let content = '';

	function loadContent() {
		loaded = true;

		const graphData = parseJSON(content);
		interactiveForceGraph(graphData);
	}
</script>

{#if !loaded}
	<div>
		<!-- <button on:click={console.log}>Load File</button>
		<p>or</p> -->
		<h2>Paste Content</h2>
		<textarea bind:value={content} />
		<button on:click={loadContent}>Process</button>
	</div>
{/if}

<style>
</style>
