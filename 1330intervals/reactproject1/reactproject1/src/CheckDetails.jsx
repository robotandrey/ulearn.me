import React, { useState, useContext } from 'react';
import {
    Box,
    Typography,
    Chip,
    Grid,
    Card,
    CardContent,
    Button,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import { ArrowBack, CheckCircle, Cancel, ErrorOutline } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from './AppContext';

export default function CheckDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, checks, updateCheckStatus, addAppeal } = useContext(AppContext);
    const check = checks.find((c) => c.id === parseInt(id));
    const [openAppealDialog, setOpenAppealDialog] = useState(false);
    const [appealComment, setAppealComment] = useState('');
    const [appealError, setAppealError] = useState('');

    if (!check) {
        return (
            <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
                <Typography variant="h6" color="text.primary">
                    Проверка не найдена
                </Typography>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/')}
                    sx={{ mt: 2, fontWeight: 500 }}
                >
                    Вернуться
                </Button>
            </Box>
        );
    }

    const handleAgree = () => {
        updateCheckStatus(check.id, 'resolved');
        navigate('/');
    };

    const handleOpenAppealDialog = () => {
        setOpenAppealDialog(true);
    };

    const handleCloseAppealDialog = () => {
        setOpenAppealDialog(false);
        setAppealComment('');
        setAppealError('');
    };

    const handleSubmitAppeal = () => {
        if (!appealComment.trim()) {
            setAppealError('Пожалуйста, укажите причину апелляции');
            return;
        }
        updateCheckStatus(check.id, 'disputed', appealComment);
        addAppeal({
            checkId: check.id,
            ticketNumber: check.ticketNumber,
            supportEmail: check.supportEmail,
            comment: appealComment,
            status: 'new',
            createdAt: new Date().toLocaleDateString(),
        });
        handleCloseAppealDialog();
        navigate('/');
    };

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
                                onClick={() => navigate('/')}
                                sx={{ fontWeight: 500, color: 'primary.main' }}
                            >
                                Назад
                            </Button>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                {check.number} • {check.date}
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
                                    Понижающий коэффициент
                                </Typography>
                                <Typography variant="body1">{check.penaltyCoefficient.toFixed(1)}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary">
                                    Описание
                                </Typography>
                                <Typography variant="body1">{check.description}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary">
                                    Проверяющий
                                </Typography>
                                <Typography variant="body1">{check.checkedBy}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary">
                                    Комментарии
                                </Typography>
                                <Typography variant="body1">{check.comments}</Typography>
                            </Grid>
                            {check.appealComment && (
                                <Grid item xs={12}>
                                    <Typography variant="body2" color="text.secondary">
                                        Комментарий апелляции
                                    </Typography>
                                    <Typography variant="body1">{check.appealComment}</Typography>
                                </Grid>
                            )}
                        </Grid>
                        {check.errorDetails?.length > 0 && (
                            <>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                    Детали ошибок
                                </Typography>
                                <Box sx={{ mb: 3 }}>
                                    {check.errorDetails.map((error) => (
                                        <Box
                                            key={error.id}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                p: 2,
                                                mb: 1,
                                                bgcolor: 'error.light',
                                                borderRadius: 2,
                                            }}
                                        >
                                            <ErrorOutline sx={{ color: 'error.main', mr: 1 }} />
                                            <Typography variant="body1">{error.text}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </>
                        )}
                        {check.status === 'new' && (
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<CheckCircle />}
                                        onClick={handleAgree}
                                        sx={{
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                            '&:hover': {
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            },
                                        }}
                                    >
                                        Согласен
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        startIcon={<Cancel />}
                                        onClick={handleOpenAppealDialog}
                                        sx={{
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                            '&:hover': {
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            },
                                        }}
                                    >
                                        Не согласен
                                    </Button>
                                </motion.div>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </motion.div>

            <Dialog
                open={openAppealDialog}
                onClose={handleCloseAppealDialog}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                        maxWidth: 600,
                    },
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
                        Подача апелляции
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Причина апелляции"
                            fullWidth
                            multiline
                            rows={4}
                            value={appealComment}
                            onChange={(e) => {
                                setAppealComment(e.target.value);
                                setAppealError('');
                            }}
                            error={!!appealError}
                            helperText={appealError}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                },
                            }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ p: 3, pt: 0 }}>
                        <Button
                            onClick={handleCloseAppealDialog}
                            sx={{ color: 'text.secondary', fontWeight: 500 }}
                        >
                            Отмена
                        </Button>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                onClick={handleSubmitAppeal}
                                variant="contained"
                                color="primary"
                                sx={{
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    },
                                }}
                            >
                                Отправить
                            </Button>
                        </motion.div>
                    </DialogActions>
                </motion.div>
            </Dialog>
        </Box>
    );
}