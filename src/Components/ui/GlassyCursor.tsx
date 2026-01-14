import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function GlassyCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Use a ref to track if we received initial mouse data to prevent 0,0 jump
  const hasMoved = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the outer ring (fluid lag)
  const springConfig = { damping: 20, stiffness: 150, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Tighter spring for the inner dot (responsive)
  const dotSpringConfig = { damping: 30, stiffness: 500 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!hasMoved.current) {
        hasMoved.current = true;
      }
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Interactive elements (Buttons, Links, Inputs)
      const isInteractive =
        target.matches("a, button, input, textarea, [role='button']") ||
        target.closest("a, button, [role='button']") ||
        target.classList.contains("hover-target");

      // Text elements (Paragraphs, Headings, Spans)
      // We verify they have non-empty text to avoid lens on empty containers
      const isText =
        target.matches(
          "p, span, h1, h2, h3, h4, h5, h6, li, blockquote, label"
        ) &&
        target.innerText &&
        target.innerText.trim().length > 0;

      setIsHovered(!!isInteractive);
      setIsTextHovered(!!isText && !isInteractive); // Text only if not interactive
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <style>
        {`
          body, a, button, input, textarea, [role="button"] { 
            cursor: none !important; 
          }
        `}
      </style>

      {/* Main Cursor (Dot) - Hides on all hover states to let lens/ring take over */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isClicked ? 0.8 : isHovered || isTextHovered ? 0 : 1,
            opacity: isHovered || isTextHovered ? 0 : 1,
          }}
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            boxShadow: "0 0 10px rgba(255,255,255,0.8)",
          }}
        />
      </motion.div>

      {/* Trailing Ring (The "Glass" Effect + Lens) */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99998,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovered ? 60 : isTextHovered ? 150 : 25,
            height: isHovered ? 60 : isTextHovered ? 150 : 25,

            // Styling changes based on state
            // We removed the gradient from here to fix Framer Motion warning
            backgroundColor: isHovered
              ? "rgba(145, 75, 241, 0.15)" // Interactive Purplish
              : "rgba(255, 255, 255, 0.05)", // Default for Text & Normal

            border: isHovered
              ? "1px solid rgba(145, 75, 241, 0.5)"
              : isTextHovered
              ? "1px solid rgba(255, 255, 255, 0.7)" // Sharp glass edge
              : "1px solid rgba(255, 255, 255, 0.3)",

            backdropFilter: isHovered
              ? "blur(2px)"
              : isTextHovered
              ? "brightness(1.4) contrast(1.2) saturate(1.2) blur(0.5px)" // Strong LENS magnification feel
              : "blur(0px)",

            scale: isClicked ? 0.9 : 1,
            rotate: isClicked ? 45 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          style={{
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isHovered
              ? "0 0 20px rgba(145, 75, 241, 0.3), inset 0 0 10px rgba(145, 75, 241, 0.1)"
              : isTextHovered
              ? "0 15px 35px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.25), inset 0 0 5px rgba(255,255,255,0.5)" // Deep glass reflection
              : "none",
          }}
        >
          {/* Gradient Overlay for Text Hover - Solves animate warning */}
          <motion.div
            animate={{ opacity: isTextHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Micro Crosshair inside the ring on interactive hover */}
          <motion.div
            animate={{
              scale: isHovered ? 1 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            style={{
              width: "4px",
              height: "4px",
              backgroundColor: "#914BF1",
              borderRadius: "50%",
              zIndex: 1,
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
