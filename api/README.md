# Back end
Nessa pasta contém todo o código do back-end utilizado para toda a aplicação desde o web, desktop e mobile. Abaixo está como instalar e configurar o back end para poder rodar e utilizar a aplicação em seu computador localmente.

## Instalação

Para instala-lo é necessário que você tenha em sua maquina de alguma forma o **SQL Server** no caso do projeto foi utilizado do [Docker](https://docs.docker.com/) com uma imagem do SQL Server 2019 que esta com seu `docker-compose.yaml` disponivel previamente configurado na pasta [SQL_SERVER](https://github.com/W-Wag/pim-4.3/blob/main/SQL_Server). Então para poder prosseguir é necessário ter de alguma forma o SQL Server versão 2019 para frente.

Após ter o SQL Server instalado, precisa-se então configurar a variavel ambiente criando um arquivo `.env`, seguindo o exemplo do arquivo `.env.example` colocando os dados do seu banco de dados SQL Server nos campos que estiverem com **HERE**.

Então agora abra o terminal na pasta **api** e digite o comando `npm install` e aguarde até que seja feita a instalação. Após instalado e necessário executar o comando `npx prisma migrate` do [Prisma](https://prisma.io) a biblioteca utilizada para estruturar o banco de dados e fazer as requisições ao mesmo. Para executar o esquema com todas as tabelas e colunas feitas para o sistema podendo ser vistas na pasta prisma no arquivo `schema.prisma`

Com isso execute o comando `npm run dev`, é se tudo der certo irá aparecer uma mensagem no terminal dizendo **Servidor hospedado na porta 3000**, é certifique-se que nada esteja rodando na porta 3000 do seu localhost, e caso seja necessário altera-lo vá até o arquivo `server.ts` dentro da pasta **src** e altere a constante **port**.

Para concluir você pode abrir algum dos front-ends do projeto para testar se o back-end esta funcionando corretamente se ainda não instalou nenhum deles vá até a pasta de um deles e lá também terá o processo de instalação.

## Quais foram as bibliotecas utilizadas

- [Prisma](https://prisma.io)
- [Typescript](https://www.typescriptlang.org/docs/)
- [Express](https://expressjs.com/)

## Extensões do Visual Studio Code Recomendadas para alterar o código

- Prisma
- Eslint
- Prettier
