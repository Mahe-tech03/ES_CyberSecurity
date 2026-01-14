import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import RocketOutlinedIcon from '@mui/icons-material/RocketOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function ESContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mainPaperRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightFormRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate Top 3 Cards
      gsap.fromTo(
        (cardsRef.current as HTMLElement).children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
        }
      );

      // 2. Main Paper Scale/Fade
      gsap.fromTo(
        mainPaperRef.current,
        { scale: 0.98, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mainPaperRef.current,
            start: "top 80%",
          },
        }
      );

      // 3. Left Content Slide
      gsap.fromTo(
        leftContentRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mainPaperRef.current,
            start: "top 75%",
          },
        }
      );

      // 4. Form Slide
      gsap.fromTo(
        rightFormRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mainPaperRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box ref={containerRef} sx={{ bgcolor: "#fff", minHeight: "100vh", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        
        {/* --- TOP SECTION: 3 CARDS --- */}
        <Box 
          ref={cardsRef}
          sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", md: "row" }, 
            gap: { xs: 2.5, md: 3 }, 
            mb: { xs: 8, md: 12 } 
          }}
        >
          {/* Card 1 */}
          <Box sx={{ flex: 1 }}>
            <InfoCard 
              icon={<ChatBubbleOutlineIcon sx={{ fontSize: 26 }} />}
              title="Message us"
              description="Message us using our online chat system for quick and efficient support."
              footer="info@ethicsecur.com"
            />
          </Box>
          
          {/* Card 2 */}
          <Box sx={{ flex: 1 }}>
            <InfoCard 
              icon={<CallOutlinedIcon sx={{ fontSize: 26 }} />}
              title="Call us"
              description="Let's have a chat – there's nothing quite like talking to another person."
              footer="+91 755 0028 487"
            />
          </Box>
          
          {/* Card 3 */}
          <Box sx={{ flex: 1 }}>
            <InfoCard 
              icon={<LocationOnOutlinedIcon sx={{ fontSize: 26 }} />}
              title="Address"
              description="We'd be delighted to welcome you to our Head Office."
              footer="RMZ Millenia, Chennai, India"
            />
          </Box>
        </Box>

        {/* --- BOTTOM SECTION: MAIN CONTACT CARD --- */}
        <Paper
          ref={mainPaperRef}
          elevation={0}
          sx={{
            borderRadius: { xs: "24px", md: "40px" },
            border: "4px solid #F2F4F7",
            overflow: "hidden", 
            p: { xs: 3, sm: 4, md: 8 }, 
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.02)",
          }}
        >
          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 5, md: 6, lg: 10 } 
            }}
          >
            {/* LEFT SIDE: Text Content */}
            <Box ref={leftContentRef} sx={{ flex: { md: "0 0 42%" }, maxWidth: { md: "42%" } }}>
              <Box sx={{ mb: { xs: 2, md: 3 } }}>
                <RocketOutlinedIcon sx={{ fontSize: { xs: 32, md: 36 }, color: "#1D2939" }} />
              </Box>

              <Typography variant="h3" fontWeight={600} sx={{ mb: 2, fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem"}, lineHeight: 1.3, letterSpacing: "-0.02em", color: "#101828" }}>
                Ready to Level Up? Join Us and Take the Next Step!
              </Typography>

              <Typography variant="body1" sx={{ color: "#667085", mb: 4, lineHeight: 1.6, fontSize: { xs: "0.95rem", md: "1rem" } }}>
                With industry expertise and a passionate team, we’re here to
                drive your brand’s digital transformation to the next level!
              </Typography>

              <Box sx={{ mb: 5, display: "flex", flexWrap: "wrap", gap: 3 }}>
                 <FeatureText>Secure Infrastructure</FeatureText>
                 <FeatureText>Process Optimization</FeatureText>
                 <FeatureText>Integrated Security Solution</FeatureText>
              </Box>

              <Stack direction="row" spacing={1.5}>
                <SocialIconBtn><FacebookIcon sx={{ fontSize: 20 }} /></SocialIconBtn>
                <SocialIconBtn><InstagramIcon sx={{ fontSize: 20 }} /></SocialIconBtn>
                <SocialIconBtn><LinkedInIcon sx={{ fontSize: 20 }} /></SocialIconBtn>
                <SocialIconBtn><XIcon sx={{ fontSize: 18 }} /></SocialIconBtn>
              </Stack>
            </Box>

            {/* RIGHT SIDE: Form */}
            <Box ref={rightFormRef} sx={{ flex: 1 }}>
              <form noValidate autoComplete="off">
                <Stack spacing={2.5}>
                  
                  {/* Name */}
                  <Box>
                    <CustomLabel>Name</CustomLabel>
                    <StyledTextField placeholder="Jane Smith" fullWidth />
                  </Box>

                  {/* Email */}
                  <Box>
                    <CustomLabel>Email</CustomLabel>
                    <StyledTextField placeholder="jane@framer.com" fullWidth />
                  </Box>

                  {/* Phone */}
                  <Box>
                    <CustomLabel>Phone</CustomLabel>
                    <StyledTextField placeholder="ex: +91 987 6543 210" fullWidth />
                  </Box>

                  {/* Location */}
                  <Box>
                    <CustomLabel>Location</CustomLabel>
                    <Select
                      fullWidth
                      displayEmpty
                      defaultValue=""
                      sx={{
                        bgcolor: "#F2F4F7",
                        borderRadius: "8px",
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "1px solid #1A1A1A" },
                        fontSize: "0.95rem",
                        color: "#101828",
                        height: "56px"
                      }}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value="" disabled sx={{ color: "#98A2B3" }}>
                        Select...
                      </MenuItem>
                      <MenuItem value="Chennai">Chennai</MenuItem>
                      <MenuItem value="Bangalore">Bangalore</MenuItem>
                      <MenuItem value="Mumbai">Mumbai</MenuItem>
                    </Select>
                  </Box>

                  {/* Newsletter Checkbox */}
                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          sx={{
                            color: '#D0D5DD',
                            '&.Mui-checked': { color: '#1A1A1A' },
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2" color="#667085" sx={{ fontSize: "0.875rem" }}>
                          Subscribe to Newsletter
                        </Typography>
                      }
                      sx={{ ml: 0 }}
                    />
                  </Box>

                  {/* Submit Button */}
                  <Box>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        bgcolor: "#1A1A1A",
                        color: "#fff",
                        py: 1.8,
                        borderRadius: "8px",
                        textTransform: "none",
                        fontSize: "1rem",
                        fontWeight: 600,
                        boxShadow: "none",
                        "&:hover": {
                          bgcolor: "#000",
                          boxShadow: "none"
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                  
                </Stack>
              </form>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

// --- SUBCOMPONENTS ---

function InfoCard({ icon, title, description, footer }: { icon: React.ReactNode, title: string, description: string, footer: string }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 3.5 },
        borderRadius: { xs: "16px", md: "20px" },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "4px solid #F2F4F7",
        boxShadow: "0px 2px 4px rgba(16, 24, 40, 0.02)",
      }}
    >
      <Box sx={{ mb: 2, color: "#344054" }}>{icon}</Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 1, fontSize: { xs: "1rem", md: "1.05rem" }, color: "#101828" }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: "#667085", mb: 3, lineHeight: 1.5, flexGrow: 1, fontSize: { xs: "0.875rem", md: "0.875rem" } }}>
        {description}
      </Typography>
      <Divider sx={{ mb: 2.5, borderColor: "#F2F4F7" }} />
      <Typography variant="subtitle2" fontWeight={700} color="#1d2939" sx={{ fontSize: { xs: "0.875rem", md: "0.875rem" } }}>
        {footer}
      </Typography>
    </Paper>
  );
}

const CustomLabel = ({ children }: { children: React.ReactNode }) => (
  <InputLabel sx={{ fontSize: '0.8125rem', fontWeight: 500, color: '#344054', mb: 0.75 }}>
    {children}
  </InputLabel>
);

const FeatureText = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="body2" fontWeight={600} color="#344054" sx={{ fontSize: "0.9rem" }}>
    {children}
  </Typography>
);

const StyledTextField = (props: any) => (
  <TextField
    {...props}
    variant="outlined"
    sx={{
      bgcolor: '#F2F4F7',
      borderRadius: '8px',
      '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: 'transparent' },
        '&:hover fieldset': { borderColor: 'transparent' },
        '&.Mui-focused fieldset': { borderColor: '#1A1A1A', border: '1px solid' },
        height: '56px'
      },
      '& input': {
        height: '100%',
        boxSizing: 'border-box',
        fontSize: '0.95rem',
        color: '#101828',
        '&::placeholder': {
            color: '#98A2B3',
            opacity: 1
        }
      }
    }}
  />
);

const SocialIconBtn = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      border: "1px solid #D0D5DD",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#344054",
      cursor: "pointer",
      transition: "all 0.2s",
      "&:hover": { bgcolor: "#F9FAFB", borderColor: "#1A1A1A", color: "#1A1A1A" }
    }}
  >
    {children}
  </Box>
);


