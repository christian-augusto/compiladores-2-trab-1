import Partition from "./partition";
import Transition from "./transition";

export const generateInputsDeclaration = (inputs: Array<string>): string => {
  return `.inputs ${inputs.join(", ")}` + "\n";
};

export const generateOutputsDeclaration = (outputs: Array<string>): string => {
  return `.outputs ${outputs.join(", ")}` + "\n";
};

export const generateGraphCodeLine = (): string => {
  return ".graph\n";
};

export const generateLinkPreviousPartition = (
  previousTransition: Transition,
  currentTransition: Transition,
  partition: Partition,
): string => {
  return (
    `.${previousTransition.outputs[0]} p${partition.id}` +
    "\n" +
    `.p${partition.id} ${currentTransition.inputs[0]} ` +
    "\n"
  );
};

export const generateSingleFlowCode = (transition: Transition, partition: Partition): string => {
  return `.${transition.inputs[0]} p${partition.id}` + "\n" + `.p${partition.id} ${transition.outputs[0]} ` + "\n";
};

export const generateOpeningConcurrencyCode = (
  currentTransition: Transition,
  nextTransition: Transition,
  nextPartitions: Partition[],
  nextBetweenPartitions: Partition[],
): string => {
  return (
    `.${currentTransition.outputs[0]} p${nextPartitions[0].id}` +
    "\n" +
    `.${currentTransition.outputs[0]} p${nextPartitions[1].id}` +
    "\n" +
    `.p${nextPartitions[0].id} ${nextTransition.inputs[0]}` +
    "\n" +
    `.p${nextPartitions[1].id} ${nextTransition.inputs[1]}` +
    "\n" +
    `.${nextTransition.inputs[0]} p${nextBetweenPartitions[0].id}` +
    "\n" +
    `.${nextTransition.inputs[1]} p${nextBetweenPartitions[1].id}` +
    "\n" +
    `.p${nextBetweenPartitions[0].id} ${nextTransition.outputs[0]}` +
    "\n" +
    `.p${nextBetweenPartitions[1].id} ${nextTransition.outputs[0]}` +
    "\n"
  );
};

export const generateClosingConcurrencyCode = (
  currentTransition: Transition,
  nextTransition: Transition,
  betweenPartitions: Partition[],
  nextPartitions: Partition[],
): string => {
  return (
    `.${currentTransition.inputs[0]} p${betweenPartitions[0].id}` +
    "\n" +
    `.${currentTransition.inputs[0]} p${betweenPartitions[1].id}` +
    "\n" +
    `.p${betweenPartitions[0].id} ${currentTransition.outputs[0]}` +
    "\n" +
    `.p${betweenPartitions[1].id} ${currentTransition.outputs[1]}` +
    "\n" +
    `.${currentTransition.outputs[0]} p${nextPartitions[0].id}` +
    "\n" +
    `.${currentTransition.outputs[1]} p${nextPartitions[1].id}` +
    "\n" +
    `.p${nextPartitions[0].id} ${nextTransition.inputs[0]}` +
    "\n" +
    `.p${nextPartitions[1].id} ${nextTransition.inputs[0]}` +
    "\n"
  );
};

export const generateMarkingCodeLine = (partition: Partition): string => {
  return `.marking{p${partition.id}}` + "\n";
};

export const generateEndCodeLine = (): string => {
  return ".end\n";
};
