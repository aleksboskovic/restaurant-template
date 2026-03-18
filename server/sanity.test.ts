import { describe, expect, it } from "vitest";

describe("Sanity API Token", () => {
  it("should be able to query Sanity with the token", async () => {
    const token = process.env.SANITY_API_TOKEN;
    expect(token).toBeTruthy();
    expect(token!.length).toBeGreaterThan(20);

    const query = encodeURIComponent('*[_type == "menuItem"][0..0]');
    const res = await fetch(
      `https://yp5xha26.api.sanity.io/v2021-06-07/data/query/production?query=${query}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    expect(res.ok).toBe(true);
    const data = await res.json() as { result: unknown[] };
    expect(Array.isArray(data.result)).toBe(true);
  });
});
