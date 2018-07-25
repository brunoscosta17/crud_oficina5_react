Desafio para o cargo de programador Front-End para a empresa Oficina 5 - Uberaba/MG

É preciso ter previamente instalados:
- nodejs versao 8.11.3
- docker community edition

Solução contém 2 projetos, separados por pastas na raiz:

- frontend
- backend

Pra se executar cada um dos projetos, navegue até as respectivas pastas e execute os seguintes comandos no terminal (linux), ou powershell (windows)

- frontend (localhost:3000)
    - yarn install
    - yarn start    

- backend (localhost:3001)
    - npm install
    - npm start

Para se executar o banco de dados mongodb, navegue até a raiz do projeto e execute o seguinte comando

- docker stack deploy --compose-file docker-compose.yml oficina5

Requisitos: https://github.com/brunoscosta17/crud_oficina5_react/wiki/Requisitos
Referências: https://github.com/brunoscosta17/crud_oficina5_react/wiki/Refer%C3%AAncias
