<script lang="ts">
	import ForceGraph, { type ForceGraphInstance } from 'force-graph';
	import { onMount } from 'svelte';

	let Graph: ForceGraphInstance;

	onMount(() => {
		const graphElement = document.createElement('div');
		graphElement.id = 'graph';
		document.body.append(graphElement);

		Graph = ForceGraph()(graphElement);
	});

	let loaded = false;
	let content = '';

	function loadContent() {
		loaded = true;

		const graphData = parseJSON(content);
		const graphKeys = interactiveEvaluateParams(graphData);

		Graph.graphData(graphData)
			.nodeId(graphKeys.nodeKey)
			.linkSource(graphKeys.edgeSourceKey)
			.linkTarget(graphKeys.edgeTargetKey);
	}

	function interactiveEvaluateParams(graphData: Record<any, any>) {
		// ask node key
		const nodeKey = prompt(JSON.stringify(Object.keys(graphData))) ?? '';
		const edgeKey = prompt(JSON.stringify(Object.keys(graphData))) ?? '';

		const edgeSourceKey = prompt(JSON.stringify(Object.keys(graphData['links'][0]))) ?? '';
		const edgeTargetKey = prompt(JSON.stringify(Object.keys(graphData['links'][0]))) ?? '';

		return { nodeKey, edgeSourceKey, edgeTargetKey };
	}

	function parseJSON(jsonString: string) {
		try {
			return JSON.parse(jsonString);
		} catch (e) {
			return {};
		}
	}
</script>

{#if !loaded}
	<div>
		<button on:click={console.log}>Load File</button>
		<p>or</p>
		<h2>Paste Content</h2>
		<textarea bind:value={content} />
		<button on:click={loadContent}>Process</button>
	</div>
{/if}
