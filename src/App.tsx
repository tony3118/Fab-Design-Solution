import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import RequireAdminAuth from "./admin/RequireAdminAuth";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" attribute="class" disableTransitionOnChange>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <div className="relative min-h-screen">
          {/* BACKGROUND IMAGE */}
          <div
            className="fixed inset-0 -z-10 bg-cover bg-center"
            style={{ backgroundImage: "url('/bg-pattern.png')" }}
          />

          {/* TRANSPARENCY OVERLAY */}
          <div className="fixed inset-0 -z-10 bg-black/40 dark:bg-black/50" />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route
              path="/admin/dashboard"
              element={
                <RequireAdminAuth>
                  <AdminDashboard />
                </RequireAdminAuth>
              }/>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
