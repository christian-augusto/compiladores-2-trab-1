function processInputLine(line: string, inputs: Array<string>): boolean {
  const result = line.match(/^input/i);

  if (result == null) {
    return false;
  }

  const regexResult = line.match(/ [a-z]* ?/i);

  if (regexResult == null) {
    throw new Error("processOutputLine regexResult null");
  }

  const input = regexResult[0].replace(/ /g, "");

  inputs.push(input);

  return true;
}

export default processInputLine;
