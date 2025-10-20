import { describe, it, expect } from "vitest";
import { getStatAbbreviation, parseStatsForChart } from "./BarChart.utils";
import { Stat } from "@/pages/Pokemon/components/Stats/Stats.type";

describe("BarChart.utils", () => {
  describe("getStatAbbreviation", () => {
    it("converts 'hp' to 'HP'", () => {
      expect(getStatAbbreviation("hp")).toBe("HP");
    });

    it("converts 'attack' to 'ATK'", () => {
      expect(getStatAbbreviation("attack")).toBe("ATK");
    });

    it("converts 'defense' to 'DEF'", () => {
      expect(getStatAbbreviation("defense")).toBe("DEF");
    });

    it("converts 'special-attack' to 'SATK'", () => {
      expect(getStatAbbreviation("special-attack")).toBe("SATK");
    });

    it("converts 'special-defense' to 'SDEF'", () => {
      expect(getStatAbbreviation("special-defense")).toBe("SDEF");
    });

    it("converts 'speed' to 'SPD'", () => {
      expect(getStatAbbreviation("speed")).toBe("SPD");
    });

    it("converts unknown stat names to uppercase", () => {
      expect(getStatAbbreviation("unknown-stat")).toBe("UNKNOWN-STAT");
    });

    it("handles empty string", () => {
      expect(getStatAbbreviation("")).toBe("");
    });
  });

  describe("parseStatsForChart", () => {
    it("parses single stat correctly", () => {
      const stats: Stat[] = [{ name: "hp", value: 45 }];
      const result = parseStatsForChart(stats);

      expect(result).toEqual([
        {
          stat: "HP",
          value: 45,
          maxValue: 200,
        },
      ]);
    });

    it("parses multiple stats correctly", () => {
      const stats: Stat[] = [
        { name: "hp", value: 45 },
        { name: "attack", value: 49 },
        { name: "defense", value: 49 },
      ];
      const result = parseStatsForChart(stats);

      expect(result).toEqual([
        { stat: "HP", value: 45, maxValue: 200 },
        { stat: "ATK", value: 49, maxValue: 200 },
        { stat: "DEF", value: 49, maxValue: 200 },
      ]);
    });

    it("parses all standard Pokemon stats", () => {
      const stats: Stat[] = [
        { name: "hp", value: 45 },
        { name: "attack", value: 49 },
        { name: "defense", value: 49 },
        { name: "special-attack", value: 65 },
        { name: "special-defense", value: 65 },
        { name: "speed", value: 45 },
      ];
      const result = parseStatsForChart(stats);

      expect(result).toHaveLength(6);
      expect(result[0]?.stat).toBe("HP");
      expect(result[1]?.stat).toBe("ATK");
      expect(result[2]?.stat).toBe("DEF");
      expect(result[3]?.stat).toBe("SATK");
      expect(result[4]?.stat).toBe("SDEF");
      expect(result[5]?.stat).toBe("SPD");
    });

    it("handles empty stats array", () => {
      const result = parseStatsForChart([]);
      expect(result).toEqual([]);
    });

    it("preserves stat values correctly", () => {
      const stats: Stat[] = [
        { name: "hp", value: 0 },
        { name: "attack", value: 150 },
        { name: "defense", value: 200 },
        { name: "speed", value: 300 },
      ];
      const result = parseStatsForChart(stats);

      expect(result[0]?.value).toBe(0);
      expect(result[1]?.value).toBe(150);
      expect(result[2]?.value).toBe(200);
      expect(result[3]?.value).toBe(300);
    });

    it("sets maxValue to 200 for all stats", () => {
      const stats: Stat[] = [
        { name: "hp", value: 45 },
        { name: "attack", value: 49 },
      ];
      const result = parseStatsForChart(stats);

      result.forEach((stat) => {
        expect(stat.maxValue).toBe(200);
      });
    });

    it("handles unknown stat names", () => {
      const stats: Stat[] = [{ name: "custom-stat", value: 100 }];
      const result = parseStatsForChart(stats);

      expect(result[0]?.stat).toBe("CUSTOM-STAT");
      expect(result[0]?.value).toBe(100);
    });
  });
});

