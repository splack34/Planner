# Planner

A task management web application built with React, TypeScript, and Vite — containerized with Docker and deployed to the cloud via a fully automated CI/CD pipeline.

---

## CI/CD Pipeline

This project features an end-to-end automated deployment pipeline built from scratch:

1. **Push to `main`** triggers a GitHub Actions workflow
2. **Docker image** is built automatically from the Dockerfile
3. **Image is pushed** to Amazon ECR (and optionally Docker Hub)
4. **Deployed to AWS Fargate (ECS)** behind an Application Load Balancer (ALB)

> See [PIPELINE-SETUP.md](./PIPELINE-SETUP.md) for full pipeline breakdown and architecture details.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Containerization | Docker |
| CI/CD | GitHub Actions |
| Infrastructure as Code | Terraform |
| Container Registry | Amazon ECR (optional: Docker Hub) |
| Cloud Hosting | AWS Fargate (ECS) |
| Linting | ESLint, eslint-plugin-react-x |

---

## Project Structure

```
Planner/
├── .github/workflows/     # GitHub Actions CI/CD pipeline
├── infra/                 # Terraform (AWS ECR + ECS Fargate + ALB)
├── .aws/                  # ECS task definition template (used by CI/CD)
├── public/                # Static assets
├── src/                   # React + TypeScript source
├── Dockerfile             # Container configuration
├── .dockerignore          # Docker build exclusions
├── vite.config.ts         # Vite configuration
└── PIPELINE-SETUP.md      # Pipeline architecture docs
```

---

##  Run Locally

**Without Docker:**
```bash
npm install
npm run dev
```

**With Docker:**
```bash
docker build -t planner-webapp:local .
docker run -p 8080:80 planner-webapp:local
```
Then open [http://localhost:8080](http://localhost:8080)

---

##  Pipeline Architecture

```
Developer Push
      │
      ▼
GitHub Actions Trigger
      │
      ▼
Docker Image Build
      │
      ▼
Push to Amazon ECR
      │
      ▼
Deploy to AWS Fargate (ECS)
```

Credentials are stored securely as **GitHub Actions Secrets** — no keys are hardcoded in the repository.

---

##  Author

**Jardel Thomas**
- GitHub: [@splack34](https://github.com/splack34)
- Email: Jardelthomas10@gmail.com