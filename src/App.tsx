import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminStatusToggle from "./components/AdminStatusToggle";
import { DoctorStatusProvider } from "@/context/DoctorStatusContext";
import IntroAnimation from "./components/IntroAnimation";

const queryClient = new QueryClient();

const App = () => {
  const [introDone, setIntroDone] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DoctorStatusProvider>
          {/* Intro splash — renders on top, unmounts after animation */}
          {!introDone && <IntroAnimation onDone={() => setIntroDone(true)} />}

          <AdminStatusToggle />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DoctorStatusProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
