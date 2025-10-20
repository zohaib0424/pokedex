import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "../../components/common/Tabs";
import { useState } from "react";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: {
      control: "color",
      description: "Background color for the active tab",
    },
    tabs: {
      description: "Array of tab labels (non-empty)",
    },
    activeTab: {
      description: "Currently active tab (controlled mode)",
    },
    defaultTab: {
      description: "Default active tab (uncontrolled mode)",
    },
    onTabChange: {
      description: "Callback fired when tab is changed",
      action: "tab-changed",
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// Uncontrolled Tabs (manages its own state)
export const Default: Story = {
  args: {
    tabs: ["STATS", "EVOLUTIONS", "MOVES"] as const,
    backgroundColor: "#7AC74C",
  },
};

export const WithDefaultTab: Story = {
  args: {
    tabs: ["STATS", "EVOLUTIONS", "MOVES"] as const,
    defaultTab: "EVOLUTIONS",
    backgroundColor: "#7AC74C",
  },
};

export const CustomColors: Story = {
  args: {
    tabs: ["Fire", "Water", "Grass"] as const,
    backgroundColor: "#FF5733",
  },
};

export const TwoTabs: Story = {
  args: {
    tabs: ["Details", "Info"] as const,
    backgroundColor: "#3B82F6",
  },
};

export const ManyTabs: Story = {
  args: {
    tabs: ["Home", "About", "Services", "Portfolio", "Contact"] as const,
    backgroundColor: "#8B5CF6",
  },
};

// Controlled Tabs (parent manages state)
export const Controlled: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState<string>("STATS");
    
    return (
      <div>
        <Tabs
          {...args}
          tabs={["STATS", "EVOLUTIONS", "MOVES"] as const}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            args.onTabChange?.(tab);
          }}
        />
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          Active Tab: <strong>{activeTab}</strong>
        </div>
      </div>
    );
  },
  args: {
    tabs: ["STATS", "EVOLUTIONS", "MOVES"] as const,
    backgroundColor: "#7AC74C",
  },
};

