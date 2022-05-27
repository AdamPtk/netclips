import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ImageData, media, MediaData } from '../api/media';
import { FunctionComponent, useEffect, useState } from 'react';
import noImage from '../assets/no-image.png';
import { Link } from 'react-router-dom';

export interface MediaBanner {
  id: number;
  title: string;
  image: string;
  description?: string;
}

const Banner: FunctionComponent<{ mediaListId: number }> = ({
  mediaListId,
}) => {
  const [banner, setBanner] = useState<MediaBanner>();

  useEffect(() => {
    getMediaList(mediaListId);
  }, [mediaListId]);

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
          setBanner(
            mediaListElements(data.Entities)[
              Math.floor(Math.random() * (data.Entities.length - 1))
            ],
          );
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

  function mediaListElements(mediaList: MediaData[]): MediaBanner[] {
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
          description: media.Description,
          image: imageHelper(media.Title, imageUrl),
        };
      });
  }
  return (
    <Grid
      container
      height={600}
      sx={{
        backgroundImage: `url(${banner?.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        sx={{
          background: 'radial-gradient(transparent 10%, rgba(0, 0, 0, 0.9));',
        }}
      >
        <Box p={7} width="30%">
          <Typography variant="h2" color="white">
            {banner ? (
              banner.title
            ) : (
              <Skeleton
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.11)',
                  marginBottom: '20px',
                }}
                variant="rectangular"
                width="300px"
                height="70px"
              />
            )}
          </Typography>
          <Typography variant="h6" color="white">
            {banner ? (
              banner.description?.substring(0, 150).concat('...')
            ) : (
              <Skeleton
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.11)' }}
                variant="rectangular"
                width="350px"
                height="35px"
              />
            )}
          </Typography>
          <Grid container spacing={2} py={2}>
            <Grid item>
              {banner ? (
                <Link
                  to={`/home/${banner.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Button variant="contained" color="secondary" size="large">
                    <PlayArrowIcon />
                    <Typography color={'black'} sx={{ px: 1 }}>
                      Play
                    </Typography>
                  </Button>
                </Link>
              ) : (
                <Skeleton
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.11)' }}
                  variant="rectangular"
                  width="100px"
                  height="40px"
                />
              )}
            </Grid>
            <Grid item>
              {banner ? (
                <Button variant="contained" color="info" size="large">
                  <InfoOutlinedIcon />
                  <Typography sx={{ px: 1 }}>More informations</Typography>
                </Button>
              ) : (
                <Skeleton
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.11)' }}
                  variant="rectangular"
                  width="200px"
                  height="40px"
                />
              )}
            </Grid>
          </Grid>
        </Box>
        <Box
          height={60}
          sx={{
            backgroundImage: `linear-gradient(180deg, transparent, rgba(20, 20, 20, 0.6), #141414)`,
          }}
        />
      </Box>
    </Grid>
  );
};

export default Banner;
