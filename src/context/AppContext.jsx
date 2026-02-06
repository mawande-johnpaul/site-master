import { createContext, useContext, useState } from "react";
import {
  TbBrain,
  TbCrown,
  TbMoodPuzzled,
  TbTimeDuration0,
  TbTimeDuration30,
} from "react-icons/tb";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState({});
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
