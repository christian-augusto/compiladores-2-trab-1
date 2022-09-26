import Transition from "./transition";

/**
 * @function
 * @param {String} line
 * @returns {Transition}
 */
function processTransitionLine(line: string): Transition | null {
  const result = line.match(/^[0-9]* [0-9]*/);

  if (result == null) {
    return null;
  }

  const steps = result[0].split(" ");

  const initialState = Number(steps[0]);
  const finalState = Number(steps[1]);

  const [inputsStr, outputsStr] = line
    .replace(/[\d]/gim, "")
    .split("|")
    .map(str => str.trim());

  const inputs = inputsStr.split(" ");
  const outputs = outputsStr.split(" ");

  return new Transition(initialState, finalState, inputs, outputs);
}

export default processTransitionLine;
