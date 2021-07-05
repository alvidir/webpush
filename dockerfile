FROM node:latest as builder

RUN apt update && apt upgrade -y

WORKDIR /app

# installing dependencies
COPY ./package.json ./
RUN npm --verbose install

COPY . .


# Index.ts may does nothing by itself
# However its presence in the project's root ensures that the build script
# will keep the directory structure of this project.
RUN touch index.ts
RUN rm src/client.ts
# generate protobufers's types
RUN npm run ptypes
RUN npm run build

# Execute server from typescript
# CMD ["npx", "ts-node", "src/app.ts"]

# start new image from scratch
FROM node:lts-alpine

RUN apk --no-cache add ca-certificates
RUN apk --no-cache add nodejs

WORKDIR /app
COPY --from=builder /app/src/proto ./proto
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build/* ./

RUN npm rebuild