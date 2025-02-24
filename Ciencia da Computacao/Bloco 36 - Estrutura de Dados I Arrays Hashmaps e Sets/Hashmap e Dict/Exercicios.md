### 1. 
~~~
def count_words(words, chars):
    ans = 0
    alphabet = {}
    for char in chars:
        if char not in alphabet:
            alphabet[char] = 1
        else:
            alphabet[char] += 1
    print(f"Montamos o alfabeto: {alphabet}")

    for word in words:
        print(f"Analisando a palavra {word}")
        str_count = {}
        for char in word:
            if char not in alphabet:
                print(f"'{char}' não está no alfabeto. Desconsiderar palavra")
                break

            if char not in str_count:
                str_count[char] = 1
            else:
                str_count[char] += 1

                if str_count[char] > alphabet[char]:
                    print(f"'{char}' ocorre com mais frequência do que no alfabeto. Desconsiderar")
                    break
        else:
            print(f"Considerar {word}")
            ans += len(word)

    return ans

words = ["cat", "bt", "hat", "tree", "caaat"]
chars = "atach"
print(f"Resposta final: {count_words(words, chars)}")
print()
words = ["hello", "world", "students"]
chars = "welldonehoneyr"
print(f"Resposta final: {count_words(words, chars)}")
~~~
<br>

### 2. 
~~~
score da pessoa 5 = 1 + score da pessoa 7 (1)
score da pessoa 7 = 1

def score(subordinates, person):
    this_score = 1

    for subordinate in subordinates[person]:
        this_score += score(subordinates, subordinate)

    return this_score

if __name__ == "__main__":
    subordinates = {
: [2, 3],
: [4],
: [],
: [5, 6],
: [7],
: [],
: [],
    }

    print(score(subordinates, 1))
    print(score(subordinates, 2))
    print(score(subordinates, 3))
    print(score(subordinates, 4))
    print(score(subordinates, 5))
    print(score(subordinates, 6))
    print(score(subordinates, 7))
~~~
<br>

### 3. 
~~~
// follow-up 1: Se você calcular para a pessoa 1, você concorda que teremos que calcular o score de todas as pessoas da empresa? O que podemos fazer é guardar os scores em uma outra hash para uso futuro. Poderíamos modificar a função score para receber essa estrutura e fazer a consulta de se aquele score já foi calculado antes. Mas essa estrutura auxiliar é parte do cálculo dos scores e não faz sentido que ela fique solta na main . Então vamos envelopar isso tudo dentro de uma classe.
class Hierarchy:
    def __init__(self, subordinates):
        self.subordinates = subordinates
        self.scores = {}

    def get_score(self, person):
        if person in self.scores:
            print("Já calculei esse score antes")
            return self.scores[person]

        this_score = 1

        for subordinate in self.subordinates[person]:
            this_score += self.get_score(subordinate)
        self.scores[person] = this_score

        return this_score

if __name__ == "__main__":
    subordinates = {
: [2, 3],
: [4],
: [],
: [5, 6],
: [7],
: [],
: [],
    }

    hierarchy = Hierarchy(subordinates)

    print(hierarchy.get_score(1))
    print(hierarchy.get_score(2))
    print(hierarchy.get_score(3))
    print(hierarchy.get_score(4))
    print(hierarchy.get_score(5))
    print(hierarchy.get_score(6))
    print(hierarchy.get_score(7))
~~~
<br>

~~~
// follow-up 2: Agora que a classe consegue adicionar pessoas, não precisamos mais receber a estrutura subordinates ; a própria classe vai cuidar de montar essa estrutura enquanto adiciona as pessoas.
Vamos definir um exemplo para pensar: Se eu quiser adicionar a pessoa 8 na equipe de 4, com k=2?
A equipe de 4 está cheia, então eu preciso tentar encaixar na equipe de algum subordinado a 4, ou seja, na equipe de 5 ou de 6. É super importante observar que eu posso incluir 8 em qualquer lugar abaixo 4. Isso significa que eu sempre vou conseguir incluir a pessoa, pois no final da cadeia, haverá uma pessoa sem equipe e eu posso atribuir a nova contratada para ela. Ou seja, ao invés de tentar olhar em "largura" e tentar incluir em 5 e depois em 6, eu posso ir descendo na cadeia até achar um lugar que ela caiba, olhando em "profundidade": olho 4, depois 5, se 5 estivesse cheio, olho a 7.
Última coisa: Você considerou se a pessoa que está sendo incluída é a primeira de todas?

class Hierarchy:
    def __init__(self, k):
        self.subordinates = {}
        self.scores = {}
        self.k = k

    def add_person(self, boss, person):
        if not boss:
            self.subordinates[person] = []
            self.scores[person] = 1
            return

        self.scores[boss] += 1

        if len(self.subordinates[boss]) < self.k:
            self.subordinates[boss].append(person)
            self.subordinates[person] = []
            self.scores[person] = 1
        else:
            self.add_person(self.subordinates[boss][0], person)

    def get_score(self, person):
        return self.scores[person]


if __name__ == "__main__":
    hierarchy = Hierarchy(2)
    hierarchy.add_person(None, 1)
    hierarchy.add_person(1, 2)
    hierarchy.add_person(1, 3)
    hierarchy.add_person(2, 4)
    hierarchy.add_person(4, 5)
    hierarchy.add_person(4, 6)
    hierarchy.add_person(5, 7)
    print("\nAntes das novas inserções")
    print(f"Subordinates: {hierarchy.subordinates}")

    hierarchy.add_person(4, 8)
    hierarchy.add_person(4, 9)
    print("\nApós novas inserções")
    print(f"Subordinates: {hierarchy.subordinates}\n")
~~~

<p>
follow-up 3:
Quando você adiciona uma pessoa, ela pode ser adicionada em qualquer equipe abaixo dela. Como você recebe o primeiro boss , para atualizar o score entre esse boss e o local que a pessoa foi efetivamente alocada, basta ir atualizando o score na medida em que você vai tentando uma nova equipe.
A parte mais complicada é atualizar desde a presidência até o primeiro boss . A gente tem uma estrutura que nos diz quem é subordinado a quem, mas não temos um jeito imediato de consultar quem é chefe de quem. Então uma possível solução é, a cada inserção, manter o controle da chefia imediata daquela pessoa. Na solução proposta abaixo, adicionamos a hash imediate_boss , que é atualizada antes de realmente tentarmos alocar a pessoa. A função add_person foi renomeada para fit_person e agora atualizada o score de cada boss que tentamos encaixar a nova contratada.
Como os scores são atualizados na medida em que fazemos as inserções, a função get_score agora precisa apenas fazer uma consulta simples à estrutura scores .
</p>
