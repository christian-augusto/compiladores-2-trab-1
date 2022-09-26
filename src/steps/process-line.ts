import processInputLine from "./process-input-line";
import processOutputLine from "./process-output-line";
import processTransitionLine from "./process-transition-line";
import Transition from "./transition";

function processLine(line: string, inputs: Array<string>, outputs: Array<string>): Transition | null {
  let processed;

  processed = processInputLine(line, inputs);

  if (processed) {
    return null;
  }

  processed = processOutputLine(line, outputs);

  if (processed) {
    return null;
  }

  return processTransitionLine(line);
}

export default processLine;
