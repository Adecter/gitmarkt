# How to setup project locally

## Dependencies
Install following dependencies on your local machine
* [Git](https://git-scm.com/downloads "Git download page") 
* [Docker](https://www.docker.com/get-started "Docker download page")
* [Npm (version >= 13)](https://nodejs.org/en/download/current/ "Npm download page")
## Running project
* clone project in your local folder: `git clone https://gitlab.com/dimalat/e-comm-rtu.git`
* copy file `.env-template` and rename it to `.env`
* run `docker-compose up -d` in terminal
* run `npm i`
* run `npm run dev`
* open http://localhost:3000 in browser
## Database management
* open http://localhost:8081
* enter credentials:
  * System: PostgreSQL
  * Server: db
  * Username: postgres
  * Password: <see .env file> 