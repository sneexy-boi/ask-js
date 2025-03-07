FROM node:23-slim

WORKDIR /askjs
COPY . .

RUN npm install -g pnpm@latest-10 && \
        pnpm i && pnpm build && \
        chmod +x /askjs/docker-start.sh

CMD ["/askjs/docker-start.sh"]