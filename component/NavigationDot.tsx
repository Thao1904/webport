import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

type AnimationPosition = {
  x: number;
  y: number;
  scale: number;
};

type NotHover = Record<string, AnimationPosition>;

interface NavigationDotProps {
  title: string;
  x: string;
  y: string;
  xHoveredAnimate: number;
  yHoveredAnimate: number;
  notHover: NotHover;
  hovered: string;
  setHovered: React.Dispatch<React.SetStateAction<string>>;
  link: string;
}

const NavigationDot: FC<NavigationDotProps> = ({
  title,
  x,
  y,
  xHoveredAnimate,
  yHoveredAnimate,
  notHover,
  hovered,
  setHovered,
  link
}) => {
  const router = useRouter();

  return (
    <div
      className="absolute"
      style={{ top: y, left: x }}
      onMouseEnter={() => setHovered(title)}
      onMouseLeave={() => setHovered("")}
      onClick={() => router.push(link)}
    >
      <motion.div
        whileHover={{ scale: 1.4 }}
        animate={{
          x: hovered === title ? xHoveredAnimate : hovered != "" ? notHover[hovered].x : 0,
          y: hovered === title ? yHoveredAnimate : hovered != "" ? notHover[hovered].y : 0,
          scale: hovered != "" && hovered != title ? notHover[hovered].scale : 1,
        }}
        className="rounded-full bg-[#AB77AD] w-50 h-50 relative flex items-center justify-center hover:cursor-pointer"
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <motion.p
          className="absolute text-white font-extrabold uppercase"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: hovered === title ? 1.5 : 0,
            opacity: hovered === title ? 1 : 0,
          }}
          transition={{ duration: 1 }}
        >
          {title}
        </motion.p>
      </motion.div>
    </div>
  );
};
export default NavigationDot;
