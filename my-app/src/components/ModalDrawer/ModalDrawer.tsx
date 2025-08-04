import React, { type ReactNode } from "react";
import "./ModalDrawer.scss";

interface ModalDrawerProps {
  testId?: string;
  color?: "light" | "dark";
  className?: string;
  children: ReactNode;
  visible?: boolean;
  onOverlayClick?: () => void;
  overlay?: boolean;
  placement?: "left" | "right";
}

const ModalDrawer: React.FC<ModalDrawerProps> = ({
  testId,
  color = "light",
  className,
  children,
  visible = false,
//   onOverlayClick,
//   overlay = true,
  placement = "left",
}) => {
  const drawerClass = [
      "modal-drawer",
      className,
      color === "light" && "modal-drawer--light",
      color === "dark" && "modal-drawer--dark",
      visible && "modal-drawer--visible",
      !visible && placement === "left" && "modal-drawer--hidden",
      !visible && placement === "right" && "modal-drawer--hidden--right",
      ]
  .filter(Boolean)
  .join(" ");
  return (
    <div
      className={drawerClass}
      data-testid={testId}
    >
      {/* {overlay && (
        <Overlay
          testId={testId && `${testId}-overlay`}
          color={color}
          className="modal-drawer__overlay"
          onClick={onOverlayClick}
          visible={visible}
        />
      )} */}
      <div
        data-testid={testId && `${testId}-content`}
        className={`modal-drawer__content${placement === "right" ? " content-right" : " content-left"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalDrawer;
