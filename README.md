# Big Event Vue 3

Big Event Vue 3 is a Vue 3 admin dashboard for managing article channels, articles, and user account settings. It is built with Vite, Element Plus, Pinia, Vue Router, Axios, and Sass.

## Features

- User registration and login
- Token-based route protection
- Persistent user state with Pinia
- Article channel creation, editing, deletion, and listing
- Article listing with filters, pagination, create, edit, and delete actions
- User profile editing
- Avatar update
- Password reset
- Centralized Axios request and response handling

## Tech Stack

- Vue 3
- Vite
- Vue Router
- Pinia
- Element Plus
- Axios
- Sass
- ESLint
- Prettier
- Husky
- lint-staged

## Project Structure

```text
src/
  api/                 API service modules
  assets/              Images and global styles
  components/          Shared Vue components
  router/              Vue Router configuration and navigation guard
  stores/              Pinia stores
  utils/               Request and formatting utilities
  views/               Page-level Vue components
```

## Prerequisites

- Node.js
- pnpm

## Installation

```sh
pnpm install
```

## Development

Start the Vite development server:

```sh
pnpm dev
```

The app will be available at the local URL printed by Vite, usually:

```text
http://localhost:5173/
```

## Build

Create a production build:

```sh
pnpm build
```

## Preview

Preview the production build locally:

```sh
pnpm preview
```

## Linting and Formatting

Run ESLint with auto-fix:

```sh
pnpm lint
```

Format source files with Prettier:

```sh
pnpm format
```

## API

The Axios instance is configured in `src/utils/request.js`.

Default API base URL:

```text
http://big-event-vue-api-t.itheima.net
```

Authenticated requests automatically attach the stored token as the `Authorization` header. A `401` response redirects the user back to the login page.

## Main Routes

```text
/login             Login and registration
/article/manage    Article management
/article/channel   Article channel management
/user/profile      User profile
/user/avatar       Avatar update
/user/password     Password reset
```

## Recommended IDE Setup

[Visual Studio Code](https://code.visualstudio.com/) with [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar).
