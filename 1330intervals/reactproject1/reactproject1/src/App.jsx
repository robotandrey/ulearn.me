import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import CheckDetails from './CheckDetails';
import CheckDetailsQC from './CheckDetailsQC';
import QCSpecialistDashboard from './QCSpecialistDashboard';
import { AppProvider, AppContext } from './AppContext';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useState, useContext } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, AppBar, Toolbar, Typography } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            light: '#e3f2fd',
        },
        secondary: {
            main: '#f50057',
        },
        error: {
            main: '#d32f2f',
        },
        success: {
            main: '#2e7d32',
        },
        background: {
            default: '#f5f7fa',
            paper: '#ffffff',
        },
        text: {
            primary: '#1a202c',
            secondary: '#64748b',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h5: {
            fontWeight: 700,
            letterSpacing: '0.02em',
        },
        h6: {
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            color: '#64748b',
        },
    },
    components: {
        MuiGrid: {
            defaultProps: {
                xs: 12,
                sm: 6,
                md: 4,
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    transition: 'all 0.3s ease',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    padding: '8px 16px',
                    fontWeight: 500,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    backgroundColor: '#ffffff',
                },
            },
        },
    },
});

function AppContent() {
    const { user, updateUser } = useContext(AppContext);
    const [role, setRole] = useState(user.role);

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        updateUser(newRole);
    };

    return (
        <BrowserRouter>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
                <AppBar position="static" color="inherit">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
                            {role === 'support' ? 'Личный кабинет' : 'Панель контроля качества'}
                        </Typography>
                        <Typography variant="body1" sx={{ mr: 2, color: 'text.secondary' }}>
                            {user.fullName}
                        </Typography>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel>Роль</InputLabel>
                            <Select
                                value={role}
                                onChange={(e) => handleRoleChange(e.target.value)}
                                label="Роль"
                            >
                                <MenuItem value="support">Саппорт</MenuItem>
                                <MenuItem value="qc">Контроль качества</MenuItem>
                            </Select>
                        </FormControl>
                    </Toolbar>
                </AppBar>
                <Routes>
                    <Route
                        path="/"
                        element={role === 'support' ? <Dashboard /> : <QCSpecialistDashboard />}
                    />
                    <Route path="/check/:id" element={<CheckDetails />} />
                    <Route path="/qc/check/:id" element={<CheckDetailsQC />} />
                </Routes>
            </Box>
        </BrowserRouter>
    );
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppProvider>
                <AppContent />
            </AppProvider>
        </ThemeProvider>
    );
}

export default App;