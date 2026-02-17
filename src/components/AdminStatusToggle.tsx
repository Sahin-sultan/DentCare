import { useDoctorStatus } from "@/context/DoctorStatusContext";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function AdminStatusToggle() {
    const { isAvailable, lastUpdated, toggleStatus, isManual } = useDoctorStatus();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("admin") === "true") {
            setVisible(true);
        }
    }, [window.location.search]);

    if (!visible) return null;

    return (
        <div className="fixed bottom-24 right-6 z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-2xl p-4 w-72 backdrop-blur-md bg-opacity-90 transition-all duration-300 animate-in fade-in slide-in-from-bottom-6">
            <div className="flex items-center justify-between mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xl">🔧</span>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Doctor Status Control</h3>
                </div>
            </div>

            <div className="flex items-center justify-between mb-2">
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Dr. Arjun Mehta</span>
                    <span className={cn("text-xs font-bold", isAvailable ? "text-[#10B981]" : "text-[#EF4444]")}>
                        {isAvailable ? "🟢 In Clinic" : "🔴 Out of Clinic"}
                    </span>
                </div>
                <Switch
                    checked={isAvailable}
                    onCheckedChange={toggleStatus}
                    className="data-[state=checked]:bg-teal-500"
                />
            </div>

            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 mt-2 flex justify-between items-center">
                <span className="text-[10px] text-zinc-400">
                    {isManual ? "Manual Override Active" : "Auto-Schedule Mode"}
                </span>
                <span className="text-[10px] text-zinc-400">
                    Updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
}
