import { useMemo } from 'react';
import { parseImportPayload } from '@cyoda/workflow-core';
import { WorkflowViewer } from '@cyoda/workflow-viewer';
import type { LayoutResult } from '@cyoda/workflow-viewer';

interface WorkflowDisplayProps {
  workflowJson: string;
  className?: string;
  compact?: boolean;
}

/** Lightweight, read-only workflow display used in the website example. */
export default function WorkflowDisplay({ workflowJson, className, compact = false }: WorkflowDisplayProps) {
  const parsed = useMemo(() => parseImportPayload(workflowJson), [workflowJson]);
  const layout = useMemo<LayoutResult | undefined>(() => {
    if (!compact || !parsed.document) return undefined;

    const positions = new Map<string, { id: string; x: number; y: number; width: number; height: number }>();
    const coordinates: Record<string, [number, number]> = {
      INITIATED: [0, 0],
      VALIDATING: [208, 0],
      REVIEW: [416, 0],
      SETTLEMENT: [624, 0],
      EXCEPTION: [312, 160],
      SETTLED: [624, 160],
    };

    for (const [id, pointer] of Object.entries(parsed.document.meta.ids.states)) {
      const [x, y] = coordinates[pointer.state] ?? [0, 0];
      positions.set(id, { id, x, y, width: 144, height: 72 });
    }

    return { positions, width: 768, height: 232 };
  }, [compact, parsed.document]);

  if (!parsed.document) {
    return (
      <div className="workflow-display__error" role="status">
        <strong>Workflow could not be displayed.</strong>
        <span>{parsed.issues?.[0]?.message ?? 'The supplied workflow JSON did not parse.'}</span>
      </div>
    );
  }

  return (
    <WorkflowViewer
      document={parsed.document}
      width="100%"
      height="100%"
      surface="website"
      layoutMode="embedded"
      interaction="none"
      className={className}
      dialectVersion="v0.8"
      {...(layout ? { layout } : {})}
    />
  );
}
