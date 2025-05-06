import React, { useContext, useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    Button,
    Tabs,
    Tab,
    Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';

export default function Dashboard() {
    const navigate = useNavigate();
    const { user, checks } = useContext(AppContext);
    const [tab, setTab] = useState(0);

    // Фильтрация проверок по текущему пользователю
    const userChecks = checks.filter((check) => check.supportEmail === user.email);

    // Текущий месяц (май 2025 для примера, в реальном проекте можно использовать new Date())
    const currentMonth = '05.2025';
    const monthChecks = userChecks.filter((check) => check.date.includes(currentMonth));

    // Статистика за месяц
    const totalMonthChecks = monthChecks.length;
    const totalPenaltyCoefficient = monthChecks
        .reduce((sum, check) => sum + (check.penaltyCoefficient || 0), 0)
        .toFixed(1);

    const displayedChecks = tab === 0 ? monthChecks : userChecks;

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: 'background.default' }}>
            <Typography
                variant="h5"
                sx={{ mb: 2, fontWeight: 700, color: 'text.primary' }}
            >
                Мои проверки
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                Сотрудник: {user.fullName}
            </Typography>

            {/* Статистика */}
            <Card sx={{ mb: 4, p: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Статистика за месяц
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                            Всего проверок
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {totalMonthChecks}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                            Суммарный понижающий коэффициент
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {totalPenaltyCoefficient}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>

            {/* Вкладки */}
            <Tabs
                value={tab}
                onChange={handleTabChange}
                sx={{
                    mb: 3,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <Tab label="Проверки за месяц" />
                <Tab label="Все проверки" />
            </Tabs>

            <Divider sx={{ mb: 3 }} />

            {/* Список проверок */}
            {displayedChecks.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                    Нет доступных проверок
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {displayedChecks.map((check) => (
                        <Grid item key={check.id} xs={12} sm={6} md={6}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card
                                    sx={{
                                        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                                        borderRadius: 12,
                                        transition: 'transform 0.2s ease',
                                        minWidth: { xs: '100%', sm: 300 },
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            mb={2}
                                        >
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {check.number}
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
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 1 }}
                                        >
                                            Дата: {check.date}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 1 }}
                                        >
                                            Тип: {check.type}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                mb: 1,
                                                color: check.errors ? 'error.main' : 'success.main',
                                                fontWeight: 500,
                                            }}
                                        >
                                            Ошибки: {check.errors || 'Нет ошибок'}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ mb: 2, color: 'text.secondary', fontWeight: 500 }}
                                        >
                                            Понижающий коэффициент: {check.penaltyCoefficient.toFixed(1)}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            onClick={() => navigate(`/check/${check.id}`)}
                                            sx={{
                                                borderRadius: 8,
                                                textTransform: 'none',
                                                fontWeight: 500,
                                                borderColor: 'primary.main',
                                                '&:hover': {
                                                    bgcolor: 'primary.light',
                                                    borderColor: 'primary.dark',
                                                },
                                            }}
                                        >
                                            Подробнее
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}