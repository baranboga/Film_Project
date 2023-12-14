import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#333",
        color: "white",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        py: 2,
        textAlign: "center",
        zIndex: 1000,
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <IconButton
            component={Link}
            href="https://github.com/your-github-username"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="https://twitter.com/your-twitter-username"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="https://www.linkedin.com/in/your-linkedin-username"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <LinkedInIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="inherit" sx={{ mt: 1 }}>
          © {new Date().getFullYear()} Your Company Name
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
