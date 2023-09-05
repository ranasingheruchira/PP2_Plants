import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function PopUpDialog({ isOpen, changeIsOpen, data }) {
  const handleClose = () => {
    changeIsOpen(false);
  };

  const percentages = Object.entries(data.prediction);

  // console.log(percentages[1]);

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        {/* Pop Up Title */}
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Prediction Results
        </DialogTitle>
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* Pop Up Content */}
        <DialogContent dividers sx={{ backgroundColor: "#7af5c0" }}>
          <h1>Image Identified As :</h1>
          <Typography gutterBottom variant="h5">
            <ul>
              <li>{data.identified}</li>
            </ul>
          </Typography>
          {/* displays percentage of identified image.
                displays "unidentified if not recognized" */}
          <h1>Identification Percentage :</h1>
          <Typography gutterBottom variant="h5">
            <ul>
              <li>
                {isNaN(Number(data.identifiedPercentage))
                  ? data.identifiedPercentage
                  : data.identifiedPercentage.slice(0, 5) + "%"}
              </li>
            </ul>
          </Typography>
          {/* display all percentages */}
          <h1>Other Posibilities :</h1>
          <Typography gutterBottom variant="h5">
            <ul>
              {/* display the list of percentages */}
              {percentages.map((item) => {
                return (
                  <li key={item[0]}>
                    {item[0] + " : " + item[1].slice(0, 5)}%
                  </li>
                );
              })}
            </ul>
          </Typography>
        </DialogContent>
        <DialogActions>
          {/* pop up close button */}
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
