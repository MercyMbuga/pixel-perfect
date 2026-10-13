

# Pixel Perfect

Pixel Perfect is a web application built with React and TanStack Start. This project is being developed into an end-to-end Cloud Engineering portfolio project, with a focus on containerization, cloud infrastructure, deployment automation, and monitoring.

## Current Status

- Application builds successfully.
- Docker image builds using the project Dockerfile.
- Docker Compose is configured to run the application locally.
- AWS deployment and cloud infrastructure automation are planned next.

## Technology Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Application framework:** TanStack Start
- **Build tool:** Vite
- **Containerization:** Docker
- **Local container orchestration:** Docker Compose
- **Planned cloud platform:** AWS
- **Planned infrastructure as code:** Terraform
- **Planned automation:** GitHub Actions

## Run Locally

### Prerequisites

Install Node.js and npm.

### Install dependencies

```bash
npm ci
```

### Start the development server

```bash
npm run dev
```

Follow the local URL printed in your terminal.

### Build the application

```bash
npm run build
```

## Run with Docker Compose

Ensure Docker Engine and the Docker Compose plugin are installed and running.

Build the image and start the application:

```bash
docker compose up --build -d
```

Open the application in your browser:

http://localhost:8080

Check the service status:

```bash
docker compose ps
```

View application logs:

```bash
docker compose logs app
```

Stop the application:

```bash
docker compose down
```

## Container Configuration

The Dockerfile builds the application into a Docker image. Docker Compose uses the configuration in `compose.yaml` to build and start the application container.

The current port mapping is:

| Host port | Container port |
|---|---|
| 8080 | 3000 |

## Planned Cloud Engineering Work

The next stages of this project are intended to include:

- AWS infrastructure provisioning with Terraform
- Container image storage using Amazon ECR
- Application deployment on AWS
- Build and deployment automation using GitHub Actions
- Monitoring and logging with Amazon CloudWatch
- Security improvements and deployment documentation

These capabilities will be documented as they are implemented and tested.

## Project Origin

The initial application was developed with [Lovable](https://lovable.dev). This repository is being extended through hands-on cloud engineering work.

## Author

Mercy Mbuga

GitHub: [MercyMbuga](https://github.com/MercyMbuga)
