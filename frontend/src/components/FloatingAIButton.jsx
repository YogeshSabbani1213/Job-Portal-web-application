import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingAIButton = () => {
  return (
    <Link
      to="/ai-resume"
      className="
        fixed bottom-6 right-6
        z-50
        bg-linear-to-r from-cyan-500 to-blue-600
        hover:scale-105
        hover:shadow-2xl
        transition-all duration-300
        text-white
        px-5 py-4
        rounded-full
        shadow-xl
        flex items-center gap-3
        animate-pulse
      "
    >
      <Sparkles size={22} />

      <span className="font-semibold hidden sm:block">
        AI
      </span>
    </Link>
  );
};

export default FloatingAIButton;