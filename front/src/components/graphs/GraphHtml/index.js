import React from 'react';
import { Graph } from "react-d3-graph";
import styled from 'styled-components';

const GraphWrapper = styled.div`
    max-width: 100%;
    margin: auto;
`;

export default function ForceGraph({data}) {
    const fakeData = {
        nodes: [
            { 
                id: "Harry",
                color: "red",
                svg: '',
                symbolType: "diamond"
            }, 
            { 
                id: "Sally",
                svg: 'https://pbs.twimg.com/profile_images/1260637166243282944/68K-EJ6D_normal.jpg',
            }, 
            { 
                id: "Alice",
                svg: 'https://i.pinimg.com/originals/0a/1f/82/0a1f820e29719c7b67e9d5aa44241155.png',
            }, 
            { 
                id: "Joao",
            }, 
            { 
                id: "Maria",
            }
        ],
        links: [
            { source: "Harry", target: "Sally" },
            { source: "Harry", target: "Alice" },
            { source: "Harry", target: "Maria" },
            { source: "Joao", target: "Alice" },
            { source: "Joao", target: "Sally" },
            { source: "Alice", target: "Sally" },
        ],
        focusedNodeId: "Harry"
    };

    // the graph configuration, just override the ones you need
    const myConfig = {
        nodeHighlightBehavior: true,
        directed: true,
        maxZoom: 2,
        minZoom: 0.5,
        node: {
            color: "white",
            fontColor: "#E1E8ED",
            fontSize: 12,
            size: 300,
            highlightStrokeColor: "#1da1f2",
            highlightFontSize: 12,
            highlightFontWeight: "bold",
            strokeWidth: 2,
        },
        link: {
            highlightColor: "#1da1f2",
            strokeWidth: 2,
            strokeLinecap : "square"
        },
        width: 800,
        height: 800,
    };

    const onMouseOverNode = function (nodeId) {
        console.log(`Clicked node ${nodeId}`);
    };

    const onMouseOverLink = function (source, target) {
        console.log(`Show tooltip link between ${source} and ${target}`);
    };
    return (
        <GraphWrapper>
            <Graph 
                id="graph-id" // id is mandatory
                data={data ? data : fakeData}
                config={myConfig}
                onMouseOverNode={onMouseOverNode}
                onMouseOverLink={onMouseOverLink}
            />
        </GraphWrapper>
    )
}