import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Linked from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Linked color="inherit" href="https://localhost:3000/">
        Combien pour aujourd'hui ?
      </Linked>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [date_of_birth, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("");
  const [password, setPassword] = useState("");
  const [id_activity, setActivity] = useState("");
  const [activity, setActivityForm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [envoi, setEnvoi] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:3001/activity").then((res) => {
      setActivityForm(res.data);
      setIsLoading(false);
    });
  }, []);
  console.log(activity);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        date_of_birth,
        email,
        weight,
        height,
        sex,
        password,
        id_activity,
      }),
    }).then((result) => {
      
      setEnvoi(true);
      console.log(result);
    });
  };

  const handleChange = (event) => {
    setActivity(event.target.value);
  };

  const handleChangeUsername = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };
  const handleChangeSex = (event) => {
    event.preventDefault();
    if (event.target.value === "true") {
      setSex(true);
    } else setSex(false);
  };
  const handleChangeEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };
  const handleChangeWeight = (event) => {
    event.preventDefault();
    setWeight(parseInt(event.target.value));
  };
  const handleChangeHeight = (event) => {
    event.preventDefault();
    setHeight(parseInt(event.target.value));
  };
  const handleChangeDob = (event) => {
    event.preventDefault();
    setDob(event.target.value);
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
          <AssignmentIndIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inscription
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="Nom d'utilisateur"
                onChange={handleChangeUsername}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="dob"
                label="Date de naissance"
                name="Date de naissance"
                onChange={handleChangeDob}
              />
              {date_of_birth &&
              date_of_birth.length > 0 &&
              date_of_birth.length < 10 ? (
                <Typography variant="h7" color="red">Format JJ/MM/AAAA requis</Typography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} sx={{ textAlign: "center" }}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Sexe</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    onChange={handleChangeSex}
                    value={false}
                    control={<Radio />}
                    label={<FemaleIcon />}
                  />
                  <FormControlLabel
                    onChange={handleChangeSex}
                    value={true}
                    control={<Radio />}
                    label={<MaleIcon />}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="height"
                label="Taille"
                name="height"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">cm</InputAdornment>
                  ),
                }}
                onChange={handleChangeHeight}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="weight"
                label="Poids"
                name="weight"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">kg</InputAdornment>
                  ),
                }}
                onChange={handleChangeWeight}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl required sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-required-label">
                  Activité
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={id_activity}
                  label="Activité Physique*"
                  onChange={handleChange}
                >
                  {activity &&
                    activity.map((item) => (
                      <MenuItem value={item.id}>{item.level}</MenuItem>
                    ))}
                </Select>
                <Tooltip
                  title="Sédentaire, pas d’activité physique &brvbar; &brvbar;
                  Activité de faible intensité 1 à 3 fois par semaine &brvbar; &brvbar;
                  Personne active / Exercices d’intensité modérée 3 à 5 fois par semaine / Marche 2 à 5 km par jour / Fait entre 9400 pas et 23 500 pas &brvbar; &brvbar;
                  Personne très active / Exercices de forte intensité 6 fois par semaine / Marche plus de 5 km par jour / Fait plus de 23 500 pas &brvbar; &brvbar;
                  Activité physique intense tous les jours, au travail ou en entraînement / S’entraîne 2 fois par jour"
                  placement="bottom"
                >
                  <Button>Détails</Button>
                </Tooltip>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={handleChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                onChange={handleChangePassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            S'inscrire
          </Button>
          {envoi && (
            <Typography
              sx={{ fontFamily: "Montserrat", color: "green", fontSize: 25 }}
            >
              Inscription effectuée
            </Typography>
          )}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signin" variant="body2">
                Déjà inscrit ? Connectez-vous
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
