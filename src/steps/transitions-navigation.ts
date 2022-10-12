import Transition from "./transition";
import Partition, { getPartitionId } from "./partition";
import OutputCode from "./output-code";
import { generateLinkPreviousTransition, generateTransitionCode } from "./write-code";

const transitionsNavigation = (
  previousTransition: Transition | null,
  currentTransition: Transition,
  outputCode: OutputCode,
): void => {
  if (
    previousTransition != null &&
    currentTransition.previousPartition != null &&
    !currentTransition.previousPartition.isWritten
  ) {
    currentTransition.previousPartition.isWritten = true;

    const transitionText = generateLinkPreviousTransition(
      previousTransition,
      currentTransition,
      currentTransition.previousPartition,
    );

    outputCode.code += transitionText;
  }

  if (currentTransition.isRead) {
    return;
  }

  currentTransition.isRead = true;
  currentTransition.betweenPartition = {
    id: getPartitionId(),
    isWritten: false,
  };

  const transitionText = generateTransitionCode(currentTransition, currentTransition.betweenPartition);

  outputCode.code += transitionText;

  const previousPartition: Partition = {
    id: getPartitionId(),
    isWritten: false,
  };

  currentTransition.nextTransitions.forEach(t => {
    if (t.previousPartition == null) {
      t.previousPartition = previousPartition;
    }

    transitionsNavigation(currentTransition, t, outputCode);
  });
};

export default transitionsNavigation;
