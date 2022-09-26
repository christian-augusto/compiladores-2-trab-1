# Compiladores 2 trabalho 1

## Decisão
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


## Concorrência
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
Como seria o voltar para uma decisão?

## Pseudocódigo
```
function navigation(previousPartition, transition) {
  transition.isRead = true; // preencher isRead
  transition.betweenPartition = {}; // creates the betweenPartition

  if (previousPartition != null) { // não é a primeira transition
    // write previousPartition to transition
  }

  // write code

  const transitions = [];

  if (transition.next == inicio || transition.isRead) {
    return {
      transition,
      next: transition.next
    };
  }

  transition.nextPartition = {}; // creates the nextPartition

  transitions.push(navigation(transition.nextPartition, transition.next[0]));

  if (transition.next.length > 1) {
    transitions.push(navigation(transition.nextPartition, transition.next[1]));
  }

  if (transitions.filter().length > 1) { // existe mais de 1 transition com início igual ao meu final
    const t = {}; // pegar transition com final igual ao meu final

    // write transition to t.nextPartition
  } else {
    if (transitions[0].next.previousPartition == null) {
      transitions[0].next.previousPartition = {}; // creates the previousPartition
    }

    // write transition 1 to t.previousPartition

    if (transitions[1].next.previousPartition == null) {
      transitions[1].next.previousPartition = {}; // creates the previousPartition
    }

    // write transition 2 to t.previousPartition
  }
}

navigation(null, transitions[0])
```
