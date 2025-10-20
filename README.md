# Pokédex

A modern React-based Pokédex application that allows users to search and explore Pokémon information. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 🔍 Search Pokémon by name or ID
- 📱 Responsive design with modern UI
- 🎨 Beautiful Pokémon cards with type badges
- 📊 Detailed Pokémon statistics with bar charts
- 🔄 Pokémon evolution chains
- ⚔️ Comprehensive move listings
- 🧪 Comprehensive test coverage
- 📚 Storybook documentation
- ⚡ Fast development with Vite
- ♿ Accessibility support

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Data Fetching**: GraphQL with Apollo Client
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Testing**: Vitest, Testing Library, Playwright
- **Documentation**: Storybook
- **Code Quality**: ESLint, Prettier

## How to Run

### Prerequisites

Make sure you have Node.js (version 18 or higher) installed on your system.

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pokedex
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

- **Development**: `npm run dev` - Start dev server on port 3000 (opens automatically)
- **Build for production**: `npm run build` - Build the app for production
- **Preview production build**: `npm run preview` - Preview the production build locally
- **Run Storybook**: `npm run storybook` - Start Storybook on port 6006
- **Build Storybook**: `npm run build-storybook` - Build Storybook for deployment
- **Lint code**: `npm run lint` - Run ESLint to check code quality
- **Run tests**: `npx vitest` - Run all tests once
- **Run tests in watch mode**: `npx vitest --watch` - Run tests in watch mode
- **Run tests with coverage**: `npx vitest --coverage` - Generate coverage report
- **Run tests with UI**: `npx vitest --ui` - Run tests with Vitest UI

## How to Test

### Run All Tests

To run all tests in the project:
```bash
npx vitest
```

### Run Tests with Coverage

To run tests with coverage report:
```bash
npx vitest --coverage
```

### Run Tests in Watch Mode

To run tests in watch mode during development:
```bash
npx vitest --watch
```

### Run Tests with UI

To run tests with the Vitest UI:
```bash
npx vitest --ui
```

### Test Files

The project includes comprehensive tests for:
- Common Components (`src/components/common/**/*.test.tsx`)
  - Button, Chip, Input, Tabs
- Feature Components (`src/components/feature/**/*.test.tsx`)
  - BarChart (including chart utilities), Header, Loading, MoveTile, PokedexCard
- Pages (`src/pages/**/*.test.tsx`)
  - Error404, Pokemon (including Stats, Moves), PokemonNotFound, Search
- Utilities (`src/utils/**/*.test.ts`)
  - Pokemon utilities, Search utilities

## Project Structure

```
src/
├── assets/               # Static assets (images, icons, SVG components)
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Button/     # Button component with tests
│   │   ├── Chip/       # Chip/Badge component with tests
│   │   ├── Input/      # Input field component with tests
│   │   └── Tabs/       # Tabs component with tests
│   └── feature/         # Feature-specific components
│       ├── Charts/     # Chart components (BarChart)
│       ├── Header/     # Application header
│       ├── Loading/    # Loading spinner
│       ├── MoveTile/   # Pokemon move display tile
│       └── PokedexCard/ # Pokemon card component
├── config/              # Configuration files
│   └── apollo-client.ts # Apollo Client setup
├── constants/           # Global constants (e.g., Pokemon type colors)
├── graphql/             # GraphQL queries and type definitions
│   ├── queries.ts      # GraphQL query definitions
│   └── types.ts        # GraphQL type definitions
├── pages/               # Page components
│   ├── Error404/       # 404 error page
│   ├── Pokemon/        # Pokemon detail page
│   │   └── components/ # Page-specific components
│   │       ├── Evolutions/ # Evolution chain display
│   │       ├── Moves/     # Moves list with filtering
│   │       └── Stats/     # Stats bar chart
│   ├── PokemonNotFound/ # Pokemon not found page
│   └── Search/         # Search/home page
├── stories/             # Storybook stories for components
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and helpers
│   └── pokemon.ts      # Pokemon data utilities
└── test-setup.ts        # Test configuration and setup
```

### Code Organization Principles

- **Component Structure**: Each component folder contains:
  - Component file (`.tsx`)
  - Type definitions (`.type.ts`)
  - Tests (`.test.tsx`)
  - Barrel export (`index.ts`)
- **Constants**: 
  - Global constants in `src/constants/`
  - Page/component-specific constants as `.constants.ts` files
- **Custom Hooks**: Named with `.hook.ts` suffix (e.g., `useEvolutions.hook.ts`)
- **Utilities**: Shared helper functions with corresponding test files

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run tests: `npx vitest` (or `npx vitest --watch` for watch mode)
5. Run linting: `npm run lint`
6. Check your changes in Storybook: `npm run storybook`
7. Ensure build works: `npm run build`
8. Commit your changes: `git commit -m 'Add feature'`
9. Push to the branch: `git push origin feature-name`
10. Submit a pull request

### Development Guidelines

- Write tests for all new components and utilities
- Follow the existing component structure (component + types + tests + index)
- Use TypeScript for type safety
- Ensure accessibility (a11y) compliance
- Document components in Storybook
- Keep components small and focused on a single responsibility

## License

This project is licensed under the MIT License.