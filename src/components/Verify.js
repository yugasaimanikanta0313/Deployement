import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Snackbar } from '@mui/material';
import { AccessAlarm } from '@mui/icons-material';

const Verify = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds countdown
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    // Start the countdown on component mount
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer); // Cleanup the interval
        } else {
            setSnackbarMessage("Time expired! Please try again.");
            setOpenSnackbar(true);
            navigate('/register'); // Redirect to registration if time expires
        }
    }, [timeLeft, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpData = { email, otp };

        axios.put('/verify', otpData)
            .then(response => {
                if (response.data.success) {
                    setSnackbarMessage(response.data.message);
                    setOpenSnackbar(true);
                    navigate('/login');
                } else {
                    setSnackbarMessage(response.data.message);
                    setOpenSnackbar(true);
                }
            })
            .catch(error => {
                console.error('Verification Error:', error.response ? error.response.data : error.message);
                setSnackbarMessage("An error occurred during verification. Please try again.");
                setOpenSnackbar(true);
            });
    };

    // Add global CSS styles for the entire screen
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            html, body {
                margin: 0;
                padding: 0;
                height: 100%;
                width: 100%;
                background-color: #000; /* Ensures the whole screen is black */
                overflow: hidden; /* Prevents scrolling */
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style); // Cleanup the style on component unmount
        };
    }, []);

    return (
        <Container
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0, // Remove default padding
            }}
        >
            <Box
                sx={{
                    background: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white for a modern look
                    backdropFilter: 'blur(10px)', // Blur effect for a glassmorphism effect
                    padding: '40px',
                    borderRadius: '20px', // More rounded corners
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)', // Soft shadow for depth
                    textAlign: 'center',
                    maxWidth: '400px',
                    width: '100%',
                    border: '1px solid #444',
                }}
            >
                <Typography variant="h4" sx={{ color: '#fff', mb: 3, textShadow: '0 0 10px #ff00cc, 0 0 20px #3333ff' }}>
                    Email Verification
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Enter your email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            mb: 2,
                            input: { color: '#fff' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#fff',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#ff00cc',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#3333ff',
                                },
                            },
                        }}
                        required
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Enter OTP"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        sx={{
                            mb: 2,
                            input: { color: '#fff' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#fff',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#ff00cc',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#3333ff',
                                },
                            },
                        }}
                        required
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            backgroundColor: '#ff00cc',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#e60099',
                            },
                            mb: 2,
                        }}
                    >
                        Verify
                    </Button>
                </form>
                <Box sx={{ color: '#fff', fontSize: '1.2em', mt: 2, display: 'flex', alignItems: 'center' }}>
                    <AccessAlarm sx={{ mr: 1 }} />
                    {timeLeft > 0 ? (
                        <span>Time remaining: {timeLeft}s</span>
                    ) : (
                        <span>Time expired!</span>
                    )}
                </Box>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
            />
        </Container>
    );
};

export default Verify;
