# Docker Setup Guide for Material-UI

Complete Docker containerization setup for Material-UI development, testing, and production deployment.

## Prerequisites

- Docker Desktop installed
- Docker Compose installed (included with Docker Desktop)
- Git repository cloned

## Quick Start

### Option 1: Development Mode

```bash
docker-compose up mui-dev
```

Access: **http://localhost:3000**

### Option 2: Build and Test

```bash
docker-compose up mui-build
```

### Option 3: Production Documentation

```bash
docker-compose up mui-docs
```

Access: **http://localhost:3001**

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
- Minimal dependencies
- Lightweight image
- Runs on port 3001

## Dockerfile Variants

### Dockerfile - Development

**Features:**

- Base: `node:18-alpine`
- Development dependencies included
- Hot reload capability
- Volume mounts for live editing

**Use case:** Local development

### Dockerfile.build - Build & Test

**Features:**

- Full build pipeline
- All testing frameworks
- Quality checks (lint, type check)
- CI/CD integration ready

**Use case:** Build verification and testing

### Dockerfile.docs - Production

**Features:**

- Multi-stage build for optimization
- Production dependencies only
- Minimal image size
- Static documentation serving

**Use case:** Production deployment

## Setup Steps

### Step 1: Verify Docker Installation

```bash
docker --version
docker-compose --version
```

### Step 2: Clone Repository

```bash
git clone https://github.com/mui/material-ui.git
cd material-ui
```

### Step 3: Build Images

```bash
docker-compose build
```

### Step 4: Start Development Server

```bash
docker-compose up mui-dev
```

### Step 5: Access Application

Open browser: **http://localhost:3000**

## Working with Docker

### Running Commands in Container

```bash
docker-compose exec mui-dev pnpm test
docker-compose exec mui-dev pnpm lint
docker-compose exec mui-dev pnpm build
docker-compose exec mui-dev sh
```

### Viewing Logs

```bash
docker-compose logs
docker-compose logs -f mui-dev
docker-compose logs --tail=100
```

### Stopping Services

```bash
docker-compose stop
docker-compose down
docker-compose down -v
```

### Rebuilding Images

```bash
docker-compose build
docker-compose build --no-cache
docker-compose build mui-dev
```

## Environment Variables

### Development

```bash
NODE_ENV=development
PNPM_HOME=/app/.pnpm-store
```

### Production

```bash
NODE_ENV=production
```

## Volume Mounts

### Development Volumes

```yaml
volumes:
  - .:/app
  - /app/node_modules
```

### Benefits

- Live code editing
- Instant hot reload
- No rebuild needed
- Persistent state

## Networking

### Service Communication

Services communicate via service name:

```bash
docker-compose exec mui-dev ping mui-build
```

### Port Mapping

```yaml
ports:
  - "3000:3000"
```

### Access Services

- Development: `http://localhost:3000`
- Docs: `http://localhost:3001`

## Troubleshooting

### Port Already in Use

```bash
lsof -i :3000
netstat -ano | findstr :3000
```

### Container Fails to Start

```bash
docker-compose logs mui-dev
docker-compose build --no-cache mui-dev
docker-compose down -v
docker-compose up mui-dev
```

### Disk Space Issues

```bash
docker image prune
docker volume prune
docker system prune -a
```

### Permission Issues

```bash
sudo docker-compose up
```

## Best Practices

### Development Workflow

- Keep containers running during active development
- Use volume mounts for live editing
- Hot reload handles file changes automatically
- Run tests in separate container

### Production Deployment

- Build minimal image with `Dockerfile.docs`
- Use environment-specific configs
- Run security scan on images
- Monitor container resource usage

### Performance Optimization

- Use `.dockerignore` to exclude unnecessary files
- Multi-stage builds for smaller images
- Cache layers efficiently
- Use Alpine Linux for smaller base images

## Advanced Usage

### Custom Commands

```bash
docker-compose run --rm mui-dev pnpm custom-command
docker-compose exec mui-dev bash
```

### Debugging

```bash
docker inspect <container_id>
docker stats
docker-compose build --progress=plain
```

### CI/CD Integration

```bash
docker-compose -f docker-compose.yml up mui-build
docker-compose ps mui-build
```

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Material-UI Contributing Guide](CONTRIBUTING.md)
