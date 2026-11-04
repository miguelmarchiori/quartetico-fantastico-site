import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type ShinyTextProps = {
  children: ReactNode;
  className?: string;
};

export default function ShinyText({ children, className = '' }: ShinyTextProps) {
  return (
    <motion.span
      className={`shiny-text ${className}`}
      initial={{ backgroundPosition: '120% 50%' }}
      animate={{ backgroundPosition: '-120% 50%' }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    >
      {children}
    </motion.span>
  );
}