# School Manager NestJS

## ARQUITETURA

![Descrição da imagem](https://miro.medium.com/v2/resize:fit:800/1*0R0r00uF1RyRFxkxo3HVDg.png)

- O NestJS facilita o uso de **clean architeture**, que foi utilizado nesse projeto da seguinte forma:
- **web → controllers → services (use cases) → models (entitites)**
    - De forma que cada camada mais interna não tem acesso à camada externa.

## Models

- A criação de models foi feita com o PrismaDB para facilitar a interação com o banco de dados.
- No Prisma e no SQL não existe o conceito “formal” de herança, por isso cada model é uma **entidade separada**

`prisma/schema.prisma`

## Services

- Nas classes de service, você vai encontrar métodos como esse:
- Apesar do Prisma ser um ORM, nesse projeto foi utilizado SQL puro para fins de estudo.

## Controllers

- Os controllers expõem rotas http para se comunicar com a API


## CONCEITOS DO JAVA → NESTJS

- Uma API com NestJS compartilha muitos conceitos com o Java, pois segue o mesmo paradigma de **programação orientada a objetos**
    - Entretanto, alguns conceitos simplesmente não são necessárias em uma API pois são **abstraídos pela implementação de um banco de dados**
- Por outro lado, as relações de **cardinalidade** são explicitamente implementadas, assim como os princípios SOLID.

## COMO RODAR O PROJETO

1- Instale as dependências

`npm install`

2-Crie um arquivo `.env` na raiz do projeto

- Adicione o seguinte conteúdo:

`DATABASE_URL="file:./dev.db"`

*O prisma irá gerenciar automaticamente SQLite localmente, essa chave indica que o banco estará em prisma/dev.db*

3- Gere o banco de dados 

`npx prisma migrate dev --name init`

Esse comando:

- Cria tabelas do projeto no banco de dados SQLite
- Gera o Prisma Client (engine do Prisma)

4- Rode o projeto e teste as rotas!
`npm run start:dev`