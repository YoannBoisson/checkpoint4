import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function Homepage() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Grid
        container
        spacing={2}
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "99%",
        }}
      >
        <Grid item xs={12} md={10}>
          <Paper elevation={3} sx={{ padding: 2, height: 100 }}>
            <Typography variant="h3" sx={{ fontFamily: "Leckerli One" }}>
              Combien pour aujourd'hui ?
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={2}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              height: 100,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: "Montserrat" }}
            >
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Inscription
              </Link>
            </Typography>
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontFamily: "Montserrat" }}
              >
                Connexion
              </Typography>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <img
              src="https://www.aafoodservice.com/wp-content/themes/custom-theme/img/slider-v1704.jpg"
              alt="home"
              height="100%"
              width="100%"
            />
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="body1" sx={{ fontFamily: "Montserrat" }}>
              Vous vous êtes toujours demandé combien vous devez consommer de
              calories sur une journée ?<br />
              Avec l'application "Combien pour aujourd'hui ?" vous aurez la
              réponse à tout.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
