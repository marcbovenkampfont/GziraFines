import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import Visible from "../Visible/Visible";
import type { Role } from "../../shared/types/players.types";
import "./Page.scss"
import { pageVariants } from "../../shared/constants/pageVariants";

interface PageProps {
    children: ReactNode;
    permissions: Role[];
    title?: string;
}


const Page: React.FC<PageProps> = ({children, permissions}) => {
    
    return (
        <Visible when={permissions}>
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