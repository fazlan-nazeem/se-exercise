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

## Your Task

**Migrate all services to use hardened/secured Docker images while maintaining full functionality.**

### Requirements

1. Replace all base images with hardened alternatives
2. Ensure the application continues to work exactly as before
3. Document your image choices and reasoning
4. Suggest any possible improvements


## Getting Started

### Quick Start

1. Clone this repository
2. Start the application:

```bash
docker-compose up --build
```

3. Access the application:

### Using the Web UI

Open your browser and navigate to:
```
http://localhost
```

## Deliverables

Submit the following:

1. **`SOLUTION.md`** - Comprehensive documentation including:
   - Image choices and justification for each service
   - Security improvements and measurements
   - Size comparison (before/after)
   - CVE comparison (before/after)

2. Mock Customer Presentation

Prepare a **30 mins presentation(with slides + demo)** to deliver in a mock customer meeting with the following personas:

| Persona | Title | Focus |
|---|---|---|
| Security Stakeholder | CISO / VP of Security | Supply chain risk, CVE reduction, compliance, image signing & attestation |
| Technical Practitioner | Staff / Principal Platform Engineer | Migration path, CI/CD integration, Dockerfile compatibility, operational impact |
|  Business Stakeholder | VP of Engineering | Developer productivity, ROI, build vs. buy, strategic risk reduction |

Your presentation should cover:

- **The problem** — What supply chain and image security risks does the customer face today?
- **The solution** — How does Docker Hardened Images address those risks? **Demontsrate** what you built in the exercise as a concrete example.
- **Business value** — Quantify or articulate the value for each persona (e.g., reduced CVE remediation time, simplified compliance, faster developer onboarding).
- **Next steps** — What would you recommend as a logical proof-of-concept or expansion path for this customer?

Throughout your presentation, members of the Docker team will role-play as the three customer personas outlined above. They may ask follow-up questions from their respective perspectives, and you will be expected to respond accordingly. 20 minutes of the total time allocated for the session will be used for this purpose.

> **Tip:** The strongest presentations connect the technical work you did in the exercise directly to a business outcome each persona cares about.


Good luck!
