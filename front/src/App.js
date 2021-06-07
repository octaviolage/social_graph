import React, { useState } from 'react';
import styled from 'styled-components';
import ForceGraph from './components/ForceGraph';
import TwitterSVG from '../src/components/svg/TwitterBird';
import data from './data/data.json'
import { getFriendsGraph } from './api';
import Friends from './components/Friends';

const Header = styled.div`
  height: 50px;
  color: var(--primary);
  margin: auto;
  margin-top: 5%;
  margin-bottom: 1%;
`
Header.Title = styled.h1`
  font-size: 50px;
  color: var(--primary);

  @media (max-width: 800px){
    font-size: 28px;
    margin-top: 20%;
  }
`
const Form = styled.form`
  display: flex;
  width: 90%;
  margin: auto;
  margin-top: 60px;
  margin-bottom: 1%;
  align-content: center;
  
  @media (max-width: 800px){
    font-size: 24px;
  }
`;
Form.Input = styled.input`
  align-self: center;
  margin: auto;
  background-color: var(--darkGray);
  border: 1px solid var(--darkGray);
  border-radius: 30px;
  max-width: 80%;
  height: 60px;
  color: white;
  font-size: 28px;
  padding-left: 15px;
  outline: none;

  :focus{
    border: 1px solid var(--primary);
    background-color: var(--secondary);
  }

  @media (max-width: 800px){
    font-size: 24px;
    height: 45px;
  }
`;

function App() {
  const [ graph, setGraph ] = useState();
  const [ adjList, setAdjList ] = useState();
  
  const handleSubmit = async event => {
    event.preventDefault();
    const username = event.target.children[0].value
    const response = await getFriendsGraph(username);
    setGraph(response.graph);
    setAdjList(response.adjacency_list);
  };

  const nodeHoverTooltip = React.useCallback((node) => {
    return `
      <div>
        <div class="name">
          ${node.name}
        </div>
        <div class="username">
          ${node.id}
        </div>
        <div class="description">
          ${node.description ? node.description : ''}
        </div>
      </div>
    `;
  }, []);

  return (
    <>
      <Header>
        <Header.Title>
          Twitter Social Graph <TwitterSVG/> 
        </Header.Title>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          type="text"
          placeholder="username"
          max-length="50"
        />
      </Form>
      {
        graph ?
          <div>
            <ForceGraph linksData={graph.links} nodesData={graph.nodes} nodeHoverTooltip={nodeHoverTooltip}/>
            <Friends nodes={data.nodes} />
          </div> :
          null
      }
      {/* <ForceGraph linksData={data.links} nodesData={data.nodes} nodeHoverTooltip={nodeHoverTooltip}/>
      <Friends nodes={data.nodes} /> */}
    </>
  );
}

export default App;
