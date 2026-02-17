import { useDoctorStatus } from "@/context/DoctorStatusContext";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function DoctorStatusBadge({ mobile = false }: { mobile?: boolean }) {
    const { isAvailable } = useDoctorStatus();

    // Styles using standard Tailwind classes
    const badgeBase = "inline-flex items-center gap-3 px-3 py-1.5 rounded-full border transition-all duration-500 ease-in-out cursor-pointer relative overflow-hidden group";

    // Green: Light Green BG, Strong Green Border, Dark Green Text
    const badgeGreen = "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm hover:shadow-emerald-200/50";

    // Red: Light Red BG, Strong Red Border, Dark Red Text
    const badgeRed = "bg-rose-50 border-rose-200 text-rose-800 shadow-sm hover:shadow-rose-200/50";

    const dotBase = "w-2.5 h-2.5 rounded-full transition-all duration-500 flex-shrink-0";
    const dotGreen = "bg-emerald-500";
    const dotRed = "bg-rose-500";

    const statusText = isAvailable ? "Dr. Arjun · In Clinic" : "Dr. Arjun · Out of Clinic";
    const subText = isAvailable ? "● Available Now" : "✕ Not Available";
    const subTextColor = isAvailable ? "text-emerald-600" : "text-rose-600";

    // Handle scroll to booking
    const scrollToBooking = () => {
        const el = document.getElementById("booking");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
                el.classList.add("highlight-glow");
                setTimeout(() => el.classList.remove("highlight-glow"), 2000);
            }, 500);
        }
    };

    const Content = (
        <div className={cn(
            badgeBase,
            isAvailable ? badgeGreen : badgeRed,
            mobile ? "w-full justify-between px-4 py-3 shadow-md" : ""
        )}>
            {/* Shimmer effect on update */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            <div className="flex items-center gap-2.5 min-w-0">
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                    {isAvailable && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    )}
                    <span className={cn(dotBase, isAvailable ? dotGreen : dotRed)} />
                </span>
                <div className="flex flex-col text-left leading-tight truncate">
                    <span className={cn("font-medium truncate", mobile ? "text-[15px]" : "text-[13px]")}>{statusText}</span>
                    <span className={cn("text-[11px] font-bold", subTextColor)}>{subText}</span>
                </div>
            </div>
        </div>
    );

    // Tooltip Content
    const TooltipInfo = (
        <div className="space-y-3">
            <div className="flex items-center gap-3 border-b pb-3">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0", isAvailable ? "bg-emerald-50" : "bg-rose-50")}>
                    {isAvailable ? "🟢" : "🔴"}
                </div>
                <div>
                    <h4 className="font-bold text-sm">Dr. Arjun Mehta</h4>
                    <p className={cn("text-xs font-medium", isAvailable ? "text-emerald-800" : "text-rose-800")}>
                        Status: {isAvailable ? "In Clinic" : "Out of Clinic"}
                    </p>
                </div>
            </div>

            <div className="space-y-2 text-xs text-muted-foreground">
                {isAvailable ? (
                    <>
                        <p>Available for: <strong className="text-foreground">All Treatments</strong></p>
                        <p>Clinic Hours: <strong className="text-foreground">9AM – 8PM</strong></p>
                        <p className="flex items-center gap-1 text-emerald-600 font-medium">Next Available: Right Now ✓</p>
                    </>
                ) : (
                    <>
                        <p className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Next Available: <strong className="text-foreground">Tomorrow 9AM</strong>
                        </p>
                        <p>You can still book in advance.</p>
                    </>
                )}
            </div>

            <button
                onClick={() => {
                    if (mobile) {
                        // close drawer logic if needed, but drawer closes on backdrop
                    }
                    scrollToBooking();
                }}
                className={cn(
                    "w-full py-2 rounded-lg text-xs font-bold transition-colors mt-2",
                    isAvailable ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
            >
                {isAvailable ? "Book Appointment Now →" : "Book Future Appointment →"}
            </button>
        </div>
    );

    if (mobile) {
        return (
            <Drawer>
                <DrawerTrigger asChild>
                    {Content}
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Doctor Status</DrawerTitle>
                        <DrawerDescription>Real-time availability update</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pt-0">
                        {TooltipInfo}
                        <div className="mt-4">
                            {/* Drawer close button handled by parent UI usually, or user drags down */}
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <HoverCard openDelay={0} closeDelay={100}>
            <HoverCardTrigger asChild>
                {Content}
            </HoverCardTrigger>
            <HoverCardContent className="w-72 p-4 rounded-2xl shadow-xl border-none animate-in fade-in slide-in-from-top-2 duration-200 z-50 bg-white dark:bg-zinc-950">
                {TooltipInfo}
            </HoverCardContent>
        </HoverCard>
    );
}
