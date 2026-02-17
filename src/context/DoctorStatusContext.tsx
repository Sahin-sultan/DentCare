import React, { createContext, useContext, useState, useEffect } from "react";

interface DoctorStatusContextType {
    isAvailable: boolean;
    lastUpdated: Date;
    toggleStatus: () => void;
    isManual: boolean;
    checkTimeBasedStatus: () => void;
}

const DoctorStatusContext = createContext<DoctorStatusContextType | undefined>(undefined);

export function DoctorStatusProvider({ children }: { children: React.ReactNode }) {
    const [isAvailable, setIsAvailable] = useState<boolean>(false);
    const [isManual, setIsManual] = useState<boolean>(false);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    const checkTimeBasedStatus = () => {
        if (isManual) return; // Don't override if manually set

        const now = new Date();
        const day = now.getDay(); // 0 = Sunday
        const hour = now.getHours();

        // Sunday logic: Always closed
        if (day === 0) {
            if (isAvailable) {
                setIsAvailable(false);
                setLastUpdated(new Date());
            }
            return;
        }

        // Weekday logic: 9 AM to 8 PM (20:00)
        const isOpen = hour >= 9 && hour < 20;

        // Only update if changed to avoid unnecessary re-renders or lastUpdated shifts
        if (isOpen !== isAvailable) {
            setIsAvailable(isOpen);
            setLastUpdated(new Date());
        }
    };

    // Check status on mount and every minute
    useEffect(() => {
        checkTimeBasedStatus();
        const interval = setInterval(checkTimeBasedStatus, 60000);
        return () => clearInterval(interval);
    }, [isManual, isAvailable]);

    const toggleStatus = () => {
        setIsManual(true);
        setIsAvailable((prev) => !prev);
        setLastUpdated(new Date());
    };

    return (
        <DoctorStatusContext.Provider value={{ isAvailable, lastUpdated, toggleStatus, isManual, checkTimeBasedStatus }}>
            {children}
        </DoctorStatusContext.Provider>
    );
}

export function useDoctorStatus() {
    const context = useContext(DoctorStatusContext);
    if (context === undefined) {
        throw new Error("useDoctorStatus must be used within a DoctorStatusProvider");
    }
    return context;
}
