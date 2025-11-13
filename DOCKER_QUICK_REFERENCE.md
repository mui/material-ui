# Docker Quick Reference for Material-UI

## 🚀 Quick Start Commands

### Development (Recommended)
```bash
# Start development server with hot reload
docker-compose up mui-dev

# Access: http://localhost:3000
```

### Build & Test
```bash
# Run full build pipeline and tests
docker-compose up mui-build
```

### Production Docs
```bash
# Serve optimized production build
docker-compose up mui-docs

# Access: http://localhost:3001
```

## 📊 Service Overview

| Service | Port | Purpose | Use Case |
|---------|------|---------|----------|
| `mui-dev` | 3000 | Development with hot reload | Active development |
| `mui-build` | - | Build & test pipeline | CI/CD, validation |
| `mui-docs` | 3001 | Production documentation | Preview, deployment |

## 🔧 Common Operations

### View Logs
```bash
docker-compose logs -f mui-dev        # Follow logs in real-time
docker-compose logs --tail=50 mui-dev # Last 50 lines
```

### Execute Commands
```bash
docker-compose exec mui-dev pnpm test          # Run tests
docker-compose exec mui-dev pnpm docs:build    # Build docs
docker-compose exec mui-dev /bin/sh            # Open shell
```

### Cleanup
```bash
docker-compose down              # Stop and remove containers
docker-compose down -v           # Also remove volumes
docker system prune              # Clean all unused resources
```

### Rebuild
```bash
docker-compose up --build mui-dev        # Rebuild image
docker-compose up --no-cache --build     # Rebuild without cache
```

## 📁 File Locations

| File | Purpose |
|------|---------|
| `Dockerfile` | Development image |
| `Dockerfile.build` | Build & test image |
| `Dockerfile.docs` | Production docs image |
| `docker-compose.yml` | Service configuration |
| `.dockerignore` | Exclude files from build |

## ⚙️ Configuration

### Ports
- Development: **3000**
- Production Docs: **3001**

### Volumes
- `/app` - Project root
- `node_modules` - Dependencies cache
- `.next` - Next.js build cache

### Environment
- `NODE_ENV=development|production`
- `PORT=3000` (default)

## 🐛 Troubleshooting

### Port in Use
```bash
# Use different port
docker-compose -e PORT=3001 up mui-dev

# Or modify docker-compose.yml
```

### Permission Denied
```bash
# Fix ownership
sudo chown -R $USER:$USER .
```

### Dependencies Failed
```bash
# Clear cache and rebuild
docker-compose up --build --no-cache mui-dev
```

### Container Won't Start
```bash
# Check logs
docker-compose logs mui-dev

# Open shell for debugging
docker-compose run --rm mui-dev /bin/sh
```

## 📚 Key Features

✅ **Hot Reload** - Changes reflected instantly (dev mode)
✅ **Isolated** - Clean environment every run
✅ **Reproducible** - Same setup for all developers
✅ **CI/CD Ready** - Easy integration with pipelines
✅ **Multi-stage** - Optimized production images
✅ **Cached** - Faster builds with layer caching

## 🎯 Workflow Examples

### For Development
```bash
# 1. Start dev server
docker-compose up mui-dev

# 2. Make changes to code
# (Hot reload happens automatically)

# 3. Run tests
docker-compose exec mui-dev pnpm test

# 4. Stop when done
docker-compose down
```

### For CI/CD
```bash
# 1. Build and test
docker-compose up mui-build

# 2. Check exit code
echo $?  # Should be 0 for success

# 3. Deploy docs if successful
docker-compose up mui-docs
```

### For Production Deployment
```bash
# 1. Build image
docker build -f Dockerfile.docs -t material-ui:latest .

# 2. Run container
docker run -p 3000:3000 material-ui:latest

# 3. Access: http://localhost:3000
```

## 📖 Full Guide

For detailed documentation, see: `DOCKER_SETUP_GUIDE.md`

---

**Created:** November 13, 2025
