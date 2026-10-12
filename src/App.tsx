import { useEffect, useState } from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import type { Edge, Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import PersonNode from './components/PersonNode';
import JunctionNode from './components/JunctionNode';
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

type JunctionNodeData = {
  label: string;
};

type JunctionFlowNode = Node<JunctionNodeData, 'junction'>;

type FamilyNode = PersonFlowNode | JunctionFlowNode;

const nodes: PersonFlowNode[] = people.map((person) => ({
  id: person.id,
  type: 'person',
  position: { x: 0, y: 0 },
  data: {
    label: `${person.firstName} ${person.lastName}`,
    gender:
      person.gender === 'FEMALE'
        ? 'Kobieta'
        : person.gender === 'MALE'
          ? 'Mężczyzna'
          : 'Nieznana',
    birth: person.birthDate,
    death: person.deathDate,
  },
}));

const partnerEdges: Edge[] = relationships
  .filter((relationship) => relationship.type === 'PARTNER')
  .map((relationship) => ({
    id: relationship.id,
    source: relationship.fromPersonId,
    target: relationship.toPersonId,
    type: 'smoothstep',
    style: relationship.divorced
      ? {
          stroke: '#000000',
          strokeWidth: 2,
          strokeDasharray: '6 4',
        }
      : {
          stroke: '#ff0000',
          strokeWidth: 3,
        },
    data: {
      relationshipType: relationship.type,
      divorced: relationship.divorced ?? false,
    },
  }));

const parentsByChild = new Map<string, Set<string>>();

relationships
  .filter((relationship) => relationship.type === 'PARENT')
  .forEach((relationship) => {
    if (!parentsByChild.has(relationship.toPersonId)) {
      parentsByChild.set(relationship.toPersonId, new Set());
    }

    parentsByChild.get(relationship.toPersonId)!.add(relationship.fromPersonId);
  });

// Grupujemy dzieci mające ten sam zestaw rodziców.
const childrenByParents = new Map<string, string[]>();

parentsByChild.forEach((parentIds, childId) => {
  if (parentIds.size < 2) {
    return;
  }

  const parentKey = [...parentIds].sort().join('-');

  if (!childrenByParents.has(parentKey)) {
    childrenByParents.set(parentKey, []);
  }

  childrenByParents.get(parentKey)!.push(childId);
});

const junctionNodes: JunctionFlowNode[] = [];
const parentChildEdges: Edge[] = [];
const childrenWithJunction = new Set<string>();

childrenByParents.forEach((childIds, parentKey) => {
  const junctionId = `junction-${parentKey}`;
  const parentIds = parentKey.split('-');

  junctionNodes.push({
    id: junctionId,
    type: 'junction',
    position: { x: 0, y: 0 },
    data: { label: '' },
    draggable: false,
    selectable: false,
    connectable: false,
    style: {
      width: 1,
      height: 1,
      minWidth: 1,
      minHeight: 1,
      border: 'none',
      background: 'transparent',
      opacity: 0,
    },
  });

  parentIds.forEach((parentId) => {
    parentChildEdges.push({
      id: `parent-${parentId}-${junctionId}`,
      source: parentId,
      target: junctionId,
      sourceHandle: 'bottom',
      data: { relationshipType: 'PARENT' },
    });
  });

  childIds.forEach((childId) => {
    childrenWithJunction.add(childId);

    parentChildEdges.push({
      id: `${junctionId}-child-${childId}`,
      source: junctionId,
      target: childId,
      targetHandle: 'top',
      data: { relationshipType: 'PARENT' },
    });
  });
});

// Dzieci z jednym zapisanym rodzicem.
const singleParentEdges: Edge[] = relationships
  .filter((relationship) => relationship.type === 'PARENT')
  .filter((relationship) => {
    const parentCount = parentsByChild.get(relationship.toPersonId)?.size ?? 0;

    return (
      parentCount < 2 && !childrenWithJunction.has(relationship.toPersonId)
    );
  })
  .map((relationship) => ({
    id: relationship.id,
    source: relationship.fromPersonId,
    target: relationship.toPersonId,
    sourceHandle: 'bottom',
    targetHandle: 'top',
    data: { relationshipType: 'PARENT' },
  }));

const edges: Edge[] = [
  ...partnerEdges,
  ...parentChildEdges,
  ...singleParentEdges,
];

const nodeTypes = {
  person: PersonNode,
  junction: JunctionNode,
};

const allNodes: FamilyNode[] = [...nodes, ...junctionNodes];

function App() {
  const [layoutedNodes, setLayoutedNodes] = useState<FamilyNode[]>([]);
  const [layoutError, setLayoutError] = useState(false);

  const [selectedPerson, setSelectedPerson] = useState<PersonFlowNode | null>(
    null,
  );
  const [hoveredPersonId, setHoveredPersonId] = useState<string | null>(null);

  const activePersonId = hoveredPersonId ?? selectedPerson?.id ?? null;

  useEffect(() => {
    let cancelled = false;

    layoutFamily(allNodes, edges)
      .then((result) => {
        if (!cancelled) {
          setLayoutedNodes(result);
        }
      })
      .catch((error) => {
        console.error('Błąd układania drzewa rodzinnego:', error);

        if (!cancelled) {
          setLayoutError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const highlightedEdgeIds = new Set<string>();

  if (activePersonId) {
    const visitedNodes = new Set<string>();
    const queue = [activePersonId];

    while (queue.length > 0) {
      const currentId = queue.shift()!;

      if (visitedNodes.has(currentId)) {
        continue;
      }

      visitedNodes.add(currentId);

      const incomingParentEdges = edges.filter(
        (edge) =>
          edge.target === currentId && edge.data?.relationshipType === 'PARENT',
      );

      incomingParentEdges.forEach((edge) => {
        highlightedEdgeIds.add(edge.id);
        queue.push(edge.source);
      });
    }
  }

  const finalEdges: Edge[] = edges.map((edge) => {
    let updatedEdge: Edge = { ...edge };

    // Mężczyzna po lewej, kobieta po prawej.
    if (edge.data?.relationshipType === 'PARTNER') {
      const sourcePerson = people.find((person) => person.id === edge.source);
      const targetPerson = people.find((person) => person.id === edge.target);

      if (sourcePerson && targetPerson) {
        const sourceIsMale = sourcePerson.gender === 'MALE';
        const sourceIsFemale = sourcePerson.gender === 'FEMALE';
        const targetIsMale = targetPerson.gender === 'MALE';
        const targetIsFemale = targetPerson.gender === 'FEMALE';

        if (sourceIsMale && targetIsFemale) {
          updatedEdge = {
            ...updatedEdge,
            sourceHandle: 'right-source',
            targetHandle: 'left-target',
          };
        } else if (sourceIsFemale && targetIsMale) {
          updatedEdge = {
            ...updatedEdge,
            sourceHandle: 'left-source',
            targetHandle: 'right-target',
          };
        }
      }
    }

    // Podświetlamy linię prowadzącą do przodków.
    if (activePersonId) {
      const isHighlighted = highlightedEdgeIds.has(edge.id);

      updatedEdge = {
        ...updatedEdge,
        animated: false,
        style: {
          ...edge.style,
          stroke: isHighlighted ? '#00a6ff' : '#a0a0a0',
          strokeWidth: isHighlighted ? 4 : 1,
          opacity: isHighlighted ? 1 : 0.15,
        },
        zIndex: isHighlighted ? 10 : 0,
      };
    }

    return updatedEdge;
  });

  if (layoutError) {
    return (
      <div className="app">
        Nie udało się ułożyć drzewa. Sprawdź konsolę przeglądarki.
      </div>
    );
  }

  return (
    <div className="app">
      <ReactFlow<FamilyNode>
        nodes={layoutedNodes}
        edges={finalEdges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          type: 'smoothstep',
        }}
        fitView
        onNodeMouseEnter={(_, node) => {
          if (node.type === 'person') {
            setHoveredPersonId(node.id);
          }
        }}
        onNodeMouseLeave={() => {
          setHoveredPersonId(null);
        }}
        onNodeClick={(_, node) => {
          if (node.type === 'person') {
            setSelectedPerson(node as PersonFlowNode);
          }
        }}
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
