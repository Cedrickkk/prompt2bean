# Prompt2Bean

Prompt2Bean is a Spring Boot service leveraging Spring AI to parse loose, conversational requests into structured, type-safe JSON objects using BeanOutputConverter—eliminating raw text prose for reliable API integration.

## Project structure

- `api/` — Spring Boot backend (Java 21, Spring AI + Ollama)
- `web/` — React + TypeScript frontend (Vite)
- `docker-compose.yaml` — orchestrates the `ollama`, `api`, and `web` services

## Running with Docker Compose (recommended)

Requires [Docker](https://docs.docker.com/get-docker/) with Compose.

```bash
docker compose up --build
```

This builds and starts three services:

- `ollama` — model runtime, pulls `qwen2.5-coder:7b` on first start
- `api` — Spring Boot backend, available at http://localhost:8080
- `web` — frontend served by nginx at http://localhost:3000 (proxies `/api/` to the backend)

The first run can take a while while the Ollama model is downloaded. Once `ollama` reports healthy, `api` and `web` start automatically.

## Running locally (without Docker)

### Prerequisites

- Java 21
- Node.js 20+
- [Ollama](https://ollama.com/) installed and running locally

### 1. Start Ollama

```bash
ollama serve
ollama pull qwen2.5-coder:7b
```

By default the API expects Ollama at `http://localhost:11434` (see `api/src/main/resources/application.yaml`).

### 2. Run the API

```bash
cd api
./mvnw spring-boot:run
```

The API starts on http://localhost:8080.

### 3. Run the web app

```bash
cd web
npm install
npm run dev
```

The dev server starts on http://localhost:5173 by default.
