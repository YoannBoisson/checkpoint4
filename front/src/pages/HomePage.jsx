import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import PersonIcon from "@mui/icons-material/Person";

export default function Homepage() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 80, right: 30 }}
      >
        <Link to="/user" style={{textDecoration: 'none', color: 'white'}}>
          <PersonIcon color="white"/>
        </Link>
      </Fab>
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
          <div className="title">
            <Typography variant="h3" sx={{ fontFamily: "Leckerli One" }}>
              Combien pour aujourd'hui ?
            </Typography>
          </div>
        </Grid>
        <Grid item xs={10}>
          <Paper elevation={3} sx={{ padding: 2, minHeight: 100 }}>
            <Typography variant="body1" sx={{ fontFamily: "Montserrat" }}>
              Vous vous êtes toujours demandé combien vous devez consommer de
              calories sur une journée ?<br />
              Avec l'application "Combien pour aujourd'hui ?" vous aurez la
              réponse à tout.
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
              justifyContent: "center",
              flexDirection: "column",
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
      </Grid>
    </Box>
  );
}
