import { Card, CardContent } from "@/components/ui/card";
import { Flame, Target, TrendingUp, Award } from "lucide-react";

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  completedToday: number;
  totalHabits: number;
}

export function StreakCard({
  currentStreak,
  longestStreak,
  completedToday,
  totalHabits,
}: StreakCardProps) {
  const progress = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;

  return (
    <Card className="shadow-card border-0 overflow-hidden">
      <div className="gradient-primary p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-foreground/80 text-sm font-medium">Aktuelle Serie</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-bold text-primary-foreground">{currentStreak}</span>
              <span className="text-primary-foreground/80 text-sm">Tage</span>
            </div>
          </div>
          <Flame className="h-12 w-12 text-primary-foreground animate-flame" />
        </div>
      </div>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary mb-2">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-semibold">{longestStreak}</span>
            <span className="text-xs text-muted-foreground">Rekord</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary mb-2">
              <Target className="h-5 w-5 text-accent" />
            </div>
            <span className="text-lg font-semibold">{completedToday}/{totalHabits}</span>
            <span className="text-xs text-muted-foreground">Heute</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary mb-2">
              <TrendingUp className="h-5 w-5 text-streak" />
            </div>
            <span className="text-lg font-semibold">{Math.round(progress)}%</span>
            <span className="text-xs text-muted-foreground">Fortschritt</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-2 rounded-full bg-habit-pending overflow-hidden">
            <div
              className="h-full gradient-success animate-progress rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
