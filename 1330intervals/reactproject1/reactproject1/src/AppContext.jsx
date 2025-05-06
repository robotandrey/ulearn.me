import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState({
        role: 'support',
        fullName: 'Иванов И.И.',
        email: 'ivanov@example.com',
    });

    const [checks, setChecks] = useState([
        {
            id: 1,
            ticketNumber: 'T12345',
            supportEmail: 'ivanov@example.com',
            date: '15.10.2023',
            type: 'Чат-поддержка',
            errors: 2,
            penaltyCoefficient: 0.2,
            status: 'new',
            category: 'Технические проблемы',
            subcategory: 'Ошибка подключения',
            comments: 'Неполный ответ на запрос клиента.',
            isEditable: true,
            checkedBy: 'Петров П.П.',
            number: '#2456',
            description: 'Проверка качества ответов в чат-поддержке.',
            errorDetails: [
                { id: 1, text: 'Неполный ответ на запрос клиента о возврате.' },
                { id: 2, text: 'Отсутствие приветствия в начале диалога.' },
            ],
        },
        {
            id: 2,
            ticketNumber: 'T12346',
            supportEmail: 'petrov@example.com',
            date: '14.10.2023',
            type: 'Электронная почта',
            errors: 0,
            penaltyCoefficient: 0.0,
            status: 'resolved',
            category: 'Полнота ответа',
            subcategory: 'Все вопросы раскрыты',
            comments: 'Отличная работа!',
            isEditable: false,
            checkedBy: 'Петров П.П.',
            number: '#2455',
            description: 'Проверка ответов по электронной почте.',
            errorDetails: [],
        },
    ]);

    const [appeals, setAppeals] = useState([
        {
            id: 1,
            checkId: 1,
            ticketNumber: 'T12345',
            supportEmail: 'ivanov@example.com',
            comment: 'Не согласен с замечанием об отсутствии приветствия.',
            status: 'new',
            createdAt: '16.10.2023',
        },
    ]);

    const updateUser = (role) => {
        setUser({
            role,
            fullName: role === 'support' ? 'Иванов И.И.' : 'Петров П.П.',
            email: role === 'support' ? 'ivanov@example.com' : 'petrov@example.com',
        });
    };

    const addCheck = (check) => {
        const newCheck = {
            ...check,
            id: checks.length + 1,
            number: `#${2456 + checks.length}`,
            status: 'new',
            checkedBy: user.fullName,
            description: `Проверка ${check.type.toLowerCase()}.`,
            errorDetails: check.errors
                ? [{ id: 1, text: check.comments || 'Ошибка' }]
                : [],
            isEditable: true,
            penaltyCoefficient: check.errors * 0.1,
        };
        setChecks([...checks, newCheck]);
    };

    const updateCheckStatus = (id, status, appealComment) => {
        setChecks(
            checks.map((check) =>
                check.id === id
                    ? { ...check, status, appealComment: appealComment || check.appealComment }
                    : check
            )
        );
    };

    const addAppeal = (appeal) => {
        const newAppeal = {
            ...appeal,
            id: appeals.length + 1,
            createdAt: new Date().toLocaleDateString(),
        };
        setAppeals([...appeals, newAppeal]);
    };

    const updateAppeal = (id, status, response) => {
        setAppeals(
            appeals.map((appeal) =>
                appeal.id === id ? { ...appeal, status, response } : appeal
            )
        );
        const appeal = appeals.find((a) => a.id === id);
        if (appeal) {
            setChecks(
                checks.map((check) =>
                    check.id === appeal.checkId
                        ? {
                            ...check,
                            status: status === 'accepted' ? 'resolved' : 'disputed',
                            penaltyCoefficient:
                                status === 'accepted'
                                    ? Math.max(0, (check.penaltyCoefficient || 0) - 0.1)
                                    : check.penaltyCoefficient || 0,
                        }
                        : check
                )
            );
        }
    };

    return (
        <AppContext.Provider
            value={{ user, updateUser, checks, addCheck, updateCheckStatus, appeals, addAppeal, updateAppeal }}
        >
            {children}
        </AppContext.Provider>
    );
};