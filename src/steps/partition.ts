let createdPartitions = 0;

export const getPartitionId = (): number => {
  createdPartitions++;
  return createdPartitions;
};

interface Partition {
  id: number;
}

export default Partition;
