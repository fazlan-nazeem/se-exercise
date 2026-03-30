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

## Project Structure

```
se-exercise/
├── api/
│   ├── app.py              # Flask REST API application
│   ├── Dockerfile          # API service Dockerfile (to be hardened)
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── index.html          # Web UI
│   ├── styles.css          # Styling
│   └── app.js              # Frontend JavaScript
├── nginx/
│   └── nginx.conf          # Nginx configuration
├── docker-compose.yml      # Multi-service orchestration (to be hardened)
├── test.sh                 # Automated API test script
└── README.md               # This file
```

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


### Evaluation Criteria

You will be evaluated on:
- **Functionality** - Both Web UI and API work correctly after hardening
- **Image Selection** - Appropriate hardened images chosen for each service
- **Security Improvements** 
- **Image Size Reduction** - Significant reduction in total image sizes


## Getting Started

### Quick Start

1. Clone this repository
2. Start the application:

```bash
docker compose up --build
```

3. Access the application:

### Using the Web UI

Open your browser and navigate to:
```
http://localhost
```

## Deliverables

### Deliverable 1-3: Technical Implementation

Submit the following:

1. **Updated `docker-compose.yml`** - With all services using hardened images
2. **Updated `api/Dockerfile`** - Hardened Python application container
3. **`SOLUTION.md`** - Comprehensive documentation including:
   - Image choices and justification for each service
   - Security improvements and measurements
   - Size comparison (before/after)

### Deliverable 4: Mock Customer Presentation

Prepare a **10–15 minute presentation** to deliver in a mock customer meeting with the following personas:

| Persona | Title | Focus |
|---|---|---|
| :lock: Security Stakeholder | CISO / VP of Security | Supply chain risk, CVE reduction, compliance, image signing & attestation |
| :gear: Technical Practitioner | Staff / Principal Platform Engineer | Migration path, CI/CD integration, Dockerfile compatibility, operational impact |
| :bar_chart: Business Stakeholder | VP of Engineering | Developer productivity, ROI, build vs. buy, strategic risk reduction |

Your presentation should cover:

- **The problem** — What supply chain and image security risks does the customer face today?
- **The solution** — How does Docker Hardened Images address those risks? Walk through what you built in the exercise as a concrete example.
- **Business value** — Quantify or articulate the value for each persona (e.g., reduced CVE remediation time, simplified compliance, faster developer onboarding).
- **Next steps** — What would you recommend as a logical proof-of-concept or expansion path for this customer?

The Docker team in the room will role-play as the three customer personas above and may ask follow-up questions from their perspective. You do not need slides — a whiteboard walk-through or live demo is fine.

> **Tip:** The strongest presentations connect the technical work you did in the exercise directly to a business outcome each persona cares about.


Good luck!
