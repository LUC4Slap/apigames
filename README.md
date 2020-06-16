# Api de Games

Esta api é utilizada para um crud de games com nome, ano de lançamento e valor.

## Endpoints

### POST /auth
Este endpint é responsavel por fazer a autenticação do usuario e gerar um token para que possa ser feito o uso dos demais endpoints da api.

### GET /games
Este endpint é responsavel por trazer do banco de dados todos os registros dos games cadastrador.
#### PARAMETROS
Nenhum
#### Respostas
##### OK 200
Caso essa resposta aconteça você vai receber a listagem de todos os games
##### Falha na Autenticação! 401
Esse erro acontece quando o não se passa o Token gerado pela rota /auth, pois o mesmo é fundamental para a utilização das demais rotas, Motivos: Token invalido ou Token inspirado.

