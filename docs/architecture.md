# Architecture Overview

## Modules
- Authentication
- Executive Dashboard
- Procurement Workspace
- Vendor Governance
- Risk Center
- Compliance Center
- Audit Center
- Reporting Center
- Settings

## Technical Stack
- React 19
- Vite
- Redux Toolkit
- React Router DOM
- Axios
- React Hook Form
- Yup
- Material UI
- Recharts
- Jest
- React Testing Library

## Flow
```mermaid
flowchart LR
A[User] --> B[Login]
B --> C[Dashboard]
C --> D[Procurement]
C --> E[Vendor Governance]
C --> F[Risk Center]
C --> G[Compliance Center]
C --> H[Audit Center]
C --> I[Reports]
```
