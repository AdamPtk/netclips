import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { authorization } from '../api/authorization';
import Logo from './atoms/Logo';

const textFieldStyles = {
  '& .MuiInputLabel-root': { color: '#fff' },
  '& .MuiOutlinedInput-root': {
    '& > fieldset': { borderColor: '#fff' },
  },
  '& .MuiOutlinedInput-root:hover': {
    '& > fieldset': {
      borderColor: '#fff',
    },
  },
  input: {
    color: '#fff',
  },
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

function SplashScreen() {
  const navigate = useNavigate();
  const token = window.sessionStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/home');
    } else {
      navigate('/');
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await authorization()
          .userLogin({
            Username: values.email,
            Password: values.password,
          })
          .then((data) => {
            navigate('/home');
            window.sessionStorage.setItem(
              'token',
              data.AuthorizationToken.Token,
            );
          });
      } catch (error: any) {
        console.log(error.response.data.Message);
      }
    },
  });

  const anonymousLogin = async () => {
    try {
      await authorization()
        .anonymousLogin({})
        .then((data) => {
          window.sessionStorage.setItem('token', data.AuthorizationToken.Token);
          navigate('/home');
        });
    } catch (error: any) {
      console.log(error.response.data.Message);
    }
  };
  return (
    <Box
      height="100vh"
      sx={{
        backgroundImage: `url("https://i0.wp.com/trenddirectsr.com/wp-content/uploads/2021/05/netflix-banner.png?fit=1200%2C675&ssl=1")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          background:
            'radial-gradient(transparent 50%, rgba(20, 20, 20, 0.6));',
        }}
      >
        <Logo
          width="200px"
          margin="20px 50px"
          position="absolute"
          top={0}
          left={0}
        />
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          width="30%"
          p={7}
          borderRadius="10px"
          bgcolor="rgba(20, 20, 20, 0.85)"
        >
          <Typography
            variant="h3"
            fontWeight="600"
            width="60%"
            textAlign="center"
          >
            Sign In
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              color="secondary"
              id="email"
              name="email"
              label="Email"
              sx={textFieldStyles}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              fullWidth
              color="secondary"
              id="password"
              name="password"
              label="Password"
              type="password"
              sx={textFieldStyles}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              sx={{ margin: '20px 0' }}
            >
              Sign In
            </Button>
          </form>
          <Typography variant="h6">Or</Typography>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            sx={{ margin: '20px 0' }}
            onClick={anonymousLogin}
          >
            Login anonymously
          </Button>
        </Grid>
      </Box>
    </Box>
  );
}

export default SplashScreen;
