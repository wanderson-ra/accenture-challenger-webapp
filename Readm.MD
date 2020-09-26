# Git Accenture Challenger Web App

## Informações Técnicas

-   O sistema foi criado usando **[React](https://pt-br.reactjs.org/)** (Versão **"116.13.1**).
-   O sistema foi desenvolvido usando **[Clean Architecture](https://stackoverflow.com/tags/clean-architecture/info)**
-   **Docker** Foi usado. **[Docker Hub](https://hub.docker.com/repository/docker/wander25rda/accenture-challenge-webapp)**
-   O projeto está disponível na plataforma (Front End) **[Heroku](https://challenge-acc-webapp.herokuapp.com/)**.
-   Utilizou conceitos de SOLID e Design Patterns.

## Docker

#### PS: O projeto está disponível no [Docker Hub](https://hub.docker.com/repository/docker/wander25rda/accenture-challenge)

-   Se você deseja gerar a imagem, use (você precisa do lib (jar) no local):
    `sudo docker build -t wander25rda/accenture-challenge-webapp:1.0.0 . `

-   Ou se você deseja apenas executar, use o comando:
    `sudo docker run -d -it -p 3000:80/tcp --name accenture-challenge-webapp wander25rda/accenture-challenge-webapp:1.0.0`
    `sudo docker start accenture-challenge-webapp`

-   No navegador local: http://localhost:3000/
