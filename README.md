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
4. Suggest any possible improvements

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
- Understanding of trade-offs

## Getting Started

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

## Deliverables

1. Updated `docker-compose.yml` with hardened images
2. Updated `Dockerfile` for the API service
3. A `SOLUTION.md` file explaining:
   - Which images you chose and why
   - Security improvements achieved
   - Any challenges faced and how you solved them
   - Trade-offs considered

Good luck!
