
'use client'
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import * as yup from 'yup'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/hooks/useAuth';


function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  interface FormValues  {
    email : string
    password : string
  }
  
  // TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const schema = yup.object().shape({
  email: yup.string().required('Email is required!!'),
  password: yup.string().required('Password is required!!')
})


const Login = () => {

  
  const [showPassword, setShowPassword] = useState(false);

      const router = useRouter()
      
      const { login } = useAuth()

      const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors },
        reset
      } = useForm<FormValues>({
      resolver: yupResolver(schema)
      });

    function onSubmit(data:any) {
      const { email, password } = data;
        console.log(email, password, "login")
        login({ email, password }, () => {
          setError('email',{
              type : 'manual',
              message : 'Invalid email or password!'
          })
        })
        // const response = axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`,{ email, password }).then(res => {
        // console.log(res.data, "resData")
        // const  access_token: string  = res.data.access_token;
        // localStorage.setItem('access_token', access_token)
        // localStorage.setItem('role', res.data.data.role)
        // localStorage.setItem('user_Id', res.data.data._id)
        // router.push('/home')
        // }).catch(error => {
        //     toast.error("Invalid user credentials!")
        // })
    }

      const handleClickShowPassword = () => setShowPassword((show) => !show);

      const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography sx={{ my: 1, fontFamily: "cursive", fontWeight: "Bold" }} component="h1" variant="h4">
              Explorer.com
            </Typography>
            <Typography sx={{ mb: 4 }} component="h1" variant="h5">
              Log in
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
            {/* <Grid item xs={12}> */}
                <Controller
                    control={control}
                    name="email"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                    <TextField 
                        {...register('email')}
                        name="email"
                        fullWidth
                        id="email"
                        InputLabelProps={{ shrink: true }}
                        label="Email"
                        error={Boolean(errors.email)}
                        {...(errors.email && {helperText:errors.email.message})}
                    />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                    <TextField 
                        {...register('password')}
                        sx={{ my: 2 }}
                        name="password"
                        fullWidth
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ // Use InputProps to pass endAdornment
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        label="password"
                        error={Boolean(errors.password)}
                        {...(errors.password && {helperText:errors.password.message})}
                    />
                    )}
                />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register/user" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </form>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: 'url(https://source.unsplash.com/random?explore)',
            backgroundImage: 'url(https://picsum.photos/1200)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
    </>
  )
}

export default Login
