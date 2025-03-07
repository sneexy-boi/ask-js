# ask-js

multiuser ask server.

## use
run `pnpm i` to get dependencies\
example config is at `config/config.example.json`, copy to `config/config.json` and edit it so it works. theres a jsonschema, so you can use that to make sure it's right. use postgres for your database\
run `pnpm migrate` and then your database is prepared\
run `pnpm start` and it'll be running! use pm2 to keep it going or something else.

### docker compose
docker compose is also supported as a method of deploying ask-js.

the `compose.yaml` below may be used as an example, please take note of what is commented under the `volumes` section:
```yaml
services:
  ask-js:
    image: ghcr.io/ihateblueb/ask-js:dev
    container_name: ask-js_web
    restart: always
    depends_on:
      - db
    ports:
      - '3579:3579'
    volumes:
        # run this command in the same place as this compose file to download the example configuration file, *must* be done before starting:
        #
        # wget -O config.json https://raw.githubusercontent.com/ihateblueb/ask-js/refs/heads/main/config/config.example.json
        #
        # this file *must* also be modified to replace "host" under "db" with "db", any other changes are of personal preference
      - ./config.json:/ask-js/config/config.json

  db:
    restart: unless-stopped
    image: postgres:17-alpine
    container_name: ask-js_db
    shm_size: 256MB
    environment:
      - POSTGRES_DB=askjs
      - POSTGRES_USER=askjs
      - POSTGRES_PASSWORD=askjs
    volumes:
      - ./db:/var/lib/postgresql/data
```