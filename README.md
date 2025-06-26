# School Manager NestJS

## Arquitetura

![image.png](attachment:29029c3b-a326-44de-88c3-07e073b0b8a7:image.png)

- O NestJS facilita o uso de **clean architeture**, que foi utilizado nesse projeto da seguinte forma:
- **web → controllers → services (use cases) → models (entitites)**
    - De forma que cada camada mais interna não tem acesso à camada externa.

## Models

- A criação de models foi feita com o PrismaDB para facilitar a interação com o banco de dados.
- No Prisma e no SQL não existe o conceito “formal” de herança, por isso cada model é uma **entidade separada**

![image.png](attachment:4f3e14c6-112c-4aea-92e4-1ee04e8e7e66:image.png)

## Services

- Nas classes de service, você vai encontrar métodos como esse:

![image.png](attachment:ef73012c-a7fd-4e75-b76f-a9c49e4e6004:image.png)

- Apesar do Prisma ser um ORM, nesse projeto foi utilizado SQL puro para fins de estudo.