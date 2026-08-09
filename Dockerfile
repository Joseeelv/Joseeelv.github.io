FROM node:22-alpine
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --allow-scripts --frozen-lockfile
COPY . .
EXPOSE 5173
CMD ["pnpm", "dev"]