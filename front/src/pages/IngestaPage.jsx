import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Box, Divider, Grid, InputAdornment } from "@mui/material";

export default function IngestaPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [food, setFood] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [apport, setApport] = useState("");
  const [besoin, setBesoin] = useState("");
  const [activity, setActivity] = useState("");
 const [objective, setObjective] = useState('')
  const [total, setTotal] = useState([]);


  //=== Données aliments
  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:3001/food").then((res) => {
      setFood(res.data);
      setIsLoading(false);
    });
  }, []);

  //=== Données utilisateurs
  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:3001/users/4").then((res) => {
      setBesoin(res.data);
      handleApport();
      setIsLoading(false);
    });
  }, []);

  //=== Multiplicateur activité
    useEffect(() => {
      setIsLoading(true);
      axios.get("http://localhost:3001/activity").then((res) => {
        setActivity(res.data);
        setObjective(res.data[2])
        setIsLoading(false);
      });
    }, []);

    console.log(activity)

  //=== Besoins
  function handleApport() {
    if (besoin.sex == 1) {
      setApport(
        10 * besoin.weight +
          6.25 * besoin.height -
          5 * (2022 - besoin.date_of_birth.split("/")[2]) +
          5
      );
    } else {
      setApport(
        10 * besoin.weight +
          6.25 * besoin.height -
          5 * (2022 - besoin.date_of_birth.split("/")[2]) -
          161
      );
    }
  }
  const [aliment, setAliment] = useState("");

  const handleChange = (event) => {
    setAliment(event.target.value);
  };

  //=== Nouvelle journée
  function handleNewday() {
      axios
        .delete("http://localhost:3001/quantity/4")
        .then(() => {
        })
        .catch((err) => {
          console.log(err);
        })
    }

    //=== Ajouter un aliment à la ration
    function addFood(){
      axios.post("http://localhost:3001/quantity", 
      {
    id_user: 4,
    id_food: aliment,
    quantity: quantity,
  })
  .then(function (response) {
    totalIngesta()
  })
  .catch(function (error) {
    console.log(error);
  });
    }

    //=== Total de la journée
    function totalIngesta(){
      axios.get("http://localhost:3001/quantity/4")
      .then((res) => {
        setTotal(res.data)
      })
      .catch((err) => {
        console.log(err)
      });
    }

  return (
    <Box>
      <Typography
        variant="h2"
        gutterBottom
        sx={{ fontFamily: "Montserrat", margin: 5 }}
      >
        Ingesta
      </Typography>
      <Divider sx={{ mb: 5 }} />
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Grid container spacing={2} sx={{ margin: 1 }}>
          <Grid item xs={5}>
            <TextField
              id="filled-number"
              label="Dépense basale"
              type="number"
              value={apport}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setApport(e.target.value)}
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">kcal</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="filled-number"
              label="Objectif quotidien"
              type="number"
              value={apport * objective.coefficient}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">kcal</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="filled-number"
              label="Quantité en grammes"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={11} md={11}>
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="demo-simple-select-label">Aliment</InputLabel>
              <Select value={aliment} label="Aliment" onChange={handleChange}>
                {food &&
                  food.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          {food &&
            food
              .filter((item) => item.id === aliment)
              .map((item) => (
                <Grid item xs={11} md={8}>
                  <TextField
                    id="Calories"
                    label="Calories"
                    value={(quantity / 100) * item.energy + " kcal"}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    id="outlined-read-only-input"
                    label="Protéines"
                    value={(quantity / 100) * item.protein + " g"}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    id="outlined-read-only-input"
                    label="Glucides"
                    value={(quantity / 100) * item.carbohydrate + " g"}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    id="outlined-read-only-input"
                    label="Lipides"
                    value={(quantity / 100) * item.lipid + " g"}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ mb: 1 }}
                  />
                </Grid>
              ))}
          <Grid item xs={12}>
            <Button variant="contained" sx={{ margin: 1 }} onClick={addFood}>
              Ajouter à ma ration
            </Button>
          </Grid>
          <Grid item xs={11} sx={{ textAlign: "center" }}>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: 30 }}>
              Total quotidien
            </Typography>
            {total && (
              <Typography
                sx={{
                  color:
                    total
                      .map((ration) => ration.quantity)
                      .reduce((acc, currentValue) => {
                        return acc + currentValue;
                      }, 0) > objective
                      ? "red"
                      : "green",
                  fontFamily: "Montserrat",
                  fontSize: 30,
                }}
              >
                {total
                  .map((ration) => ration.quantity)
                  .reduce((acc, currentValue) => {
                    return acc + currentValue;
                  }, 0)}{" "}
                kcal
              </Typography>
            )}
            <Button
              variant="contained"
              sx={{ margin: 1 }}
              onClick={handleNewday}
            >
              Nouvelle journée
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
