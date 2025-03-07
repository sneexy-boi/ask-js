# ask-js

multiuser ask server.

## use

run `pnpm i` to get dependencies\
example config is at `config/config.example.json`, copy to `config/config.json` and edit it so it works. theres a jsonschema, so you can use that to make sure it's right. use postgres for your database\
run `pnpm migrate` and then your database is prepared\
run `pnpm start` and it'll be running! use pm2 to keep it going or something else.
