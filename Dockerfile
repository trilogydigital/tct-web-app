# ---- Build stage ----
FROM node:20-bookworm-slim AS builder
WORKDIR /app

# Enable Corepack so Yarn 4+ works
RUN corepack enable

# Copy manifest & lockfile first for caching
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy all source code
COPY . .

# Build Next.js app (output: 'standalone' must be in next.config.js)
RUN yarn build

# ---- Runtime stage ----
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000


# Copy only what's needed for runtime
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
