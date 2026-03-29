# LEADER MATCH AI

## Overview

This repository contains the multi-agent decision engine for our BMW Group Digital Excellence Hub Hackathon 2026 submission. We built a system to move recruitment from "vibe-coding" to Decision Intelligence by modeling the pairing effects of a Production Head and a Quality Head.

## Core implementation

This repo is structured to be 100% reproducible for the technical evaluation.

- Frontend Framework: A Vite-based React application utilizing TypeScript for type safety and scalability.
- UI/UX System: Implementation of an enterprise-level design system using Tailwind CSS and Shadcn UI components. Recent commits highlight a "BMW-inspired bulk upgrade: and specific design system CSS additions
- Backend Integration: Direct integration with Supabase for database management and authentication services.
- Data Processing: Development of Excel ingestion capabilities and bulk data processing logic for enterprise use cases.
- Testing Suite: A robust testing infrastructure including Vitest for unit testing and Playwright for end-to-end (E2E) testing.
- Environment & Dependencies: Modern package management using Bun(evidenced by bun.lock and bun.lockb) alongside standard npm configurations.

## Technical Stack

- Framwwork: React 18+ (Vite)
- Language: TypeScript
- Styling: Tailwind CSS + Shadcn UI
- Backend: Supabase
- Runtime/Package Manager: Bun
- Testing: Playwright (E2E), Vitest (Unit)

## Project Structure

- /src: Core application logic, including the enterprise UI components and matching algorithms.
- /supabase: Database schemas and server-side configurations for rigorous data management.
- /public: Static assets and published site information.
- tailwind.config.ts: Custom BMW-inspired design system tokens.
- playwright.config.ts/vitest.config.ts: Configuration for automated quality assurance and testing pipelines.

## Implemented Key Features

### 1. Enterprise UI:

A custom design system optimized for executive-level decision-making dashboards.

### 2. Bulk Ingestion:

Logic for handling large-scale Excel data imports to facilitate rapid leadership candidate assessments.

### 3. Performance Optimization:

Restricted performance updates and optimized build configurations via Vite.

### 4. End-to-End Testing:

Fully configured testing fixtures for validating complex user flows and data ingestion integrity.

## Development

This project utilizes the Bun runtime for high-performance dependency resolution
```bash
bun install  
bun run dev
