# Social Graph / Cadeia de Conexão Interpessoal

O trabalho desenvolvido tem como objetivo explorar a API do twitter para desenvolver uma aplicação que crie um grafo que conecte um usuário do twitter a outros usuários que possivelmente ele conheça. Tanto o Facebook, quanto o Twitter oferecem essa funcionalidade para os usuários de suas plataformas. O grafo será utilizado para criar uma lista de perfis que o usuário possa conhecer.

Para gerar o grafo, o usuário do sistema deverá digitar o nome do usuário do twitter que deseja ver as recomendações de amizade. A partir disso, o sistema irá gerar um grafo que mostra as conexões deste perfil que ele segue e conectar com outras pessoas que esse usuário não segue, mas que possivelmente conhece ao relacionar com os seus amigos em comum.

Siga as imagens a seguir para ficar um pouco mais claro a solução:

Grafo de um usuario:

![Grafo 1](https://cdn.discordapp.com/attachments/829533282675851305/851288406125838336/tt_1.png)

Relacionamentos gerados a partir desse grafo:

![Grafo 2](https://cdn.discordapp.com/attachments/829533282675851305/851288418608480315/tt_2.png)

## Instruções para executar a aplicação

E necessario ter o Docker e o docker-compose instalado para executar o software.
Caso você não possua ou não possa executar o Docker, também há a opção de execução manual das aplicações de front-end e back-end, neste caso e necessario ter instalado o Python, o node.js e o yarn.

### Instruções para executar com o Docker

Clone o repositório através do comando:
```
git clone https://github.com/octaviolage/social_graph
```

Navegue ate a pasta do repositorio e execute o comando abaixo para criar as imagens do Docker e ver seu processo de execução.
```
docker-compose up
```

Caso não queira ver o processo de execução da aplicação, você tambem pode utilizar a flag ``-d``, sendo o comando ``docker-compose up -d``.

Apos isto, basta acessar a aplicacao frontend pelo ``localhost:3000``, e para acessar a API backend acesse pelo ``localhost:5000``

### Instruções para executar as aplicações de forma manual

Clone o repositório através do comando:
```
git clone https://github.com/octaviolage/social_graph
```

Navegue ate a pasta ``back`` do repositorio, e execute os seguintes comandos:
```
pip install -r requirements.txt  // Baixa as dependencias
flask run --host=0.0.0.0  // Executa o back-end
```

Apos o back-end ser executado, para inicializar o frontend, va ate a pasta ``front`` no diretorio principal, e execute os seguintes comandos:
```
yarn install // Baixa as dependencias
yarn start // Executa o front-end
```

Apos isto, basta acessar a aplicacao frontend pelo ``localhost:3000``, e para acessar a API backend acesse pelo ``localhost:5000``
