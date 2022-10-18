import Partition from "./partition";

interface Transition {
  initialState: number;
  finalState: number;
  inputs: Array<string>;
  outputs: Array<string>;
  nextTransitions: Transition[];
  previousPartition: Partition | null;
  isRead: boolean;
}

export default Transition;
