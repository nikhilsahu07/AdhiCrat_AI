import React from "react";
import { Box, Container, Typography, Link, Divider } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Divider sx={{ my: 2 }} />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "1.5rem",
        }}
      >
        <Typography variant="body1" sx={{ fontSize: ".8rem" }}>
          © {new Date().getFullYear()} Adhicrat AI. All rights reserved.
        </Typography>

        {/* Links Section */}
        <Box>
          <Link
            href="/terms-of-services"
            color="inherit"
            sx={{ mx: 1, fontSize: ".8rem" }}
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy-policy"
            color="inherit"
            sx={{ mx: 1, fontSize: ".8rem" }}
          >
            Privacy Policy
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
