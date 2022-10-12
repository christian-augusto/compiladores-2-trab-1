/* eslint-disable @typescript-eslint/no-floating-promises */
import fs from "fs/promises";

import processLine from "./steps/process-line";
import * as config from "./config";
import Transition from "./steps/transition";
import OutputCode from "./steps/output-code";
import {
  generateInputsDeclaration,
  generateOutputsDeclaration,
  generateGraphCodeLine,
  generateMarkingCodeLine,
  generateEndCodeLine,
} from "./steps/write-code";
import transitionsNavigation from "./steps/transitions-navigation";

const main = async () => {
  try {
    config.initConfig();

    const data = await fs.readFile("./code.txt", { encoding: "utf8" });

    const lines = data.split(/\r?\n/);

    const inputs: Array<string> = [];
    const outputs: Array<string> = [];
    const allTransitions: Array<Transition> = [];

    lines.forEach(function (line: string) {
      const transition = processLine(line, inputs, outputs);

      if (transition == null) {
        return;
      }

      allTransitions.push(transition);
    });

    const outputCode: OutputCode = {
      code: "",
    };

    outputCode.code += generateInputsDeclaration(inputs);
    outputCode.code += generateOutputsDeclaration(outputs);
    outputCode.code += generateGraphCodeLine();

    allTransitions.forEach(function (transition) {
      transition.nextTransitions = allTransitions.filter(t => transition.finalState == t.initialState);
    });

    transitionsNavigation(null, allTransitions[0], outputCode);

    if (allTransitions[0].previousPartition != null) {
      outputCode.code += generateMarkingCodeLine(allTransitions[0].previousPartition);
    }

    outputCode.code += generateEndCodeLine();

    if (config.getLogs()) {
      console.log(outputCode.code);
    }
  } catch (err) {
    console.log(err);
  }
};

main();
