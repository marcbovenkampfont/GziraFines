import React from "react";
import type { ReactNode } from "react";
import { useAuth } from "../../context/authContext.js";
import type { Player, Role } from "../../shared/types/players.types.js";

interface VisibleProps {
    children: ReactNode;
    when: Role[];
}


const Visible: React.FC<VisibleProps> = ({ when, children }) => {

    const { player } = useAuth();

    const checkWhen = (user: Player | null, when: Role[]) => {
        if (when.length === 0) {
            return true;
        }

        if (!user) return false
        if (!Array.isArray(user.role)) {
            return false;
        }
        return user.role.some(role => when.includes(role));
    }

    return <>{Boolean(checkWhen(player, when)) ? children : <>NO AUTORIZADO</>}</>;
};

export default Visible;