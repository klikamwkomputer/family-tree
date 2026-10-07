import { useState } from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import type { Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import PersonNode from './components/PersonNode';
import { people, relationships } from './data/family';
import { layoutFamily } from './layout/layoutFamily';
import './App.css';

type PersonNodeData = {
  label: string;
  gender: string;
  birth: string;
  death?: string;
};

type PersonFlowNode = Node<PersonNodeData, 'person'>;

const nodes: PersonFlowNode[] = people.map((person) => ({
  id: person.id,
  type: 'person',
  position: {
    x: 0,
    y: 0,
  },
  data: {
    label: `${person.firstName} ${person.lastName}`,
    gender: person.gender === 'FEMALE' ? 'Kobieta' : 'Mężczyzna',
    birth: person.birthDate,
    death: person.deathDate,
  },
}));

const edges = relationships.map((relationship) => ({
  id: relationship.id,
  source: relationship.fromPersonId,
  target: relationship.toPersonId,
  data: {
    relationshipType: relationship.type,
  },
  sourceHandle: relationship.type === 'PARTNER' ? 'right' : 'bottom',
  targetHandle: relationship.type === 'PARTNER' ? 'left' : 'top',
}));

const nodeTypes = {
  person: PersonNode,
};

const layoutedNodes = layoutFamily(nodes, edges);

function App() {
  const [selectedPerson, setSelectedPerson] = useState<PersonFlowNode | null>(
    null,
  );

  return (
    <div className="app">
      <ReactFlow<PersonFlowNode>
        nodes={layoutedNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => setSelectedPerson(node)}
      >
        <Background />
        <Controls />
      </ReactFlow>

      {selectedPerson && (
        <div className="person-details">
          <button
            className="person-details__close"
            onClick={() => setSelectedPerson(null)}
          >
            ×
          </button>

          <h2 className="person-details__name">{selectedPerson.data.label}</h2>

          <p>{selectedPerson.data.gender}</p>
          <p>🎂 {selectedPerson.data.birth}</p>
          <p>✝️ {selectedPerson.data.death ?? 'Żyje'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
