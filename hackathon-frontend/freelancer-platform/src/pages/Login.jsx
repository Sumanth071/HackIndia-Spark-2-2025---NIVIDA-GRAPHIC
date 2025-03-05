import { useState, useContext } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:6060/api/auth/login", formData);
      login(res.data.user);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Password" type="password" name="password" fullWidth margin="normal" onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
