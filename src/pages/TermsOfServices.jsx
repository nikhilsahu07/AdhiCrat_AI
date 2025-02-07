import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";

const TermsOfService = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Terms of Service
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Last Updated: {new Date().toLocaleDateString()}
      </Typography>

      {/* Introduction */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">1. Acceptance of Terms</Typography>
        <Typography variant="body1">
          By using our AI-powered application AdhiCrat AI, you agree to comply with
          and be bound by these Terms of Service. If you do not agree, please
          discontinue use immediately.
        </Typography>
      </Box>

      {/* Google Authentication */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">2. Google Authentication</Typography>
        <Typography variant="body1">
          Our App uses Google Authentication to verify user identities. By signing in
          with Google, you agree to allow us to access your basic profile information,
          including your email and name, as permitted by Google's Privacy Policy. We do
          not store or share your login credentials.
        </Typography>
      </Box>

      {/* AI-Generated Content */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">3. AI-Generated Content</Typography>
        <Typography variant="body1">
          The App utilizes artificial intelligence to generate responses, insights,
          and recommendations. While we strive for accuracy, AI-generated content may
          contain errors or biases. You acknowledge that you use such content at your
          own discretion and should verify any critical information before relying on it.
        </Typography>
      </Box>

      {/* Data Collection & Privacy */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">4. Data Collection & Privacy</Typography>
        <Typography variant="body1">
          We respect your privacy and handle your data per our{" "}
          <Link href="/privacy-policy" color="primary">
            Privacy Policy
          </Link>
          . Data collected through Google Authentication is used solely for improving
          user experience and authentication purposes.
        </Typography>
      </Box>

      {/* User Responsibilities */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">5. User Responsibilities</Typography>
        <Typography variant="body1">
          You agree not to misuse the App, including but not limited to:
        </Typography>
        <ul>
          <li>Engaging in unauthorized access or tampering with the system.</li>
          <li>Generating or sharing harmful, misleading, or illegal content.</li>
          <li>Using AI-generated content in violation of applicable laws.</li>
        </ul>
      </Box>

      {/* Limitation of Liability */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">6. Limitation of Liability</Typography>
        <Typography variant="body1">
          We provide the App on an "as-is" basis without warranties of any kind.
          We are not responsible for any losses, damages, or legal issues arising
          from the use of AI-generated content.
        </Typography>
      </Box>

      {/* Changes to Terms */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">7. Changes to Terms</Typography>
        <Typography variant="body1">
          We may update these Terms from time to time. Continued use of the App
          after modifications constitute acceptance of the revised Terms.
        </Typography>
      </Box>

      {/* Contact Information */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">8. Contact Us</Typography>
        <Typography variant="body1">
          If you have any questions about these Terms, please contact us at{" "}
          <Link href="mailto:heynikhil07@gmail.com" color="primary">
            heynikhil07@gmail.com
          </Link>
          .
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsOfService;
