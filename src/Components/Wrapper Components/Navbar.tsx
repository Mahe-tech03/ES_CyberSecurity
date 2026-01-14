// src/components/Navbar.tsx - Exact Interactive Navigation
import React, { useState, useEffect } from 'react';
import {
  Button,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Container,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import logo from '../../assets/logo.png';

import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock Body Scroll
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileOpen]);

  const navItems = [
    {
      label: 'Elevate Suite',
      href: '/',
      services: [
        { label: 'Digital Marketing', href: '/digital-marketing' },
        { label: 'UI UX Engineering', href: '/ui-ux' },
        { label: 'Cyber Security', href: '/cyber-security' },
        { label: 'Web Development', href: '/web-development' },
      ]
    },
    { label: 'Beyond Brand', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Articles', href: '/articles' },
    { label: 'Certificate', href: '#certificate' },
  ];

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [isTalkHovered, setIsTalkHovered] = useState(false);

  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2000, py: isScrolled ? 0.8 : 1.5, transition: 'padding 0.5s ease' }}>
      <Container maxWidth="lg">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          style={{
            width: isScrolled ? 'fit-content' : '100%',
            backgroundColor: isScrolled ? '#61727C' : 'transparent',
            borderRadius: isScrolled ? '10px' : '0px',
            border: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
            backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
            boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.1)' : 'none',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            padding: isScrolled ? '2px 4px' : '0px',
            whiteSpace: 'nowrap',
            position: 'relative',
            zIndex: 2001,
          }}
        >
          {/* Logo Section */}
          <Box
            layout="position"
            component={motion.div}
            sx={{
              backgroundColor: isScrolled ? '#FFFFFF' : 'transparent',
              borderRadius: isScrolled ? '10px' : '0px',
              px: isScrolled ? 1 : 0,
              py: isScrolled ? 0.5 : 0,
              mr: 0.5,
              display: 'flex',
              alignItems: 'center',
              height: isScrolled ? '45px' : 'auto',
              flexShrink: 0,
            }}
          >
            <AnimatePresence mode="popLayout">
              {!isScrolled ? (
                <motion.div
                  key="full-logo"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Box component="a" href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <img src={logo} alt="EthicSecur" style={{ height: '28px', width: 'auto', objectFit: 'contain' }} />
                  </Box>
                </motion.div>
              ) : (
                <motion.div
                  key="pill-logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Box component="a" href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <img src={logo} alt="ES" style={{ height: '24px', width: 'auto', objectFit: 'contain' }} />
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          {/* Navigation Links - Desktop */}
          {!isMobile && (
            <Box
              component={motion.div}
              layout="position"
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                mx: isScrolled ? 0 : 'auto',
                mr: 'auto',
                backgroundColor: isScrolled ? '#000000' : 'transparent',
                borderRadius: isScrolled ? '10px' : '10px',
                px: isScrolled ? 1 : 0,
                py: isScrolled ? 0.8 : 0,
                height: isScrolled ? '45px' : 'auto',
                transition: 'background-color 0.3s ease',
                flexShrink: 0,
              }}
            >
              {navItems.map((item) => (
                <Box
                  key={item.label}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  sx={{ position: 'relative' }}
                >
                  <Button
                    href={item.href}
                    disableRipple
                    sx={{
                      color: isScrolled ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.95rem',
                      fontWeight: 400,
                      textTransform: 'none',
                      px: 2,
                      minWidth: 'auto',
                      '&:hover': { backgroundColor: 'transparent' },
                      '& .MuiTouchRipple-root': { display: 'none' },
                    }}
                  >
                    {item.label}
                  </Button>

                  {/* Dot Animation */}
                  <AnimatePresence>
                    {hoveredItem === item.label && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '3px',
                          height: '3px',
                          borderRadius: '50%',
                          backgroundColor: '#D2D2D2',
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.services && hoveredItem === item.label && (
                      <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        sx={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          minWidth: '220px',
                          bgcolor: '#111111',
                          borderRadius: '12px',
                          p: 1.5,
                          mt: 1,
                          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                          zIndex: 3000,
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        <Stack spacing={0.5}>
                          {item.services.map((service) => (
                            <Button
                              key={service.label}
                              href={service.href}
                              disableRipple
                              sx={{
                                color: 'rgba(255,255,255,0.8)',
                                textTransform: 'none',
                                justifyContent: 'flex-start',
                                fontSize: '0.9rem',
                                fontWeight: 400,
                                px: 2,
                                py: 1,
                                borderRadius: '8px',
                                width: '100%',
                                '&:hover': {
                                  bgcolor: 'transparent',
                                },
                              }}
                            >
                              {service.label}
                            </Button>
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </AnimatePresence>
                </Box>
              ))}
            </Box>
          )}

          {/* Let's Talk Button */}
          <Box
            component={motion.div}
            layout="position"
            sx={{
              ml: isMobile ? 'auto' : 0.5,
              mr: isMobile ? 1 : 0,
              flexShrink: 0
            }}
          >
            <Button
              variant="contained"
              href="/contact"
              disableRipple
              onMouseEnter={() => !isMobile && setIsTalkHovered(true)}
              onMouseLeave={() => setIsTalkHovered(false)}
              sx={{
                borderRadius: '10px',
                fontWeight: 400,
                fontSize: '0.85rem',
                px: 2,
                py: 1,
                height: isScrolled ? '45px' : 'auto',
                backgroundColor: isScrolled ? '#FFFFFF' : '#FFFFFF',
                color: isScrolled ? '#0A0A0A' : '#000000',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: isScrolled ? '#FFFFFF' : '#0A0A0A',
                  boxShadow: 'none',
                  opacity: 1,
                },
              }}
            >
              <Box sx={{ height: '24px', overflow: 'hidden', position: 'relative' }}>
                <motion.div
                  animate={{ y: isTalkHovered ? -24 : 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Box sx={{ height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Let's Talk
                  </Box>
                  <Box sx={{ height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Let's Talk
                  </Box>
                </motion.div>
              </Box>
            </Button>
          </Box>

          {/* Mobile Menu Icon */}
          {isMobile && (
            <Box sx={{ ml: 0 }}>
              <IconButton onClick={handleDrawerToggle} sx={{ color: isScrolled || mobileOpen ? '#FFFFFF' : '#FFFFFF' }}>
                {mobileOpen ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <MenuIcon />
                )}
              </IconButton>
            </Box>
          )}
        </motion.div>
      </Container>

      {/* Mobile Menu Dropdown and Backdrop */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <>
            {/* Backdrop */}
            <Box
              key="backdrop"
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleDrawerToggle}
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(255,255,255,0.8)', // White blur backdrop
                backdropFilter: 'blur(10px)',
                zIndex: 1998,
              }}
            />

            {/* Menu Card */}
            <Box
              key="mobile-menu"
              component={motion.div}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              sx={{
                position: 'absolute',
                top: '80px',
                left: '16px',
                right: '16px',
                bgcolor: '#111111', // Dark Card
                borderRadius: '16px',
                p: 2,
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                zIndex: 1999,
              }}
            >
              <List sx={{ pt: 1, pb: 1 }}>
                {navItems.map((item) => (
                  <React.Fragment key={item.label}>
                    <ListItem disablePadding sx={{ mb: 1 }}>
                      <ListItemButton
                        component="a"
                        href={item.href}
                        onClick={handleDrawerToggle}
                        disableRipple
                        sx={{
                          borderRadius: '8px',
                          '&:hover': { bgcolor: 'transparent' }
                        }}
                      >
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            color: 'white',
                            fontWeight: 500,
                            fontSize: '1rem',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                    {item.services && (
                      <Box sx={{ pl: 2, mb: 1 }}>
                        {item.services.map((service) => (
                          <ListItem key={service.label} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                              component="a"
                              href={service.href}
                              onClick={handleDrawerToggle}
                              disableRipple
                              sx={{
                                borderRadius: '8px',
                                py: 0.5,
                                '&:hover': { bgcolor: 'transparent' }
                              }}
                            >
                              <ListItemText
                                primary={service.label}
                                primaryTypographyProps={{
                                  color: 'rgba(255,255,255,0.6)',
                                  fontWeight: 400,
                                  fontSize: '0.9rem',
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </Box>
                    )}
                  </React.Fragment>
                ))}
                {/* Add FAQ and Certificate if not in list */}
                {[
                  { label: 'FAQ', href: '#faq' },
                ].map((item) => (
                  <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                      component="a"
                      href={item.href}
                      onClick={handleDrawerToggle}
                      disableRipple
                      sx={{ borderRadius: '8px', '&:hover': { bgcolor: 'transparent' } }}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ color: 'white', fontWeight: 500, fontSize: '1rem' }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Navbar;