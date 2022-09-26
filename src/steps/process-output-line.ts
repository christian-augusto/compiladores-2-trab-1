function processOutputLine(line: string, outputs: Array<string>): boolean {
  const result = line.match(/^output/i);

  if (result == null) {
    return false;
  }

  const regexResult = line.match(/ [a-z]* ?/i);

  if (regexResult == null) {
    throw new Error("processOutputLine regexResult null");
  }

  const output = regexResult[0].replace(/ /g, "");

  outputs.push(output);

  return true;
}

export default processOutputLine;
