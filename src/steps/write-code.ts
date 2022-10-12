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

export const generateLinkPreviousTransition = (
  previousTransition: Transition,
  currentTransition: Transition,
  partition: Partition,
) => {
  // TODO: concurrency

  return (
    `.${previousTransition.outputs[0]} p${partition.id}` +
    "\n" +
    `.p${partition.id} ${currentTransition.inputs[0]} ` +
    "\n"
  );
};

export const generateTransitionCode = (transition: Transition, partition: Partition): string => {
  // TODO: concurrency

  return `.${transition.inputs[0]} p${partition.id}` + "\n" + `.p${partition.id} ${transition.outputs[0]} ` + "\n";
};

export const generateMarkingCodeLine = (partition: Partition): string => {
  return `.marking{p${partition.id}}` + "\n";
};

export const generateEndCodeLine = (): string => {
  return ".end\n";
};
