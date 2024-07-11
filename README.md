
# API

O objetivo desta API é servir as requisições do Front-End, com as ações necessárias.
O Front-End desta aplicação é um site de uma empresa junior.

## Stack utilizada

**Back-end:** TypeScript, Fastify, Zod, Prisma, PostgreSQL e Docker.


## Funcionalidades

- Criação de estudante;
- Consulta de todos os estudantes cadastrados;
- Consulta de um único estudante pelo ID.

## Documentação da API

#### Retorna o ID do student criado

```http
  POST /create
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
|  | `string` | **Obrigatório**. As informações necessárias para cadastrar um student |

#### Retorna um student determinado pelo ID

```http
  GET /get-student/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do student que você quer |

#### Retorna todos os students cadastrados

```http
  GET /get-all
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|      | `string` | **Obrigatório**. Retorna as informações de todos os students.  |

## Aprendizados

Foi a primeira aplicação que utilizei o Prisma e o Zod. O Prisma é simplesmente incrível! A integração que ele tem o TypeScript é supreedente.

Com o Zod, foi a mesma coisa, a integração dele com o TypeScript é incrível! A forma como ele interage torna mais fácil o desenvolvimento.
Podemos criar um schema do corpo da requisição, dizendo como queremos que os dados sejam recebidos.


## Instalação

Instale api_fastify com npm ou yarn

```bash
  git clone git@github.com:https://github.com/Cr-Israel/EJ-site
  npm/yarn install
  npm run dev || yarn dev
  docker compose up -d
```
    
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL`

Com as suas devidas informações do banco de dados.


## Licença

[MIT](https://choosealicense.com/licenses/mit/)


## Autores

- [@Cr-Israel](https://www.github.com/Cr-Israel)


## Feedback

Feedbacks são sempre bem-vindos.
Se você tiver algum feedback, por favor me deixe saber: carlosisrael08@hotmail.com

