import ELK from 'elkjs/lib/elk.bundled.js';
import type { Edge, Node } from '@xyflow/react';

const NODE_WIDTH = 220;
const NODE_HEIGHT = 150;
const JUNCTION_SIZE = 2;
const NODE_GAP = 50;

const elk = new ELK();

export async function layoutFamily<T extends Node>(
  nodes: T[],
  edges: Edge[],
): Promise<T[]> {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const originalOrder = new Map(nodes.map((node, index) => [node.id, index]));

  const partnerEdges = edges.filter(
    (edge) => edge.data?.relationshipType === 'PARTNER',
  );

  // Aktualne związki: divorced nie jest ustawione na true.
  const currentPartnerEdges = partnerEdges.filter(
    (edge) => edge.data?.divorced !== true,
  );

  // Zapamiętujemy osoby, które mają aktualnego partnera.
  const currentPartnerIds = new Set<string>();

  for (const edge of currentPartnerEdges) {
    currentPartnerIds.add(edge.source);
    currentPartnerIds.add(edge.target);
  }

  function getGender(id: string): string | undefined {
    const node = nodeById.get(id);

    if (!node) {
      return undefined;
    }

    const data = node.data as { gender?: string } | undefined;
    return data?.gender;
  }

  function getMaleFemale(
    edge: Edge,
  ): { maleId: string; femaleId: string } | undefined {
    const sourceGender = getGender(edge.source);
    const targetGender = getGender(edge.target);

    const sourceIsMale =
      sourceGender === 'Mężczyzna' || sourceGender === 'MALE';
    const targetIsMale =
      targetGender === 'Mężczyzna' || targetGender === 'MALE';

    const sourceIsFemale =
      sourceGender === 'Kobieta' || sourceGender === 'FEMALE';
    const targetIsFemale =
      targetGender === 'Kobieta' || targetGender === 'FEMALE';

    if (sourceIsMale && targetIsFemale) {
      return { maleId: edge.source, femaleId: edge.target };
    }

    if (sourceIsFemale && targetIsMale) {
      return { maleId: edge.target, femaleId: edge.source };
    }

    return undefined;
  }

  // Krawędzie określające kolejność kart.
  const constraints = new Map<string, Set<string>>();

  function addConstraint(leftId: string, rightId: string) {
    if (!constraints.has(leftId)) {
      constraints.set(leftId, new Set());
    }

    constraints.get(leftId)!.add(rightId);
  }

  function hasPath(
    startId: string,
    targetId: string,
    visited = new Set<string>(),
  ): boolean {
    if (startId === targetId) {
      return true;
    }

    if (visited.has(startId)) {
      return false;
    }

    visited.add(startId);

    for (const nextId of constraints.get(startId) ?? []) {
      if (hasPath(nextId, targetId, visited)) {
        return true;
      }
    }

    return false;
  }

  // 1. Aktualne pary zawsze ustawiamy w kolejności:
  //    mężczyzna -> kobieta.
  for (const edge of currentPartnerEdges) {
    const pair = getMaleFemale(edge);

    if (pair) {
      addConstraint(pair.maleId, pair.femaleId);
    }
  }

  // 2. Dodajemy byłych partnerów tylko wtedy, gdy nie są
  //    obecnie w innym związku.
  //
  //    Była żona -> mężczyzna
  //    Kobieta -> były mąż
  //
  //    Osoba mająca aktualnego partnera nie jest dokładana
  //    do szeregu byłych partnerów poprzedniej pary.
  for (const edge of partnerEdges) {
    if (edge.data?.divorced !== true) {
      continue;
    }

    const pair = getMaleFemale(edge);

    if (!pair) {
      continue;
    }

    const { maleId, femaleId } = pair;

    // Jeżeli którekolwiek z byłych ma aktualnego partnera,
    // nie używamy tej dawnej relacji do ustalania kolejności.
    if (currentPartnerIds.has(maleId) || currentPartnerIds.has(femaleId)) {
      continue;
    }

    // Nie dodajemy reguły, która utworzyłaby cykl.
    if (!hasPath(maleId, femaleId)) {
      addConstraint(femaleId, maleId);
    }
  }

  // 3. Sortowanie topologiczne.
  const indegree = new Map(nodes.map((node) => [node.id, 0]));

  for (const [leftId, rightIds] of constraints) {
    if (!indegree.has(leftId)) {
      continue;
    }

    for (const rightId of rightIds) {
      if (indegree.has(rightId)) {
        indegree.set(rightId, (indegree.get(rightId) ?? 0) + 1);
      }
    }
  }

  const available = nodes
    .filter((node) => indegree.get(node.id) === 0)
    .map((node) => node.id);

  const orderedIds: string[] = [];

  while (available.length > 0) {
    available.sort(
      (a, b) => (originalOrder.get(a) ?? 0) - (originalOrder.get(b) ?? 0),
    );

    const id = available.shift()!;
    orderedIds.push(id);

    for (const nextId of constraints.get(id) ?? []) {
      if (!indegree.has(nextId)) {
        continue;
      }

      const nextDegree = (indegree.get(nextId) ?? 0) - 1;
      indegree.set(nextId, nextDegree);

      if (nextDegree === 0) {
        available.push(nextId);
      }
    }
  }

  // Zachowujemy wszystkie węzły, nawet jeśli dane zawierają
  // sprzeczne reguły kolejności.
  for (const node of nodes) {
    if (!orderedIds.includes(node.id)) {
      orderedIds.push(node.id);
    }
  }

  const orderIndex = new Map(orderedIds.map((id, index) => [id, index]));

  const elkNodes = [...nodes]
    .sort((a, b) => (orderIndex.get(a.id) ?? 0) - (orderIndex.get(b.id) ?? 0))
    .map((node) => ({
      id: node.id,
      width: node.type === 'junction' ? JUNCTION_SIZE : NODE_WIDTH,
      height: node.type === 'junction' ? JUNCTION_SIZE : NODE_HEIGHT,
    }));

  // Relacje rodzic–dziecko wyznaczają pokolenia.
  // Relacje partnerskie nie tworzą dodatkowych poziomów.
  const elkEdges = edges
    .filter((edge) => edge.data?.relationshipType !== 'PARTNER')
    .map((edge) => ({
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
    }));

  const graph = {
    id: 'family',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': 'DOWN',
      'elk.edgeRouting': 'ORTHOGONAL',
      'elk.spacing.nodeNode': String(NODE_GAP),
      'elk.layered.spacing.nodeNodeBetweenLayers': '100',
      'elk.layered.spacing.edgeNodeBetweenLayers': '30',
      'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
      'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
      'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES',
      'elk.layered.crossingMinimization.forceNodeModelOrder': 'true',
      'elk.padding': '[top=40,left=40,bottom=40,right=40]',
    },
    children: elkNodes,
    edges: elkEdges,
  };

  const result = await elk.layout(graph);

  const positions = new Map(
    (result.children ?? []).map((node) => [
      node.id,
      {
        x: node.x ?? 0,
        y: node.y ?? 0,
      },
    ]),
  );

  return nodes.map((node) => ({
    ...node,
    position: positions.get(node.id) ?? node.position,
  }));
}
