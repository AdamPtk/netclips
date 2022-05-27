import { Grid, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { media, ImageData, MediaData } from '../api/media';
import noImage from '../assets/no-image.png';

const listStyle = {
  overflow: 'auto',
  alignItems: 'center',
  flexWrap: 'nowrap',
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
        <Grid key={el} item>
          <Skeleton
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

export interface MediaListProps {
  mediaListId: number;
  title: string;
}

export interface MediaListElem {
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

  const getMediaList = async (mediaListId: number): Promise<void> => {
    try {
      await media()
        .getMediaList({
          MediaListId: mediaListId,
          IncludeCategories: false,
          IncludeImages: true,
          IncludeMedia: false,
          PageNumber: 1,
          PageSize: 15,
        })
        .then((data) => {
          setMediaList(mediaListElements(data.Entities));
        });
    } catch (error: any) {
      console.log(error.response.data.Message);
    }
  };

  const imageHelper = (title: string, fromApi: string) => {
    switch (title) {
      case 'Pure nature':
        return 'https://www.nestle.com/sites/default/files/styles/da_vinci_header_hero_desktop/public/2022-02/sustainability-nature-forest-river-article-header-fw.jpg?h=a612ed85&itok=1mqqgg1L';
      case 'Peaky Blinders':
        return 'https://fwcdn.pl/nph/49468/2021/29569_1.8.jpg';
      case 'Pakiet sprzedazowy szkolenie':
        return 'https://galeria.bankier.pl/p/1/8/c51fbcf42b3023-948-568-0-0-1730-1038.jpg';
      case 'Ostatni smok: Zemsta (2020)':
        return 'https://media.teleman.pl/photos/Ostatni-Smok-Zemsta2020.jpeg';
      default:
        return fromApi;
    }
  };

  function mediaListElements(mediaList: MediaData[]): MediaListElem[] {
    return mediaList
      .filter((media) => media.Title !== 'Łukaszowe')
      .map((media) => {
        const image: ImageData | undefined = media.Images.find(
          (image) => image.ImageTypeCode === 'FRAME',
        );
        const imageUrl = image ? image.Url : noImage;

        return {
          id: media.Id,
          title: media.Title,
          image: imageHelper(media.Title, imageUrl),
        };
      });
  }

  return (
    <Box px={7}>
      <Typography variant="h5" fontWeight={600} py={1}>
        {title}
      </Typography>
      <Grid container spacing={1} py={1} sx={listStyle}>
        {mediaList.length !== 0 ? (
          mediaList.map((elem) => (
            <Grid item key={elem.id}>
              <Link to={`/home/${elem.id}`} style={{ textDecoration: 'none' }}>
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
              </Link>
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
