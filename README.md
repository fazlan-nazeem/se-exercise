# Container Hardening Exercise

## Overview

This exercise is designed to assess your understanding of container security and Docker best practices. You'll work with a multi-service application and migrate it to use hardened Docker images.

## Application Architecture

The application consists of 4 services:

1. **API Service** - A Python Flask REST API that manages a simple task list
2. **PostgreSQL Database** - Stores task data
3. **Redis Cache** - Caches frequently accessed data
4. **Nginx Reverse Proxy** - Serves the web UI and proxies API requests

The application includes a web-based user interface for managing tasks through your browser, as well as a REST API for programmatic access.

## Current State

The application currently uses standard Docker images:
- `python:3.11` for the API
- `postgres:15` for the database
- `redis:7` for caching
- `nginx:latest` for serving the frontend and proxying API requests

## Your Task

**Migrate all services to use hardened/secured Docker images while maintaining full functionality.**

### Requirements

1. Replace all base images with hardened alternatives
2. Ensure the application continues to work exactly as before
3. Document your image choices and reasoning
4. Minimize the attack surface of each container
5. Follow security best practices (non-root users, minimal layers, etc.)

### Suggested Hardened Image Options

Consider these alternatives:
- **Alpine-based images** (smaller attack surface)
- **Distroless images** (minimal runtime dependencies)
- **Docker Official hardened variants**
- **Chainguard Images** (if available)
- **Custom minimal builds**

### Evaluation Criteria

You will be evaluated on:
- Successful migration with working functionality
- Image size reduction
- Security improvements
- Documentation quality
- Understanding of trade-offs

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Setup

1. Clone this repository
2. Copy `.env.example` to `.env`
3. Run the application:

```bash
docker-compose up --build
```

4. Access the application:

**Web UI:**
Open your browser and navigate to:
```
http://localhost
```

You'll see a modern task management interface where you can:
- View all tasks with statistics
- Create new tasks
- Edit existing tasks
- Mark tasks as complete/incomplete
- Delete tasks

**API Testing:**

You can also test the API directly using the automated test script:

```bash
./test.sh
```

Or manually with curl:

```bash
# Health check
curl http://localhost/health

# Create a task
curl -X POST http://localhost/api/tasks -H "Content-Type: application/json" -d '{"title":"Test Task","description":"Test Description"}'

# List all tasks
curl http://localhost/api/tasks

# Get a specific task
curl http://localhost/api/tasks/1

# Update a task
curl -X PUT http://localhost/api/tasks/1 -H "Content-Type: application/json" -d '{"title":"Updated Task","completed":true}'

# Delete a task
curl -X DELETE http://localhost/api/tasks/1
```

### Stopping the Application

```bash
docker-compose down -v
```

## Deliverables

1. Updated `docker-compose.yml` with hardened images
2. Updated `Dockerfile` for the API service
3. A `SOLUTION.md` file explaining:
   - Which images you chose and why
   - Security improvements achieved
   - Any challenges faced and how you solved them
   - Trade-offs considered

## Tips

- Test thoroughly after each change
- Consider both security and functionality
- Document any configuration changes needed
- Think about the principle of least privilege
- Consider the size vs. functionality trade-off

Good luck!
