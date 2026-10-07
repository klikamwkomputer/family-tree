import { Handle, Position } from '@xyflow/react';
import type { Node, NodeProps } from '@xyflow/react';
import '../styles/PersonNode.css';

type PersonNodeData = {
  label: string;
  gender: string;
  birth: string;
  death?: string;
};

type PersonNodeType = Node<PersonNodeData, 'person'>;

export default function PersonNode({ data }: NodeProps<PersonNodeType>) {
  const isWoman = data.gender === 'Kobieta';

  return (
    <div
      className={`person-node ${
        isWoman ? 'person-node--woman' : 'person-node--man'
      }`}
    >
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="target" position={Position.Left} id="left" />

      <div
        className={`person-node__header ${
          isWoman ? 'person-node__header--woman' : 'person-node__header--man'
        }`}
      >
        <div className="person-node__name">{data.label}</div>

        <div className="person-node__gender">{data.gender}</div>
      </div>

      <div className="person-node__details">
        <div>🎂 {data.birth}</div>

        <div className="person-node__death">✝️ {data.death ?? '—'}</div>
      </div>

      <Handle type="source" position={Position.Bottom} id="bottom" />
      <Handle type="source" position={Position.Right} id="right" />
    </div>
  );
}
