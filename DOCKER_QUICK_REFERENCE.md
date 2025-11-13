# Docker Quick Reference for Material-UI

## Quick Start Commands

### Development (Recommended)

```bash
docker-compose up mui-dev
```

Access: **http://localhost:3000**

### Build & Test

```bash
docker-compose up mui-build
```

### Production Docs

```bash
docker-compose up mui-docs
```

Access: **http://localhost:3001**

## Services Overview

| Service   | Port | Purpose              | Use Case           |
| --------- | ---- | -------------------- | ------------------ |
| mui-dev   | 3000 | Dev with hot reload  | Active development |
| mui-build | —    | Full build & tests   | CI/CD pipeline     |
| mui-docs  | 3001 | Production docs      | Preview production |

## Common Commands

### View Logs

```bash
docker-compose logs -f mui-dev
```

### Execute Commands

```bash
docker-compose exec mui-dev pnpm test
docker-compose exec mui-dev pnpm lint
```

### Cleanup

```bash
docker-compose down
docker-compose down -v
```

### Rebuild

```bash
docker-compose build --no-cache
docker-compose up mui-dev
```

## Configuration Reference

### Files

| File               | Purpose           |
| ------------------ | ----------------- |
| Dockerfile         | Dev environment   |
| Dockerfile.build   | CI/CD pipeline    |
| Dockerfile.docs    | Production docs   |
| docker-compose.yml | Orchestration     |
| .dockerignore      | Build optimization |

### Ports

- Development: **3000**
- Production Docs: **3001**

### Volumes

- `/app` - Project root
- `/app/node_modules` - Dependencies (isolated)

### Environment

- `NODE_ENV=development|production`
- `PNPM_HOME` - pnpm cache location

## Troubleshooting

### Port in Use

```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Permission Denied

```bash
# Run Docker Desktop with admin privileges
```

### Dependencies Failed

```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up mui-dev
```

### Container Won't Start

```bash
docker-compose logs mui-dev
docker ps -a
docker inspect <container_id>
```

## Workflows

### For Development

```bash
docker-compose up mui-dev
docker-compose exec mui-dev pnpm lint
docker-compose exec mui-dev pnpm test
docker-compose logs -f mui-dev
```

### For CI/CD

```bash
docker-compose up mui-build
echo %ERRORLEVEL%
```

### For Production Deployment

```bash
docker-compose up mui-docs
```
