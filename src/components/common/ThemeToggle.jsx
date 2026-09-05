import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-purple-400"
    >
      {theme === "light" ? (
        <Moon size={19} />
      ) : (
        <Sun size={19} />
      )}
    </button>
  );
};

export default ThemeToggle;