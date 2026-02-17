import { useState, useEffect } from "react";
import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimation";
import { RefreshCw, Users, CheckCircle, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function QueueTracker() {
  const { ref, isVisible } = useScrollAnimation();
  const [currentToken, setCurrentToken] = useState(12);
  const [highlightToken, setHighlightToken] = useState(false);

  // Stats
  const todayCount = useCountUp(27, 2000, isVisible);
  const doneCount = useCountUp(18, 2000, isVisible);
  const remainingCount = useCountUp(9, 2000, isVisible);

  // Token update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightToken(true);
      setTimeout(() => {
        setCurrentToken(prev => (prev < 50 ? prev + 1 : 1));
        setHighlightToken(false);
      }, 500); // Flash then update
    }, 30000); // Every 30s
    return () => clearInterval(interval);
  }, []);

  // Modal State
  const [phone, setPhone] = useState("");
  const [checkResult, setCheckResult] = useState<{ token: number, position: number } | null>(null);

  const handleCheckToken = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock logic
    setCheckResult({ token: 25, position: 7 });
  };

  return (
    <section id="queue" className="py-20 section-light" ref={ref}>
      <div className="container mx-auto px-4 text-center">
        <div className={`flex items-center justify-center gap-2 mb-4 fade-up ${isVisible ? "visible" : ""}`}>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase">
            Live
          </span>
        </div>

        <h2 className={`font-heading text-3xl md:text-4xl font-bold mb-2 fade-up stagger-1 ${isVisible ? "visible" : ""}`}>
          Check Your Turn — From Anywhere
        </h2>

        <div className={`max-w-md mx-auto mt-10 glass card-dentcare !bg-card/90 fade-up stagger-2 ${isVisible ? "visible" : ""}`}>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Now Serving</p>
              <span className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold transition-all duration-300 ${highlightToken ? "scale-110 shadow-lg shadow-primary/50" : "animate-pulse"}`}>
                #{currentToken}
              </span>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Your Token</p>
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary text-primary text-2xl font-bold">
                #18
              </span>
            </div>

            <p className="text-sm text-muted-foreground">
              {Math.max(0, 18 - currentToken)} patients ahead · Est. ~{Math.max(0, (18 - currentToken) * 15)} min
            </p>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>67%</span>
              </div>
              <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-[2000ms] ease-out"
                  style={{ width: isVisible ? "67%" : "0%" }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Total today: {todayCount}</p>
            </div>

            <div className="flex gap-3 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="btn-pill-primary text-sm">Check My Token</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Check Your Token Status</DialogTitle>
                    <DialogDescription>
                      Enter your phone number to see your current position in the queue.
                    </DialogDescription>
                  </DialogHeader>
                  {!checkResult ? (
                    <form onSubmit={handleCheckToken} className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="Enter 10-digit number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          pattern="\d{10}"
                          type="tel"
                        />
                      </div>
                      <Button type="submit" className="w-full">Check Status</Button>
                    </form>
                  ) : (
                    <div className="py-6 text-center space-y-4">
                      <div className="flex justify-center flex-col items-center gap-2">
                        <div className="text-4xl font-bold text-primary">#{checkResult.token}</div>
                        <div className="text-sm text-muted-foreground">Your Token Number</div>
                      </div>
                      <div className="bg-secondary/50 p-4 rounded-lg">
                        <p className="font-medium">Position in Queue: <span className="text-primary font-bold">{checkResult.position}</span></p>
                        <p className="text-xs text-muted-foreground mt-1">Please reach the clinic 15 mins before.</p>
                      </div>
                      <Button variant="outline" onClick={() => setCheckResult(null)} className="w-full">Check Another</Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              <button
                onClick={() => {
                  const el = document.getElementById("booking");
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                      el.classList.add("highlight-glow");
                      setTimeout(() => el.classList.remove("highlight-glow"), 2000);
                    }, 500);
                  }
                }}
                className="btn-pill-outline text-sm"
              >
                Book a Slot
              </button>
            </div>

            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <RefreshCw className="w-3 h-3 animate-spin-slow" />
              Updates every 30s
            </p>
          </div>
        </div>

        {/* Mini stat cards */}
        <div className={`grid grid-cols-3 gap-4 max-w-md mx-auto mt-6 fade-up stagger-3 ${isVisible ? "visible" : ""}`}>
          <MiniStatCard icon={<Users className="w-5 h-5" />} label="Today" value={todayCount} />
          <MiniStatCard icon={<CheckCircle className="w-5 h-5" />} label="Done" value={doneCount} />
          <MiniStatCard icon={<Clock className="w-5 h-5" />} label="Remaining" value={remainingCount} />
        </div>
      </div>
    </section>
  );
}

function MiniStatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) {
  return (
    <div className="card-dentcare !p-4 text-center flex flex-col items-center justify-center">
      <div className="mb-1 text-primary">{icon}</div>
      <div className="text-lg font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}
