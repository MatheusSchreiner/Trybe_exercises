## Descrição das Atividades
<br>

### Para os exericios abaixo iremos utilizar os bancos de dados clientes, produtos e vendas do repositório Data Bases
<br>

### 1. Utilize uma combinação das expressões aritméticas e adicione um campo chamado idade à coleção clientes . Algumas dicas:
* arredonde para baixo o valor da idade;
* calcule a idade usando a diferença entre a data corrente e a data de nascimento;
* 1 dia é igual a 86400000 milissegundos.

### 2. Utilizando o novo campo idade , conte quantos clientes têm entre 18 e 25 anos.
### 3. Remova os estágios $count e $match do exercício anterior e adicione um estágio no pipeline que coloque as compras do cliente no campo compras .
### 4. Selecione TODOS os clientes que compraram entre Junho de 2019 e Março de 2020 .
### 5. Confira o número de documentos retornados pelo pipeline com o método itcount() . Até aqui, você deve ter 486 documentos sendo retornados.
### 6. Ainda nesse pipeline , descubra os 5 estados com mais compras.
### 7. Descubra o cliente que mais consumiu QUEIJO PRATO . Retorne um documento com a seguinte estrutura:
~~~
{
  "nomeCliente": "NOME",
  "uf": "UF DO CLIENTE",
  "totalConsumido": 100
}
~~~
### 8. Selecione todas as vendas do mês de Março de 2020 , com status EM SEPARACAO . Acrescente um campo chamado dataEntregaPrevista com valor igual a três dias após a data da venda. Retorne apenas os campos clienteId , dataVenda e dataEntregaPrevista .
### 9. Calcule a diferença absoluta em dias entre a data da primeira entrega prevista e a última, considerando o pipeline do exercício 8.
