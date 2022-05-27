import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { media, StreamTypeOptions } from '../api/media';
import Logo from './atoms/Logo';

const videoHelpersStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const Player = () => {
  const [video, setVideo] = useState<string>('');
  const [noVideo, setNoVideo] = useState<string>('');

  let { mediaId } = useParams();
  let id = mediaId || '';

  useEffect(() => {
    getMediaPlayInfo(parseInt(id));
  }, [id]);

  const getMediaPlayInfo = async (id: number): Promise<void> => {
    try {
      await media()
        .getMediaPlayInfo({
          MediaId: id,
          StreamType: StreamTypeOptions.TRIAL,
        })
        .then((data) => {
          if (data.ContentUrl) {
            setVideo(data.ContentUrl);
          } else {
            setVideo('noVideo');
            setNoVideo('noVideo');
          }
        });
    } catch (error: any) {
      console.log(error.response.data.Message);
    }
  };
  return (
    <>
      {video ? (
        <>
          {!noVideo ? (
            <ReactPlayer
              url={video}
              controls={true}
              playing={true}
              width="100%"
              height="auto"
            />
          ) : (
            <Box sx={videoHelpersStyle}>
              <Logo width="100px" />
              <Typography p={2}>
                No video available, subscribe for more
              </Typography>
            </Box>
          )}
        </>
      ) : (
        <CircularProgress sx={videoHelpersStyle} />
      )}
    </>
  );
};

export default Player;
