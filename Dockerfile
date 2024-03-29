# ビルド用
FROM node:18.12.1-slim as builder

WORKDIR /app

## パッケージをインストール
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY .env ./
RUN npm ci

COPY . .

RUN npm run build

# 実行用
FROM node:18.12.1-slim

WORKDIR /app

## ビルド用のレイヤからコピーする
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env .

## Svelteが動く3000ポートを開けておく
EXPOSE 3000

CMD ["node", "-r", "dotenv/config", "build"]
