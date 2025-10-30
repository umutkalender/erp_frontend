import { Link, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LayoutDashboard, Users, Menu, Sparkles, ChartBar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import UserDropdown from "@/components/UserDropdown";

export default function MainLayout() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: t("navigation.dashboard"), path: "/dashboard" },
    { icon: Users, label: t("navigation.customers"), path: "/customers" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-card border-r border-border transition-all duration-300 flex flex-col shadow-lg`}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <ChartBar className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {t("auth.loginTitle")}
              </h1>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          )}
          {isSidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>

        {!isSidebarOpen && (
          <div className="p-2 border-b border-border">
            <Button
              variant="ghost"
              size="icon"
              className="w-full"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        )}

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full transition-all duration-200 hover:scale-105 ${
                    !isSidebarOpen ? "justify-center" : "justify-start"
                  } ${isActive ? "shadow-lg" : ""}`}
                >
                  <Icon className="h-5 w-5" />
                  {isSidebarOpen && (
                    <span className="ml-2">{item.label}</span>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <div className={`flex ${isSidebarOpen ? "gap-2" : "flex-col gap-2"}`}>
            {isSidebarOpen && (
              <>
                <ThemeToggle />
                <LanguageSwitcher />
              </>
            )}
            {!isSidebarOpen && (
              <div className="flex flex-col gap-2 items-center">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col">
        {/* Top Header */}
        <header className="bg-card border-b border-border p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div>
              <h2 className="text-lg font-semibold">
                {location.pathname === "/dashboard" ? t("navigation.dashboard") : t("navigation.customers")}
              </h2>
              <p className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString(undefined, { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <UserDropdown />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

