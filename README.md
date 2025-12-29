# 🤖 MAHI AI – ChatGPT-Style Personal AI Assistant (v2.2)
<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/e6b4ad0f-9da9-4360-bb73-117a8d71a38f" />






MAHI AI is a **ChatGPT-style personal AI assistant** built with a **modern Copilot UI**, **real-time streaming responses**, and a **production-grade DevOps pipeline** using **Docker, GitHub Actions, GitOps, Argo CD, and Argo Rollouts**.

This project demonstrates **end-to-end AI application delivery**, from UI to LLM inference, deployed on Kubernetes with **canary deployments**.

---

## ✨ Features

### 🧠 AI Capabilities

* Local LLM inference using **Ollama (phi model)**
* Real-time **streaming responses** (typing effect)
* Per-chat **memory persistence using Redis**
* Markdown rendering (code blocks, lists, formatting)

### 🎨 UI (ChatGPT / Copilot Style)

* Full-width responsive layout
* Dark mode (default)
* Sidebar with **New Chat**
* Smooth cursor animation while AI types
* Clean, modern ChatGPT-like experience

### ⚙️ DevOps & Platform

* Dockerized frontend & backend
* CI/CD with **GitHub Actions**
* GitOps-based deployment using **Argo CD**
* Progressive delivery using **Argo Rollouts (Canary)**
* Kubernetes-native service discovery
* Environment-driven configuration

---

## 🏗️ Architecture

```
┌──────────────┐
│  Frontend    │  (React, Copilot UI)
│  (Nginx)     │
└──────┬───────┘
       │ /chat/stream
┌──────▼───────┐
│ Backend API  │  (FastAPI)
│ (Streaming)  │
└──────┬───────┘
       │
 ┌─────▼─────┐       ┌──────────┐
 │   Redis   │◄─────►│  Ollama  │
 │ (Memory)  │       │ (phi LLM)│
 └───────────┘       └──────────┘
```

---

## 🧰 Tech Stack

### Frontend

* React
* react-markdown
* Nginx (production)
* Dark UI / Copilot layout

### Backend

* FastAPI
* Streaming responses
* Redis (chat memory)
* Ollama (LLM inference)

### DevOps & Cloud Native

* Docker
* GitHub Actions (CI)
* Kubernetes
* Argo CD (GitOps)
* Argo Rollouts (Canary deployments)
* Kustomize

---

## 📂 Repository Structure

### Application Repo

```
mahi-ai-app/
├── backend/
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
└── .github/workflows/ci.yml
```

### GitOps Repo

```
mahi-ai-gitops/
└── k8s/
    ├── base/
    │   ├── backend-rollout.yaml
    │   ├── frontend-rollout.yaml
    │   ├── redis-deployment.yaml
    │   ├── services.yaml
    │   └── kustomization.yaml
    └── overlays/
        ├── canary/
        └── stable/
```

---

## 🚀 CI/CD Flow

1. Code changes committed to `main`
2. Version tag pushed (e.g. `v2.2.3`)
3. GitHub Actions:

   * Builds backend & frontend images
   * Pushes images to Docker Hub
   * Updates GitOps repository
4. Argo CD detects Git change
5. Argo Rollouts performs **canary deployment**
6. Traffic gradually promoted to stable

---

## 🔄 Canary Deployment Strategy

```yaml
steps:
- setWeight: 10
- pause: 30s
- setWeight: 50
- pause: 60s
- setWeight: 100
```

This allows:

* Safe rollout
* Zero downtime
* Instant rollback via Git revert

---

## 🧪 Local Development (Optional)

```bash
# Backend
cd backend
uvicorn app:app --reload

# Frontend
cd frontend
npm install
npm start
```

---

## 📦 Production Deployment

All production deployments are handled **exclusively via GitOps**.

❌ No manual `kubectl apply`
✅ Git push → Argo CD sync

---

## 🧠 Key Learnings / Highlights

* Built a real-time AI chat system with streaming LLM output
* Implemented GitOps-based CI/CD with progressive delivery
* Solved real-world issues: dependency mismatches, Docker build isolation, service discovery
* Designed a production-ready architecture suitable for scaling

---

## 📈 Future Enhancements

* User authentication
* Chat history UI
* Redis persistence (PVC)
* GPU-based Ollama inference
* Public HTTPS ingress
* Autoscaling (HPA)

---

## 👤 Author

**Ramesh**
Built as a real-world **AI + DevOps portfolio project**.

---

