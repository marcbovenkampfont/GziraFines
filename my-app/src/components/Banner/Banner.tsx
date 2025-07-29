import { motion } from "motion/react"
import './Banner.scss'

export type BannerType = {
    message: string;
    success: boolean;
}

type BannerProps = BannerType

const Banner: React.FC<BannerProps> = ({ message, success }) => {

  return (
    <motion.div
        className="banner"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8 }}
    >
        <div className={`banner-container${success ? " banner-container__success" : " banner-container__fail"}`}>
            {message}
        </div>
    </motion.div>
  );
};

export default Banner;