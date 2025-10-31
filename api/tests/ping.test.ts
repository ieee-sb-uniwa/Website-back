import { describe, it, expect } from "bun:test";

describe("check ping", () => {
  it("should fetch events from localhost", async () => {
    const response = await fetch("http://localhost/api/ping");
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual({ test: "ok" });
  });
});
