# ===== BUILD STAGE =====
FROM node:20-alpine AS builder

WORKDIR /app

# copy lock file trước để tận dụng cache
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build


# ===== PRODUCTION STAGE =====
FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

# chỉ cài dependency production
RUN yarn install --frozen-lockfile --production=true

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]