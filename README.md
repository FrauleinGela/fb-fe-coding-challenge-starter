# Team Incident Dashboard - Starter Project

Display a list of incidents and allow users to filter by title, status, severity, and assignee
<br>
The list of incidents allows users to view incident details and create a new incident

## Feedback
Managed to resolve some of the tasks. not all of them, since it was recommended to use a maximum of 4 hours of focused work.
It was simple, with not much logic required, and the styles were done using shadcn and Tailwind.

It was fun, though. I went back and rethought my approach, deciding to use TanStack Form instead of React Hook Form (I felt it was a good chance to try it out 🙂)

## Architecture & key decisions
- <b>No global state library</b>: I chose not to introduce a global state management library to avoid unnecessary complexity since only two  components share data within the same page and no data is shared across pages

- <b>Data fetching strategy</b>: I chose React Query (@tanstack) because it separates server state from client state and handles loading, status, and errors (out of the box).

    When the API or contracts cannot be updated, caching and immediate rendering of users data allows incidents to display assignee names from userId

- <b>File/folder structure </b>: Feature/Modular approach that separate business features, API, and other layers like UI, utilities

- <b>For local UI state (forms, filters) </b>: I used TanStack Form and React's built-in 
useState: Since the project already uses TanStack Query, decided to keep the stack consistency

```bash
src/
├── api/                           # Mocked API
├── lib/                           # Utilities, all technicalities unrelated to business logic
├── core/                          # API, Expose all API(mocked endpoints) methods
    ├── api/                       # API, Expose all API methods
    ├── router/                    # Routes for Lazy load Components
├── common/                        # Shared or common code
    ├── ui/                        # All common UI components and external (shadecn) components   
    ├── models/                    # Business related domains/models 

├── features/                      # All business features 
    ├── Incidents
        ├── IncidentsOverview/     # Display Incidents, filter by, create and  view incident
        ├── IncidentCreate/        # Create Incident, Form, 
        ├── IncidentDetails/       # Display Incident Details         

```

## Trade-offs & limitations: 
  - Incidents Overview: No interactive sorting were added to simplify development.
  - Incidents can currently be viewed; updating incidents is not supported.

## Use of tooling/AI
I used TanStack Form because I wanted to experiment with it (since I am already using Tanstack Query). Although I could have used the more common `react-hook-form`, I wanted to step out of my comfort zone.

Some of the suggestions here were assisted by Copilot, but I only used them carefully and when I already know the approach. I avoid blindly accepting generated code

## Screenshots
- Incidents Overview
    - Tablet: 
   ![alt text](image-3.png)
    - Desktop:
   ![alt text](image.png)

- Incident Create Form
![alt text](image-2.png)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens the app at [http://localhost:5173](http://localhost:5173)

### Testing

```bash
npm test
```

### Build

```bash
npm run build
```

## Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Vitest** - Testing
- **React Testing Library** - Component testing
