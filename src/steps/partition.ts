let createdPartitions = 0;

export const getPartitionId = (): number => {
  createdPartitions++;
  return createdPartitions;
};

interface Partition {
  id: number;
  isWritten: boolean;
}

export default Partition;
