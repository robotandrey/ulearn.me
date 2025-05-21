import React from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { checkTypes } from './constants';

export default function ChecksTable({ checks, filterType, setFilterType }) {
    const filteredChecks = filterType
        ? checks.filter(check => check.type === filterType)
        : checks;

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Список проверок</Typography>
            <FormControl fullWidth sx={{ mb: 2, maxWidth: 300 }}>
                <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Фильтр по типу</InputLabel>
                <Select value={filterType || ''} onChange={(e) => setFilterType(e.target.value)}>
                    <MenuItem value="">Все</MenuItem>
                    {checkTypes.map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Номер</TableCell>
                        <TableCell>Тип</TableCell>
                        <TableCell>Дата</TableCell>
                        <TableCell>Ошибок</TableCell>
                        <TableCell>Статус</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredChecks.map((check) => (
                        <TableRow key={check.number}>
                            <TableCell>{check.number}</TableCell>
                            <TableCell>{check.type}</TableCell>
                            <TableCell>{check.date}</TableCell>
                            <TableCell>{check.errors}</TableCell>
                            <TableCell>{check.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}