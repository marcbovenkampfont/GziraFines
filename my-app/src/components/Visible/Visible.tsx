import React from "react";
import type { ReactNode } from "react";
import { useAuth } from "../../context/authContext.js";
import { getPermissionsFromRoles,  type Permission, type RoleV2 } from "../../shared/types/players.types.js";

interface VisibleProps {
    children: ReactNode;
    whenRole?: RoleV2[];
    whenPermission?: Permission[],
}

const Visible: React.FC<VisibleProps> = ({ whenRole = [], whenPermission = [], children }) => {

    const { player } = useAuth();

    const hasRole = (): boolean => {
        if (!player && (whenRole.length === 0 && whenPermission.length === 0)) return true;
        if (!player || !Array.isArray(player.role)) return false;
        return whenRole.length === 0 || (player ? player.role.some(role => whenRole.includes(role)) : true);
    };
    
    const hasPermission = (): boolean => {
        if (!player && (whenRole.length === 0 && whenPermission.length === 0)) return true;
        if (!player || !Array.isArray(getPermissionsFromRoles(player))) return false;
        return whenPermission.length === 0 || getPermissionsFromRoles(player).some(p => whenPermission.includes(p));
    };

    const isVisible = () => {
        console.log("whenRole", whenRole)
        console.log("whenPermission", whenPermission)
        console.log("HAS ROLE", hasRole())
        console.log("HAS PERMISSIONS", hasPermission())

        if (whenRole.length > 0 && whenPermission.length > 0) {
            return hasRole() && hasPermission();
        }
        return hasRole() && hasPermission();
    };

    return <>{isVisible() ? children : <></>}</>;
};

export default Visible;