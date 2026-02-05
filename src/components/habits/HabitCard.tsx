import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Flame, Check } from "lucide-react";

export interface HabitCardProps {
  id: string;
  name: string;
  icon: string;
  streak: number;
  completedToday: boolean;
  weekData: boolean[];
  onToggle: (id: string) => void;
}

export function HabitCard({
  id,
  name,
  icon,
  streak,
  completedToday,
  weekData,
  onToggle,
}: HabitCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    onToggle(id);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  return (
    <Card
      className={cn(
        "shadow-card transition-all duration-300 hover:shadow-glow border-0",
        completedToday && "ring-2 ring-accent/30"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Icon and Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggle}
              className={cn(
                "relative flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all duration-300",
                completedToday
                  ? "gradient-success shadow-md"
                  : "bg-habit-pending hover:bg-secondary"
              )}
            >
              {completedToday ? (
                <Check
                  className={cn(
                    "h-6 w-6 text-success-foreground",
                    isAnimating && "animate-check-bounce"
                  )}
                  strokeWidth={3}
                />
              ) : (
                <span>{icon}</span>
              )}
            </button>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">{name}</span>
              {streak > 0 && (
                <div className="flex items-center gap-1 text-sm text-streak">
                  <Flame className="h-4 w-4 animate-flame" />
                  <span className="font-medium">{streak} Tage Streak</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Week Progress */}
          <div className="hidden sm:flex items-center gap-1">
            {weekData.map((completed, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">{days[index]}</span>
                <div
                  className={cn(
                    "h-6 w-6 rounded-md flex items-center justify-center transition-all",
                    completed
                      ? "bg-habit-completed"
                      : "bg-habit-pending"
                  )}
                >
                  {completed && (
                    <Check className="h-3.5 w-3.5 text-success-foreground" strokeWidth={3} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
