class Transition {
  private initialState: number;
  private finalState: number;
  private inputs: Array<string>;
  private outputs: Array<string>;

  constructor(initialState: number, finalState: number, inputs: Array<string>, outputs: Array<string>) {
    this.initialState = initialState;
    this.finalState = finalState;
    this.inputs = inputs;
    this.outputs = outputs;
  }

  hasOutputConcurrency(): boolean {
    return this.outputs.length > 1;
  }
}

export default Transition;
