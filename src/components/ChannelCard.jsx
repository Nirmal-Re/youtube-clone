import React from "react";
import { Link } from "react-router-dom";
import { Box, CardMedia, CardContent, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { demoProfilePicture } from "../utils/constant";

const ChannelCard = ({ channelDetail, marginTop }) => (
  <Box
    sx={{
      borderRadius: "20px",
      borderShadow: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "320px",
      marginTop,
    }}
  >
    {console.log("Printing sutff", channelDetail)}
    <Link
      to={
        channelDetail?.id?.channelId
          ? `/channel/${channelDetail?.id?.channelId}`
          : `/channel/${channelDetail?.id}`
      }
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <CardMedia
          image={
            channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture
          }
          alt={channelDetail?.snippet?.tittle}
          sx={{
            borderRadius: "50%",
            height: "180px",
            width: "180px",
          }}
        />
        <Typography variant="h6" color="#fff" mt={2}>
          {channelDetail?.snippet?.title}
          <CheckCircle
            sx={{ ml: "5px", fontSize: 12, color: "gray" }}
          ></CheckCircle>
        </Typography>
        {channelDetail?.statistics?.subscriberCount && (
          <Typography variant="subtitle2" sx={{ color: "gray" }}>
            {parseInt(
              channelDetail?.statistics?.subscriberCount
            ).toLocaleString()}{" "}
            Subscriber
          </Typography>
        )}
      </CardContent>
    </Link>
  </Box>
);

export default ChannelCard;
