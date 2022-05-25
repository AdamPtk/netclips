import { Box, Button, Grid, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function Banner() {
  return (
    <Grid
      container
      height={600}
      direction="column"
      justifyContent="flex-end"
      sx={{
        backgroundImage: `url("https://i0.wp.com/trenddirectsr.com/wp-content/uploads/2021/05/netflix-banner.png?fit=1200%2C675&ssl=1")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Grid p={7}>
        <Typography variant="h2" color="white">
          Movie title
        </Typography>
        <Typography variant="h6" color="white">
          Movie descriptionMovie descriptionMovie descriptionMovie
          descriptionMovie descriptionMovie descriptionMovie descriptionMovie
          descriptionMovie descriptionMovie descriptionMovie descriptionMovie
          descriptionMovie descriptionMovie description
        </Typography>
        <Grid container spacing={2} py={2}>
          <Grid item>
            <Button variant="contained" size="large">
              <PlayArrowIcon />
              <Typography color={'black'} sx={{ px: 1 }}>
                Play
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" size="large">
              <InfoOutlinedIcon />
              <Typography sx={{ px: 1 }}>More informations</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Box
        height={60}
        sx={{
          backgroundImage: `linear-gradient(180deg, transparent, rgba(20, 20, 20, 0.6), #141414)`,
        }}
      />
    </Grid>
  );
}

export default Banner;
