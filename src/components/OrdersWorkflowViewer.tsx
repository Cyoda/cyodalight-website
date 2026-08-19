import WorkflowDisplay from './WorkflowDisplay';
import workflowJson from '../data/orders-entity-workflow.json?raw';

export default function OrdersWorkflowViewer() {
  return <WorkflowDisplay workflowJson={workflowJson} className="workflow-artifact__viewer" />;
}
