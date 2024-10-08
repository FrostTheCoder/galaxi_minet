// planets.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addPlanet = mutation({
  args: {
    name: v.string(),
    x: v.number(),
    y: v.number(),
    z: v.number(),
  },
  handler: async (ctx, args) => {
    const planetId = await ctx.db.insert("planets", {
      name: args.name,
      coordinates: { x: args.x, y: args.y, z: args.z },
    });
    return planetId;
  },
});

export const listPlanets = query({
  handler: async (ctx) => {
    return await ctx.db.query("planets").collect();
  },
});

export const getPlanet = query({
  args: { planetId: v.id("planets") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.planetId);
  },
});

export const getPlanets = query({
  args: {
    planetIds: v.array(v.id("planets")),
  },
  handler: async (ctx, args) => {
    const planets = await Promise.all(
      args.planetIds.map((id) => ctx.db.get(id))
    );
    return planets.filter((planet): planet is NonNullable<typeof planet> => planet !== null);
  },
});