import { Handle, Position } from '@xyflow/react';

export default function JunctionNode() {
  return (
    <div style={{ width: 2, height: 2, position: 'relative' }}>
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ opacity: 0, width: 2, height: 2, border: 'none' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ opacity: 0, width: 2, height: 2, border: 'none' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ opacity: 0, width: 2, height: 2, border: 'none' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ opacity: 0, width: 2, height: 2, border: 'none' }}
      />
    </div>
  );
}
