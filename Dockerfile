ARG REGISTRY=docker.io
FROM ${REGISTRY}/node:16-alpine as builder

WORKDIR /application

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

RUN rm -rf node_modules && \
  yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

ARG REGISTRY=docker.io
FROM ${REGISTRY}/node:16-alpine

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

WORKDIR /application

COPY --from=builder /application .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "start"]
