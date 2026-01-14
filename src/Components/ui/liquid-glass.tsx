import React from "react";
import { Box } from "@mui/material";

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string; // Kept for compatibility
  shadowIntensity?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  borderRadius?: string | {[key: string]: string | number};
  glowIntensity?: "none" | "low" | "medium" | "high";
  sx?: any; // Accept MUI sx prop
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  shadowIntensity = "md",
  borderRadius = "16px",
  glowIntensity = "medium",
  sx = {},
  className,
}) => {
  const shadowMap = {
    none: "none",
    xs: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
    sm: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    md: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    xl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  };

  const glowMap = {
    none: "none",
    low: "0 0 10px rgba(255, 255, 255, 0.1)",
    medium: "0 0 20px rgba(255, 255, 255, 0.2)",
    high: "0 0 30px rgba(255, 255, 255, 0.3)",
  };

  return (
    <Box
      className={className}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(24px)',
        bgcolor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: `${shadowMap[shadowIntensity]}${glowIntensity !== "none" ? `, ${glowMap[glowIntensity]}` : ""}`,
        borderRadius: borderRadius,
        ...sx,
      }}
    >
      {/* Gradient Overlay simulating the from-white/10 to-transparent */}
      <Box 
        sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom right, rgba(255,255,255,0.1), transparent)',
            opacity: 0.5,
            pointerEvents: 'none'
        }} 
      />
      <Box sx={{ position: 'relative', zIndex: 10, color: 'white', height: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};
