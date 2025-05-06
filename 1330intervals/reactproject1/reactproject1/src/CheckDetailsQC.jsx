import React, { useContext } from 'react';
import {
    Box,
    Typography,
    Chip,
    Grid,
    Card,
    CardContent,
    Button,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from './AppContext';

export default function CheckDetailsQC() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, checks } = useContext(AppContext);
    const check = checks.find((c) => c.id === parseInt(id));

    const handleBack = () => {
        navigate('/', { state: { tab: 1 } }); // Возвращаем на "Мои проверки"
    };

    if (!check) {
        return (
            <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
                <Typography variant="h6" color="text.primary">
                    Проверка не найдена
                </Typography>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={handleBack}
                    sx={{ mt: 2, fontWeight: 500 }}
                >
                    Вернуться
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Card sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 12 }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ mb: 3 }}>
                            <Button
                                startIcon={<ArrowBack />}
                                onClick={handleBack}
                                sx={{ fontWeight: 500, color: 'primary.main' }}
                            >
                                Назад
                            </Button>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                Тикет {check.ticketNumber} • {check.date}
                            </Typography>
                            <Chip
                                label={
                                    check.status === 'new'
                                        ? 'Новая'
                                        : check.status === 'resolved'
                                            ? 'Согласовано'
                                            : 'Оспаривается'
                                }
                                size="small"
                                sx={{
                                    fontWeight: 500,
                                    bgcolor:
                                        check.status === 'new'
                                            ? '#fff8e1'
                                            : check.status === 'resolved'
                                                ? '#e8f5e9'
                                                : '#ffebee',
                                    color:
                                        check.status === 'new'
                                            ? '#ff6f00'
                                            : check.status === 'resolved'
                                                ? '#2e7d32'
                                                : '#c62828',
                                    borderRadius: 1,
                                }}
                            />
                        </Box>
                        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                            Сотрудник: {user.fullName}
                        </Typography>
                        <Grid container spacing={3} mb={3}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                    Тип проверки
                                </Typography>
                                <Typography variant="body1">{check.type}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                    Ошибки
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: check.errors ? 'error.main' : 'success.main',
                                        fontWeight: 500,
                                    }}
                                >
                                    {check.errors || 'Нет ошибок'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                    Почта саппорта
                                </Typography>
                                <Typography variant="body1">{check.supportEmail}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                    Категория
                                </Typography>
                                <Typography variant="body1">{check.category}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                    Подкатегория
                                </Typography>
                                <Typography variant="body1">{check.subcategory}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary">
                                    Комментарии
                                </Typography>
                                <Typography variant="body1">{check.comments || 'Без комментариев'}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </motion.div>
        </Box>
    );
}