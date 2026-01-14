import React, { useRef, useEffect, useState } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FaqItem {
  question: string;
  answer: string;
}

const faqDataFile: FaqItem[] = [
  {
    "question": "Setup Process?",
    "answer": "Initial setup is quick and user-friendly, allowing immediate use."
  },
  {
    "question": "Subscription Costs?",
    "answer": "Various pricing plans are available to suit different budget needs."
  },
  {
    "question": "User Support?",
    "answer": "24/7 customer support is available via email, chat, and phone."
  },
  {
    "question": "Customization Options?",
    "answer": "Fully customizable to match your brand's style and preferences."
  },
  {
    "question": "Refund Policy?",
    "answer": "Full refunds provided within 30 days if not satisfied."
  },
  {
    "question": "Upgrade Options?",
    "answer": "Easy upgrades available for additional features and capabilities."
  }
];

const Faq: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFaqs(faqDataFile);
  }, []);

  useEffect(() => {
    if (faqs.length > 0) {
      const ctx = gsap.context(() => {
        // Initial state
        gsap.set(headerRef.current?.children || [], {
          y: 40,
          opacity: 0,
        });

        gsap.set(".faq-item", {
          y: 60,
          opacity: 0,
        });

        // Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(headerRef.current?.children || [], {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
        })
          .to(".faq-item", {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 1,
            ease: "power4.out",
          }, "-=0.6");
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [faqs]);

  return (
    <Box
      id="faq"
      component="section"
      ref={sectionRef}
      sx={{
        py: { xs: 6, md: 10 },
        bgcolor: 'transparent',
        color: '#ffffff',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Container maxWidth="lg">
        {/* Title Section */}
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: { xs: 6, md: 12 } }}>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 500,
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 2,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#ffffff',
            }}
          >
            Explore Our FAQs
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: { xs: '1.1rem', md: '1.2rem' },
              lineHeight: 1.6,
              maxWidth: 580,
              mx: 'auto',
              mb: 4
            }}
          >
            Find quick answers to commonly asked questions about Neutra. Have a question not listed?
          </Typography>


        </Box>

        {/* FAQ Grid */}
        <Grid container spacing={6} className="faq-grid">
          {faqs.map((faq, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} component="div" key={index} className="faq-item">
              <Box sx={{ height: '100%' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 400,
                    fontSize: { xs: '1.3rem', md: '1.2rem' },
                    mb: 2.5,
                    color: '#ffffff',
                  }}
                >
                  {faq.question}
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    fontWeight: 400
                  }}
                >
                  {faq.answer}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Faq;
