# BackendChallenger

## Sobre o Desafio

<p>O desafio foi bem bacana, varios Arrays bastante lógica para percorrer e buscar os dados, gostei bastante disso.</p>

## Aplicação em Docker

Para rodar o projeto rode docker-compose up -d para subir os Containers.

## Sobre carregamento dos Dados da API para dentro do Banco Mongo

Dentro de app.ts, no momento de iniciar o servidor eu chamo dois metodos que fazem a requisição a API e ao mesmo tempo já preenchem o banco com as informações que são necessárias, eu formatei esses dados antes de salva-los no banco, ai sim, depois disso inicia-se o servidor.

## Endpoints

A aplicação faz uso de autenticação JWT para acessar os endpoints, portanto a primeira rota ser acessada é <strong>POST /users</strong> para realizar um cadastro simples.
```
{
  "name": "Seu Nome",
  "email": "email@example.com",
  "password": "algumasenha"
 }
 ```
 Depois, POST /sign_in envie:
 ```
 {
  "email": "email@example.com",
  "password": "algumasenha"
 }
 ```
 Com isso o token sera retornado para o usuário.
 
 <strong>GET /books</strong> -> Busca os dados de todos os livros. <br>
 <strong>GET /cover</strong> -> Busca a capa de um dos livros. <br>
 <strong>GET /chars</strong> -> Busca as informações sobre todos os personagens principais. <br>
 <strong>GET /char/:id</strong> -> Busca os detalhes do personagem. <br>
 
 <strong>POST /books/char</strong> -> Te retorna os livros de um determinado personagem. Ele é um POST levando em consideração a busca pelo nome do personagem. Para não ter muito trabalho eu fiz ele dessa forma então, se encontrado algum registro no banco retorna a lista com os livros em que o personagem faz participação.
 ```
 {
  name: "Arya Stark"
 }
 ```
