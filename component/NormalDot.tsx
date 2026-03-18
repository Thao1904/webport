import { FC } from "react";
import { motion } from "framer-motion"

interface NormalDotProps {
  x: number;
  y: number;
  size: number;
}

const NormalDot: FC<NormalDotProps> = ({ x, y, size }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-primary"
      animate={{
        x,
        y,
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default NormalDot;
