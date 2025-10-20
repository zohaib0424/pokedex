import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "../../components/common/Chip";
import { PokemonTypeName } from "../../types/pokemon";

const meta = {
  title: "Components/Chip",
  component: Chip,
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
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    type: "normal",
  },
};

export const AllTypes: Story = {
  args: { type: "normal" },
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
          <Chip key={type} type={type} />
        ))}
      </div>
    );
  },
};

export const PopularTypes: Story = {
  args: { type: "fire" },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "center",
      }}
    >
      <Chip type="fire" />
      <Chip type="water" />
      <Chip type="grass" />
      <Chip type="electric" />
    </div>
  ),
};

export const DualTypes: Story = {
  args: { type: "fire" },
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <Chip type="fire" />
      <Chip type="flying" />
    </div>
  ),
};

