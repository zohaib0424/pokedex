export interface Evolution {
  name: string;
  imageUrl: string | null;
  id: number;
}

export interface EvolutionsProps {
  evolutions: string[];
  color: string;
}


