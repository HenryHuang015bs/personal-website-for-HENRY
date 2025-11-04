"use server";

import { Redis } from "@upstash/redis";
import { TABLES } from "./constants";
import { ActionResult, error, success } from "./utils";

const IS_DEMO = !process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN;

// Create Redis client using Vercel KV environment variables
const redis = new Redis({
  url: process.env.KV_REST_API_URL || "",
  token: process.env.KV_REST_API_TOKEN || "",
});

export interface VisitorStats {
  totalVisits: number;
  todayVisits: number;
  weeklyVisits: { date: string; count: number }[];
  previousWeeklyVisits: { date: string; count: number }[];
}

// Record a visit
export const recordVisit = async (): Promise<ActionResult<VisitorStats>> => {
  if (IS_DEMO) {
    // Return mock data for demo
    const today = new Date();
    const weeklyVisits = [
      { date: new Date(today.getTime() - 0 * 86400000).toISOString().split('T')[0], count: 25 },
      { date: new Date(today.getTime() - 1 * 86400000).toISOString().split('T')[0], count: 18 },
      { date: new Date(today.getTime() - 2 * 86400000).toISOString().split('T')[0], count: 22 },
      { date: new Date(today.getTime() - 3 * 86400000).toISOString().split('T')[0], count: 20 },
      { date: new Date(today.getTime() - 4 * 86400000).toISOString().split('T')[0], count: 19 },
      { date: new Date(today.getTime() - 5 * 86400000).toISOString().split('T')[0], count: 21 },
      { date: new Date(today.getTime() - 6 * 86400000).toISOString().split('T')[0], count: 17 },
    ].reverse();
    
    const previousWeeklyVisits = [
      { date: new Date(today.getTime() - 7 * 86400000).toISOString().split('T')[0], count: 15 },
      { date: new Date(today.getTime() - 8 * 86400000).toISOString().split('T')[0], count: 16 },
      { date: new Date(today.getTime() - 9 * 86400000).toISOString().split('T')[0], count: 14 },
      { date: new Date(today.getTime() - 10 * 86400000).toISOString().split('T')[0], count: 18 },
      { date: new Date(today.getTime() - 11 * 86400000).toISOString().split('T')[0], count: 13 },
      { date: new Date(today.getTime() - 12 * 86400000).toISOString().split('T')[0], count: 16 },
      { date: new Date(today.getTime() - 13 * 86400000).toISOString().split('T')[0], count: 12 },
    ].reverse();
    
    return success({
      totalVisits: 1000,
      todayVisits: 25,
      weeklyVisits,
      previousWeeklyVisits,
    });
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Increment total visits
    const totalVisits = await redis.incr(TABLES.VISITOR_COUNT);
    
    // Increment today's visits
    const todayKey = `${TABLES.VISITOR_DAILY}:${today}`;
    const todayVisits = await redis.incr(todayKey);
    
    // Set expiration for daily key (7 days)
    await redis.expire(todayKey, 604800);
    
    // Get weekly stats
    const weeklyVisits = await getWeeklyStats();
    const previousWeeklyVisits = await getPreviousWeeklyStats();
    
    return success({
      totalVisits,
      todayVisits,
      weeklyVisits,
      previousWeeklyVisits,
    });
  } catch (err) {
    return error(err instanceof Error ? err.message : "Error recording visit");
  }
};

// Get visitor statistics without recording a visit
export const getVisitorStats = async (): Promise<ActionResult<VisitorStats>> => {
  if (IS_DEMO) {
    // Return mock data for demo
    const today = new Date();
    const weeklyVisits = [
      { date: new Date(today.getTime() - 0 * 86400000).toISOString().split('T')[0], count: 25 },
      { date: new Date(today.getTime() - 1 * 86400000).toISOString().split('T')[0], count: 18 },
      { date: new Date(today.getTime() - 2 * 86400000).toISOString().split('T')[0], count: 22 },
      { date: new Date(today.getTime() - 3 * 86400000).toISOString().split('T')[0], count: 20 },
      { date: new Date(today.getTime() - 4 * 86400000).toISOString().split('T')[0], count: 19 },
      { date: new Date(today.getTime() - 5 * 86400000).toISOString().split('T')[0], count: 21 },
      { date: new Date(today.getTime() - 6 * 86400000).toISOString().split('T')[0], count: 17 },
    ].reverse();
    
    const previousWeeklyVisits = [
      { date: new Date(today.getTime() - 7 * 86400000).toISOString().split('T')[0], count: 15 },
      { date: new Date(today.getTime() - 8 * 86400000).toISOString().split('T')[0], count: 16 },
      { date: new Date(today.getTime() - 9 * 86400000).toISOString().split('T')[0], count: 14 },
      { date: new Date(today.getTime() - 10 * 86400000).toISOString().split('T')[0], count: 18 },
      { date: new Date(today.getTime() - 11 * 86400000).toISOString().split('T')[0], count: 13 },
      { date: new Date(today.getTime() - 12 * 86400000).toISOString().split('T')[0], count: 16 },
      { date: new Date(today.getTime() - 13 * 86400000).toISOString().split('T')[0], count: 12 },
    ].reverse();
    
    return success({
      totalVisits: 1000,
      todayVisits: 25,
      weeklyVisits,
      previousWeeklyVisits,
    });
  }

  try {
    const totalVisits = await redis.get<number>(TABLES.VISITOR_COUNT) || 0;
    const today = new Date().toISOString().split('T')[0];
    const todayKey = `${TABLES.VISITOR_DAILY}:${today}`;
    const todayVisits = await redis.get<number>(todayKey) || 0;
    const weeklyVisits = await getWeeklyStats();
    const previousWeeklyVisits = await getPreviousWeeklyStats();
    
    return success({
      totalVisits,
      todayVisits,
      weeklyVisits,
      previousWeeklyVisits,
    });
  } catch (err) {
    return error(err instanceof Error ? err.message : "Error getting visitor stats");
  }
};

// Get weekly statistics
async function getWeeklyStats(): Promise<{ date: string; count: number }[]> {
  const stats: { date: string; count: number }[] = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dateKey = `${TABLES.VISITOR_DAILY}:${dateStr}`;
    const count = await redis.get<number>(dateKey) || 0;
    stats.push({ date: dateStr, count });
  }
  
  return stats.reverse();
}

// Get previous week statistics
async function getPreviousWeeklyStats(): Promise<{ date: string; count: number }[]> {
  const stats: { date: string; count: number }[] = [];
  
  for (let i = 7; i < 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dateKey = `${TABLES.VISITOR_DAILY}:${dateStr}`;
    const count = await redis.get<number>(dateKey) || 0;
    stats.push({ date: dateStr, count });
  }
  
  return stats.reverse();
}


