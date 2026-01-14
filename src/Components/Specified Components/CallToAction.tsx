import { Box, Typography, Button, Container } from "@mui/material";

const ctaBgUrl = "https://framerusercontent.com/images/7v57BBeB1Jiv01VSQK14meVxao.png?width=1000";

export default function CallToAction() {
    return (
        <Box sx={{ py: { xs: 6, md: 10 }, width: "100%", display: "flex", justifyContent: "center" }}>
            <Container maxWidth={false} sx={{ maxWidth: "1250px", px: { xs: 2, md: 4 } }}>
                <Box
                    sx={{
                        borderRadius: "32px",
                        overflow: "hidden",
                        position: "relative",
                        background: "rgba(30, 30, 30, 0.6)",
                        backdropFilter: "blur(24px) saturate(180%)",
                        WebkitBackdropFilter: "blur(24px) saturate(180%)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
                        minHeight: "400px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {/* Visual Asset on Right */}
                    <Box
                        component="img"
                        src={ctaBgUrl}
                        alt="CTA Visual"
                        sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: { xs: "100%", md: "60%" },
                            height: "100%",
                            objectFit: "cover",
                            zIndex: 0,
                            maskImage: "linear-gradient(to right, transparent, black 40%)", // Fade in the image from left
                            WebkitMaskImage: "linear-gradient(to right, transparent, black 40%)",
                            opacity: { xs: 0.6, md: 1 } // Lower opacity on mobile for readability
                        }}
                    />

                    {/* Text Overlay */}
                    <Box sx={{ position: "relative", zIndex: 1, p: { xs: 4, sm: 6, md: 8 }, maxWidth: "600px" }}>
                        <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3.5rem" }, mb: 2, lineHeight: 1.1, fontWeight: 600 }}>
                            Start Your Design <br /> <Box component="span" sx={{ color: "primary.main" }}>Journey</Box> Today
                        </Typography>
                        <Typography variant="body1" sx={{ color: "text.secondary", fontSize: { xs: "1rem", md: "1.1rem" }, mb: 4, maxWidth: "450px" }}>
                            Sign up now and experience the power of AI-driven design without any commitment.
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: "primary.main",
                                color: "#fff",
                                borderRadius: "12px",
                                px: { xs: 3, md: 4 },
                                py: { xs: 1.2, md: 1.5 },
                                textTransform: "none",
                                fontSize: { xs: "0.95rem", md: "1rem" },
                                boxShadow: "0 4px 20px rgba(145, 75, 241, 0.4)",
                                "&:hover": {
                                    bgcolor: "#7A3CC1",
                                    transform: "translateY(-2px)",
                                }
                            }}
                        >
                            Remix Template
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
