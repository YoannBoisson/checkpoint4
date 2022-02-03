import React, {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


export default function ContactPage() {

const [to, setTo] = useState('')
const [subject, setSubject] = useState('')
const [html, setHTML] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3001/mailto", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        to,
        subject,
        html,
      }),
    }).then((result) => {
      setTo('');
      setHTML('');
      setSubject('');
      console.log(result);
    });
  };
  
    const handleChangeTo = (event) => {
      event.preventDefault();
      setTo(event.target.value);
    };
      const handleChangeSubject = (event) => {
        event.preventDefault();
        setSubject(event.target.value);
      };
        const handleChangeMessage = (event) => {
          event.preventDefault();
          setHTML(event.target.value);
        };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary" }}>
          <EmailIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Restons en contact
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Votre email"
            name="email"
            autoFocus
            value={to}
            onChange={handleChangeTo}
          />
          <TextField
            margin="normal"
            fullWidth
            name="sujet"
            label="Sujet"
            id="sujet"
            value={subject}
            onChange={handleChangeSubject}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={html}
            onChange={handleChangeMessage}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Envoyer
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
