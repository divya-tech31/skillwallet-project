import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { CraftButton } from "@/components/Craft";
import { Search, BookOpen, MessageSquare, LayoutDashboard, LogOut } from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/search", label: "Search", icon: Search },
  { path: "/chat", label: "AI Chat", icon: MessageSquare },
];

export default function Navbar() {
  const { isAuthenticated, userEmail, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="border-b border-border/50 px-6 py-3 flex justify-between items-center bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        <span className="font-bold text-lg tracking-tight text-foreground">
          ResearchHub<span className="text-primary">.ai</span>
        </span>
      </Link>

      {isAuthenticated && (
        <div className="flex items-center gap-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname.startsWith(path)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <span className="text-xs text-muted-foreground tabular-data">{userEmail}</span>
            <CraftButton variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </CraftButton>
          </>
        ) : (
          <div className="flex gap-2">
            <Link to="/login">
              <CraftButton variant="secondary">Sign In</CraftButton>
            </Link>
            <Link to="/register">
              <CraftButton variant="primary">Get Started</CraftButton>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
