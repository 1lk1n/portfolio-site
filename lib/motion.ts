"use client";

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const cardHover = {
  rest: { y: 0, boxShadow: "0 4px 20px rgba(51, 78, 172, 0.08)" },
  hover: { y: -4, boxShadow: "0 12px 32px rgba(51, 78, 172, 0.15)" },
};
