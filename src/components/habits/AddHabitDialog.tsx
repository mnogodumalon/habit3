import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const HABIT_ICONS = [
  "💪", "🏃", "📚", "💧", "🧘", "💊", "🍎", "😴",
  "✍️", "🎯", "🧹", "🌱", "☀️", "🎨", "🎵", "💻"
];

interface AddHabitDialogProps {
  onAdd: (name: string, icon: string) => void;
}

export function AddHabitDialog({ onAdd }: AddHabitDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(HABIT_ICONS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), selectedIcon);
      setName("");
      setSelectedIcon(HABIT_ICONS[0]);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-primary border-0 shadow-glow">
          <Plus className="h-4 w-4 mr-2" />
          Neue Gewohnheit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Neue Gewohnheit hinzufügen</DialogTitle>
            <DialogDescription>
              Erstelle eine neue tägliche Gewohnheit, die du tracken möchtest.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name der Gewohnheit</Label>
              <Input
                id="name"
                placeholder="z.B. 30 Minuten lesen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="grid gap-2">
              <Label>Symbol auswählen</Label>
              <div className="grid grid-cols-8 gap-2">
                {HABIT_ICONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setSelectedIcon(icon)}
                    className={cn(
                      "h-10 w-10 rounded-lg text-xl transition-all flex items-center justify-center",
                      selectedIcon === icon
                        ? "gradient-primary shadow-md ring-2 ring-primary/30"
                        : "bg-secondary hover:bg-accent/20"
                    )}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
            <Button type="submit" className="gradient-primary border-0" disabled={!name.trim()}>
              Hinzufügen
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
