FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the entire project
COPY . .

# Build the project
RUN pnpm build

# Expose ports for development
EXPOSE 3000 6006

# Default command - start docs dev server
CMD ["pnpm", "docs:dev"]
