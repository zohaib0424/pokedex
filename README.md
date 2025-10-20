# Pokédex

A modern React-based Pokédex application that allows users to search and explore Pokémon information. Built with React, TypeScript, Vite, and Tailwind CSS, utilizing GraphQL for efficient data fetching from the PokéAPI.

## 🎯 Features

- 🔍 **Search Functionality**: Search Pokémon by name or ID with instant results
- 🎲 **Random Pokémon**: Discover random Pokémon with a single click
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices
- 🎨 **Dynamic Type Colors**: Pokemon cards adapt colors based on their primary type
- 📊 **Detailed Statistics**: Interactive bar charts displaying HP, Attack, Defense, Special Attack, Special Defense, and Speed
- 🔄 **Evolution Chains**: Visual representation of Pokémon evolution paths with clickable navigation
- ⚔️ **Comprehensive Move Listings**: Filterable list of all Pokémon moves with type indicators
- 🔄 **Smooth Navigation**: Back button navigation with browser history support
- 💫 **Loading States**: Elegant loading animations with themed Pokéball spinner
- ❌ **Error Handling**: Dedicated "Pokémon Not Found" page for invalid searches
- 🧪 **Comprehensive Test Coverage**: Unit and integration tests for all components
- 📚 **Storybook Documentation**: Interactive component documentation
- ⚡ **Fast Development**: Powered by Vite for instant hot module replacement
- ♿ **Accessibility Support**: ARIA labels and keyboard navigation

## 📸 Screenshots

> **Note**: Place your application screenshots in the `docs/screenshots/` folder with the following filenames:
> - `search-screen.png` - Home/Search page
> - `stats-screen.png` - Pokémon stats view
> - `evolution-screen.png` - Evolution chain view
> - `loading-screen.png` - Loading state

### Search/Home Screen
![Search Screen](docs/screenshots/search-screen.png)
*The main search interface with Pikachu background, allowing users to search by name or ID, or get a random Pokémon*

### Pokémon Stats View
![Stats View](docs/screenshots/stats-screen.png)
*Detailed statistics view showing HP, Attack, Defense, Special Attack, Special Defense, and Speed with interactive bar charts*

### Evolution Chain View
![Evolution View](docs/screenshots/evolution-screen.png)
*Visual evolution chain showing the progression between Pokémon forms with clickable navigation*

### Loading State
![Loading Screen](docs/screenshots/loading-screen.png)
*Elegant loading animation with animated Pokéball spinner*

### Moves View
The moves tab displays a comprehensive list of all moves the Pokémon can learn, with type-based color coding for each move.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 (with Vite plugin)
- **Data Fetching**: GraphQL with Apollo Client 4
- **API**: PokéAPI GraphQL endpoint (beta)
- **Routing**: React Router DOM 7
- **Charts**: Recharts 3 (for stats visualization)
- **Testing**: Vitest 3, Testing Library, Playwright
- **Documentation**: Storybook 9
- **Code Quality**: ESLint 9, Prettier 3
- **State Management**: React Hooks (useState, useCallback, custom hooks)

## 🏗️ Application Architecture

### Data Flow

1. **GraphQL Queries**: The app uses Apollo Client to fetch data from the PokéAPI GraphQL endpoint
2. **Query Strategy**: Dual query approach - fetch by ID or by name depending on user input
3. **Data Transformation**: Custom `usePokemonTransform` hook transforms raw API data into app-friendly format
4. **Type Safety**: Full TypeScript coverage with GraphQL type definitions

### Key Components

- **Search Page**: Landing page with search input, random Pokémon button
- **Pokemon Page**: Detailed view with tabs for Stats, Evolutions, and Moves
- **PokedexCard**: Reusable card component with dynamic type-based coloring
- **Loading Component**: Animated loading state with Pokéball spinner
- **Stats Component**: Bar chart visualization of Pokémon statistics
- **Evolutions Component**: Evolution chain with clickable Pokémon cards
- **Moves Component**: Filterable list of Pokémon moves organized by tabs

### Routing Structure

```
/                    → Search/Home page
/pokemon/:idOrName   → Pokemon detail page (accepts both ID and name)
/*                   → 404 Error page
```

## 🎮 How It Works

### 1. Search & Discovery

The home page provides two ways to find Pokémon:
- **Search by Name or ID**: Enter a Pokémon name (e.g., "pikachu") or ID (e.g., "25") in the search box
- **Random Pokémon**: Click the "Random" button to discover a random Pokémon from the first 151 (Generation 1)

### 2. Pokémon Detail View

Once a Pokémon is selected, the detail page displays:

#### Stats Tab (Default)
- **Visual Stats**: Six key statistics displayed as horizontal bar charts
- **Color-coded**: Bars use the Pokémon's primary type color
- **Stats Displayed**: HP, Attack, Defense, Special Attack, Special Defense, Speed
- **Max Values**: Bars are scaled relative to the maximum possible stat value

#### Evolutions Tab
- **Evolution Chain**: Shows the complete evolution path
- **Visual Flow**: Arrows indicate evolution progression
- **Interactive**: Click any Pokémon in the chain to navigate to its detail page
- **Handles All Cases**: Works with Pokémon that don't evolve, have multiple stages, or branch evolutions

#### Moves Tab
- **Complete Move List**: All moves the Pokémon can learn
- **Type Indicators**: Each move shows its type with appropriate color coding
- **Organized Display**: Moves are displayed in a clean, scrollable grid
- **Move Information**: Shows move name and type classification

### 3. Dynamic Theming

The application uses intelligent color theming:
- **Type-Based Colors**: Each Pokémon type has a unique color (Fire = red, Water = blue, Grass = green, etc.)
- **Dynamic Backgrounds**: Page backgrounds adapt to the Pokémon's primary type
- **Consistent UI**: Chips, badges, and interactive elements use the same color scheme

### 4. Error Handling

- **Invalid Searches**: Displays a friendly "Pokémon Not Found" page
- **Loading States**: Shows animated Pokéball spinner during data fetching
- **Network Errors**: Gracefully handles API failures
- **Navigation**: Back button always provides a way to return to search

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

## 🔌 GraphQL Implementation

### Apollo Client Setup

The application uses Apollo Client configured in `src/config/apollo-client.ts`:
- **Endpoint**: `https://beta.pokeapi.co/graphql/v1beta`
- **Cache**: InMemoryCache for optimized query caching
- **Error Handling**: Network and GraphQL error handling

### Queries

Two main queries are used (`src/graphql/queries.ts`):

1. **GET_POKEMON_BY_NAME**: Fetches Pokémon data by name
2. **GET_POKEMON_BY_ID**: Fetches Pokémon data by ID

Both queries retrieve:
- Basic info (id, name, height, weight)
- Types with names
- Stats (HP, Attack, Defense, Special Attack, Special Defense, Speed)
- Moves with type information
- Species data including flavor text and evolution chain

### Custom Hooks

#### `usePokemonTransform`
- **Purpose**: Transforms raw GraphQL response into app-friendly format
- **Features**: 
  - Extracts and formats Pokémon data
  - Processes evolution chains
  - Formats descriptions from flavor text entries
  - Handles missing or null data gracefully

#### `useEvolutions`
- **Purpose**: Manages evolution chain data and navigation
- **Features**:
  - Processes complex evolution chains
  - Handles multiple evolution paths
  - Provides navigation to evolved forms

## 🎨 Styling & UI

### Tailwind CSS 4

The application uses the latest Tailwind CSS with Vite plugin:
- **Utility-First**: All styling done through utility classes
- **Custom Colors**: Pokémon type colors defined in constants
- **Responsive**: Mobile-first responsive design
- **Dark Mode Ready**: Color scheme supports future dark mode implementation

### Type-Based Color System

Each Pokémon type has a unique color palette defined in `src/constants/index.ts`:
- Normal, Fire, Water, Electric, Grass, Ice, Fighting, Poison
- Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, Fairy

Colors are applied dynamically based on the Pokémon's primary type using the `getPokemonTypeColor` utility.

## 📊 Current Implementation Status

### ✅ Completed Features
- ✅ Search by Pokémon name or ID
- ✅ Random Pokémon discovery
- ✅ Detailed Pokémon information display
- ✅ Stats visualization with bar charts
- ✅ Evolution chain display with navigation
- ✅ Moves list with type indicators
- ✅ Type-based dynamic theming
- ✅ Loading states and error handling
- ✅ Responsive design for all screen sizes
- ✅ Browser navigation support (back/forward)
- ✅ GraphQL data fetching with Apollo Client
- ✅ Comprehensive test coverage
- ✅ Storybook component documentation

### 🔄 Known Considerations
- The app currently focuses on Generation 1 Pokémon for the random feature (can be extended to all generations)
- Evolution chains work for most Pokémon; some complex branching evolutions may need additional UI considerations
- The app uses the PokéAPI GraphQL beta endpoint

### 🚀 Potential Future Enhancements
- 🌙 Dark mode support
- 🔖 Favorites/Bookmarking system with local storage
- 🔍 Advanced search filters (by type, generation, stats)
- 📱 Progressive Web App (PWA) capabilities
- 🎮 Pokémon comparison tool
- 🌍 Multi-language support
- 📈 Advanced stat comparisons and visualizations
- 🎨 Ability themes (themed around specific Pokémon)
- 🔊 Sound effects and animations
- 💾 Offline mode with cached data
- 🏆 Achievements and badges system

## 🧩 Component Breakdown

### Common Components
- **Button**: Reusable button with variants (primary, secondary)
- **Chip**: Badge component for displaying types and categories
- **Input**: Form input with validation support
- **Tabs**: Tab navigation component for switching views

### Feature Components
- **PokedexCard**: Main card container for Pokémon details with tab navigation
- **Header**: Application header with branding
- **Loading**: Animated Pokéball loading spinner
- **MoveTile**: Individual move display tile with type coloring
- **BarChart**: Horizontal bar chart for statistics visualization

### Page Components
- **Search**: Landing page with search and random features
- **Pokemon**: Main Pokémon detail page with Stats, Evolutions, and Moves tabs
- **PokemonNotFound**: Error state when Pokémon doesn't exist
- **Error404**: General 404 error page for invalid routes

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

## 🌐 API Information

### PokéAPI GraphQL

This application uses the **PokéAPI GraphQL Beta** endpoint:
- **Endpoint**: `https://beta.pokeapi.co/graphql/v1beta`
- **Documentation**: [PokéAPI GraphQL Docs](https://pokeapi.co/docs/graphql)
- **No Authentication Required**: The API is free and open to use

### Data Fetched
- Pokémon basic information (name, ID, height, weight)
- Type information with names
- Base stats (HP, ATK, DEF, SP.ATK, SP.DEF, SPD)
- Complete move list with types
- Evolution chain data
- Pokémon species flavor text (descriptions)
- Pokémon sprites/images

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Deployment Platforms

The app can be deployed to:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist` folder or use Netlify CLI
- **GitHub Pages**: Push `dist` folder to `gh-pages` branch
- **AWS S3**: Upload `dist` contents to S3 bucket with static hosting

### Environment Variables

No environment variables are required as the app uses the public PokéAPI endpoint.

## 📝 Adding Screenshots

To add screenshots to this README:

1. Take screenshots of your running application
2. Save them in the `docs/screenshots/` directory with these names:
   - `search-screen.png` - The home page with search interface
   - `stats-screen.png` - Pokémon detail page showing stats
   - `evolution-screen.png` - Pokémon detail page showing evolutions
   - `loading-screen.png` - The loading state with Pokéball animation
3. The README already references these images and will display them automatically

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [PokéAPI Documentation](https://pokeapi.co/docs/v2)
- [Vitest Documentation](https://vitest.dev/)
- [Storybook Documentation](https://storybook.js.org/docs)

## 🤝 Acknowledgments

- **PokéAPI**: For providing the comprehensive Pokémon data
- **React Team**: For the amazing React framework
- **Vite Team**: For the blazing fast build tool
- **Tailwind CSS**: For the utility-first CSS framework
- **Apollo**: For the excellent GraphQL client

## License

This project is licensed under the MIT License.