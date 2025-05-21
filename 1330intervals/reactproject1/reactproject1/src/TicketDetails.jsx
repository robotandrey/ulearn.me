import React, { useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { populateEmployeeDetails, generateNewTicket } from './constants';

export default function TicketDetails({
    contactChannel,
    ticketNumber,
    setTicketNumber,
    phoneNumber,
    setPhoneNumber,
    contactDate,
    setContactDate,
    contactTime,
    setContactTime,
    employeeEmail,
    setEmployeeEmail,
    employeeFullName,
    setEmployeeFullName,
    line,
    setLine,
    skill,
    setSkill,
    rpgFullName,
    setRpgFullName,
    lead,
    setLead,
    errors,
}) {
    useEffect(() => {
        populateEmployeeDetails(employeeEmail, setEmployeeFullName, setLine, setSkill, setRpgFullName, setLead);
    }, [employeeEmail, setEmployeeFullName, setLine, setSkill, setRpgFullName, setLead]);

    const handleNewTicket = () => {
        generateNewTicket(setTicketNumber, setEmployeeEmail, setEmployeeFullName, setLine, setSkill, setRpgFullName, setLead);
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Данные тикета</Typography>
            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        fullWidth
                        label="Номер тикета"
                        value={ticketNumber}
                        onChange={(e) => setTicketNumber(e.target.value)}
                        error={!!errors.ticketNumber}
                        helperText={errors.ticketNumber}
                    />
                    <Button variant="outlined" onClick={handleNewTicket}>
                        Новый тикет
                    </Button>
                    {contactChannel === "Звонок" && (
                        <TextField
                            fullWidth
                            label="Номер телефона"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    )}
                    <DatePicker
                        label="Дата обращения"
                        value={contactDate}
                        onChange={setContactDate}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                error={!!errors.contactDate}
                                helperText={errors.contactDate}
                            />
                        )}
                    />
                    <TextField
                        fullWidth
                        label="Время обращения"
                        value={contactTime}
                        onChange={(e) => setContactTime(e.target.value)}
                        error={!!errors.contactTime}
                        helperText={errors.contactTime}
                    />
                    <TextField
                        fullWidth
                        label="Адрес эл. почты сотрудника"
                        value={employeeEmail}
                        onChange={(e) => setEmployeeEmail(e.target.value)}
                        error={!!errors.employeeEmail}
                        helperText={errors.employeeEmail}
                    />
                    <TextField
                        fullWidth
                        label="ФИО сотрудника"
                        value={employeeFullName}
                        disabled
                        sx={{
                            '& .MuiInputBase-input.Mui-disabled': {
                                color: '#000000',
                                WebkitTextFillColor: '#000000',
                                opacity: 1,
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Линия"
                        value={line}
                        disabled
                        sx={{
                            '& .MuiInputBase-input.Mui-disabled': {
                                color: '#000000',
                                WebkitTextFillColor: '#000000',
                                opacity: 1,
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Скилл"
                        value={skill}
                        disabled
                        sx={{
                            '& .MuiInputBase-input.Mui-disabled': {
                                color: '#000000',
                                WebkitTextFillColor: '#000000',
                                opacity: 1,
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="РПГ (ФИО полностью)"
                        value={rpgFullName}
                        disabled
                        sx={{
                            '& .MuiInputBase-input.Mui-disabled': {
                                color: '#000000',
                                WebkitTextFillColor: '#000000',
                                opacity: 1,
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Ведущий"
                        value={lead}
                        disabled
                        sx={{
                            '& .MuiInputBase-input.Mui-disabled': {
                                color: '#000000',
                                WebkitTextFillColor: '#000000',
                                opacity: 1,
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}