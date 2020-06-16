# Api de Games

Esta api é utilizada para um crud de games com nome, ano de lançamento e valor.

## Endpoints

### POST /auth
Este endpint é responsavel por fazer a autenticação do usuario e gerar um token para que possa ser feito o uso dos demais endpoints da api.
###### Como Autenticar
```
{
    "email": "seuemail@email.com",
    "password": "suasenha"
}
```
#### Resposta
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsdWNhc0BnbWFpbC5jb20iLCJpYXQiOjE1OTIzMzYyNjMsImV4cCI6MTU5MjUwOTA2M30.QH3CFfPvRq6kyzKIv9QEe3PsjjXB8zZMwNTy-1E0Hgw"
}
```
#### Erros que podem ocorer são 400 e 401
O erro 400 é quando não foi mandado alguma informação para gerar o token, como e-mail ou senha.
##### Exemplo
```
{
    "email": "seuemail@email.com",
    "password": ""
}
```
Vai retornar uma menssagem de erro.
```
{
    "message": "Credenciais Invalidas"
}
```

### GET /games
Este endpint é responsavel por trazer do banco de dados todos os registros dos games cadastrador.
#### PARAMETROS
Nenhum
#### Respostas
##### OK 200
Caso essa resposta aconteça você vai receber a listagem de todos os games.

Exempolo de Resposta:
```
[
    {
        "id": 1,
        "title": "Minecraft history mod",
        "year": 2019,
        "price": 150,
        "createdAt": "2020-05-06T18:44:04.000Z",
        "updatedAt": "2020-05-07T15:26:14.000Z"
    },
    {
        "id": 2,
        "title": "Call of Duty",
        "year": 2019,
        "price": 150,
        "createdAt": "2020-05-06T20:09:50.000Z",
        "updatedAt": "2020-05-06T20:09:50.000Z"
    },
    {
        "id": 3,
        "title": "Trove",
        "year": 2011,
        "price": 30,
        "createdAt": "2020-05-07T13:28:17.000Z",
        "updatedAt": "2020-05-07T13:28:17.000Z"
    },
    {
        "id": 5,
        "title": "assassin's creed valhalla",
        "year": 2021,
        "price": 250,
        "createdAt": "2020-05-07T21:18:18.000Z",
        "updatedAt": "2020-05-07T21:18:18.000Z"
    },
    {
        "id": 6,
        "title": "Avengers",
        "year": 2019,
        "price": 150,
        "createdAt": "2020-05-29T11:37:40.000Z",
        "updatedAt": "2020-06-16T14:45:57.000Z"
    }
]
```
##### Falha na Autenticação! 401
Esse erro acontece quando o não se passa o Token gerado pela rota /auth, pois o mesmo é fundamental para a utilização das demais rotas, Motivos: Token invalido ou Token inspirado.

Exemplo de Erro:
```
{
    "error": {
        "name": "JsonWebTokenError",
        "message": "invalid signature"
    }
}
```

### POST  /games
Este endpoint é responsavel por cadastrar um novo game, ele prescisa do token de autorização e do game para ser salvo no banco.

```
{
    "title": "Titulo do Jogo",
    "yaer": "Ano do Jogo",
    "price": Preço do Jogo,
}
```

### PUT /games
Esse endpoint é utilizado para atualizar um game, ele prescisa do id do games, o id tem que ser mandado na url.
Exemplo:

(http://localhost:8080/games/6)


```
{
    "title": "Novo Titulo do Jogo",
    "yaer": "Novo Ano do Jogo",
    "price": Novo Preço do Jogo,
}
```

##### Resposta
```
{
    "message": "Atualizado com Sucesso!"
}
```