import { Box, Typography, Stack, IconButton, Container } from "@mui/material";
import { ArrowUpRight } from "lucide-react";
import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeatureCard = ({
  title,
  description,
  visual,
}: {
  title: string;
  description: string;
  visual: ReactNode;
}) => (
  <Box
    className="feature-card-item"
    sx={{
      background: "rgba(30, 30, 30, 0.6)",
      backdropFilter: "blur(24px) saturate(180%)",
      WebkitBackdropFilter: "blur(24px) saturate(180%)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
      borderRadius: "32px",
      p: { xs: 3, md: 5 },
      height: "100%",
      minHeight: "400px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s ease",
      opacity: 0, // Hidden initially for GSAP
      transform: "translateY(50px)", // Initial position for GSAP
      "&:hover": { transform: "translateY(-5px)" },
    }}
  >
    {visual}

    {/* Content Layer */}
    <Box
      sx={{
        position: "relative",
        zIndex: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="start"
        spacing={4}
      >
        <Typography
          variant="body1"
          sx={{
            color: "#E0E0E0",
            fontSize: { xs: "0.95rem", md: "1rem" },
            lineHeight: 1.6,
            maxWidth: "80%",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          {description}
        </Typography>
        <IconButton
          sx={{
            bgcolor: "rgba(145, 75, 241, 0.8)", // Semi-transparent button
            backdropFilter: "blur(10px)",
            color: "#fff",
            width: 48,
            height: 48,
            border: "1px solid rgba(255,255,255,0.2)",
            transition: "all 0.3s ease",
            ".feature-card-item:hover &": {
              // bgcolor: "#7A3CC1",
              transform: "rotate(45deg)",
            },
          }}
        >
          <ArrowUpRight size={24} />
        </IconButton>
      </Stack>

      <Typography
        variant="h3"
        sx={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: { xs: "1.8rem", md: "2.2rem" },
          fontWeight: 600,
          color: "#fff",
          textShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        {title}
      </Typography>
    </Box>
  </Box>
);

// Define visual configurations or components to cycle through
const VISUALS = [
  // Visual 1: Data Monitoring
  <Box
    sx={{
      width: "120%",
      height: "120%",
      position: "absolute",
      top: "-20%",
      left: "-20%",
      filter: "blur(40px)",
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
      backdropFilter: "blur(22px) saturate(160%)",
      WebkitBackdropFilter: "blur(22px) saturate(160%)",

      border: "1px solid rgba(255,255,255,0.16)",

      boxShadow: `
    //   0 40px 90px rgba(0, 0, 0, 0.45),
    //   inset 0 1px 0 rgba(255,255,255,0.01),
    //   inset 0 -1px 0 rgba(255,255,255,0.12)
    //   `,

      /* Light reflection */
      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(120deg, transparent 38%, rgba(255,255,255,0.01), transparent 62%)",
        opacity: 0.35,
        pointerEvents: "none",
      },

      /* Micro-noise (realism) */
      "&::after": {
        content: '""',
        position: "absolute",
        inset: 0,
        background:
          'url(\'data:image/svg+xml;utf8,\
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">\
<filter id="n">\
<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3"/>\
</filter>\
<rect width="120" height="120" filter="url(%23n)" opacity="0.025"/>\
</svg>\')',
        mixBlendMode: "overlay",
        pointerEvents: "none",
      },
    }}
  />,

  // Visual 2: Phishing Protection
  <Box
    sx={{
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "0",
      right: "0",
      background:
        "radial-gradient(circle at 80% 20%, rgba(91,180,243,0.2) 0%, rgba(20,20,20,0) 60%)",
      filter: "blur(50px)",
    }}
  />,

  // Visual 3: Penetration Testing
  <Box
    sx={{
      width: "100%",
      height: "100%",
      position: "absolute",
      bottom: "0",
      left: "0",
      background:
        "radial-gradient(circle at 20% 80%, rgba(230,90,200,0.2) 0%, rgba(20,20,20,0) 60%)",
      filter: "blur(50px)",
    }}
  />,

  // Visual 4: Risk & Compliance Assessment
  <Box
    sx={{
      width: "120%",
      height: "120%",
      position: "absolute",
      bottom: "-20%",
      right: "-20%",
      background:
        "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(20,20,20,0) 60%)",
      filter: "blur(40px)",
    }}
  />,
];

interface FeatureItem {
  _id?: string;
  title: string;
  description: string;
}

const FEATURES_DATA: FeatureItem[] = [
  {
    _id: "1",
    title: "Real-time Monitoring",
    description:
      "Continuous surveillance of your digital assets to detect and neutralize threats instantly.",
  },
  {
    _id: "2",
    title: "Phishing Protection",
    description:
      "Advanced algorithms to identify and block malicious attempts before they reach your inbox.",
  },
  {
    _id: "3",
    title: "Penetration Testing",
    description:
      "Simulate real-world attacks to identify vulnerabilities and strengthen your defenses.",
  },
  {
    _id: "4", // Fixed ID
    title: "Risk & Compliance",
    description:
      "Ensure your organization meets all regulatory standards with automated compliance checks.",
  },
];

export default function Features() {
  const containerRef = useRef(null);

  // GSAP Animation
  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.to(".feature-card-item", {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2, // Stagger effect
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }, containerRef);
      return () => ctx.revert();
    }, 100); // Slight delay for DOM rendering

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        py: { xs: 6, md: 10 },
        bgcolor: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient Background Glows removed */}

      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1250px",
          px: { xs: 2, md: 4 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Stack
          spacing={2}
          sx={{ mb: { xs: 6, md: 8 }, width: "100%", textAlign: "left" }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: { xs: "2.2rem", md: "4rem" },
              color: "#fff",
            }}
          >
            Transforming Threats <br /> into{" "}
            <Box component="span" sx={{ color: "#9D5BF3" }}>
              Secure Reality
            </Box>
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Logic to group features into pairs for the grid layout */}
          {FEATURES_DATA.reduce<FeatureItem[][]>((rows, feature, index) => {
            if (index % 2 === 0) rows.push([feature]);
            else rows[rows.length - 1].push(feature);
            return rows;
          }, []).map((pair, rowIndex) => (
            <Box
              key={rowIndex}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: rowIndex % 2 === 0 ? "1fr 1.5fr" : "1.5fr 1fr",
                }, // Alternating columns
                gap: 3,
              }}
            >
              {pair.map((feature, idx) => {
                const globalIndex = rowIndex * 2 + idx;
                return (
                  <FeatureCard
                    key={feature._id || globalIndex}
                    title={feature.title}
                    description={feature.description}
                    visual={VISUALS[globalIndex % VISUALS.length]}
                  />
                );
              })}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
