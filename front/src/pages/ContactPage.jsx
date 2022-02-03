import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function ContactPage() {
  return (
    <Box>
      <h1>Contact</h1>
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <TextField
          id="standard-basic"
          label="Nom d'utilisateur"
          variant="standard"
        />
        <TextField id="standard-basic" label="Email" variant="standard" />
        <TextField
          id="standard-multiline-static"
          label="Message"
          multiline
          rows={4}
          variant="standard"
        />
      </Box>
    </Box>
  );
}
