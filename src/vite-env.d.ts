/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly POKEMON_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

