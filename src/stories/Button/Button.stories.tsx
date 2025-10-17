import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "components";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Button content",
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
      description: "Button variant",
    },
    onClick: {
      action: "clicked",
      description: "Called when button is clicked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    className: {
      control: "text",
      description: "Additional CSS class",
    },
    "data-testid": {
      control: "text",
      description: "Test identifier",
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    variant: "primary",
    disabled: true,
  },
};

export const DisabledSecondary: Story = {
  args: {
    children: "Disabled Secondary",
    variant: "secondary",
    disabled: true,
  },
};

export const WithCustomClass: Story = {
  args: {
    children: "Custom Button",
    variant: "primary",
    className: "custom-button",
  },
};

export const WithTestId: Story = {
  args: {
    children: "Test Button",
    variant: "primary",
    "data-testid": "storybook-button",
  },
};

export const LongText: Story = {
  args: {
    children: "This is a button with very long text content",
    variant: "primary",
  },
};

export const AllVariations: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "200px",
      }}
    >
      <Button onClick={fn()} variant="primary">
        Primary Button
      </Button>
      <Button onClick={fn()} variant="secondary">
        Secondary Button
      </Button>
      <Button onClick={fn()} variant="primary" disabled>
        Disabled Primary
      </Button>
      <Button onClick={fn()} variant="secondary" disabled>
        Disabled Secondary
      </Button>
    </div>
  ),
};

export const SideBySide: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Button onClick={fn()} variant="primary">
        Search
      </Button>
      <Button onClick={fn()} variant="secondary">
        Random
      </Button>
    </div>
  ),
};
