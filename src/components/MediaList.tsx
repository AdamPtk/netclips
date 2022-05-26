import { Grid, Skeleton, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { FunctionComponent, useEffect, useState } from 'react';
import { media, ImageData, MediaData } from '../api/media';
import noImage from '../assets/no-image.png';

const listStyle = {
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    height: '5px',
  },
  '&::-webkit-scrollbar-track': {
    border: '5px solid #141414',
    background: '#141414',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#555',
    borderRadius: '5px',
  },
};

const SkeletonList: FunctionComponent<{ num: number }> = ({ num }) => {
  let arr = [];
  for (let i = 0; i <= num; i++) {
    arr.push(i);
  }
  return (
    <>
      {arr.map((el) => (
        <Grid item>
          <Skeleton
            key={el}
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.11)' }}
            variant="rectangular"
            width="208px"
            height="117px"
          />
        </Grid>
      ))}
    </>
  );
};

interface MediaListProps {
  mediaListId: number;
  title: string;
}

interface MediaListElem {
  id: number;
  title: string;
  image: string;
}

const MediaList: FunctionComponent<MediaListProps> = ({
  mediaListId,
  title,
}) => {
  const [mediaList, setMediaList] = useState<MediaListElem[]>([]);

  useEffect(() => {
    getMediaList(mediaListId);
  }, []);

  const getMediaList = async (
    mediaListId: number,
    page: number = 1,
  ): Promise<void> => {
    try {
      await media()
        .getMediaList({
          MediaListId: mediaListId,
          IncludeCategories: false,
          IncludeImages: true,
          IncludeMedia: false,
          PageNumber: page,
          PageSize: 15,
        })
        .then((data) => {
          setMediaList(mediaListElements(data.Entities));
          console.log(data);
        });
    } catch (error: any) {
      console.log(error.response.data.Message);
    }
  };

  function mediaListElements(mediaList: MediaData[]): MediaListElem[] {
    return mediaList.map((media) => {
      const frameImage: ImageData | undefined = media.Images.find(
        (image) => image.ImageTypeCode === 'FRAME',
      );
      const frameImageUrl = frameImage ? frameImage.Url : noImage;
      return {
        id: media.Id,
        title: media.Title,
        image: frameImageUrl,
      };
    });
  }

  return (
    <Box px={7}>
      <Typography variant="h5" fontWeight={600} py={1}>
        {title}
      </Typography>
      <Grid container spacing={1} py={1} wrap="nowrap" sx={listStyle}>
        {mediaList.length !== 0 ? (
          mediaList.map((elem) => (
            <Grid item key={elem.id}>
              <Box
                width="208px"
                height="117px"
                borderRadius={1}
                sx={{
                  backgroundImage: `url(${elem.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  cursor: 'pointer',
                }}
              >
                <Typography>{elem.title}</Typography>
              </Box>
            </Grid>
          ))
        ) : (
          <SkeletonList num={15} />
        )}
      </Grid>
    </Box>
  );
};

export default MediaList;
