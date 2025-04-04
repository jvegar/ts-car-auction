# TS Car Auction

A TypeScript-based car auction platform with a web interface and backend services.

## Project Structure

This project is organized as a monorepo with the following components:

- `web/`: Frontend application
- `apps/api/`: Backend API service
- `apps/cron-job/`: Scheduled tasks and background jobs

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd ts-car-auction
```

2. Install dependencies:

```bash
npm install
```

## Development

The project uses npm workspaces for managing multiple packages. Here are the available scripts:

### API Service

```bash
npm run start:api
```

### Web Application

```bash
npm run start:web
```

### Cron Jobs

```bash
# Development mode
npm run dev:cron-job

# Build cron jobs
npm run build:cron-job
```
