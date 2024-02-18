import { Card, IconButton, Typography } from "@mui/material";
import { Share as ShareIcon } from "@mui/icons-material";
import { useState } from "react";
import ShareForm from "./ShareForm";

const SharePopUp = () => {
  const [showPopup, setShowPopup] = useState(false);
  const handleShare = () => {
    setShowPopup(true);
    console.log("Implement Share function");
  };
  const handleClosePopup = () => {
    console.log("handling closing popup");
    setShowPopup(false);
  };
  if (showPopup) {
    return (
      <>
        <div
          className="backdrop"
          style={{
            border: "5px solid green",
            display: showPopup ? "block" : "none",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: 0,
            margin: 0,
            zIndex: 1,
          }}
          onClick={handleClosePopup}
        />
        <Card
          style={{
            border: "1px solid red",
            display: "flex",
            position: "fixed",
            top: "25%",
            left: "30%",
            justifyContent: "center",
            alignItems: "center",
            height: "20%",
            width: "40%",
            margin: "0",
            padding: "0",
            zIndex: 2,
          }}
        >
          <ShareForm
            handleCancel={handleClosePopup}
            handleShare={handleShare}
          />
        </Card>
      </>
    );
  }
  return (
    <IconButton
      sx={{
        marginRight: "10px",
      }}
      onClick={handleShare}
    >
      <ShareIcon
        sx={{
          color: "black",
          fontSize: 30,
        }}
      />
    </IconButton>
  );
};

export default SharePopUp;
