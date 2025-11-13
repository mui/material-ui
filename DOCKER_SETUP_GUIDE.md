# Docker Setup Guide for Material-UI

This guide explains how to run Material-UI in Docker for development, testing, and production.

## Prerequisites

- Docker Desktop installed ([download](https://www.docker.com/products/docker-desktop))
- Docker Compose installed (included with Docker Desktop)
- Git repository cloned

## Quick Start

### Option 1: Development Mode (Recommended)

Start the development environment with hot reload:

```bash
# Start the dev server
docker-compose up mui-dev

# Or in detached mode
docker-compose up -d mui-dev

# View logs
docker-compose logs -f mui-dev

# Stop the container
docker-compose down
```

Access the documentation at: **http://localhost:3000**

### Option 2: Build and Test

Run full build pipeline with tests:

```bash
# Build the project
docker-compose up mui-build

# View logs
docker-compose logs mui-build

# Clean up
docker-compose down
```

### Option 3: Production Documentation

Build and serve production documentation:

```bash
# Start production docs server
docker-compose up mui-docs

# Access at http://localhost:3001
```

## Docker Compose Services

### 1. `mui-dev` - Development Environment

**Best for:** Active development with hot reload

```bash
docker-compose up mui-dev
```

**Features:**
- Hot reload on file changes
- Volume mounts for code synchronization
- Development dependencies installed
- Runs on port 3000

**Access:** http://localhost:3000

### 2. `mui-build` - Build & Test

**Best for:** Full CI/CD pipeline locally

```bash
docker-compose up mui-build
```

**Features:**
- Full build pipeline
- All tests executed
- Production-ready artifacts
- Isolated from dev environment

### 3. `mui-docs` - Production Docs

**Best for:** Preview production documentation

```bash
docker-compose up mui-docs
```

**Features:**
- Production-optimized build
- Lightweight Alpine container
- Static file serving
- Runs on port 3001

## Dockerfile Variants

### Dockerfile (Development)

Used by `mui-dev` service:
- Base: `node:18-alpine`
- Installs all dependencies
- Runs development server
- Port: 3000

### Dockerfile.build (CI/CD)

Used by `mui-build` service:
- Full build pipeline
- Test execution
- Artifact generation
- No server (build only)

### Dockerfile.docs (Production)

Used by `mui-docs` service:
- Multi-stage build for optimization
- Production build
- Lightweight server (serve)
- Port: 3000

## Common Commands

### Start Services

```bash
# Start all services
docker-compose up

# Start specific service
docker-compose up mui-dev

# Start in background
docker-compose up -d mui-dev

# Start with rebuild
docker-compose up --build mui-dev
```

### View Logs

```bash
# View logs for all services
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View logs for specific service
docker-compose logs -f mui-dev

# View last 100 lines
docker-compose logs --tail=100 mui-dev
```

### Execute Commands

```bash
# Open bash in running container
docker-compose exec mui-dev /bin/sh

# Run specific command in container
docker-compose exec mui-dev pnpm test

# Run npm script
docker-compose exec mui-dev pnpm docs:build
```

### Clean Up

```bash
# Stop all containers
docker-compose down

# Remove containers and volumes
docker-compose down -v

# Remove images too
docker-compose down -v --rmi all

# Prune unused resources
docker system prune

# Force remove container
docker-compose rm -f mui-dev
```

## Building Docker Images Manually

### Build Development Image

```bash
docker build -t material-ui:dev .
docker run -it -p 3000:3000 -v $(pwd):/app material-ui:dev
```

### Build Build Image

```bash
docker build -t material-ui:build -f Dockerfile.build .
docker run material-ui:build
```

### Build Docs Image

```bash
docker build -t material-ui:docs -f Dockerfile.docs .
docker run -p 3000:3000 material-ui:docs
```

## Environment Variables

### Available Variables

```bash
# Node environment
NODE_ENV=development|production

# Development server
PORT=3000 (default)

# Debugging
DEBUG=* (enable debug output)
```

### Set Environment Variables

```bash
# In docker-compose.yml
environment:
  - NODE_ENV=development
  - PORT=3000

# Via command line
docker-compose -e NODE_ENV=production up

# In .env file
# Create .env and reference in docker-compose
```

## Volume Mounts

### Development Volume Mounts

The `mui-dev` service mounts:

```yaml
volumes:
  - .:/app                 # Mount entire project
  - /app/node_modules      # Exclude node_modules
  - /app/.next             # Exclude Next.js cache
```

This allows:
- Live code editing
- Hot reload on save
- Source code synchronization

### Working with Volumes

```bash
# Check mounted volumes
docker inspect material-ui-dev

# List volumes
docker volume ls

# Remove unused volumes
docker volume prune

# Create named volume
docker volume create mui-node-modules
```

## Network Configuration

All services use a custom bridge network `mui-network`:

```yaml
networks:
  mui-network:
    driver: bridge
```

### Benefits

- Services can communicate by name
- Isolation from host network
- Easy networking between containers

### Access Between Services

```bash
# From one container to another
curl http://mui-dev:3000  # Uses internal DNS

# From host to container
curl http://localhost:3000  # Uses port mapping
```

## Performance Optimization

### Reduce Build Time

```bash
# Use BuildKit (faster builds)
DOCKER_BUILDKIT=1 docker build .

# Use layer caching
docker build --cache-from material-ui:dev .

# Parallel builds
docker-compose up --parallel 2
```

### Optimize Images

```bash
# Multi-stage build reduces final size
docker build -f Dockerfile.docs .  # Uses 2 stages

# Alpine Linux reduces image size
# Base: node:18-alpine instead of node:18
```

### Check Image Sizes

```bash
# List image sizes
docker images

# Inspect layer sizes
docker history material-ui:dev

# Calculate total size
docker system df
```

## Troubleshooting

### Container Won't Start

**Problem:** Container exits immediately

**Solution:**
```bash
# Check logs
docker-compose logs mui-dev

# Run with interactive shell
docker-compose run --rm mui-dev /bin/sh

# Check Docker daemon
docker ps  # Should show nothing
```

### Port Already in Use

**Problem:** Port 3000 already in use

**Solution:**
```bash
# Use different port
docker-compose up -p 3001:3000 mui-dev

# Or modify docker-compose.yml
ports:
  - "3001:3000"

# Or kill existing process
lsof -i :3000
kill -9 <PID>
```

### Dependency Issues

**Problem:** Dependencies not installing

**Solution:**
```bash
# Clear npm cache
docker-compose run --rm mui-dev pnpm store prune

# Rebuild with no cache
docker-compose up --build --no-cache mui-dev

# Remove lock file and reinstall
docker-compose exec mui-dev rm pnpm-lock.yaml
docker-compose up --build mui-dev
```

### Permission Denied

**Problem:** Permission errors when modifying files

**Solution:**
```bash
# Fix file permissions
sudo chown -R $USER:$USER .

# Or run Docker with user flag
docker run --user $(id -u):$(id -g) ...
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Test in Docker

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests in Docker
        run: docker-compose up mui-build
```

### GitLab CI Example

```yaml
test:
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker-compose up mui-build
```

## Docker Compose Reference

### Service Configuration

```yaml
services:
  service-name:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: unique-name
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    environment:
      - NODE_ENV=development
    command: pnpm docs:dev
    networks:
      - mui-network
    depends_on:
      - other-service
```

### Useful Options

```bash
# Build and start
docker-compose up --build

# No cache build
docker-compose up --build --no-cache

# Parallel services
docker-compose up --parallel 4

# Scale service
docker-compose up --scale service=3

# Reconnect volumes
docker-compose up -V
```

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Guide](https://docs.docker.com/compose/)
- [Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Alpine Linux](https://alpinelinux.org/)

## Tips & Best Practices

### ✅ DO

- Use Alpine Linux base images (smaller, faster)
- Leverage layer caching (add frequently changing files last)
- Use .dockerignore to exclude unnecessary files
- Separate build and runtime images (multi-stage)
- Use specific Node versions (not 'latest')
- Name containers and services for clarity
- Use volumes for development (hot reload)

### ❌ DON'T

- Run as root (use USER directive)
- Mix build and runtime in one image
- Use 'latest' tag (use specific versions)
- Ignore .dockerignore (affects build size)
- Store secrets in images
- Use single-stage builds for production

## Next Steps

1. Start with development: `docker-compose up mui-dev`
2. Modify code and see hot reload
3. Run tests: `docker-compose exec mui-dev pnpm test`
4. Build production: `docker-compose up mui-build`
5. Deploy docs: `docker-compose up mui-docs`

---

**Created:** November 13, 2025
**Status:** Ready for use
**Tested with:** Docker Desktop, Docker Compose v3.8
