FROM node:23-slim
WORKDIR /askjs
COPY package.json .
COPY pnpm-lock.yaml* .
RUN corepack install && \
    pnpm i
CMD ["/askjs/docker-start.sh"]