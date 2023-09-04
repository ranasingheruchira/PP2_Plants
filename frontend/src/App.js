// import "./App.css";
import { useRef, useEffect } from "react";
import InputForm from "./Components/InputForm";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import lottie from "lottie-web";
import animation from "./lottie_2.json";
import { Typography } from "@mui/material";

function App() {
  const animationContainer = useRef();

  useEffect(() => {
    lottie.loadAnimation({
      container: animationContainer.current,
      animationData: animation,
      renderer: "svg",
      loop: true,
      autoplay: true,
    });
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sx={{ bgcolor: "#abedd9", height: "8vh" }}>
          Hello
        </Grid>
        <Grid item xs={6} sx={{ paddingLeft: "20px" }}>
          <div ref={animationContainer}></div>
        </Grid>
        <Grid item xs={6} sx={{ bgcolor: "#cfe8fc" }}>
          <Grid item xs={12} sx={{ bgcolor: "white", height: "50vh" }}>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "90px",
                color: "#00ff99",
              }}
            >
              The Farmers App
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ bgcolor: "green", height: "50vh" }}></Grid>
        </Grid>
        <Grid>
          <InputForm></InputForm>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
