# Compiladores 2 trabalho 1

## Código 1 (decisão)
```
input a 0
input b 0
output x 0
output z 0
0 1 a+ | z+
1 2 [a-] | z-
1 3 [b+] | z-
2 4 b+ | x+
4 0 b- | x-
3 5 a- | x+
5 0 b- | x-
```


## Código 2 (concorrência)
```
input a 0
input b 0
output x 0
output y 0
0 1 a+ | x+ y+
1 2 b+ | y-
2 0 a- b- | x-
```

## Dúvidas
Concorrência pode ter uma decisão dentro? R: Não

Pode ter 3 decisões ou mais? R: Pode, mas não vamos trabalhar com isso

Vamos ter concorrência mais difícil do que os exemplos? R: Não

Uma concorrência em um ramo de decisão pode fechar no início?

## Pseudocódigo
Captions:
```
// allTransitions[0] é the beginning
```

### Step 1:

Get transitions
```
Transition: {
  nextTransitions: Transition[]
  initialState: number;
  finalState: number;
  previousPartition: Partition;
  betweenPartition: Partition;
  isRead: boolean;
}
```

### Step 2:

Identify next transitions for each transition

### Step 3:
```
function transitionsNavigation(currentTransition: Transition) {
  if (previousTransition != null) {
    // write code currentTransition.previousPartition (concurrency here to)
  }

  if (currentTransition.isRead) {
    return;
  }

  currentTransition.isRead = true; // preencher isRead
  currentTransition.betweenPartition = {}; // creates the betweenPartition

  // write code currentTransition.betweenPartition

  transitionsNavigation(currentTransition.nextTransitions[0]);

  if (currentTransition.nextTransitions.length > 1) {
    transitionsNavigation(currentTransition.nextTransitions[1]);
  }
}

transitionsNavigation(allTransitions[0]);
```

### Step 4:
```
// write code .marking to allTransitions[0].previousPartition
```
