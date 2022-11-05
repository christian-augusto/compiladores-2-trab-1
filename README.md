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

## Código 3 (decisão + concorrência)
```
input a 0
input b 0
input c 0
input d 0
output e 0
output f 0
output g 0
0 1 a+ | e+
1 2 [b-] | f-
1 3 [c+] | g-
2 4 c+ | f+
4 5 c+ | f+ f-
5 0 c- | f-
3 6 d- | g+
6 0 d- | g-
```

## Dúvidas
Concorrência pode ter uma decisão dentro? R: Não.

Concorrência pode abrir outra concorrência? R: Não.

Pode ter 3 decisões ou mais? R: Pode, mas não vamos trabalhar com isso.

Vamos ter concorrência mais difícil do que os exemplos? R: Não.

Uma concorrência em um ramo de decisão pode fechar no início? R: Não.
