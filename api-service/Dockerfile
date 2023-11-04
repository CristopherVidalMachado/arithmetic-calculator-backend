
ARG NODE_IMAGE=18-bullseye-slim

# Debug Image
FROM node:${NODE_IMAGE} as debug

WORKDIR /usr/app

COPY ./api-service .

CMD ["yarn", "nest", "start", "--debug", "0.0.0.0:9229"]

FROM node:${NODE_IMAGE} as base

WORKDIR /usr/app

COPY ["api-service/package.json", "api-service/yarn.lock", "./"]
RUN ["yarn", "install"]

COPY ./api-service .

# Build Image
FROM base as build
WORKDIR /usr/app

RUN ["yarn", "run", "prebuild"]
RUN ["yarn", "run", "build"]
RUN ["rm", "-rf", "node_modules"]
RUN ["yarn", "install", "--production"]

# Production Image
FROM node:${NODE_IMAGE} as production
WORKDIR /usr/app

COPY --chown=node:node --from=build /usr/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/app/dist ./dist

USER node

CMD ["node", "dist/main"]

