import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <Box>
      <h1>Accueil</h1>
      <div>
        <Link to="/signup">
          <h3>Inscription</h3>
        </Link>
        <Link to="/signin">
          <h3>Connexion</h3>
        </Link>
      </div>
    </Box>
  );
  
  
}
