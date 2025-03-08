# ask-js

multiuser ask server.

## use

run `pnpm i` to get dependencies\
example config is at `config/config.example.json`, copy to `config/config.json` and edit it so it works. theres a jsonschema, so you can use that to make sure it's right. use postgres for your database\
run `pnpm migrate` and then your database is prepared\
run `pnpm start` and it'll be running! use pm2 to keep it going or something else.

### docker compose
we also provide a docker compose file if preferred for deployment:

```bash
git clone https://github.com/ihateblueb/ask-js && cd ask-js
```

<b>important change required:</b> under `db`, change `host` to `db`
```bash
cp config/config.example.json config/config.json && editor config/config.json
```

make any additional changes to compose.yaml if required
```bash
editor compose.yaml
```

now, bring it up
```bash
docker compose up -d # this should start building the image and deploy it
```