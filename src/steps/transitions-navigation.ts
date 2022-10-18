import Transition from "./transition";
import Partition, { getPartitionId } from "./partition";
import OutputCode from "./output-code";
import {
  generateLinkPreviousPartition,
  generateSingleFlowCode,
  generateClosingConcurrencyCode,
  generateOpeningConcurrencyCode,
} from "./write-code";

const transitionsNavigation = (
  previousTransition: Transition | null,
  currentTransition: Transition,
  outputCode: OutputCode,
): void => {
  if (
    previousTransition != null &&
    previousTransition.outputs.length == 1 &&
    currentTransition.previousPartition != null &&
    !currentTransition.previousPartition.isWritten
  ) {
    currentTransition.previousPartition.isWritten = true;

    const transitionText = generateLinkPreviousPartition(
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

  if (
    currentTransition.outputs.length == 1 &&
    (currentTransition.nextTransitions.length > 1 ||
      (currentTransition.nextTransitions.length == 1 && currentTransition.nextTransitions[0].inputs.length == 1))
  ) {
    processSingleFlow(currentTransition, outputCode);
  } else if (currentTransition.outputs.length == 1 && currentTransition.nextTransitions[0].inputs.length > 1) {
    processOpenningConcurrency(currentTransition, outputCode);
  } else if (currentTransition.outputs.length > 1 && currentTransition.nextTransitions[0].inputs.length == 1) {
    processClosingConcurrency(currentTransition, outputCode);
  }
};

const processSingleFlow = (currentTransition: Transition, outputCode: OutputCode) => {
  const betweenPartition: Partition = {
    id: getPartitionId(),
    isWritten: false,
  };

  const transitionText = generateSingleFlowCode(currentTransition, betweenPartition);

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

const processOpenningConcurrency = (currentTransition: Transition, outputCode: OutputCode) => {
  currentTransition.previousPartition = null;
  currentTransition.nextTransitions[0].isRead = true;

  const betweenPartition: Partition = {
    id: getPartitionId(),
    isWritten: false,
  };

  let transitionText = generateSingleFlowCode(currentTransition, betweenPartition);

  outputCode.code += transitionText;

  const nextPartitions: Partition[] = [
    {
      id: getPartitionId(),
      isWritten: true,
    },
    {
      id: getPartitionId(),
      isWritten: true,
    },
  ];

  const nextBetweenPartitions: Partition[] = [
    {
      id: getPartitionId(),
      isWritten: true,
    },
    {
      id: getPartitionId(),
      isWritten: true,
    },
  ];

  const nextTransition = currentTransition.nextTransitions[0];

  transitionText = generateOpeningConcurrencyCode(
    currentTransition,
    nextTransition,
    nextPartitions,
    nextBetweenPartitions,
  );

  outputCode.code += transitionText;

  const previousPartition: Partition = {
    id: getPartitionId(),
    isWritten: false,
  };

  nextTransition.nextTransitions.forEach(t => {
    if (t.previousPartition == null) {
      t.previousPartition = previousPartition;
    }

    transitionsNavigation(nextTransition, t, outputCode);
  });
};

const processClosingConcurrency = (currentTransition: Transition, outputCode: OutputCode) => {
  const betweenPartitions: Partition[] = [
    {
      id: getPartitionId(),
      isWritten: true,
    },
    {
      id: getPartitionId(),
      isWritten: true,
    },
  ];

  const nextPartitions: Partition[] = [
    {
      id: getPartitionId(),
      isWritten: true,
    },
    {
      id: getPartitionId(),
      isWritten: true,
    },
  ];

  const transitionText = generateClosingConcurrencyCode(
    currentTransition,
    currentTransition.nextTransitions[0],
    betweenPartitions,
    nextPartitions,
  );

  outputCode.code += transitionText;

  currentTransition.nextTransitions.forEach(t => {
    transitionsNavigation(currentTransition, t, outputCode);
  });
};

export default transitionsNavigation;
