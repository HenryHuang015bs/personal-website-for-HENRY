"use client";

import { useEffect, useState, useMemo } from "react";
import { recordVisit, getVisitorStats, type VisitorStats } from "@/lib/visitor";
import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingUp, Eye, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function VisitorCount() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRecorded, setHasRecorded] = useState(false);

  // Prepare chart data - merge current week and previous week data
  // Use useMemo to prevent unnecessary recalculation and animation on language change
  // IMPORTANT: All hooks must be called before any conditional returns
  const chartData = useMemo(() => {
    if (!stats) return [];
    return stats.weeklyVisits.map((visit, index) => {
      const date = new Date(visit.date);
      // Use Chinese locale to get full day names (周一到周日)
      const dayName = date.toLocaleDateString(
        'zh-CN',
        { weekday: 'long' }
      );
      const previousWeekData = stats.previousWeeklyVisits[index] || { count: 0 };
      return {
        name: dayName,
        visits: visit.count, // Current week - darker line
        previousVisits: previousWeekData.count, // Previous week - lighter line
        date: visit.date,
      };
    });
  }, [stats]);

  // Reverse to show oldest to newest (left to right)
  const reversedData = useMemo(() => {
    return [...chartData].reverse();
  }, [chartData]);

  useEffect(() => {
    // Check if we've already recorded this session (using sessionStorage to avoid duplicate counts on refresh)
    const sessionKey = "visitor-recorded-session";
    const recorded = typeof window !== 'undefined' ? sessionStorage.getItem(sessionKey) : null;

    const fetchStats = async () => {
      try {
        if (!recorded && typeof window !== 'undefined') {
          // Record a new visit (only once per session)
          const result = await recordVisit();
          if (result.success) {
            setStats(result.data);
            sessionStorage.setItem(sessionKey, "true");
            setHasRecorded(true);
          }
        } else {
          // Just get stats without recording (already recorded or server-side)
          const result = await getVisitorStats();
          if (result.success) {
            setStats(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching visitor stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Format total visits with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/30 dark:border-slate-700/30 bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl shadow-lg pt-0.5 pb-0 px-1.5 transition-colors duration-300" style={{ marginTop: '-3px' }}>
        <div className="animate-pulse space-y-0.5">
          <div className="h-6 bg-white/20 dark:bg-slate-700/20 rounded w-32"></div>
          <div className="h-12 bg-white/20 dark:bg-slate-700/20 rounded"></div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="rounded-2xl border border-white/30 dark:border-slate-700/30 bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl shadow-lg pt-0.5 pb-0 px-1.5 transition-colors duration-300 w-full" style={{ marginTop: '-3px' }}>
      <div className="space-y-0">
        {/* Header */}
        <div className="flex items-center gap-0.5">
          <Eye className="w-5 h-5 text-[#052659] dark:text-slate-300" />
          <h3 className="text-lg font-semibold text-[#052659] dark:text-slate-200">
            {t("visitor", "title")}
          </h3>
        </div>

        {/* Total Visits */}
        <div className="space-y-0 mt-0">
          <div className="flex items-baseline gap-0.5">
            <span className="text-3xl font-bold text-[#052659] dark:text-slate-100">
              {formatNumber(stats.totalVisits)}
            </span>
            <span className="text-sm text-[#052659]/60 dark:text-slate-400">
              {t("visitor", "totalVisits")}
            </span>
          </div>

          {/* Today's Visits */}
          <div className="flex items-center gap-0.5 text-sm mt-0">
            <Calendar className="w-4 h-4 text-[#052659]/60 dark:text-slate-400" />
            <span className="text-[#052659]/70 dark:text-slate-300">
              {t("visitor", "today")}: <strong>{formatNumber(stats.todayVisits)}</strong>
            </span>
          </div>
        </div>

        {/* Line Chart */}
        <div className="space-y-0 mt-0">
          <div className="flex items-center gap-0.5 text-sm text-[#052659]/70 dark:text-slate-300">
            <TrendingUp className="w-4 h-4" />
            <span>{t("visitor", "weeklyStats")}</span>
          </div>
          <div className="w-[calc(100%+40px)] h-[350px] -ml-4 mt-0">
            <ResponsiveContainer width={476} height={350}>
              <LineChart 
                data={reversedData} 
                margin={{ top: 0, right: 30, left: -5, bottom: 12 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-[#052659]/10 dark:stroke-slate-400/20" />
                <XAxis 
                  dataKey="name" 
                  className="text-[#052659] dark:text-slate-400"
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis 
                  className="text-[#052659] dark:text-slate-400"
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 246, 231, 0.95)',
                    border: '1px solid rgba(5, 38, 89, 0.2)',
                    borderRadius: '8px',
                    color: '#052659'
                  }}
                  labelStyle={{ color: '#052659', fontWeight: 'bold' }}
                  wrapperClassName="dark:text-slate-200"
                />
                {/* Previous week - lighter line */}
                <Line 
                  type="monotone" 
                  dataKey="previousVisits" 
                  stroke="#D4A574"
                  strokeWidth={2}
                  strokeOpacity={0.6}
                  dot={{ fill: '#D4A574', r: 3, fillOpacity: 0.6 }}
                  activeDot={{ r: 5 }}
                  isAnimationActive={false}
                />
                {/* Current week - darker line */}
                <Line 
                  type="monotone" 
                  dataKey="visits" 
                  stroke="#8B6F47" 
                  strokeWidth={3}
                  dot={{ fill: '#8B6F47', r: 4 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

