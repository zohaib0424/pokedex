# Pokédex

A modern React-based Pokédex application that allows users to search and explore Pokémon information. Built with React, TypeScript, Vite, and styled-components.

## Features

- 🔍 Search Pokémon by name or ID
- 📱 Responsive design with modern UI
- 🎨 Beautiful Pokémon cards with type badges
- 📊 Detailed Pokémon statistics and information
- 🧪 Comprehensive test coverage
- 📚 Storybook documentation
- ⚡ Fast development with Vite

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Styled Components, Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Testing**: Vitest, Testing Library
- **Documentation**: Storybook
- **API**: GraphQL with Apollo Client

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

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` if you need to customize the API URL. By default, it uses:
```
VITE_POKEMON_API_BASE_URL=https://pokeapi.co/api/v2
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Other Available Scripts

- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Run Storybook**: `npm run storybook`
- **Build Storybook**: `npm run build-storybook`
- **Lint code**: `npm run lint`

## How to Test

### Run All Tests

To run all tests in the project:
```bash
npm test
```

### Run Tests with Coverage

To run tests with coverage report:
```bash
npm run test:coverage
```

### Run Tests in Watch Mode

To run tests in watch mode during development:
```bash
npm run test:watch
```

### Run Tests with UI

To run tests with the Vitest UI:
```bash
npm run test:ui
```

### Test Files

The project includes comprehensive tests for:
- Components (`src/components/**/*.test.tsx`)
- API functions (`src/api/pokeapi.test.ts`)
- Utilities and helpers

## Project Structure

```
src/
├── constants/          # Global constants and configurations
├── services/           # API layer and data fetching
├── components/         # Reusable UI components
│   ├── common/        # Common components (Button, Input, etc.)
│   └── feature/       # Feature-specific components
├── pages/             # Page components
├── types/             # TypeScript type definitions
├── stories/           # Storybook stories
└── assets/            # Static assets
```

### Constants Organization

- **Global constants**: Located in `src/constants/` (e.g., Pokemon type colors)
- **Local constants**: Located as `.constants.ts` files in their respective folders (e.g., `SearchPage.constants.ts`)
- **Environment variables**: Defined in `.env.local` for sensitive or environment-specific values

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run tests: `npm test`
5. Run linting: `npm run lint`
6. Commit your changes: `git commit -m 'Add feature'`
7. Push to the branch: `git push origin feature-name`
8. Submit a pull request

## License

This project is licensed under the MIT License.