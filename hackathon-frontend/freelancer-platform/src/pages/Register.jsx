import { useState } from "react";
import { TextField, Button, Container, Typography, MenuItem } from "@mui/material";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "freelancer", // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:6060/api/auth/register", formData);
      alert("Registration Successful!");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Password" type="password" name="password" fullWidth margin="normal" onChange={handleChange} />
        <TextField select label="Role" name="role" fullWidth margin="normal" onChange={handleChange}>
          <MenuItem value="freelancer">Freelancer</MenuItem>
          <MenuItem value="business">Business</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
