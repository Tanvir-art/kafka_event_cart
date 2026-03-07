# EventCart: Event-Driven Microservices Backend

A portfolio-grade backend system built with **Node.js, Kafka, MongoDB, Redis, and an API Gateway**.

This project demonstrates how to design and run an event-driven architecture with independently deployable services, asynchronous workflows, centralized event logging, and edge-level gateway controls.

## Why This Project Matters

- Models a real microservices workflow: order -> payment -> inventory -> notification/logging
- Uses Kafka topics as bounded-context event contracts
- Separates synchronous API edges (gateway) from asynchronous domain processing (consumers/producers)
- Shows practical production concerns: rate limiting, timeout handling, defensive proxying, structured logging

## System Architecture

- `api-gateway` (Express, ESM): single entrypoint for client requests
- `order_service` (Express, CommonJS): creates orders and publishes `order.created`
- `payment-service` (Kafka consumer + producer): consumes `order.created`, stores payment, publishes `payment.completed`
- `inventory-service` (Kafka consumer + producer): consumes `payment.completed`, updates stock, publishes `inventory.events`
- `notification-service` (Kafka consumer): reacts to payment events for user notification workflow
- `log-service` (Kafka consumer + Mongo): stores cross-service events in one event log collection

### Event Flow

1. Client sends order request to API Gateway
2. Gateway routes request to Order Service
3. Order Service persists order and publishes `order.created`
4. Payment Service consumes `order.created`, processes payment, publishes `payment.completed`
5. Inventory Service consumes `payment.completed`, updates stock, publishes `inventory.events`
6. Log Service consumes all core topics and stores event records
7. Notification Service listens to payment events for user-facing alerts

### Kafka Topics

- `order.created`
- `payment.completed`
- `inventory.events`

## Tech Stack

- Runtime: Node.js
- API framework: Express 5
- Messaging: Apache Kafka (`kafkajs`)
- Database: MongoDB (`mongoose`)
- Cache/infra utility: Redis (`ioredis`)
- Logging: Winston
- Gateway security/observability: Helmet, Morgan, Express Rate Limit
- Dev tooling: Nodemon, Docker Compose (infra)

## Repository Structure

```text
.
├── api-gateway/
├── order_service/
├── payment-service/
├── inventory-service/
├── notification-service/
├── log-service/
├── docker-compose.yml
└── .env.example
```

## Service Ports (Default)

- API Gateway: `5001`
- Order Service: `5000`
- Payment Service: `5002`
- Inventory Service: `5003`
- Notification Service: `5004`
- Log Service: `5005`
- Kafka: `9092`
- MongoDB: `27017`
- Redis: `6379`

## Local Setup

### 1) Start Infrastructure

```bash
docker compose up -d
```

This starts:
- MongoDB
- Redis
- Kafka

### 2) Install Dependencies Per Service

```bash
cd api-gateway && npm install
cd ../order_service && npm install
cd ../payment-service && npm install
cd ../inventory-service && npm install
cd ../notification-service && npm install
cd ../log-service && npm install
```

### 3) Configure Environment Variables

Each service has its own `.env` file. Minimum required values:

- `PORT`
- `MONGO_URI` (where applicable)
- `KAFKA_BROKER`

Gateway-specific:

- `ORDER_SERVICE`
- `PAYMENT_SERVICE`
- `INVENTORY_SERVICE`
- `REDIS_HOST`
- `REDIS_PORT`

### 4) Run All Services (6 terminals)

```bash
cd api-gateway && npm run dev
cd order_service && npm run dev
cd payment-service && npm run dev
cd inventory-service && npm run dev
cd notification-service && npm run dev
cd log-service && npm run dev
```

## API Usage

### Create Order Through Gateway

```http
POST http://localhost:5001/api/orders
Content-Type: application/json

{
  "userId": "user1235",
  "items": [
    { "productId": "p5", "quantity": 4 }
  ],
  "amount": 500
}
```

Expected behavior:
- Order document created in `orderdb`
- Kafka `order.created` published
- Payment service consumes and writes payment record
- Kafka `payment.completed` published
- Inventory service consumes and updates stock
- Kafka `inventory.events` published
- Log service persists events in MongoDB event log

## API Gateway Features

- Reverse proxy for core domain routes
- Request logging (`morgan`)
- Security headers (`helmet`)
- Rate limiting (`20 req/min` per client)
- Upstream timeout and pass-through status handling
- Defensive header forwarding to avoid request body hang issues

## Engineering Highlights

- Event-first service choreography
- Clear producer/consumer boundaries per domain
- Mixed module systems handled (ESM + CommonJS)
- Central event observability via log-service topic fan-in
- Designed to be extended toward saga/outbox/retry patterns

## Portfolio Positioning

This project is intentionally structured to showcase senior backend competencies for remote roles:

- Service decomposition and contract-based communication
- Reliability-oriented middleware and gateway controls
- Async architecture with audit-ready event history
- Practical dev ergonomics using Dockerized infrastructure

## Next Improvements

- Add health/readiness endpoints for each service
- Add contract tests for Kafka event schemas
- Add retry/DLQ strategy for consumer failures
- Containerize each service and orchestrate full stack in Compose
- Add OpenAPI docs for gateway routes
- Add CI pipeline (lint, tests, build checks)

## License

For portfolio and learning use.
