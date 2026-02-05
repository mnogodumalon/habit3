import { useState } from "react";
import { HabitCard, StreakCard, AddHabitDialog } from "@/components/habits";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Habit {
  id: string;
  name: string;
  icon: string;
  streak: number;
  completedToday: boolean;
  weekData: boolean[];
}

// Sample data for initial UI
const initialHabits: Habit[] = [
  {
    id: "1",
    name: "30 Minuten lesen",
    icon: "📚",
    streak: 12,
    completedToday: true,
    weekData: [true, true, true, true, true, false, true],
  },
  {
    id: "2",
    name: "Sport machen",
    icon: "💪",
    streak: 5,
    completedToday: false,
    weekData: [true, false, true, true, true, false, false],
  },
  {
    id: "3",
    name: "2L Wasser trinken",
    icon: "💧",
    streak: 8,
    completedToday: true,
    weekData: [true, true, true, false, true, true, true],
  },
  {
    id: "4",
    name: "Meditieren",
    icon: "🧘",
    streak: 3,
    completedToday: false,
    weekData: [false, true, true, true, false, false, false],
  },
];

export default function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);

  const handleToggle = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === id) {
          const newCompleted = !habit.completedToday;
          return {
            ...habit,
            completedToday: newCompleted,
            streak: newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1),
            weekData: [
              ...habit.weekData.slice(0, 6),
              newCompleted,
            ],
          };
        }
        return habit;
      })
    );
  };

  const handleAddHabit = (name: string, icon: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      icon,
      streak: 0,
      completedToday: false,
      weekData: [false, false, false, false, false, false, false],
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const handleDeleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const completedToday = habits.filter((h) => h.completedToday).length;
  const currentStreak = Math.max(...habits.map((h) => h.streak), 0);
  const longestStreak = Math.max(currentStreak, 15); // Simulated longest streak

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold text-foreground">
            Gewohnheits&shy;tracker
          </h1>
          <p className="mt-2 text-muted-foreground">
            Baue positive Gewohnheiten auf, Tag für Tag.
          </p>
        </div>

        {/* Stats Card */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <StreakCard
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            completedToday={completedToday}
            totalHabits={habits.length}
          />
        </div>

        {/* Habits Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Deine Gewohnheiten</h2>
          <AddHabitDialog onAdd={handleAddHabit} />
        </div>

        {/* Habits List */}
        <div className="space-y-3">
          {habits.length === 0 ? (
            <div className="text-center py-12 animate-slide-up">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Keine Gewohnheiten vorhanden
              </h3>
              <p className="text-muted-foreground text-sm">
                Erstelle deine erste Gewohnheit und starte deine Reise!
              </p>
            </div>
          ) : (
            habits.map((habit, index) => (
              <div
                key={habit.id}
                className="group relative animate-slide-up"
                style={{ animationDelay: `${0.15 + index * 0.05}s` }}
              >
                <HabitCard
                  id={habit.id}
                  name={habit.name}
                  icon={habit.icon}
                  streak={habit.streak}
                  completedToday={habit.completedToday}
                  weekData={habit.weekData}
                  onToggle={handleToggle}
                />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                  onClick={() => handleDeleteHabit(habit.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Footer motivational text */}
        {habits.length > 0 && completedToday === habits.length && (
          <div className="mt-8 text-center animate-slide-up">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-lg font-medium text-success">
              Großartig! Alle Gewohnheiten für heute erledigt!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
