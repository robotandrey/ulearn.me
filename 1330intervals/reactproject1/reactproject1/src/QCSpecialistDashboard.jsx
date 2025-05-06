import React, { useState, useContext, useEffect } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Grid,
    Card,
    CardContent,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Divider,
    Snackbar,
    Alert,
} from '@mui/material';
import {
    Save as SaveIcon,
    Edit as EditIcon,
    CheckCircle,
    Cancel,
    Visibility as VisibilityIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from './AppContext';

const directions = ['Техподдержка', 'Продажи', 'Биллинг'];
const lines = ['Первая линия', 'Вторая линия'];
const forms = ['Чат-поддержка', 'Электронная почта', 'Телефония'];
const categories = {
    'Чат-поддержка': ['Общие вопросы', 'Технические проблемы', 'Жалобы'],
    'Электронная почта': ['Формальность', 'Полнота ответа', 'Скорость'],
    Телефония: ['Этикет', 'Решение проблемы', 'Тон общения'],
};
const subcategories = {
    'Чат-поддержка': {
        'Общие вопросы': ['Информация о продукте', 'Статус заказа'],
        'Технические проблемы': ['Ошибка подключения', 'Сбой приложения'],
        Жалобы: ['Недовольство обслуживанием', 'Возврат средств'],
    },
    'Электронная почта': {
        Формальность: ['Приветствие', 'Прощание'],
        'Полнота ответа': ['Все вопросы раскрыты', 'Частичный ответ'],
        Скорость: ['Вовремя', 'С опозданием'],
    },
    Телефония: {
        Этикет: ['Вежливость', 'Профессионализм'],
        'Решение проблемы': ['Полное решение', 'Частичное решение'],
        'Тон общения': ['Дружелюбный', 'Нейтральный'],
    },
};

export default function QCSpecialistDashboard() {
    const location = useLocation();
    const [tab, setTab] = useState(location.state?.tab || 0);
    const [openCheckDialog, setOpenCheckDialog] = useState(false);
    const [direction, setDirection] = useState('');
    const [line, setLine] = useState('');
    const [formType, setFormType] = useState('');
    const [ticketNumber, setTicketNumber] = useState('');
    const [supportEmail, setSupportEmail] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [comments, setComments] = useState('');
    const [errorsCount, setErrorsCount] = useState('');
    const [errors, setErrors] = useState({});
    const [draft, setDraft] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openAppealDialog, setOpenAppealDialog] = useState(false);
    const [selectedAppeal, setSelectedAppeal] = useState(null);
    const [appealResponse, setAppealResponse] = useState('');
    const [appealResponseError, setAppealResponseError] = useState('');
    const navigate = useNavigate();
    const { user, checks, addCheck, appeals, updateAppeal } = useContext(AppContext);

    useEffect(() => {
        if (location.state?.tab !== undefined) {
            setTab(location.state.tab);
        }
    }, [location.state]);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleOpenCheckDialog = () => {
        setOpenCheckDialog(true);
        // Восстановить черновик, если он есть
        if (draft) {
            setDirection(draft.direction || '');
            setLine(draft.line || '');
            setFormType(draft.formType || '');
            setTicketNumber(draft.ticketNumber || '');
            setSupportEmail(draft.supportEmail || '');
            setCategory(draft.category || '');
            setSubcategory(draft.subcategory || '');
            setComments(draft.comments || '');
            setErrorsCount(draft.errorsCount || '');
        }
    };

    const handleCloseCheckDialog = () => {
        // Сохранить черновик при закрытии
        setDraft({
            direction,
            line,
            formType,
            ticketNumber,
            supportEmail,
            category,
            subcategory,
            comments,
            errorsCount,
        });
        setOpenCheckDialog(false);
    };

    const handleClearDraft = () => {
        setDraft(null);
        setDirection('');
        setLine('');
        setFormType('');
        setTicketNumber('');
        setSupportEmail('');
        setCategory('');
        setSubcategory('');
        setComments('');
        setErrorsCount('');
        setErrors({});
        setSnackbarMessage('Черновик очищен');
        setSnackbarOpen(true);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!direction) newErrors.direction = 'Выберите направление';
        if (!line) newErrors.line = 'Выберите линию';
        if (!formType) newErrors.formType = 'Выберите тип формы';
        if (!ticketNumber) newErrors.ticketNumber = 'Введите номер тикета';
        if (!supportEmail) newErrors.supportEmail = 'Введите почту саппорта';
        if (!category) newErrors.category = 'Выберите категорию';
        if (errorsCount === '') newErrors.errorsCount = 'Укажите количество ошибок';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveCheck = () => {
        if (!validateForm()) {
            setSnackbarMessage('Заполните все обязательные поля');
            setSnackbarOpen(true);
            return;
        }

        const isDuplicate = checks.some(
            (check) => check.ticketNumber === ticketNumber && check.supportEmail === supportEmail
        );
        if (isDuplicate) {
            setSnackbarMessage('Тикет с таким номером и почтой уже проверен');
            setSnackbarOpen(true);
            return;
        }

        addCheck({
            ticketNumber,
            supportEmail,
            date: new Date().toLocaleDateString(),
            type: formType,
            category,
            subcategory,
            comments,
            errors: parseInt(errorsCount) || 0,
            isEditable: true,
        });

        setDraft(null); // Очистить черновик после сохранения
        setSnackbarMessage('Проверка сохранена');
        setSnackbarOpen(true);
        setOpenCheckDialog(false);
        setDirection('');
        setLine('');
        setFormType('');
        setTicketNumber('');
        setSupportEmail('');
        setCategory('');
        setSubcategory('');
        setComments('');
        setErrorsCount('');
        setErrors({});
    };

    const handleTakeNewTicket = () => {
        setTicketNumber(`T${Math.floor(Math.random() * 100000)}`);
        setSupportEmail('ivanov@example.com');
        setErrors((prev) => ({ ...prev, ticketNumber: '', supportEmail: '' }));
        setDraft((prev) => ({
            ...prev,
            ticketNumber: `T${Math.floor(Math.random() * 100000)}`,
            supportEmail: 'ivanov@example.com',
        }));
    };

    const handleEditCheck = (check) => {
        if (!check.isEditable) {
            setSnackbarMessage('Редактирование недоступно для этой проверки');
            setSnackbarOpen(true);
            return;
        }
        console.log('Открытие формы редактирования для проверки:', check);
        // TODO: Реализовать форму редактирования
    };

    const handleViewCheck = (id) => {
        navigate(`/qc/check/${id}`);
    };

    const handleOpenAppealDialog = (appeal) => {
        setSelectedAppeal(appeal);
        setOpenAppealDialog(true);
    };

    const handleCloseAppealDialog = () => {
        setOpenAppealDialog(false);
        setSelectedAppeal(null);
        setAppealResponse('');
        setAppealResponseError('');
    };

    const handleSubmitAppealResponse = (accept) => {
        if (!appealResponse.trim()) {
            setAppealResponseError('Пожалуйста, укажите причину решения');
            return;
        }
        updateAppeal(selectedAppeal.id, accept ? 'accepted' : 'rejected', appealResponse);
        setSnackbarMessage(`Апелляция ${accept ? 'принята' : 'отклонена'}`);
        setSnackbarOpen(true);
        handleCloseAppealDialog();
    };

    return (
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Typography
                variant="h5"
                sx={{ mb: 2, fontWeight: 700, color: 'text.primary' }}
            >
                Панель контроля качества
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                Сотрудник: {user.fullName}
            </Typography>

            {/* Кнопка "Новая проверка" и индикация черновика */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                {draft && (
                    <Chip
                        label="Есть черновик"
                        color="warning"
                        size="small"
                        sx={{ fontWeight: 500 }}
                    />
                )}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleOpenCheckDialog}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 600,
                            borderRadius: 2,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            '&:hover': {
                                boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                            },
                        }}
                    >
                        Новая проверка
                    </Button>
                </motion.div>
            </Box>

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
                <Tab label="Мои проверки" />
                <Tab label="Апелляции" />
                <Tab label="Статистика" />
            </Tabs>

            {tab === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <Card sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 12 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Мои проверки
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Тикет</TableCell>
                                        <TableCell>Почта</TableCell>
                                        <TableCell>Дата</TableCell>
                                        <TableCell>Тип</TableCell>
                                        <TableCell>Ошибки</TableCell>
                                        <TableCell>Статус</TableCell>
                                        <TableCell>Действия</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {checks.map((check) => (
                                        <TableRow key={check.id}>
                                            <TableCell>{check.ticketNumber}</TableCell>
                                            <TableCell>{check.supportEmail}</TableCell>
                                            <TableCell>{check.date}</TableCell>
                                            <TableCell>{check.type}</TableCell>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        color: check.errors ? 'error.main' : 'success.main',
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {check.errors || 'Нет ошибок'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
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
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Button
                                                        startIcon={<VisibilityIcon />}
                                                        onClick={() => handleViewCheck(check.id)}
                                                        sx={{ fontWeight: 500 }}
                                                    >
                                                        Просмотреть
                                                    </Button>
                                                    <Button
                                                        startIcon={<EditIcon />}
                                                        onClick={() => handleEditCheck(check)}
                                                        disabled={!check.isEditable}
                                                        sx={{ fontWeight: 500 }}
                                                    >
                                                        Редактировать
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {tab === 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <Card sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 12 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Апелляции
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Тикет</TableCell>
                                        <TableCell>Почта</TableCell>
                                        <TableCell>Дата</TableCell>
                                        <TableCell>Комментарий</TableCell>
                                        <TableCell>Статус</TableCell>
                                        <TableCell>Действия</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {appeals.map((appeal) => (
                                        <TableRow key={appeal.id}>
                                            <TableCell>{appeal.ticketNumber}</TableCell>
                                            <TableCell>{appeal.supportEmail}</TableCell>
                                            <TableCell>{appeal.createdAt}</TableCell>
                                            <TableCell>{appeal.comment}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={
                                                        appeal.status === 'new'
                                                            ? 'Новая'
                                                            : appeal.status === 'accepted'
                                                                ? 'Принята'
                                                                : 'Отклонена'
                                                    }
                                                    size="small"
                                                    sx={{
                                                        bgcolor:
                                                            appeal.status === 'new'
                                                                ? '#fff8e1'
                                                                : appeal.status === 'accepted'
                                                                    ? '#e8f5e9'
                                                                    : '#ffebee',
                                                        color:
                                                            appeal.status === 'new'
                                                                ? '#ff6f00'
                                                                : appeal.status === 'accepted'
                                                                    ? '#2e7d32'
                                                                    : '#c62828',
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => handleOpenAppealDialog(appeal)}
                                                    disabled={appeal.status !== 'new'}
                                                >
                                                    Обработать
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {tab === 2 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <Card sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 12 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Статистика активности
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Card sx={{ bgcolor: 'primary.light', p: 2, borderRadius: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Проверок завершено
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                            {checks.filter((c) => c.status === 'resolved').length}
                                        </Typography>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Card sx={{ bgcolor: 'primary.light', p: 2, borderRadius: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Активных апелляций
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                            {appeals.filter((a) => a.status === 'new').length}
                                        </Typography>
                                    </Card>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {/* Диалог для новой проверки */}
            <Dialog
                open={openCheckDialog}
                onClose={handleCloseCheckDialog}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                        maxWidth: 800,
                        width: '100%',
                    },
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
                        Новая проверка
                        {draft && (
                            <Chip
                                label="Черновик"
                                color="warning"
                                size="small"
                                sx={{ ml: 2, fontWeight: 500 }}
                            />
                        )}
                    </DialogTitle>
                    <DialogContent sx={{ p: 4 }}>
                        <Grid container spacing={3} direction="column">
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Параметры проверки
                                </Typography>
                                <FormControl fullWidth error={!!errors.direction}>
                                    <InputLabel>Направление</InputLabel>
                                    <Select
                                        value={direction}
                                        onChange={(e) => {
                                            setDirection(e.target.value);
                                            setErrors((prev) => ({ ...prev, direction: '' }));
                                            setDraft((prev) => ({ ...prev, direction: e.target.value }));
                                        }}
                                        label="Направление"
                                        sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                                    >
                                        {directions.map((dir) => (
                                            <MenuItem key={dir} value={dir}>
                                                {dir}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.direction && (
                                        <Typography variant="caption" color="error">
                                            {errors.direction}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!!errors.line}>
                                    <InputLabel>Линия</InputLabel>
                                    <Select
                                        value={line}
                                        onChange={(e) => {
                                            setLine(e.target.value);
                                            setErrors((prev) => ({ ...prev, line: '' }));
                                            setDraft((prev) => ({ ...prev, line: e.target.value }));
                                        }}
                                        label="Линия"
                                        sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                                    >
                                        {lines.map((ln) => (
                                            <MenuItem key={ln} value={ln}>
                                                {ln}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.line && (
                                        <Typography variant="caption" color="error">
                                            {errors.line}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!!errors.formType}>
                                    <InputLabel>Тип формы</InputLabel>
                                    <Select
                                        value={formType}
                                        onChange={(e) => {
                                            setFormType(e.target.value);
                                            setCategory('');
                                            setSubcategory('');
                                            setErrors((prev) => ({ ...prev, formType: '' }));
                                            setDraft((prev) => ({
                                                ...prev,
                                                formType: e.target.value,
                                                category: '',
                                                subcategory: '',
                                            }));
                                        }}
                                        label="Тип формы"
                                        sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                                    >
                                        {forms.map((frm) => (
                                            <MenuItem key={frm} value={frm}>
                                                {frm}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.formType && (
                                        <Typography variant="caption" color="error">
                                            {errors.formType}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider sx={{ my: 3 }} />
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Данные тикета
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                    <TextField
                                        fullWidth
                                        label="Номер тикета"
                                        value={ticketNumber}
                                        onChange={(e) => {
                                            setTicketNumber(e.target.value);
                                            setErrors((prev) => ({ ...prev, ticketNumber: '' }));
                                            setDraft((prev) => ({ ...prev, ticketNumber: e.target.value }));
                                        }}
                                        error={!!errors.ticketNumber}
                                        helperText={errors.ticketNumber || 'Введите номер тикета или сгенерируйте новый'}
                                        sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                                    />
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleTakeNewTicket}
                                        sx={{ height: 56, minWidth: 150, borderRadius: 1 }}
                                    >
                                        Новый тикет
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Почта саппорта"
                                    value={supportEmail}
                                    onChange={(e) => {
                                        setSupportEmail(e.target.value);
                                        setErrors((prev) => ({ ...prev, supportEmail: '' }));
                                        setDraft((prev) => ({ ...prev, supportEmail: e.target.value }));
                                    }}
                                    error={!!errors.supportEmail}
                                    helperText={errors.supportEmail || 'Введите email сотрудника поддержки'}
                                    sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider sx={{ my: 3 }} />
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Оценка
                                </Typography>
                                <FormControl fullWidth error={!!errors.category}>
                                    <InputLabel>Категория</InputLabel>
                                    <Select
                                        value={category}
                                        onChange={(e) => {
                                            setCategory(e.target.value);
                                            setSubcategory('');
                                            setErrors((prev) => ({ ...prev, category: '' }));
                                            setDraft((prev) => ({
                                                ...prev,
                                                category: e.target.value,
                                                subcategory: '',
                                            }));
                                        }}
                                        label="Категория"
                                        disabled={!formType}
                                        sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                                    >
                                        {formType &&
                                            categories[formType].map((cat) => (
                                                <MenuItem key={cat} value={cat}>
                                                    {cat}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    {errors.category && (
                                        <Typography variant="caption" color="error">
                                            {errors.category}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Подкатегория</InputLabel>
                                    <Select
                                        value={subcategory}
                                        onChange={(e) => {
                                            setSubcategory(e.target.value);
                                            setDraft((prev) => ({ ...prev, subcategory: e.target.value }));
                                        }}
                                        label="Подкатегория"
                                        disabled={!category}
                                        sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                                    >
                                        {category &&
                                            subcategories[formType]?.[category]?.map((sub) => (
                                                <MenuItem key={sub} value={sub}>
                                                    {sub}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Количество ошибок"
                                    type="number"
                                    value={errorsCount}
                                    onChange={(e) => {
                                        setErrorsCount(e.target.value);
                                        setErrors((prev) => ({ ...prev, errorsCount: '' }));
                                        setDraft((prev) => ({ ...prev, errorsCount: e.target.value }));
                                    }}
                                    error={!!errors.errorsCount}
                                    helperText={errors.errorsCount || 'Укажите количество ошибок (0 или больше)'}
                                    sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Комментарии"
                                    multiline
                                    rows={4}
                                    value={comments}
                                    onChange={(e) => {
                                        setComments(e.target.value);
                                        setDraft((prev) => ({ ...prev, comments: e.target.value }));
                                    }}
                                    helperText="Опишите результаты проверки или замечания"
                                    sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, pt: 0 }}>
                        {draft && (
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={handleClearDraft}
                                    sx={{
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        '&:hover': {
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        },
                                    }}
                                >
                                    Очистить черновик
                                </Button>
                            </motion.div>
                        )}
                        <Button
                            onClick={handleCloseCheckDialog}
                            sx={{ color: 'text.secondary', fontWeight: 500 }}
                        >
                            Закрыть
                        </Button>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
                                onClick={handleSaveCheck}
                                sx={{
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    },
                                }}
                            >
                                Сохранить
                            </Button>
                        </motion.div>
                    </DialogActions>
                </motion.div>
            </Dialog>

            {/* Диалог для обработки апелляции */}
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
                        Обработка апелляции #{selectedAppeal?.id}
                    </DialogTitle>
                    <DialogContent>
                        {selectedAppeal && (
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Комментарий апелляции
                                </Typography>
                                <Typography variant="body1">{selectedAppeal.comment}</Typography>
                            </Box>
                        )}
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Причина решения"
                            fullWidth
                            multiline
                            rows={4}
                            value={appealResponse}
                            onChange={(e) => {
                                setAppealResponse(e.target.value);
                                setAppealResponseError('');
                            }}
                            error={!!appealResponseError}
                            helperText={appealResponseError}
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
                                variant="contained"
                                color="error"
                                startIcon={<Cancel />}
                                onClick={() => handleSubmitAppealResponse(false)}
                                sx={{
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    },
                                }}
                            >
                                Отклонить
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<CheckCircle />}
                                onClick={() => handleSubmitAppealResponse(true)}
                                sx={{
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    },
                                }}
                            >
                                Принять
                            </Button>
                        </motion.div>
                    </DialogActions>
                </motion.div>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarMessage.includes('сохранена') || snackbarMessage.includes('очищен') ? 'success' : 'error'}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}