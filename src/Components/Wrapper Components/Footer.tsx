import React, { useRef, useLayoutEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import logo from "../../assets/logo.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the content strings/sections instead of the whole card
      gsap.from(".footer-content", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1, // Stagger effect for items
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    /* OUTER WRAPPER */
    <Box sx={{ bgcolor: "transparent", pb: 4, pt: 2, position: "relative", zIndex: 1 }}>
      <Container maxWidth={false} sx={{ maxWidth: "1250px", px: { xs: 2, md: 4 } }}>
        {/* MAIN CARD */}
        <Box
          ref={footerRef}
          sx={{
            background: "rgba(30, 30, 30, 0.6)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
            borderRadius: "32px",
            position: "relative",
            overflow: "hidden",
            color: "#ffffff",
            pt: { xs: 4, md: 6 },
            pb: { xs: 4, md: 6 },
            px: { xs: 3, md: 6 },
          }}
        >
          <Container maxWidth={false} disableGutters>
            <Grid container spacing={6}>
              {/* LEFT SIDE: LOGO & DESC */}
              <Grid size={{ xs: 12, md: 6 }} className="footer-content">
                <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                  {/* Logo Image */}
                  <Box
                    component="img"
                    src={logo}
                    alt="EthicSecur Logo"
                    sx={{
                      width: 44,
                      height: 44,
                      mr: 2,
                      objectFit: "contain"
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      fontSize: "1.5rem",
                      color: "#ffffff",
                      letterSpacing: '-0.02em',
                      lineHeight: 1
                    }}
                  >
                    EthicSecur
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    maxWidth: "480px",
                    fontSize: "1.05rem",
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 400,
                    mb: { xs: 4, md: 0 }
                  }}
                >
                  Get in touch to learn how we design and deliver meaningful digital
                  experiences that help you reach, engage, and convert your target
                  audience effectively.
                </Typography>
              </Grid>

              {/* RIGHT SIDE: LINKS */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={4} justifyContent={{ md: "flex-end" }}>
                  {/* COMPANY COLUMN */}
                  <Grid size={{ xs: 6, sm: 4 }} className="footer-content">
                    <Typography sx={{ color: "rgba(255,255,255,0.4)", mb: 3, fontWeight: 500, fontSize: "0.9rem" }}>
                      Company
                    </Typography>
                    {[
                      { label: "Elevate Suite", href: "/" },
                      { label: "Beyond Brand", href: "/about" },
                      { label: "Portfolio", href: "/portfolio" },
                      { label: "Articles", href: "/articles" },
                      { label: "Certificate", href: "#certificate" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        underline="none"
                        sx={{
                          display: "block",
                          color: "#ffffff",
                          mb: 1.5,
                          fontSize: "0.95rem",
                          fontWeight: 400,
                          transition: "color 0.2s",
                          "&:hover": { color: "#FF620A" },
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </Grid>

                  {/* LEGAL COLUMN */}
                  <Grid size={{ xs: 6, sm: 4 }} className="footer-content">
                    <Typography sx={{ color: "rgba(255,255,255,0.4)", mb: 3, fontWeight: 500, fontSize: "0.9rem" }}>
                      Legal
                    </Typography>
                    {[
                      "Privacy Policy",
                      "Licensing",
                      "Terms of Use",
                    ].map((text) => (
                      <Link
                        key={text}
                        href="#"
                        underline="none"
                        sx={{
                          display: "block",
                          color: "#ffffff",
                          mb: 1.5,
                          fontSize: "0.95rem",
                          fontWeight: 400,
                          transition: "color 0.2s",
                          "&:hover": { color: "#FF620A" },
                        }}
                      >
                        {text}
                      </Link>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* GIANT BACKGROUND TEXT */}
            <Typography
              className="footer-giant-text"
              sx={{
                textAlign: "center",
                fontWeight: 700,
                fontSize: { xs: "15vw", md: "12rem" },
                lineHeight: 0.8,
                mt: { xs: 8, md: 0 },
                mb: { xs: -4, md: -3 },
                background: "linear-gradient(180deg, #8A2BE2 0%, #4B0082 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                userSelect: "none",
                letterSpacing: "-0.04em",
                pointerEvents: 'none',
                width: "100%",
                display: "block"
              }}
            >
              EthicSecur
            </Typography>

            {/* FOOTER BOTTOM */}
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                borderTop: "1px solid rgba(255,255,255,0.1)",
                pt: 4,
                mt: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
                gap: 2
              }}
            >
              <Typography sx={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.85rem",
              }}>
                © Copyright < Box component="span" sx={{ color: "#ffffff", fontWeight: 500 }}>ES EthicSecur SofTec</Box>. All Rights Reserved
              </Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  size="small"
                  sx={{
                    color: "rgba(255,255,255,0.6)",
                    "&:hover": { color: "#FF620A", bgcolor: 'rgba(255,255,255,0.05)' }
                  }}
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: "rgba(255,255,255,0.6)",
                    "&:hover": { color: "#FF620A", bgcolor: 'rgba(255,255,255,0.05)' }
                  }}
                >
                  <SportsBasketballIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: "rgba(255,255,255,0.6)",
                    "&:hover": { color: "#FF620A", bgcolor: 'rgba(255,255,255,0.05)' }
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;