import { easeInOut } from "framer-motion";

export const pageVariants = {
  visible: {
    opacity: 1,
    transition: {
      delay: 0.15,
      ease: easeInOut,
      duration: 0.5,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      ease: easeInOut,
      duration: 0.25,
    },
  },
};