import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const BookingSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(30),
  eventDate: z.string().min(4).max(30),
  eventType: z.string().min(1).max(80),
  city: z.string().min(1).max(80),
  color: z.string().min(1).max(40),
  size: z.enum(["XS", "S", "M", "L", "XL", "XXL"]),
  notes: z.string().max(1000).optional().default(""),
});

export const Route = createFileRoute("/api/booking")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = BookingSchema.safeParse(body);
          if (!parsed.success) {
            return new Response(
              JSON.stringify({ ok: false, errors: parsed.error.flatten() }),
              { status: 400, headers: { "Content-Type": "application/json", ...CORS } },
            );
          }
          const ref = `MN-${Date.now().toString(36).toUpperCase()}`;
          console.log("[booking]", ref, parsed.data);
          return new Response(
            JSON.stringify({
              ok: true,
              reference: ref,
              message: "Reservation received. Our Chennai atelier will call you within 24 hours.",
            }),
            { status: 200, headers: { "Content-Type": "application/json", ...CORS } },
          );
        } catch (err) {
          return new Response(
            JSON.stringify({ ok: false, error: "Invalid request" }),
            { status: 400, headers: { "Content-Type": "application/json", ...CORS } },
          );
        }
      },
    },
  },
});
