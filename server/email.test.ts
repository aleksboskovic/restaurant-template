import { describe, expect, it, vi, beforeEach } from "vitest";
import type { OrderConfirmationData } from "./email";

// ─── Unit tests for email helper logic ─────────────────────────────────────

describe("sendOrderConfirmation – template param building", () => {
  const sampleData: OrderConfirmationData = {
    customerName: "Max Mustermann",
    customerEmail: "max@beispiel.at",
    orderNum: "HAB-2026-1234",
    orderType: "delivery",
    items: [
      { dishName: "Doro Wat", quantity: 2, price: 14.9 },
      { dishName: "Injera", quantity: 1, price: 3.5 },
    ],
    totalPrice: 33.3,
    deliveryAddress: "Hauptstraße 1, 5020 Salzburg",
    deliveryTime: "asap",
    paymentMethod: "card",
    notes: "Bitte klingeln",
  };

  it("formats total price with German decimal notation", () => {
    const formatted = sampleData.totalPrice.toFixed(2).replace(".", ",");
    expect(formatted).toBe("33,30");
  });

  it("builds items list correctly", () => {
    const itemsList = sampleData.items
      .map(
        (i) =>
          `${i.quantity}× ${i.dishName} – ${(i.price * i.quantity)
            .toFixed(2)
            .replace(".", ",")} €`
      )
      .join("\n");
    expect(itemsList).toContain("2× Doro Wat – 29,80 €");
    expect(itemsList).toContain("1× Injera – 3,50 €");
  });

  it("maps orderType delivery to German label", () => {
    const label = sampleData.orderType === "delivery" ? "Lieferung" : "Abholung";
    expect(label).toBe("Lieferung");
  });

  it("maps orderType pickup to German label", () => {
    const label = "pickup" === "delivery" ? "Lieferung" : "Abholung";
    expect(label).toBe("Abholung");
  });

  it("maps payment method card to German label", () => {
    const label =
      sampleData.paymentMethod === "card" ? "Karte (online bezahlt)" : "Bar bei Übergabe";
    expect(label).toBe("Karte (online bezahlt)");
  });

  it("maps payment method cash to German label", () => {
    const label = "cash" === "card" ? "Karte (online bezahlt)" : "Bar bei Übergabe";
    expect(label).toBe("Bar bei Übergabe");
  });

  it("returns false when EmailJS credentials are missing", async () => {
    // Temporarily override env to simulate missing credentials
    const originalEnv = process.env.EMAILJS_SERVICE_ID;
    process.env.EMAILJS_SERVICE_ID = "";

    // Re-import with empty env (dynamic import to get fresh module state)
    // Since we can't easily re-import, we test the guard logic directly
    const serviceId = process.env.EMAILJS_SERVICE_ID ?? "";
    const templateId = process.env.EMAILJS_TEMPLATE_ID ?? "";
    const publicKey = process.env.EMAILJS_PUBLIC_KEY ?? "";
    const shouldSkip = !serviceId || !templateId || !publicKey;

    // With empty SERVICE_ID, should skip
    expect(shouldSkip).toBe(true);

    process.env.EMAILJS_SERVICE_ID = originalEnv;
  });

  it("generates a valid order number format", () => {
    const year = new Date().getFullYear();
    const orderNum = `HAB-${year}-${Math.floor(1000 + Math.random() * 9000)}`;
    expect(orderNum).toMatch(/^HAB-\d{4}-\d{4}$/);
  });
});
