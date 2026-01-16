import { Incident } from "@/common/models/incident";
import { describe, expect, it } from "vitest";
import { IncidentFilterBy } from "../../models/models";
import { incidentHelper } from "../../helpers/incidentHelper";

describe("incidentHelper", () => {
  describe("filter", () => {
    const mockIncidents: Incident[] = [
      {
        id: "1",
        title: "Database Connection Failed",
        description: "Cannot connect to database",
        status: "Open",
        severity: "Critical",
        assigneeId: "user-1",
        createdAt: new Date("2026-01-15T10:00:00Z"),
        updatedAt: new Date("2026-01-15T10:00:00Z"),
        statusHistory: [],
      },
      {
        id: "2",
        title: "API Timeout Issue",
        description: "API is timing out",
        status: "In Progress",
        severity: "High",
        assigneeId: "user-2",
        createdAt: new Date("2026-01-14T09:00:00Z"),
        updatedAt: new Date("2026-01-14T09:00:00Z"),
        statusHistory: [],
      },
      {
        id: "3",
        title: "UI Button Not Working",
        description: "Button does not respond to clicks",
        status: "Resolved",
        severity: "Low",
        assigneeId: "user-1",
        createdAt: new Date("2026-01-13T08:00:00Z"),
        updatedAt: new Date("2026-01-13T08:00:00Z"),
        statusHistory: [],
      },
    ];

    it("should return all incidents when no filter", () => {
      const filter: IncidentFilterBy = {
        title: "",
      };

      const expected = [...mockIncidents];
      const actual = incidentHelper.filter(mockIncidents, filter);

      expect(actual).toEqual(expected);
    });

    it("should return a incident when title is applied", () => {
      const filter: IncidentFilterBy = {
        title: "Database Connection",
      };

      const expected = [mockIncidents[0]];
      const actual = incidentHelper.filter(mockIncidents, filter);

      expect(actual).toEqual(expected);
    });

    it("should filter by title when case insensitive", () => {
      const filter: IncidentFilterBy = {
        title: "database",
      };
      const expected = [mockIncidents[0]];
      const actual = incidentHelper.filter(mockIncidents, filter);

      expect(actual).toEqual(expected);
    });

    it("should filter by severity", () => {
      const filter: IncidentFilterBy = {
        title: "",
        severity: "Critical",
      };

      const expected = [mockIncidents[0]];
      const actual = incidentHelper.filter(mockIncidents, filter);

      expect(actual).toEqual(expected);
    });

    it("should filter by status", () => {
      const filter: IncidentFilterBy = {
        title: "",
        status: "In Progress",
      };

      const expected = [mockIncidents[1]];
      const actual = incidentHelper.filter(mockIncidents, filter);

      expect(actual).toEqual(expected);
    });
  });
});
