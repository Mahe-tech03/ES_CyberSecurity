import { Box, Typography, Stack, Grid, Container } from "@mui/material";
import { keyframes } from "@mui/material/styles";


// Icon Assets
// Icon Assets - Cybersecurity Tools
// Note: We use the default colored/black versions because the CSS filter 'invert(1)' 
// will turn them WHITE. Using white icons initially would make them black (invisible).
const icons = {
    nmap: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nmap.svg",
    nikto: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nikto.svg",
    wireshark: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/wireshark.svg",
    burpsuite: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/burpsuite.svg",
    johntheripper: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/johntheripper.svg",
    nessus: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/tenable.svg",
    metasploit: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/metasploit.svg",
};


// Distributed columns for visual variety
const baseCol1 = [icons.nmap, icons.burpsuite, icons.metasploit];
const baseCol2 = [icons.nikto, icons.nessus, icons.wireshark];
const baseCol3 = [icons.johntheripper, icons.nmap, icons.burpsuite];

// Duplicated for seamless loop
const col1 = [...baseCol1, ...baseCol1];
const col2 = [...baseCol2, ...baseCol2];
const col3 = [...baseCol3, ...baseCol3];

const iconStyle = {
    width: "56px",
    height: "56px",
    objectFit: "contain",
    filter: "brightness(0) invert(1)",
    opacity: 0.9,

};

// Keyframes
const scrollUp = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
`;

const scrollDown = keyframes`
  0% { transform: translateY(-50%); }
  100% { transform: translateY(0); }
`;

export default function Integration() {
    return (
        <Box sx={{ py: { xs: 6, md: 10 }, width: "100%", display: "flex", justifyContent: "center" }}>
            <Container maxWidth={false} sx={{ maxWidth: "1250px", px: { xs: 2, md: 4 } }}>
                <Box
                    sx={{
                        background: "rgba(30, 30, 30, 0.6)",
                        backdropFilter: "blur(24px) saturate(180%)",
                        WebkitBackdropFilter: "blur(24px) saturate(180%)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
                        borderRadius: "32px",
                        position: "relative",
                        overflow: "hidden",
                        px: { xs: 3, md: 8, lg: 10 },
                        py: { xs: 5, md: 8 },
                        minHeight: "400px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Grid container spacing={4} alignItems="center" justifyContent="space-between">
                        {/* Left Content */}
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Box sx={{ maxWidth: "450px", textAlign: { xs: "center", md: "left" }, mx: { xs: "auto", md: 0 } }}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontFamily: "'Outfit', sans-serif",
                                        fontSize: { xs: "2rem", md: "3rem", lg: "4rem" },
                                        lineHeight: 1.1,
                                        mb: 2,
                                        letterSpacing: "-0.03em",
                                        fontWeight: 600,
                                        color: "#fff",
                                        width:"560px"
                                    }}
                                >
                                    Security Analysis Platform <br />
                                    <Box component="span" sx={{ color: "#9D5BF3" }}>Integration</Box>
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontFamily: "'Manrope', sans-serif",
                                        color: "#999999",
                                        fontSize: { xs: "1rem", md: "1.125rem" },
                                        lineHeight: 1.6,
                                        letterSpacing: "-0.01em"
                                    }}
                                >
                                    NajmAI offers seamless integration with a variety of popular design and project management tools, ensuring a smooth and efficient workflow.
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Right Visual - Animated Columns */}
                        <Grid size={{ xs: 12, md: 7 }} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" }, mt: { xs: 4, md: 0 } }}>
                            <Box
                                sx={{
                                    position: "relative",
                                    height: "380px",
                                    width: "100%",
                                    maxWidth: "600px", // Limit width to keep icons grouped
                                    overflow: "hidden",
                                    display: "flex",
                                    justifyContent: "center", // Center on mobile, spread via gap
                                    pl: { md: 19 }, // Push away from the left text on desktop
                                    gap: { xs: 3, sm: 6, md: 10 },
                                    maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                                    WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
                                }}
                            >
                                {/* Column 1 - Scroll Up */}
                                <Box sx={{ overflow: "hidden", height: "100%", width: "60px" }}>
                                    <Stack spacing={8} sx={{ animation: `${scrollUp} 6s linear infinite` }}>
                                        {col1.map((src, i) => (
                                            <Box component="img" key={`c1-${i}`} src={src} sx={iconStyle} />
                                        ))}
                                    </Stack>
                                </Box>

                                {/* Column 2 - Scroll Down (Slower) */}
                                <Box sx={{ overflow: "hidden", height: "100%", width: "60px" }}>
                                    <Stack spacing={8} sx={{ animation: `${scrollDown} 5s linear infinite` }}>
                                        {col2.map((src, i) => (
                                            <Box component="img" key={`c2-${i}`} src={src} sx={iconStyle} />
                                        ))}
                                    </Stack>
                                </Box>

                                {/* Column 3 - Scroll Up (Faster) */}
                                <Box sx={{ overflow: "hidden", height: "100%", width: "60px" }}>
                                    <Stack spacing={8} sx={{ animation: `${scrollUp} 7s linear infinite` }}>
                                        {col3.map((src, i) => (
                                            <Box component="img" key={`c3-${i}`} src={src} sx={iconStyle} />
                                        ))}
                                    </Stack>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
