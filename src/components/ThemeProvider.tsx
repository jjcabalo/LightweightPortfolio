"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e?: any) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("portfolio-theme") as Theme | null;
    if (stored) {
      setTheme(stored);
      if (stored === "light") {
        document.documentElement.classList.add("light-mode");
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("portfolio-theme", theme);
      if (theme === "light") {
        document.documentElement.classList.add("light-mode");
      } else {
        document.documentElement.classList.remove("light-mode");
      }
    }
  }, [theme, mounted]);

  const toggleTheme = (e?: any) => {
    const newTheme = theme === "dark" ? "light" : "dark";

    const applyTheme = () => {
      setTheme(newTheme);
      localStorage.setItem("portfolio-theme", newTheme);
      if (newTheme === "light") {
        document.documentElement.classList.add("light-mode");
      } else {
        document.documentElement.classList.remove("light-mode");
      }
    };

    if (!document.startViewTransition || !e) {
      applyTheme();
      return;
    }

    const x = e.clientX || window.innerWidth / 2;
    const y = e.clientY || window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        applyTheme();
      });
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 1000,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  // We must always render the provider so useTheme doesn't crash on SSR.
  // Since theme defaults to 'dark' on server, and we only update it after mount based on localStorage,
  // there will be no hydration mismatch for the initial render.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
