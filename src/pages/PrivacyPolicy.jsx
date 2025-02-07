import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Last Updated: {new Date().toLocaleDateString()}
      </Typography>

      {/* Introduction */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">1. Introduction</Typography>
        <Typography variant="body1">
          We respect your privacy and are committed to being transparent about
          how our AI-powered application AdhiCrat AI operates. This Privacy Policy 
          explains how we handle user data.
        </Typography>
      </Box>

      {/* No Data Collection */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">2. No Data Collection</Typography>
        <Typography variant="body1">
          Our App does not collect, store, or share any personal data. When you use 
          Google Authentication, it is only for verifying your identity during login, 
          and we do not retain or process your Google account information.
        </Typography>
      </Box>

      {/* Google Authentication */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">3. Google Authentication</Typography>
        <Typography variant="body1">
          Our App uses Google Authentication solely for user login purposes. We do 
          not store your Google credentials, profile data, or any other personal 
          information. Authentication is handled securely by Google in accordance with 
          their <Link href="https://policies.google.com/privacy" color="primary">
            Privacy Policy
          </Link>.
        </Typography>
      </Box>

      {/* AI-Generated Content */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">4. AI-Generated Content</Typography>
        <Typography variant="body1">
          Our AI generates responses based on user input in real time. These responses 
          are not stored or linked to any user. You are responsible for how you use 
          AI-generated content.
        </Typography>
      </Box>

      {/* Security */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">5. Security</Typography>
        <Typography variant="body1">
          Although we do not store data, we take security seriously. We rely on 
          Google's secure authentication methods to protect access to the App.
        </Typography>
      </Box>

      {/* Changes to Privacy Policy */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">6. Changes to This Policy</Typography>
        <Typography variant="body1">
          We may update this Privacy Policy if necessary. Any changes will be 
          reflected on this page, and continued use of the App after modifications 
          constitutes acceptance of the revised policy.
        </Typography>
      </Box>

      {/* Contact Information */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">7. Contact Us</Typography>
        <Typography variant="body1">
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <Link href="mailto:heynikhil07@gmail." color="primary">
            heynikhil07@gmail.
          </Link>.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
