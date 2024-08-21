/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.12.0.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as bookings from "../bookings.js";
import type * as clerk from "../clerk.js";
import type * as http from "../http.js";
import type * as payments from "../payments.js";
import type * as planets from "../planets.js";
import type * as stripe from "../stripe.js";
import type * as transits from "../transits.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  bookings: typeof bookings;
  clerk: typeof clerk;
  http: typeof http;
  payments: typeof payments;
  planets: typeof planets;
  stripe: typeof stripe;
  transits: typeof transits;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
