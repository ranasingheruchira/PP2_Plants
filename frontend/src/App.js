import "./App.css";
import { useRef, useEffect } from "react";
import InputForm from "./Components/InputForm";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import lottie from "lottie-web";
import animation from "./lottie_1.json";
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
    <Grid container>
      <Grid item xs={12} sx={{ height: "8vh", bgcolor: "orange" }} />
      <Grid item xs={5} sx={{ paddingLeft: "100px", paddingTop: "0px" }}>
        <div ref={animationContainer} style={{ height: "500px" }}></div>
      </Grid>
      <Grid item xs={7}>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "70px",
              paddingTop: "10vh",
              paddinLeft: "10%",
            }}
          >
            A Smart Solution <br />
            To Detect <br />
            Plant Deseases..
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "0px", paddingTop: "0px" }}>
          <a href="#input_form_div">
            <button className="btn-get-started">Get Started.</button>
          </a>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ bgcolor: "orange" }}>
        <InputForm />
      </Grid>
    </Grid>
  );
}

export default App;
