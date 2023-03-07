import ForceGraph from "force-graph";
import { ask } from "../interactive";

export default async function interactiveForceGraph(data: Record<any, any>) {
    const parameters = await evaluateParameters(data);

    const graphData = {
        nodes: data[parameters.nodeListKey],
        links: data[parameters.edgeListKey],
    };

    // construct the code here and run dynamically
    const graphElement = document.createElement('div');
    graphElement.id = 'graph';
    document.body.append(graphElement);
    const Graph = ForceGraph()(graphElement);
    Graph.graphData(graphData)
        .nodeId(parameters.nodeIdKey)
        .nodeLabel(parameters.nodeLabelKey)
        .nodeAutoColorBy(a => (a as any)[parameters.nodeColorKey]["value"])
        .linkAutoColorBy(parameters.edgeColorKey)
        .linkLabel(parameters.edgeLabelKey)
        .linkDirectionalParticles(2)
        .linkSource(parameters.edgeSourceKey)
        .linkTarget(parameters.edgeTargetKey);
}

async function evaluateParameters(data: Record<any, any>) {
    const nodeListKey = await ask("node key", Object.keys(data));
    const edgeListKey = await ask("edge key", Object.keys(data));

    const nodeIdKey = await ask("node id key", Object.keys(data[nodeListKey][0]));
    const nodeColorKey = await ask("node color key", Object.keys(data[nodeListKey][0]));
    const nodeLabelKey = await ask("node label key", Object.keys(data[nodeListKey][0]));

    const edgeSourceKey = await ask("edge source key", Object.keys(data[edgeListKey][0]));
    const edgeTargetKey = await ask("edge destination key", Object.keys(data[edgeListKey][0]));
    const edgeColorKey = await ask("edge color key", Object.keys(data[edgeListKey][0]));
    const edgeLabelKey = await ask("edge label key", Object.keys(data[edgeListKey][0]));

    return {
        nodeListKey,
        edgeListKey,
        nodeIdKey,
        nodeColorKey,
        nodeLabelKey,
        edgeSourceKey,
        edgeTargetKey,
        edgeColorKey,
        edgeLabelKey
    };
}

