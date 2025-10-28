"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import BedtimeIcon from "@mui/icons-material/Bedtime";

interface FooterProps {
  thema: boolean;
  setThema: React.Dispatch<React.SetStateAction<boolean>>;
}

const Footer: React.FC<FooterProps> = ({ thema}) => {

  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 4,
        px: 2,
        backgroundColor: thema ? "#fff" : "#114892",
        color: thema ? "black" : "#fff",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "center",
        alignItems: "center",
        borderTop: thema ? "1px solid #ccc" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <Typography variant="body1" className="mb-2 sm:mb-0 ">
        &copy; {new Date().getFullYear()} Mehman Shamilov. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
