// import { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import ReactPlayer from "react-player";
// import { Box, Stack, Typography } from "@mui/material";
// import { CheckCircle } from "@mui/icons-material";

// import { Videos } from "./";
// import { fetchFromAPI } from "../utils/fetchFromAPI";

// const VideoDetails = () => {
//   const [videos, setVideos] = useState([]);
//   const [videoDetail, setVideoDetail] = useState({});
//   const { id } = useParams();

//   useEffect(() => {
//     fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => {
//       setVideoDetail(data.items[0]);
//     });

//     fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
//       (data) => {
//         console.log(data);
//         setVideos(data.items);
//       }
//     );
//   }, [id]);
//   console.log(videos);
//   if (!videoDetail?.snippet || videos.length === 0) return "Loading...";
//   const {
//     snippet: { title, channelTitle, channelId },
//     statistics: { viewCount, likeCount },
//   } = videoDetail;

//   return (
//     <Box style={{ width: "100%" }}>
//       <Stack direction={{ xs: "column", md: "row" }}>
//         <Box flex={1}>
//           <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
//             <ReactPlayer
//               url={`https://www.youtube.com/watch?v=${id}`}
//               className="react-player"
//               controls
//             />
//             <Typography color="#fff" variant={"h5"} pt={2} pl={2}>
//               {title}
//             </Typography>

//             <Stack
//               direction="row"
//               justifyContent="space-between"
//               alignItems="center"
//             >
//               <Link to={`/channel/${channelId}`}>
//                 <Typography
//                   variant={{ xs: "subtitle1", md: "h6" }}
//                   color="gray"
//                   pl={2}
//                 >
//                   {channelTitle}
//                   <CheckCircle
//                     sx={{ color: "#fff", fontSize: "12px", ml: "5px" }}
//                   />
//                 </Typography>
//               </Link>
//               <Stack direction="row" gap="20px">
//                 <Typography
//                   variant="body1"
//                   color="#fff"
//                   sx={{ opacity: 0.7 }}
//                   p={2}
//                 >
//                   {parseInt(viewCount).toLocaleString()} Views
//                 </Typography>
//                 <Typography
//                   variant="body1"
//                   color="#fff"
//                   sx={{ opacity: 0.7 }}
//                   p={2}
//                 >
//                   {parseInt(likeCount).toLocaleString()} Likes
//                 </Typography>
//               </Stack>
//             </Stack>
//           </Box>
//         </Box>
//         <Box
//           px={2}
//           py={{ md: 1, xs: 5 }}
//           justifyContent="center"
//           alignItems="center"
//         >
//           <Videos videos={videos} direction="column"></Videos>
//         </Box>
//       </Stack>
//     </Box>
//   );
// };

// export default VideoDetails;

// //<ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}>

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  if (!videoDetail || !videos) return "Loading...";
  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="100%">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
