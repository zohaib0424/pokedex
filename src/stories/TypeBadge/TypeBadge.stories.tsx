import type { Meta, StoryObj } from "@storybook/react";
import { TypeBadge } from "../../components/common/TypeBadge";
import { PokemonTypeName } from "../../types/pokemon";

const meta = {
  title: "Components/Common/TypeBadge",
  component: TypeBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: [
        "normal",
        "fire",
        "water",
        "electric",
        "grass",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dragon",
        "dark",
        "street",
        "fairy",
      ] as PokemonTypeName[],
      description: "Pokemon type",
    },
  },
} satisfies Meta<typeof TypeBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    type: "normal",
  },
};

export const Fire: Story = {
  args: {
    type: "fire",
  },
};

export const Water: Story = {
  args: {
    type: "water",
  },
};

export const Electric: Story = {
  args: {
    type: "electric",
  },
};

export const Grass: Story = {
  args: {
    type: "grass",
  },
};

export const Ice: Story = {
  args: {
    type: "ice",
  },
};

export const Fighting: Story = {
  args: {
    type: "fighting",
  },
};

export const Poison: Story = {
  args: {
    type: "poison",
  },
};

export const Ground: Story = {
  args: {
    type: "ground",
  },
};

export const Flying: Story = {
  args: {
    type: "flying",
  },
};

export const Psychic: Story = {
  args: {
    type: "psychic",
  },
};

export const Bug: Story = {
  args: {
    type: "bug",
  },
};

export const Rock: Story = {
  args: {
    type: "rock",
  },
};

export const Ghost: Story = {
  args: {
    type: "ghost",
  },
};

export const Dragon: Story = {
  args: {
    type: "dragon",
  },
};

export const Dark: Story = {
  args: {
    type: "dark",
  },
};

export const Street: Story = {
  args: {
    type: "street",
  },
};

export const Fairy: Story = {
  args: {
    type: "fairy",
  },
};

export const AllTypes: Story = {
  render: () => {
    const allTypes: PokemonTypeName[] = [
      "normal",
      "fire",
      "water",
      "electric",
      "grass",
      "ice",
      "fighting",
      "poison",
      "ground",
      "flying",
      "psychic",
      "bug",
      "rock",
      "ghost",
      "dragon",
      "dark",
      "street",
      "fairy",
    ];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          maxWidth: "600px",
        }}
      >
        {allTypes.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
    );
  },
};

export const PopularTypes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "center",
      }}
    >
      <TypeBadge type="fire" />
      <TypeBadge type="water" />
      <TypeBadge type="grass" />
      <TypeBadge type="electric" />
    </div>
  ),
};

export const DualTypes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <TypeBadge type="fire" />
      <TypeBadge type="flying" />
    </div>
  ),
};
