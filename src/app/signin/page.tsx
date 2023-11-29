"use client";
import { signIn } from "next-auth/react";
import { Button, Paper, Container, Grid, CssBaseline, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Image from "next/image";

const SignInPage = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Image src="/logo dark.png" alt="Logo" height={60} width={60} />
        <Typography variant="h5" component="h1" gutterBottom>
          Sign In
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={() => signIn("google")} startIcon={<GoogleIcon />}>
              Sign in with Google
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignInPage;
