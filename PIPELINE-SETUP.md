# Build the CI/CD Pipeline from Scratch

Follow these steps to get the pipeline running with Docker and a hosted webapp.

---

## 1. Prerequisites

- **Git** – repo is in `planner/` (you already have this).
- **Docker** – [Install Docker](https://docs.docker.com/get-docker/) (Desktop or Engine).
- **Docker Hub account** – [Sign up](https://hub.docker.com/signup).
- **GitHub account** – push your `planner` repo to GitHub so Actions can run.

---

## 2. Push the planner repo to GitHub

If the repo is only local:

```bash
cd planner
git remote add origin https://github.com/YOUR_USERNAME/planner.git
git push -u origin main
```

(Use your GitHub username and repo name; create the repo on GitHub first if needed.)

---

## 3. Create a Docker Hub repository

1. Go to [hub.docker.com](https://hub.docker.com) and log in.
2. **Repositories** → **Create Repository**.
3. Name it e.g. `planner-webapp`, visibility **Public**.
4. Create.

You’ll push images as: `YOUR_DOCKERHUB_USERNAME/planner-webapp:latest`.

---

## 4. Add Docker Hub secrets to GitHub

1. On GitHub, open your **planner** repo.
2. **Settings** → **Secrets and variables** → **Actions**.
3. **New repository secret** for each:

| Name                 | Value                          |
|----------------------|---------------------------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username       |
| `DOCKERHUB_TOKEN`    | Your Docker Hub password or **Access Token** (recommended) |

To create an Access Token: Docker Hub → **Account Settings** → **Security** → **New Access Token** (e.g. “GitHub Actions”). Use that token as `DOCKERHUB_TOKEN`.

---

## 5. What’s already in the repo

- **`Dockerfile`** – Builds the Vite app and serves it with nginx.
- **`.dockerignore`** – Keeps `node_modules`, `.git`, etc. out of the image.
- **`.github/workflows/ci-cd.yml`** – GitHub Actions workflow that:
  - **CI**: On every push/PR → install deps, lint, build.
  - **CD**: On push to `main` → build Docker image, push to Docker Hub as `DOCKERHUB_USERNAME/planner-webapp:latest` and `...:sha`.

---

## 6. Run the pipeline

1. Commit and push the new files (Dockerfile, .dockerignore, .github/workflows/ci-cd.yml):

   ```bash
   cd planner
   git add Dockerfile .dockerignore .github/
   git commit -m "Add Docker and CI/CD pipeline"
   git push origin main
   ```

2. On GitHub, open the repo → **Actions**. You should see the “CI/CD” workflow run.
3. After it succeeds, check Docker Hub → **Repositories** → **planner-webapp**. The new image should appear.

---

## 7. Run the image locally (optional)

```bash
cd planner
docker build -t planner-webapp:local .
docker run -p 8080:80 planner-webapp:local
```

Open [http://localhost:8080](http://localhost:8080).

---

## 8. Deploy the image to the cloud (next step)

The pipeline only builds and pushes the image. To **host** the webapp you add a **deploy** step that uses that image, for example:

- **Azure**: Web App for Containers, or Container Apps.
- **AWS**: App Runner, ECS, or Fargate.
- **GCP**: Cloud Run.
- **Other**: Any VM or PaaS that can run Docker (e.g. `docker run` or Docker Compose).

If you tell me which cloud you prefer (e.g. Azure, AWS, GCP), I can add a deploy job to the workflow that pulls `DOCKERHUB_USERNAME/planner-webapp:latest` and deploys it there.

---

## Summary

| Step | What you do |
|------|-------------|
| 1 | Install Docker, have Docker Hub + GitHub accounts |
| 2 | Push `planner` to GitHub |
| 3 | Create repo `planner-webapp` on Docker Hub |
| 4 | Add `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` in GitHub Actions secrets |
| 5 | Commit/push Dockerfile, .dockerignore, and .github/workflows/ci-cd.yml |
| 6 | Pipeline runs on push/PR; on `main` it pushes image to Docker Hub |
| 7 | (Optional) Run image locally with `docker run` |
| 8 | (Later) Add deploy job to host the image in your chosen cloud |
