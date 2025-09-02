import React, { createContext, useContext, useState } from "react";
import { ModalType } from "../shared/types/modalMulta.types";

type ModalPayload = any;

type ModalContextType = {
  modalType: ModalType;
  modalData: ModalPayload | null;
  isRightMenuOpen: boolean;
  openRightMenu: (type: ModalType, data?: ModalPayload) => void;
  closeRightMenu: () => void;
  resetModal: () => void;     // inicia animación de cierre (no borra datos)
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isRightMenuOpen, setRightMenuOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [modalData, setModalData] = useState<any>(null);

  const openRightMenu = (type: ModalType, data?: any) => {
    setModalType(type);
    setModalData(data ?? null);
    setRightMenuOpen(true);
  };

  const closeRightMenu = () => {
    console.log("CLosing rightMenu")
    setRightMenuOpen(false);
  };

  const resetModal = () => {
    setModalType(ModalType.NONE);
    setModalData(null);
  };

  return (
    <ModalContext.Provider
      value={{ isRightMenuOpen, modalType, modalData, openRightMenu, closeRightMenu, resetModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal debe usarse dentro de ModalProvider");
  return ctx;
};
