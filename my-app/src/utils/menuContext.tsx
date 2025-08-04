import React, { createContext, useContext, useState, useMemo } from "react";

interface RigthMenuContextType<T = any> {
  openRightMenu: (rightMenuData?: T, setType?: "multa") => void;
  closeRightMenu: () => void;
  isRightMenuOpen: boolean;
  rightMenuData: T | null;
  rightMenuType: "multa" | null;
}

const RightMenuContext = createContext<RigthMenuContextType | undefined>(undefined);

export const useRightMenu = <T = any,>(): RigthMenuContextType<T> => {
  const context = useContext(RightMenuContext);
  if (!context) {
    throw new Error("useRightMenu must be used within a RightMenuProvider");
  }
  return context;
};

export const RightMenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);
  const [rightMenuData, setRightMenuData] = useState<any>(null);
  const [rightMenuType, setRightMenuType] = useState<any>(null);

  const openRightMenu = (newRightMenuData?: any, setType?: "multa") => {
    if (newRightMenuData) setRightMenuData(newRightMenuData);
    setRightMenuType(setType);
    setIsRightMenuOpen(true);
  };

  const closeRightMenu = () => {
    setIsRightMenuOpen(false);
  };

  const contextValue = useMemo(
    () => ({
      openRightMenu,
      closeRightMenu,
      isRightMenuOpen,
      rightMenuData,
      rightMenuType,
    }),
    [isRightMenuOpen, rightMenuData, rightMenuType],
  );

  return <RightMenuContext.Provider value={contextValue}>{children}</RightMenuContext.Provider>;
};
