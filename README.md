# SQRM Test - Frontend Engineer Assessment

This project is a frontend assessment submission for the Frontend Engineer role at **Squareme Technologies**. It demonstrates a complete React/Next.js + TypeScript implementation, state management with Redux Toolkit, integration with mock APIs, and basic component testing.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)
- [Author](#author)

---

## Project Overview

The **SQRM Test** project implements a dashboard interface with multiple pages, including:

- **Dashboard** – Displays key information such as online payments and transaction summaries.
- **Transactions** – Allows filtering, pagination, and viewing transaction details.
- **Homepage** – Landing page for the app.

All data is fetched using **mock API calls** and managed with **Redux Toolkit**.

---

## Tech Stack

- **Next.js** – Framework for React with server-side rendering support
- **TypeScript** – Type-safe development
- **Redux Toolkit** – State management
- **Chakra UI** – UI component library
- **React Testing Library + Jest** – Component testing
- **Netlify** – Deployment platform

---

## Features

- Fully responsive UI using Chakra UI
- Dashboard with interactive tabs and charts
- Transactions page with filters (account type, date range) and pagination
- Mock API integration for fetching data
- Redux Toolkit for global state management
- Clipboard copy functionality for account numbers
- Basic unit tests for components and mock API calls

---

## Getting Started

### Prerequisites

- Node.js >= 18.x
- Yarn or npm

### Installation

```bash
git clone <repo-url>
cd sqrm-test
yarn install  # or npm install
```

### Running Locally

```bash
yarn dev  # or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Testing

Run the component tests and mock API tests:

```bash
yarn test  # or npm run test
```

The tests cover:

- Rendering of key components
- Clipboard copy functionality
- Transactions filtering and pagination

---

## Deployment

This project has been deployed on **Netlify**

- [Netlify Deployment Link](https://sqrm-test.netlify.app/)

---

## Folder Structure

```
src/
├── components/
│   ├── _common/        # Reusable components
│   ├── pages/          # Page-level components (Dashboard, Transactions, Homepage)
├── hooks/              # Custom hooks
├── redux/              # Redux Toolkit slices and store
├── types/              # TypeScript types/interfaces
├── utils/              # Helper functions
```

---

## Author

**Seyi P. Ajiboye**
Frontend Engineer | [LinkedIn](https://www.linkedin.com/in/theseyipeters)
Email: [hellosagethedev@gmail.com](mailto:hellosagethedev@gmail.com)

---

### Notes

This project was built as part of a **frontend assessment test** for Squareme Technologies and showcases:

- Type-safe Next.js development with TypeScript
- Component-driven architecture
- State management using Redux Toolkit
- Integration with mock APIs
- Basic unit testing
