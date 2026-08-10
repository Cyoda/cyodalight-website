import WorkflowDisplay from './WorkflowDisplay';
import workflowJson from '../data/helloworld-workflow.json?raw';

export default function HelloWorldWorkflowViewer() {
  return <WorkflowDisplay workflowJson={workflowJson} className="workflow-artifact__viewer" />;
}
