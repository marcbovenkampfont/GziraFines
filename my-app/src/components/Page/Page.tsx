import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import Visible from "../Visible/Visible";
import type { Permission, RoleV2 } from "../../shared/types/players.types";
import "./Page.scss"
import { pageVariants } from "../../shared/constants/pageVariants";

interface PageProps {
    children: ReactNode;
    roles?: RoleV2[];
    permissions?: Permission[];
    title?: string;
}


const Page: React.FC<PageProps> = ({children, roles, permissions}) => {
    
    return (
        <Visible whenRole={roles} whenPermission={permissions}>
            <AnimatePresence>
                <motion.div
                    className="page"
                    initial="hidden"
                    variants={pageVariants}
                    animate="visible"
                    exit="hidden"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </Visible>
    )
}

export default Page;