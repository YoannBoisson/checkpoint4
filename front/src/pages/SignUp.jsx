import React, { useState } from "react";
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
  const [id_activity, setActivity] = useState('');

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
        id_activity        
      }),
    }).then((result) => {
      setUsername('')
      setEmail('')
      setSex('')

      console.log(result);
    });
  };

  console.log(
    username,
    date_of_birth,
    email,
    weight,
    height,
    sex,
    password,
    id_activity
  );

  const handleChange = (event) => {
    setActivity(event.target.value);
  };

  const handleChangeUsername = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };
  const handleChangeSex = (event) => {
    event.preventDefault();
    if (event.target.value === 'true'){
setSex(true);
    }  else
    setSex(false)
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
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Ten</MenuItem>
                  <MenuItem value={2}>Twenty</MenuItem>
                  <MenuItem value={3}>Thirty</MenuItem>
                </Select>
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
