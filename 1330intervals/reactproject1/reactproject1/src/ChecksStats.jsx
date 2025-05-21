import React from 'react';
import { Box, Typography } from '@mui/material';

export default function ChecksStats({ checks }) {
    const totalChecks = checks.length;
    const totalErrors = checks.reduce((sum, check) => sum + (check.errors || 0), 0);

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Статистика</Typography>
            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                <Typography>Всего проверок: {totalChecks}</Typography>
                <Typography>Общее количество ошибок: {totalErrors}</Typography>
            </Box>
        </Box>
    );
}