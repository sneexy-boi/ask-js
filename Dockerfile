FROM node:23-slim

WORKDIR /ask-js
COPY . .

RUN npm install -g pnpm@latest-10 && \
        pnpm i && pnpm build && \
        chmod +x /ask-js/scripts/docker-start.sh

CMD ["/ask-js/scripts/docker-start.sh"]
