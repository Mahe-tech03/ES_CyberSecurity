import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { motion } from "framer-motion";
import Spline from '@splinetool/react-spline';




const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const imageVariants = {
  hidden: { opacity: 0, x: 100, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, delay: 0.4 } }
};

export default function Hero() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "transparent", // Use global Liquid Background
        pt: { xs: 16, md: 12 },
        pb: 8,
        display: 'flex',
        justifyContent: 'center',
        overflow: "hidden", // Prevent overflow from glow/animations
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: "1250px", px: { xs: 2, md: 4 } }}>
        <Box sx={{ position: "relative" }}> {/* Wrapper for layering */}

          {/* Background Glow removed for Plasma visibility */}


          <Box
            sx={{
              // Layout & Positioning
              position: "relative",
              zIndex: 1,
              px: { xs: 3, md: 8, lg: 12 },
              minHeight: { xs: "auto", md: "600px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pb: { xs: 8, md: 0 },
              borderRadius: { xs: "32px", md: "48px" },
              overflow: "hidden",

              /* Glass Effect – realistic */
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              backdropFilter: "blur(22px) saturate(160%)",
              WebkitBackdropFilter: "blur(22px) saturate(160%)",

              border: "1px solid rgba(255,255,255,0.16)",

              boxShadow: `
              // 0 40px 90px rgba(0, 0, 0, 0.45),
              // inset 0 1px 0 rgba(255,255,255,0.01),
              // inset 0 -1px 0 rgba(255,255,255,0.12)
              // `,

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
                  "url('data:image/svg+xml;utf8,\
<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\">\
<filter id=\"n\">\
<feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\"/>\
</filter>\
<rect width=\"120\" height=\"120\" filter=\"url(%23n)\" opacity=\"0.025\"/>\
</svg>')",
                mixBlendMode: "overlay",
                pointerEvents: "none",
              },

            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: "100%", position: "relative", zIndex: 2 }}
            >
              {/* Left Content */}
              <Box
                sx={{ width: { xs: "100%", md: "52%" }, pr: { md: 0 }, pl: { md: 2 }, textAlign: { xs: "center", md: "left" } }}
              >
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={itemVariants}>
                    <Typography
                      variant="h1"
                      sx={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4.2rem" },
                        lineHeight: 1.1,
                        mb: 3,
                        letterSpacing: "-0.04em",
                        fontWeight: 600,
                        color: "#fff",
                        textShadow: "0px 0px 20px rgba(0,0,0,0.5)" // Better readability on glass
                      }}
                    >
                      Defending the Digital World <br />
                      <Box component="span" sx={{ color: "#9D5BF3" }}>with Intelligent Security</Box>
                    </Typography>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "'Manrope', sans-serif",
                        color: "#E0E0E0", // Brighter text for contrast
                        fontSize: { xs: "1.1rem", md: "1.2rem" },
                        mb: 5,
                        maxWidth: "520px",
                        lineHeight: 1.6,
                        letterSpacing: "-0.01em",
                        mx: { xs: "auto", md: 0 }
                      }}
                    >
                      From vulnerability assessment to real-time threat response, we deliver end-to-end cyber security solutions built for the modern internet.
                    </Typography>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 2, sm: 3 }} alignItems="center" justifyContent={{ xs: "center", md: "flex-start" }}>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#914BF1",
                          color: "#fff",
                          borderRadius: "14px",
                          px: 4.5,
                          py: 1.6,
                          textTransform: "none",
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "1.05rem",
                          fontWeight: 600,
                          width: { xs: "100%", sm: "auto" },
                          boxShadow: "0 4px 15px rgba(145, 75, 241, 0.3)",
                          "&:hover": {
                            bgcolor: "#7A3CC1",
                            boxShadow: "0 6px 20px rgba(145, 75, 241, 0.5)",
                          }
                        }}
                      >
                        Let's Get Started
                      </Button>
                      <Button
                        variant="text"
                        sx={{
                          color: "#FFFFFF",
                          textTransform: "none",
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "1.05rem",
                          fontWeight: 500,
                          opacity: 0.9,
                          "&:hover": { bgcolor: "rgba(255,255,255,0.05)", opacity: 1 }
                        }}
                      >
                        Learn More
                      </Button>
                    </Stack>
                  </motion.div>
                </motion.div>
              </Box>

              {/* Right Visual */}
              <Box
                sx={{ width: { xs: "100%", md: "48%" }, display: "flex", justifyContent: { xs: "center", md: "flex-end" }, position: "relative", mt: { xs: 6, md: 0 } }}
              >
                <motion.div
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ width: "100%" }}
                >
                  <Box sx={{
                    width: "100%",
                    height: "500px",
                    // Fix for Spline canvas to prevent layout shift or overflow
                    '& canvas': {
                      width: '100% !important',
                      height: '100% !important',
                      outline: 'none'
                    }
                  }}>
                    <Spline
                      scene="https://prod.spline.design/ZO4T2ORVXMtwxBvh/scene.splinecode"
                    />
                  </Box>
                </motion.div>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
