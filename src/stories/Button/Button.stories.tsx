import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../components/common/Button";
import { ChevronLeft } from "lucide-react";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Button content (text, icons, etc.)",
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "icon"],
      description: "Button variant style",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    onClick: {
      action: "clicked",
      description: "Click handler function",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    "aria-label": {
      control: "text",
      description: "Accessibility label",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary variant stories
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const PrimaryDisabled: Story = {
  args: {
    variant: "primary",
    children: "Disabled Primary",
    disabled: true,
  },
};

// Icon variant stories
export const IconButton: Story = {
  args: {
    variant: "icon",
    children: <ChevronLeft size={24} />,
    "aria-label": "Go back",
  },
};

export const IconButtonDisabled: Story = {
  args: {
    variant: "icon",
    children: <ChevronLeft size={24} />,
    "aria-label": "Go back",
    disabled: true,
  },
};

// Size variations
export const AllVariants: Story = {
  args: {
    children: "Button",
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
        width: "300px",
      }}
    >
      <Button variant="primary">
        Primary Button
      </Button>
      <div style={{ display: "flex", gap: "12px" }}>
        <Button variant="icon" aria-label="Back">
          <ChevronLeft size={24} />
        </Button>
      </div>
    </div>
  ),
};

// With long text
export const LongText: Story = {
  args: {
    variant: "primary",
    children: "This is a button with longer text content",
  },
};

export const AllStates: Story = {
  args: {
    children: "Button",
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
        maxWidth: "500px",
      }}
    >
      <div>
        <h4 style={{ marginBottom: "8px", fontSize: "14px" }}>Primary</h4>
        <Button variant="primary">
          Enabled
        </Button>
      </div>
      <div>
        <h4 style={{ marginBottom: "8px", fontSize: "14px" }}>Primary Disabled</h4>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </div>
    </div>
  ),
};

