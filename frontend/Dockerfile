# Set build-time environment variable (default to production)
ARG NODE_ENV=production

# --- Base image ---
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# --- Development image ---
FROM base AS dev
ENV NODE_ENV=development
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# --- Build image ---
FROM base AS build
ENV NODE_ENV=production
COPY . .
RUN npm run build

# --- Production image ---
FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production

# Copy built files and assets
COPY --from=build /app/package.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/next.config.ts ./next.config.ts
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/src ./src

EXPOSE 3000
CMD ["npm", "start"]

# --- Final stage: select dev or prod ---

# Final development stage
FROM dev AS final-dev
COPY . .

# Final production stage
FROM prod AS final-prod
COPY . .

# This ensures Docker recognizes final-dev and final-prod as buildable stages
ARG NODE_ENV=production


