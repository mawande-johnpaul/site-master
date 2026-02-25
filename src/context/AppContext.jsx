import { createContext, useContext, useState, useEffect } from "react";
import {
  TbBrain,
  TbCrown,
  TbMoodPuzzled,
  TbTimeDuration0,
  TbTimeDuration30,
} from "react-icons/tb";

const AppContext = createContext();

// Hardcoded products database
const PRODUCTS_DB = [
  {
    id: 1,
    name: "Prod1",
    img: "image.jpeg",
    desc: "A compelling product that offers great value",
    price: 30000,
    rating: 3,
    reviews: 45,
    category: "Electronics",
    specs: "High quality, durable",
  },
  {
    id: 2,
    name: "Prod2",
    img: "image.jpeg",
    desc: "Premium quality product with excellent reviews",
    price: 50000,
    rating: 5,
    reviews: 120,
    category: "Electronics",
    specs: "Best in class performance",
  },
  {
    id: 3,
    name: "Prod3",
    img: "image.jpeg",
    desc: "Affordable yet reliable option",
    price: 28000,
    rating: 4,
    reviews: 80,
    category: "Electronics",
    specs: "Good value for money",
  },
  {
    id: 4,
    name: "Prod4",
    img: "image.jpeg",
    desc: "Latest model with advanced features",
    price: 75000,
    rating: 5,
    reviews: 200,
    category: "Tech",
    specs: "Next generation technology",
  },
  {
    id: 5,
    name: "Prod5",
    img: "image.jpeg",
    desc: "Budget-friendly alternative",
    price: 15000,
    rating: 3.5,
    reviews: 60,
    category: "Electronics",
    specs: "Basic but functional",
  },
];

const THEME = {
  light: {
    primary: "#0A192F",
    surface: "#FFFFFF",
    textPrimary: "#121212",
    textSecondary: "#333333",
    background: "#F5F5F5",
  },
  dark: {
    primary: "#FFD700",
    surface: "#1E1E1E",
    textPrimary: "#f5f5f5",
    textSecondary: "#CCCCCC",
    background: "#121212",
  },
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chat, setChat] = useState(null);
  const [history, setHistory] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [modalChildren, setModalChildren] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [infoSeen, setInfoSeen] = useState(false);
  const [cookieSeen, setCookieSeen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [products] = useState(PRODUCTS_DB);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Apply theme colors to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const colors = THEME[theme];
    
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--surface', colors.surface);
    root.style.setProperty('--text-primary', colors.textPrimary);
    root.style.setProperty('--text-secondary', colors.textSecondary);
    root.style.setProperty('--background', colors.background);
    root.style.setProperty('--error', '#FF4C4C'); // Consistent error color
    root.style.setProperty('--success', '#4CAF50'); // Consistent success color
    root.style.setProperty('--warning', '#FFC107'); // Consistent warning color
    root.style.setProperty('--info', '#2196F3'); // Consistent info color
  }, [theme]);

  const [helperOptions, setHelperOptions] = useState({
    name: "",
    description: "",
    icon: null,
    budget: ["any", "low", "average", "high", "extreme"],
    quality: ["any", "low", "average", "high", "premium"],
    reviewTolerance: ["high", "considerate", "strict"],
    colorInterest: ["any", "cool", "bright", "flashy", "neutral"],
    tags: ["thoughtful", "fast", "creative", "nerd"],
  });

  const [helpers, setHelpers] = useState([
    {
      name: "QuickBot",
      description: "Gets results fast",
      icon: <TbTimeDuration0 size={48} />,
      budget: "any",
      quality: "any",
      reviewTolerance: "high",
      colorInterest: "any",
      tags: ["fast"],
    },
    {
      name: "Thoughtful",
      description: "Picks balanced products",
      icon: <TbBrain size={48} />,
      budget: "average",
      quality: "average",
      reviewTolerance: "considerate",
      colorInterest: "neutral",
      tags: ["thoughtful"],
    },
    {
      name: "Spender",
      description: "High end, best reviewed products",
      icon: <TbCrown size={48} />,
      budget: "high",
      quality: "premium",
      reviewTolerance: "strict",
      colorInterest: "any",
      tags: ["thoughtful", "nerd"],
    },
    {
      name: "QuickGeek",
      description: "Gets results faster but detail oriented",
      icon: <TbTimeDuration30 size={48} />,
      budget: "any",
      quality: "any",
      reviewTolerance: "high",
      colorInterest: "any",
      tags: ["nerd"],
    },
    {
      name: "Thorough",
      description: "No room for mistakes.",
      icon: <TbMoodPuzzled size={48} />,
      budget: "any",
      quality: "high",
      reviewTolerance: "strict",
      colorInterest: "any",
      tags: ["thoughtful", "nerd"],
    },
  ]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        history,
        setHistory,
        cart,
        setCart,
        wishlist,
        setWishlist,
        chat,
        setChat,
        modalChildren,
        setModalChildren,
        isOpen,
        setIsOpen,
        query,
        setQuery,
        infoSeen,
        setInfoSeen,
        cookieSeen,
        setCookieSeen,
        helperOptions,
        setHelperOptions,
        helpers,
        setHelpers,
        products,
        currentProduct,
        setCurrentProduct,
        theme,
        setTheme,
        themeColors: THEME[theme],
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
