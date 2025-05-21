import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function QCSpecialistDashboard() {
    const { user, addCheck, checks } = useContext(AppContext);
    const [escalationTypeHasEscalation, setEscalationTypeHasEscalation] = useState(false);

    // States
    const [openCheckDialog, setOpenCheckDialog] = useState(false);
    const [draft, setDraft] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const [formVariant, setFormVariant] = useState('');

    // Form states
    const [analysisDate] = useState(new Date('2025-05-20T19:15:00-03:00')); // Текущая дата и время (07:15 PM -03)
    const [auditorName] = useState(user.fullName); // Из контекста
    const [checkType, setCheckType] = useState('');
    const [contactChannel, setContactChannel] = useState('');
    const [ticketNumber, setTicketNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [contactDate, setContactDate] = useState(null);
    const [contactTime, setContactTime] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeeFullName, setEmployeeFullName] = useState('');
    const [line, setLine] = useState('');
    const [skill, setSkill] = useState('');
    const [rpgFullName, setRpgFullName] = useState('');
    const [lead, setLead] = useState('');
    const [product, setProduct] = useState('');
    const [ccContactType, setCcContactType] = useState('');
    const [ccContactCategory, setCcContactCategory] = useState('');
    const [ccContactTopic, setCcContactTopic] = useState('');

    // Variant 1 states
    const [selectionCorrectness, setSelectionCorrectness] = useState('');
    const [tovCompliance, setTovCompliance] = useState('');
    const [tovComplianceCategory2, setTovComplianceCategory2] = useState('');
    const [escalationCorrectness, setEscalationCorrectness] = useState('');
    const [escalationType, setEscalationType] = useState('');
    const [loyaltyCompensation, setLoyaltyCompensation] = useState('');
    const [otherErrorsCat1, setOtherErrorsCat1] = useState('');
    const [otherErrorsCat2, setOtherErrorsCat2] = useState('');
    const [otherErrorsCat3, setOtherErrorsCat3] = useState('');
    const [softwareWorkCat1, setSoftwareWorkCat1] = useState('');
    const [softwareWorkCat2, setSoftwareWorkCat2] = useState('');
    const [operatorErrorAffectedRating, setOperatorErrorAffectedRating] = useState('');

    // Variant 2 states
    const [selectionHasError, setSelectionHasError] = useState(false);
    const [selectionIsCritical, setSelectionIsCritical] = useState(false);
    const [selectionErrorDetail, setSelectionErrorDetail] = useState('');
    const [tovHasError, setTovHasError] = useState(false);
    const [tovIsCritical, setTovIsCritical] = useState(false);
    const [tovErrorDetail, setTovErrorDetail] = useState('');
    const [escalationHasError, setEscalationHasError] = useState(false);
    const [escalationIsCritical, setEscalationIsCritical] = useState(false);
    const [escalationErrorDetail, setEscalationErrorDetail] = useState('');
    const [loyaltyHasError, setLoyaltyHasError] = useState(false);
    const [loyaltyIsCritical, setLoyaltyIsCritical] = useState(false);
    const [loyaltyErrorDetail, setLoyaltyErrorDetail] = useState('');
    const [otherErrorsCat1HasError, setOtherErrorsCat1HasError] = useState(false);
    const [otherErrorsCat1IsCritical, setOtherErrorsCat1IsCritical] = useState(false);
    const [otherErrorsCat1Detail, setOtherErrorsCat1Detail] = useState('');
    const [otherErrorsCat2HasError, setOtherErrorsCat2HasError] = useState(false);
    const [otherErrorsCat2IsCritical, setOtherErrorsCat2IsCritical] = useState(false);
    const [otherErrorsCat2Detail, setOtherErrorsCat2Detail] = useState('');
    const [otherErrorsCat3HasError, setOtherErrorsCat3HasError] = useState(false);
    const [otherErrorsCat3IsCritical, setOtherErrorsCat3IsCritical] = useState(false);
    const [otherErrorsCat3Detail, setOtherErrorsCat3Detail] = useState('');
    const [softwareWorkCat1HasError, setSoftwareWorkCat1HasError] = useState(false);
    const [softwareWorkCat1IsCritical, setSoftwareWorkCat1IsCritical] = useState(false);
    const [softwareWorkCat1Detail, setSoftwareWorkCat1Detail] = useState('');
    const [softwareWorkCat2HasError, setSoftwareWorkCat2HasError] = useState(false);
    const [softwareWorkCat2IsCritical, setSoftwareWorkCat2IsCritical] = useState(false);
    const [softwareWorkCat2Detail, setSoftwareWorkCat2Detail] = useState('');
    const [operatorErrorHasError, setOperatorErrorHasError] = useState(false);
    const [operatorErrorIsCritical, setOperatorErrorIsCritical] = useState(false);
    const [operatorErrorDetail, setOperatorErrorDetail] = useState('');

    const [comments, setComments] = useState('');

    // Dependent dropdown states
    const [topicOptions, setTopicOptions] = useState([]);

    // Errors
    const [errors, setErrors] = useState({});

    // Options
    const checkTypes = [
        "Выгрузка низких оценок",
        "Рандомная проверка",
        "Обращение из цепочки",
        "Вычитка jira",
        "Вычитка удержаний",
        "Снижение CSAT",
        "Потенциальный фрод",
        "ER",
    ];
    const contactChannels = ["Чат", "Звонок", "Электронная почта"];
    const products = [
        "Ozon Карта",
        "Накопительный счет",
        "Вклад",
        "Ozon Seller",
        "РКО",
        "Рассрочка МКК",
        "ЦФА",
        "Ozon маркетплейс",
    ];
    const ccContactTypes = ["Консультация", "Проблема", "Жалоба", "Антифрод", "Не создано обращение"];
    const categories = [
        "Карта_Оформление",
        "Карта_Условия_использования",
        "Карта_Платежи_и_переводы",
        "Карта_Персональные_данные_и_доступ",
        "Карта_Изменение_ПД",
        "Карта_Переоткрытие",
        "Карта_Антифрод",
        "Карта_Фин_мониторинг",
        "Карта_Диспутная_операция",
        "Карта_Прочее",
        "Накопления",
        "Акции_и_программы_лояльности",
        "Вопросы_по_Ozon",
        "Аресты_и_взыскания",
        "Карта_Отказ_от_продукта",
        "Закрытие_Карты_Дроп",
        "Блокировка_АФ_Дроп",
        "Блокировка_АФ",
        "Антифрод_Финцерт",
        "Отказ_от_Premium_подписки",
        "Жалобы_Дебет",
        "Обращение_ultra_клиента",
        "Эскалация_на_Карту",
        "Перевод_на_Рассрочку",
        "Перевод_на_РКО",
        "Перевод_на_Агентов",
        "Эскалация_обучение",
        "Эскалировать_на_линию_Карты_для_АКЦ",
        "Категории_для_Бэкофиса_КС_Дебета",
        "Встреча_с_представителем_ЕФИН",
        "Встреча_с_представителем_ТАРС",
        "Встреча_для_идентификации_АПВЗ",
        "Карта_Запрос_от_гос_органов_письменный_запрос",
    ];
    const categoryToTopics = {
        "Карта_Оформление": ["Оформление карты", "Проблемы с оформлением"],
        "Карта_Условия_использования": ["Условия использования", "Лимиты"],
        "Карта_Платежи_и_переводы": ["Проблемы с платежами", "Переводы"],
        "Карта_Персональные_данные_и_доступ": ["Изменение данных", "Проблемы с доступом"],
        "Карта_Изменение_ПД": ["Обновление данных", "Ошибка в данных"],
        "Карта_Переоткрытие": ["Переоткрытие карты", "Проблемы с переоткрытием"],
        "Карта_Антифрод": ["Фрод", "Подозрительные операции"],
        "Карта_Фин_мониторинг": ["Мониторинг", "Проверка операций"],
        "Карта_Диспутная_операция": ["Диспут", "Оспаривание операции"],
        "Карта_Прочее": ["Прочие вопросы"],
        "Накопления": ["Условия накоплений", "Проблемы с накоплениями"],
        "Акции_и_программы_лояльности": ["Акции", "Лояльность"],
        "Вопросы_по_Ozon": ["Общие вопросы", "Проблемы с заказом"],
        "Аресты_и_взыскания": ["Арест счета", "Взыскания"],
        "Карта_Отказ_от_продукта": ["Отказ от карты", "Проблемы с отказом"],
        "Закрытие_Карты_Дроп": ["Закрытие", "Дроп"],
        "Блокировка_АФ_Дроп": ["Блокировка", "Дроп"],
        "Блокировка_АФ": ["Блокировка", "Антифрод"],
        "Антифрод_Финцерт": ["Финцерт", "Антифрод"],
        "Отказ_от_Premium_подписки": ["Отказ", "Проблемы с подпиской"],
        "Жалобы_Дебет": ["Жалобы", "Дебетовые карты"],
        "Обращение_ultra_клиента": ["Ultra клиент", "Особые запросы"],
        "Эскалация_на_Карту": ["Эскалация", "Карты"],
        "Перевод_на_Рассрочку": ["Перевод", "Рассрочка"],
        "Перевод_на_РКО": ["Перевод", "РКО"],
        "Перевод_на_Агентов": ["Перевод", "Агенты"],
        "Эскалация_обучение": ["Эскалация", "Обучение"],
        "Эскалировать_на_линию_Карты_для_АКЦ": ["Эскалация", "АКЦ"],
        "Категории_для_Бэкофиса_КС_Дебета": ["Бэкофис", "Дебет"],
        "Встреча_с_представителем_ЕФИН": ["Встреча", "ЕФИН"],
        "Встреча_с_представителем_ТАРС": ["Встреча", "ТАРС"],
        "Встреча_для_идентификации_АПВЗ": ["Встреча", "АПВЗ"],
        "Карта_Запрос_от_гос_органов_письменный_запрос": ["Запрос", "Госорганы"],
    };
    const selectionCorrectnessOptions = [
        "Ошибка в категории",
        "Ошибка в теме",
        "Категория верна, ошибка в теме",
        "Не указана категория/тема",
        "Обращение создано, когда не требовалось",
        "Не создано обращение",
    ];
    const tovComplianceOptions = [
        "Не_соответствует_ситуации_и_ТОВ",
        "Крит_нарушение_ТоВ",
    ];
    const tovComplianceCat2Options = ["Категория1", "Категория2"];
    const escalationCorrectnessOptions = [
        "Чрезмерная_эскалация",
        "Преждевременная_эскалация",
        "Некорректный_формат_эскалации",
        "Эскалация_не_в_тот_отдел",
        "Отсутствие эскалации",
    ];
    const escalationTypeOptions = [
        "В SpaceShip",
        "Звонок",
        "Через задачу",
        "Передача тикета в треде",
        "Между СГ",
        "В чат БО",
        "Другое",
    ];
    const loyaltyCompensationOptions = [
        "Нужна, не передали на компенс",
    ];
    const otherErrorsOptions = [
        "Ошибка_другого_сотрудника",
        "Есть_ошибки_в_решении",
    ];
    const softwareWorkOptions = [
        "Некорректная работа с комментарием",
        "Некорректная работа с удержанием",
        "Обращение не было создано/создано лишнее",
        "Некорректный выбор состояния обращения",
        "Некорректная работа с задачей Jira/Jit",
        "Не нашел/не закрыл дубль",
        "Работа с блокировками",
        "Не загружены файлы в обращение",
    ];
    const operatorErrorAffectedRatingOptions = [
        "Повлияла",
    ];

    // useEffect for dependent dropdowns
    useEffect(() => {
        if (ccContactCategory) {
            setTopicOptions(categoryToTopics[ccContactCategory] || []);
            setCcContactTopic('');
        } else {
            setTopicOptions([]);
            setCcContactTopic('');
        }
    }, [ccContactCategory]);

    // useEffect for auto-populating employee details
    useEffect(() => {
        if (employeeEmail) {
            setEmployeeFullName("Иванов Иван Иванович");
            setLine("Первая линия");
            setSkill("Техподдержка");
            setRpgFullName("Петров Петр Петрович");
            setLead("Сидоров Сидор Сидорович");
        } else {
            setEmployeeFullName("");
            setLine("");
            setSkill("");
            setRpgFullName("");
            setLead("");
        }
    }, [employeeEmail]);

    // Functions
    const handleOpenCheckDialog = () => {
        setOpenCheckDialog(true);
        if (draft) {
            setFormVariant(draft.formVariant || '');
            setCheckType(draft.checkType);
            setContactChannel(draft.contactChannel);
            setTicketNumber(draft.ticketNumber);
            setPhoneNumber(draft.phoneNumber);
            setContactDate(draft.contactDate);
            setContactTime(draft.contactTime);
            setEmployeeEmail(draft.employeeEmail);
            setEmployeeFullName(draft.employeeFullName);
            setLine(draft.line);
            setSkill(draft.skill);
            setRpgFullName(draft.rpgFullName);
            setLead(draft.lead);
            setProduct(draft.product);
            setCcContactType(draft.ccContactType);
            setCcContactCategory(draft.ccContactCategory);
            setCcContactTopic(draft.ccContactTopic);
            setComments(draft.comments || '');
            setEscalationTypeHasEscalation(draft.escalationTypeHasEscalation || false);

            // Variant 1
            setSelectionCorrectness(draft.selectionCorrectness);
            setTovCompliance(draft.tovCompliance);
            setTovComplianceCategory2(draft.tovComplianceCategory2);
            setEscalationCorrectness(draft.escalationCorrectness);
            setEscalationType(draft.escalationType);
            setLoyaltyCompensation(draft.loyaltyCompensation);
            setOtherErrorsCat1(draft.otherErrorsCat1);
            setOtherErrorsCat2(draft.otherErrorsCat2);
            setOtherErrorsCat3(draft.otherErrorsCat3);
            setSoftwareWorkCat1(draft.softwareWorkCat1);
            setSoftwareWorkCat2(draft.softwareWorkCat2);
            setOperatorErrorAffectedRating(draft.operatorErrorAffectedRating);

            // Variant 2
            setSelectionHasError(draft.selectionHasError || false);
            setSelectionIsCritical(draft.selectionIsCritical || false);
            setSelectionErrorDetail(draft.selectionErrorDetail || '');
            setTovHasError(draft.tovHasError || false);
            setTovIsCritical(draft.tovIsCritical || false);
            setTovErrorDetail(draft.tovErrorDetail || '');
            setEscalationHasError(draft.escalationHasError || false);
            setEscalationIsCritical(draft.escalationIsCritical || false);
            setEscalationErrorDetail(draft.escalationErrorDetail || '');
            setLoyaltyHasError(draft.loyaltyHasError || false);
            setLoyaltyIsCritical(draft.loyaltyIsCritical || false);
            setLoyaltyErrorDetail(draft.loyaltyErrorDetail || '');
            setOtherErrorsCat1HasError(draft.otherErrorsCat1HasError || false);
            setOtherErrorsCat1IsCritical(draft.otherErrorsCat1IsCritical || false);
            setOtherErrorsCat1Detail(draft.otherErrorsCat1Detail || '');
            setOtherErrorsCat2HasError(draft.otherErrorsCat2HasError || false);
            setOtherErrorsCat2IsCritical(draft.otherErrorsCat2IsCritical || false);
            setOtherErrorsCat2Detail(draft.otherErrorsCat2Detail || '');
            setOtherErrorsCat3HasError(draft.otherErrorsCat3HasError || false);
            setOtherErrorsCat3IsCritical(draft.otherErrorsCat3IsCritical || false);
            setOtherErrorsCat3Detail(draft.otherErrorsCat3Detail || '');
            setSoftwareWorkCat1HasError(draft.softwareWorkCat1HasError || false);
            setSoftwareWorkCat1IsCritical(draft.softwareWorkCat1IsCritical || false);
            setSoftwareWorkCat1Detail(draft.softwareWorkCat1Detail || '');
            setSoftwareWorkCat2HasError(draft.softwareWorkCat2HasError || false);
            setSoftwareWorkCat2IsCritical(draft.softwareWorkCat2IsCritical || false);
            setSoftwareWorkCat2Detail(draft.softwareWorkCat2Detail || '');
            setOperatorErrorHasError(draft.operatorErrorHasError || false);
            setOperatorErrorIsCritical(draft.operatorErrorIsCritical || false);
            setOperatorErrorDetail(draft.operatorErrorDetail || '');
        }
    };

    const handleCloseCheckDialog = () => {
        setDraft({
            formVariant,
            checkType,
            contactChannel,
            ticketNumber,
            phoneNumber,
            contactDate,
            contactTime,
            employeeEmail,
            employeeFullName,
            line,
            skill,
            rpgFullName,
            lead,
            product,
            ccContactType,
            ccContactCategory,
            ccContactTopic,
            comments,
            escalationTypeHasEscalation,

            // Variant 1
            selectionCorrectness,
            tovCompliance,
            tovComplianceCategory2,
            escalationCorrectness,
            escalationType,
            loyaltyCompensation,
            otherErrorsCat1,
            otherErrorsCat2,
            otherErrorsCat3,
            softwareWorkCat1,
            softwareWorkCat2,
            operatorErrorAffectedRating,

            // Variant 2
            selectionHasError,
            selectionIsCritical,
            selectionErrorDetail,
            tovHasError,
            tovIsCritical,
            tovErrorDetail,
            escalationHasError,
            escalationIsCritical,
            escalationErrorDetail,
            loyaltyHasError,
            loyaltyIsCritical,
            loyaltyErrorDetail,
            otherErrorsCat1HasError,
            otherErrorsCat1IsCritical,
            otherErrorsCat1Detail,
            otherErrorsCat2HasError,
            otherErrorsCat2IsCritical,
            otherErrorsCat2Detail,
            otherErrorsCat3HasError,
            otherErrorsCat3IsCritical,
            otherErrorsCat3Detail,
            softwareWorkCat1HasError,
            softwareWorkCat1IsCritical,
            softwareWorkCat1Detail,
            softwareWorkCat2HasError,
            softwareWorkCat2IsCritical,
            softwareWorkCat2Detail,
            operatorErrorHasError,
            operatorErrorIsCritical,
            operatorErrorDetail,
        });
        setOpenCheckDialog(false);
    };

    const handleSaveCheck = () => {
        if (validateForm()) {
            const errorsCount = formVariant === 'Вариант 1'
                ? [
                    otherErrorsCat1 !== 'Нет_ошибок' ? 1 : 0,
                    otherErrorsCat2 !== 'Нет_ошибок' ? 1 : 0,
                    otherErrorsCat3 !== 'Нет_ошибок' ? 1 : 0,
                    softwareWorkCat1 !== 'Нет ошибок' ? 1 : 0,
                    softwareWorkCat2 !== 'Нет ошибок' ? 1 : 0,
                ].reduce((a, b) => a + b, 0)
                : [
                    otherErrorsCat1HasError ? 1 : 0,
                    otherErrorsCat2HasError ? 1 : 0,
                    otherErrorsCat3HasError ? 1 : 0,
                    softwareWorkCat1HasError ? 1 : 0,
                    softwareWorkCat2HasError ? 1 : 0,
                ].reduce((a, b) => a + b, 0);

            const newCheck = {
                ticketNumber,
                supportEmail: employeeEmail,
                date: new Date().toLocaleDateString(),
                type: checkType,
                errors: errorsCount,
                penaltyCoefficient: errorsCount * 0.1,
                status: 'new',
                category: ccContactCategory,
                subcategory: ccContactTopic,
                comments,
                isEditable: true,
                checkedBy: user.fullName,
                number: `#${2456 + checks.length + 1}`,
                description: `Проверка ${checkType.toLowerCase()}.`,
                errorDetails: errorsCount > 0
                    ? [
                        { id: 1, text: comments || 'Обнаружены ошибки' },
                        ...(errorsCount > 1 ? [{ id: 2, text: 'Дополнительные ошибки' }] : []),
                    ]
                    : [],
                analysisDate: analysisDate.toLocaleDateString(),
                auditorName,
                contactChannel,
                phoneNumber,
                contactDate: contactDate ? contactDate.toLocaleDateString() : null,
                contactTime,
                employeeFullName,
                line,
                skill,
                rpgFullName,
                lead,
                product,
                ccContactType,
                selectionCorrectness: formVariant === 'Вариант 1' ? selectionCorrectness : selectionErrorDetail,
                tovCompliance: formVariant === 'Вариант 1' ? tovCompliance : tovErrorDetail,
                tovComplianceCategory2,
                escalationCorrectness: formVariant === 'Вариант 1' ? escalationCorrectness : escalationErrorDetail,
                escalationType,
                loyaltyCompensation: formVariant === 'Вариант 1' ? loyaltyCompensation : loyaltyErrorDetail,
                operatorErrorAffectedRating: formVariant === 'Вариант 1' ? operatorErrorAffectedRating : operatorErrorDetail,
            };
            addCheck(newCheck);
            setDraft(null);
            resetForm();
            setOpenCheckDialog(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!checkType) newErrors.checkType = 'Обязательное поле';
        if (!contactChannel) newErrors.contactChannel = 'Обязательное поле';
        if (!ticketNumber) newErrors.ticketNumber = 'Обязательное поле';
        if (!contactDate) newErrors.contactDate = 'Обязательное поле';
        if (!contactTime) newErrors.contactTime = 'Обязательное поле';
        if (!employeeEmail) newErrors.employeeEmail = 'Обязательное поле';
        if (!product) newErrors.product = 'Обязательное поле';
        if (!ccContactType) newErrors.ccContactType = 'Обязательное поле';
        if (!ccContactCategory) newErrors.ccContactCategory = 'Обязательное поле';
        if (!ccContactTopic && ccContactCategory) newErrors.ccContactTopic = 'Обязательное поле';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setFormVariant('');
        setCheckType('');
        setContactChannel('');
        setTicketNumber('');
        setPhoneNumber('');
        setContactDate(null);
        setContactTime('');
        setEmployeeEmail('');
        setEmployeeFullName('');
        setLine('');
        setSkill('');
        setRpgFullName('');
        setLead('');
        setProduct('');
        setCcContactType('');
        setCcContactCategory('');
        setCcContactTopic('');
        setComments('');
        setEscalationTypeHasEscalation(false);

        // Variant 1
        setSelectionCorrectness('');
        setTovCompliance('');
        setTovComplianceCategory2('');
        setEscalationCorrectness('');
        setEscalationType('');
        setLoyaltyCompensation('');
        setOtherErrorsCat1('');
        setOtherErrorsCat2('');
        setOtherErrorsCat3('');
        setSoftwareWorkCat1('');
        setSoftwareWorkCat2('');
        setOperatorErrorAffectedRating('');

        // Variant 2
        setSelectionHasError(false);
        setSelectionIsCritical(false);
        setSelectionErrorDetail('');
        setTovHasError(false);
        setTovIsCritical(false);
        setTovErrorDetail('');
        setEscalationHasError(false);
        setEscalationIsCritical(false);
        setEscalationErrorDetail('');
        setLoyaltyHasError(false);
        setLoyaltyIsCritical(false);
        setLoyaltyErrorDetail('');
        setOtherErrorsCat1HasError(false);
        setOtherErrorsCat1IsCritical(false);
        setOtherErrorsCat1Detail('');
        setOtherErrorsCat2HasError(false);
        setOtherErrorsCat2IsCritical(false);
        setOtherErrorsCat2Detail('');
        setOtherErrorsCat3HasError(false);
        setOtherErrorsCat3IsCritical(false);
        setOtherErrorsCat3Detail('');
        setSoftwareWorkCat1HasError(false);
        setSoftwareWorkCat1IsCritical(false);
        setSoftwareWorkCat1Detail('');
        setSoftwareWorkCat2HasError(false);
        setSoftwareWorkCat2IsCritical(false);
        setSoftwareWorkCat2Detail('');
        setOperatorErrorHasError(false);
        setOperatorErrorIsCritical(false);
        setOperatorErrorDetail('');

        setErrors({});
    };

    const handleClearDraft = () => {
        setDraft(null);
        resetForm();
    };

    const handleNewTicket = () => {
        setTicketNumber(`TICK-${Date.now()}`);
        setEmployeeEmail('test@example.com');
        setEmployeeFullName('Иванов Иван Иванович');
        setLine('Первая линия');
        setSkill('Техподдержка');
        setRpgFullName('Петров Петр Петрович');
        setLead('Сидоров Сидор Сидорович');
    };

    const filteredChecks = checks.filter((check) => {
        if (filterType === 'all') return true;
        return check.type === filterType;
    });

    // Логика для показа/скрытия зависимых полей (Вариант 1)
    const shouldShowTovCat2 = tovCompliance && !['Соответствует_ситуации_и_ТОВ', 'Нельзя_оценить'].includes(tovCompliance);
    const shouldShowOtherErrorsCat2 = otherErrorsCat1 && otherErrorsCat1 !== 'Нет_ошибок';
    const shouldShowOtherErrorsCat3 = otherErrorsCat2 && otherErrorsCat2 !== 'Нет_ошибок';
    const shouldShowSoftwareWorkCat2 = softwareWorkCat1 && softwareWorkCat1 !== 'Нет ошибок';

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ transformOrigin: 'center', display: 'inline-block' }}
                    >
                        <Button variant="contained" color="primary" onClick={handleOpenCheckDialog}>
                            Новая проверка
                        </Button>
                    </motion.div>
                    {draft && <Chip label="Черновик" color="secondary" sx={{ ml: 2 }} />}
                    <FormControl sx={{ ml: 2, minWidth: 120 }}>
                        <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Фильтр по типу</InputLabel>
                        <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                            <MenuItem value="all">Все</MenuItem>
                            {checkTypes.map((type) => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Typography variant="h6">Статистика: {checks.length} проверок, {checks.reduce((sum, check) => sum + check.errors, 0)} ошибок</Typography>
                <Table sx={{ mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Номер</TableCell>
                            <TableCell>Тип</TableCell>
                            <TableCell>Дата</TableCell>
                            <TableCell>Ошибки</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredChecks.map((check) => (
                            <TableRow key={check.number}>
                                <TableCell>{check.number}</TableCell>
                                <TableCell>{check.type}</TableCell>
                                <TableCell>{check.date}</TableCell>
                                <TableCell>{check.errors}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Dialog
                    open={openCheckDialog}
                    onClose={handleCloseCheckDialog}
                    PaperProps={{ sx: { maxWidth: '1000px', width: '100%' } }}
                >
                    <DialogTitle>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Новая проверка
                            {draft && <Chip label="Черновик" color="secondary" />}
                            <FormControl sx={{ minWidth: 120 }}>
                                <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Форма</InputLabel>
                                <Select value={formVariant} onChange={(e) => setFormVariant(e.target.value)}>
                                    <MenuItem value="">Выберите вариант</MenuItem>
                                    <MenuItem value="Вариант 1">Вариант 1</MenuItem>
                                    <MenuItem value="Вариант 2">Вариант 2</MenuItem>
                                    <MenuItem value="Вариант 3">Вариант 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogTitle>
                    <DialogContent sx={{ maxHeight: '70vh', overflowY: 'auto', p: 4, py: 3 }}>
                        {formVariant ? (
                            <Grid container direction="column" spacing={4}>
                                <Grid item>
                                    <Typography variant="h6" sx={{ mb: 2 }}>Параметры проверки</Typography>
                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                        <Grid container direction="column" spacing={3}>
                                            <Grid item>
                                                <DatePicker
                                                    label="Дата анализа"
                                                    value={analysisDate}
                                                    disabled
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            sx={{
                                                                '& .MuiInputBase-input.Mui-disabled': {
                                                                    color: '#000000',
                                                                    WebkitTextFillColor: '#000000',
                                                                    opacity: 1,
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    fullWidth
                                                    label="ФИО проверяющего"
                                                    value={auditorName}
                                                    disabled
                                                    sx={{
                                                        '& .MuiInputBase-input.Mui-disabled': {
                                                            color: '#000000',
                                                            WebkitTextFillColor: '#000000',
                                                            opacity: 1,
                                                        },
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <FormControl fullWidth error={!!errors.checkType}>
                                                    <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Тип проверки</InputLabel>
                                                    <Select value={checkType} onChange={(e) => setCheckType(e.target.value)}>
                                                        {checkTypes.map((type) => (
                                                            <MenuItem key={type} value={type}>{type}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    {errors.checkType && <Typography color="error">{errors.checkType}</Typography>}
                                                </FormControl>
                                            </Grid>
                                            <Grid item>
                                                <FormControl fullWidth error={!!errors.contactChannel}>
                                                    <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Канал обращения</InputLabel>
                                                    <Select value={contactChannel} onChange={(e) => setContactChannel(e.target.value)}>
                                                        {contactChannels.map((channel) => (
                                                            <MenuItem key={channel} value={channel}>{channel}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    {errors.contactChannel && <Typography color="error">{errors.contactChannel}</Typography>}
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Divider sx={{ my: 2 }} />
                                <Grid item>
                                    <Typography variant="h6" sx={{ mb: 2 }}>Данные тикета</Typography>
                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                        <Grid container direction="column" spacing={3}>
                                            <Grid item>
                                                <TextField
                                                    fullWidth
                                                    label="Номер тикета"
                                                    value={ticketNumber}
                                                    onChange={(e) => setTicketNumber(e.target.value)}
                                                    error={!!errors.ticketNumber}
                                                    helperText={errors.ticketNumber}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Button variant="outlined" onClick={handleNewTicket}>
                                                    Новый тикет
                                                </Button>
                                            </Grid>
                                            {contactChannel === "Звонок" && (
                                                <Grid item>
                                                    <TextField
                                                        fullWidth
                                                        label="Номер телефона"
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                    />
                                                </Grid>
                                            )}
                                            <Grid item>
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
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    fullWidth
                                                    label="Время обращения"
                                                    value={contactTime}
                                                    onChange={(e) => setContactTime(e.target.value)}
                                                    error={!!errors.contactTime}
                                                    helperText={errors.contactTime}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    fullWidth
                                                    label="Адрес эл. почты сотрудника"
                                                    value={employeeEmail}
                                                    onChange={(e) => setEmployeeEmail(e.target.value)}
                                                    error={!!errors.employeeEmail}
                                                    helperText={errors.employeeEmail}
                                                />
                                            </Grid>
                                            <Grid item>
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
                                            </Grid>
                                            <Grid item>
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
                                            </Grid>
                                            <Grid item>
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
                                            </Grid>
                                            <Grid item>
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
                                            </Grid>
                                            <Grid item>
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
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Divider sx={{ my: 2 }} />
                                <Grid item>
                                    <Typography variant="h6" sx={{ mb: 2 }}>Оценка</Typography>
                                    <Grid container direction="column" spacing={3}>
                                        <Grid item>
                                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                <FormControl fullWidth>
                                                    <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Продукт</InputLabel>
                                                    <Select value={product} onChange={(e) => setProduct(e.target.value)}>
                                                        {products.map((prod) => (
                                                            <MenuItem key={prod} value={prod}>{prod}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    {errors.product && <Typography color="error">{errors.product}</Typography>}
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                <FormControl fullWidth>
                                                    <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Тип обращения КК</InputLabel>
                                                    <Select value={ccContactType} onChange={(e) => setCcContactType(e.target.value)}>
                                                        {ccContactTypes.map((type) => (
                                                            <MenuItem key={type} value={type}>{type}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    {errors.ccContactType && <Typography color="error">{errors.ccContactType}</Typography>}
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                <FormControl fullWidth>
                                                    <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Категория обращения КК</InputLabel>
                                                    <Select value={ccContactCategory} onChange={(e) => setCcContactCategory(e.target.value)}>
                                                        {categories.map((cat) => (
                                                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    {errors.ccContactCategory && <Typography color="error">{errors.ccContactCategory}</Typography>}
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        {ccContactCategory && (
                                            <Grid item>
                                                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                    <FormControl fullWidth>
                                                        <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Тема обращения КК</InputLabel>
                                                        <Select value={ccContactTopic} onChange={(e) => setCcContactTopic(e.target.value)}>
                                                            {topicOptions.map((topic) => (
                                                                <MenuItem key={topic} value={topic}>{topic}</MenuItem>
                                                            ))}
                                                        </Select>
                                                        {errors.ccContactTopic && <Typography color="error">{errors.ccContactTopic}</Typography>}
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                        )}

                                        {formVariant === 'Вариант 1' ? (
                                            <>
                                                <Grid item>
                                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                        <Typography variant="subtitle1">Корректность выбора</Typography>
                                                        <FormControl fullWidth>
                                                            <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Статус выбора</InputLabel>
                                                            <Select value={selectionCorrectness} onChange={(e) => setSelectionCorrectness(e.target.value)}>
                                                                {['Корректно', ...selectionCorrectnessOptions].map((opt) => (
                                                                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                        <Typography variant="subtitle1">Соблюдение ТоВ</Typography>
                                                        <FormControl fullWidth>
                                                            <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Статус ТоВ</InputLabel>
                                                            <Select value={tovCompliance} onChange={(e) => setTovCompliance(e.target.value)}>
                                                                {['Соответствует_ситуации_и_ТОВ', 'Нельзя_оценить', ...tovComplianceOptions].map((opt) => (
                                                                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                        {shouldShowTovCat2 && (
                                                            <FormControl fullWidth sx={{ mt: 2 }}>
                                                                <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Категория ТоВ</InputLabel>
                                                                <Select value={tovComplianceCategory2} onChange={(e) => setTovComplianceCategory2(e.target.value)}>
                                                                    {tovComplianceCat2Options.map((opt) => (
                                                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        )}
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                        <Typography variant="subtitle1">Корректность эскалации</Typography>
                                                        <FormControl fullWidth>
                                                            <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Статус эскалации</InputLabel>
                                                            <Select value={escalationCorrectness} onChange={(e) => setEscalationCorrectness(e.target.value)}>
                                                                {['Не_требовалась', 'Корректная_работа_с_эскалацией', ...escalationCorrectnessOptions].map((opt) => (
                                                                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                        <Typography variant="subtitle1">Тип эскалации</Typography>
                                                        <FormControl fullWidth>
                                                            <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Способ эскалации</InputLabel>
                                                            <Select value={escalationType} onChange={(e) => setEscalationType(e.target.value)}>
                                                                {escalationTypeOptions.map((opt) => (
                                                                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                        <Typography variant="subtitle1">Лояльность/компенсация</Typography>
                                                        <FormControl fullWidth>
                                                            <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Статус компенсации</InputLabel>
                                                            <Select value={loyaltyCompensation} onChange={(e) => setLoyaltyCompensation(e.target.value)}>
                                                                {['Нужна, передали на компенс', 'Не нужна', ...loyaltyCompensationOptions].map((opt) => (
                                                                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                        <Typography variant="subtitle1">Другие ошибки в решении Категория1</Typography>
                                                        <FormControl fullWidth>
                                                            <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Ошибка Категория 1</InputLabel>
                                                            <Select value={otherErrorsCat1} onChange={(e) => setOtherErrorsCat1(e.target.value)}>
                                                                {['Нет_ошибок', ...otherErrorsOptions].map((opt) => (
                                                                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                </Grid>
                                                {shouldShowOtherErrorsCat2 && (
                                                    <Grid item>
                                                        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                            <Typography variant="subtitle1">Другие ошибки в решении Категория2</Typography>
                                                            <FormControl fullWidth>
                                                                <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Ошибка Категория 2</InputLabel>
                                                                <Select value={otherErrorsCat2} onChange={(e) => setOtherErrorsCat2(e.target.value)}>
                                                                    {['Нет_ошибок', ...otherErrorsOptions].map((opt) => (
                                                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>
                                                )}
                                                {shouldShowOtherErrorsCat3 && (
                                                    <Grid item>
                                                        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                            <Typography variant="subtitle1">Другие ошибки в решении Категория3</Typography>
                                                            <FormControl fullWidth>
                                                                <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Ошибка Категория 3</InputLabel>
                                                                <Select value={otherErrorsCat3} onChange={(e) => setOtherErrorsCat3(e.target.value)}>
                                                                    {['Нет_ошибок', ...otherErrorsOptions].map((opt) => (
                                                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>
                                                )}
                                                <Grid item>
                                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                        <Typography variant="subtitle1">Корректность работы в ПО Категория1</Typography>
                                                        <FormControl fullWidth>
                                                            <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Ошибка ПО Категория 1</InputLabel>
                                                            <Select value={softwareWorkCat1} onChange={(e) => setSoftwareWorkCat1(e.target.value)}>
                                                                {['Нет ошибок', ...softwareWorkOptions].map((opt) => (
                                                                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                </Grid>
                                                {shouldShowSoftwareWorkCat2 && (
                                                    <Grid item>
                                                        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                            <Typography variant="subtitle1">Корректность работы в ПО Категория2</Typography>
                                                            <FormControl fullWidth>
                                                                <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Ошибка ПО Категория 2</InputLabel>
                                                                <Select value={softwareWorkCat2} onChange={(e) => setSoftwareWorkCat2(e.target.value)}>
                                                                    {['Нет ошибок', ...softwareWorkOptions].map((opt) => (
                                                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>
                                                )}
                                                <Grid item>
                                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                        <Typography variant="subtitle1">Ошибка оператора повлияла на оценку?</Typography>
                                                        <FormControl fullWidth>
                                                            <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Влияние на оценку</InputLabel>
                                                            <Select value={operatorErrorAffectedRating} onChange={(e) => setOperatorErrorAffectedRating(e.target.value)}>
                                                                {['Не повлияла', 'Нет ошибок', ...operatorErrorAffectedRatingOptions].map((opt) => (
                                                                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                </Grid>
                                            </>
                                        ) : formVariant === 'Вариант 2' ? (
                                            <>
                                                <Grid item>
                                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                        <Typography variant="subtitle1">Корректность выбора</Typography>
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    checked={selectionHasError}
                                                                    onChange={(e) => setSelectionHasError(e.target.checked)}
                                                                />
                                                            }
                                                            label="Есть ошибка?"
                                                        />
                                                        {selectionHasError && (
                                                            <>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={selectionIsCritical}
                                                                            onChange={(e) => setSelectionIsCritical(e.target.checked)}
                                                                        />
                                                                    }
                                                                    label="Ошибка критическая?"
                                                                />
                                                                <FormControl fullWidth sx={{ mt: 1 }}>
                                                                    <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация ошибки</InputLabel>
                                                                    <Select value={selectionErrorDetail} onChange={(e) => setSelectionErrorDetail(e.target.value)}>
                                                                        {selectionCorrectnessOptions.map((opt) => (
                                                                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </>
                                                        )}
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                        <Typography variant="subtitle1">Соблюдение ТоВ</Typography>
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    checked={tovHasError}
                                                                    onChange={(e) => setTovHasError(e.target.checked)}
                                                                />
                                                            }
                                                            label="Есть ошибка?"
                                                        />
                                                        {tovHasError && (
                                                            <>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={tovIsCritical}
                                                                            onChange={(e) => setTovIsCritical(e.target.checked)}
                                                                        />
                                                                    }
                                                                    label="Ошибка критическая?"
                                                                />
                                                                <FormControl fullWidth sx={{ mt: 1 }}>
                                                                    <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация ошибки</InputLabel>
                                                                    <Select value={tovErrorDetail} onChange={(e) => setTovErrorDetail(e.target.value)}>
                                                                        {tovComplianceOptions.map((opt) => (
                                                                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                                {tovErrorDetail && ['Не_соответствует_ситуации_и_ТОВ', 'Крит_нарушение_ТоВ'].includes(tovErrorDetail) && (
                                                                    <FormControl fullWidth sx={{ mt: 2 }}>
                                                                        <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Соблюдение ТоВ 2 категория</InputLabel>
                                                                        <Select value={tovComplianceCategory2} onChange={(e) => setTovComplianceCategory2(e.target.value)}>
                                                                            {tovComplianceCat2Options.map((opt) => (
                                                                                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    </FormControl>
                                                                )}
                                                            </>
                                                        )}
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                        <Typography variant="subtitle1">Корректность эскалации</Typography>
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    checked={escalationHasError}
                                                                    onChange={(e) => setEscalationHasError(e.target.checked)}
                                                                />
                                                            }
                                                            label="Есть ошибка?"
                                                        />
                                                        {escalationHasError && (
                                                            <>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={escalationIsCritical}
                                                                            onChange={(e) => setEscalationIsCritical(e.target.checked)}
                                                                        />
                                                                    }
                                                                    label="Ошибка критическая?"
                                                                />
                                                                <FormControl fullWidth sx={{ mt: 1 }}>
                                                                    <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация ошибки</InputLabel>
                                                                    <Select value={escalationErrorDetail} onChange={(e) => setEscalationErrorDetail(e.target.value)}>
                                                                        {escalationCorrectnessOptions.map((opt) => (
                                                                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </>
                                                        )}
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                        <Typography variant="subtitle1">Тип эскалации</Typography>
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    checked={escalationTypeHasEscalation}
                                                                    onChange={(e) => setEscalationTypeHasEscalation(e.target.checked)}
                                                                />
                                                            }
                                                            label="Есть эскалация?"
                                                        />
                                                        {escalationTypeHasEscalation && (
                                                            <FormControl fullWidth sx={{ mt: 1 }}>
                                                                <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Тип эскалации</InputLabel>
                                                                <Select value={escalationType} onChange={(e) => setEscalationType(e.target.value)}>
                                                                    {escalationTypeOptions.map((opt) => (
                                                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        )}
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                        <Typography variant="subtitle1">Лояльность/компенсация</Typography>
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    checked={loyaltyHasError}
                                                                    onChange={(e) => setLoyaltyHasError(e.target.checked)}
                                                                />
                                                            }
                                                            label="Есть ошибка?"
                                                        />
                                                        {loyaltyHasError && (
                                                            <>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={loyaltyIsCritical}
                                                                            onChange={(e) => setLoyaltyIsCritical(e.target.checked)}
                                                                        />
                                                                    }
                                                                    label="Ошибка критическая?"
                                                                />
                                                                <FormControl fullWidth sx={{ mt: 1 }}>
                                                                    <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация ошибки</InputLabel>
                                                                    <Select value={loyaltyErrorDetail} onChange={(e) => setLoyaltyErrorDetail(e.target.value)}>
                                                                        {loyaltyCompensationOptions.map((opt) => (
                                                                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </>
                                                        )}
                                                    </Box>
                                                </Grid>
                                                <Grid item>
                                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                        <Typography variant="subtitle1">Другие ошибки в решении Категория1</Typography>
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    checked={otherErrorsCat1HasError}
                                                                    onChange={(e) => setOtherErrorsCat1HasError(e.target.checked)}
                                                                />
                                                            }
                                                            label="Есть ошибка?"
                                                        />
                                                        {otherErrorsCat1HasError && (
                                                            <>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={otherErrorsCat1IsCritical}
                                                                            onChange={(e) => setOtherErrorsCat1IsCritical(e.target.checked)}
                                                                        />
                                                                    }
                                                                    label="Ошибка критическая?"
                                                                />
                                                                <FormControl fullWidth sx={{ mt: 1 }}>
                                                                    <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация ошибки</InputLabel>
                                                                    <Select value={otherErrorsCat1Detail} onChange={(e) => setOtherErrorsCat1Detail(e.target.value)}>
                                                                        {otherErrorsOptions.map((opt) => (
                                                                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </>
                                                        )}
                                                    </Box>
                                                </Grid>
                                                {otherErrorsCat1HasError && (
                                                    <Grid item>
                                                        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                            <Typography variant="subtitle1">Другие ошибки в решении Категория2</Typography>
                                                            <FormControlLabel
                                                                control={
                                                                    <Switch
                                                                        checked={otherErrorsCat2HasError}
                                                                        onChange={(e) => setOtherErrorsCat2HasError(e.target.checked)}
                                                                    />
                                                                }
                                                                label="Есть ошибка?"
                                                            />
                                                            {otherErrorsCat2HasError && (
                                                                <>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Switch
                                                                                checked={otherErrorsCat2IsCritical}
                                                                                onChange={(e) => setOtherErrorsCat2IsCritical(e.target.checked)}
                                                                            />
                                                                        }
                                                                        label="Ошибка критическая?"
                                                                    />
                                                                    <FormControl fullWidth sx={{ mt: 1 }}>
                                                                        <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация ошибки</InputLabel>
                                                                        <Select value={otherErrorsCat2Detail} onChange={(e) => setOtherErrorsCat2Detail(e.target.value)}>
                                                                            {otherErrorsOptions.map((opt) => (
                                                                                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    </FormControl>
                                                                </>
                                                            )}
                                                        </Box>
                                                    </Grid>
                                                )}
                                                {otherErrorsCat2HasError && (
                                                    <Grid item>
                                                        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                            <Typography variant="subtitle1">Другие ошибки в решении Категория3</Typography>
                                                            <FormControlLabel
                                                                control={
                                                                    <Switch
                                                                        checked={otherErrorsCat3HasError}
                                                                        onChange={(e) => setOtherErrorsCat3HasError(e.target.checked)}
                                                                    />
                                                                }
                                                                label="Есть ошибка?"
                                                            />
                                                            {otherErrorsCat3HasError && (
                                                                <>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Switch
                                                                                checked={otherErrorsCat3IsCritical}
                                                                                onChange={(e) => setOtherErrorsCat3IsCritical(e.target.checked)}
                                                                            />
                                                                        }
                                                                        label="Ошибка критическая?"
                                                                    />
                                                                    <FormControl fullWidth sx={{ mt: 1 }}>
                                                                        <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация ошибки</InputLabel>
                                                                        <Select value={otherErrorsCat3Detail} onChange={(e) => setOtherErrorsCat3Detail(e.target.value)}>
                                                                            {otherErrorsOptions.map((opt) => (
                                                                                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    </FormControl>
                                                                </>
                                                            )}
                                                        </Box>
                                                    </Grid>
                                                )}
                                                <Grid item>
                                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                        <Typography variant="subtitle1">Корректность работы в ПО Категория1</Typography>
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    checked={softwareWorkCat1HasError}
                                                                    onChange={(e) => setSoftwareWorkCat1HasError(e.target.checked)}
                                                                />
                                                            }
                                                            label="Есть ошибка?"
                                                        />
                                                        {softwareWorkCat1HasError && (
                                                            <>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={softwareWorkCat1IsCritical}
                                                                            onChange={(e) => setSoftwareWorkCat1IsCritical(e.target.checked)}
                                                                        />
                                                                    }
                                                                    label="Ошибка критическая?"
                                                                />
                                                                <FormControl fullWidth sx={{ mt: 1 }}>
                                                                    <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация ошибки</InputLabel>
                                                                    <Select value={softwareWorkCat1Detail} onChange={(e) => setSoftwareWorkCat1Detail(e.target.value)}>
                                                                        {softwareWorkOptions.map((opt) => (
                                                                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </>
                                                        )}
                                                    </Box>
                                                </Grid>
                                                {softwareWorkCat1HasError && (
                                                    <Grid item>
                                                        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                            <Typography variant="subtitle1">Корректность работы в ПО Категория2</Typography>
                                                            <FormControlLabel
                                                                control={
                                                                    <Switch
                                                                        checked={softwareWorkCat2HasError}
                                                                        onChange={(e) => setSoftwareWorkCat2HasError(e.target.checked)}
                                                                    />
                                                                }
                                                                label="Есть ошибка?"
                                                            />
                                                            {softwareWorkCat2HasError && (
                                                                <>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Switch
                                                                                checked={softwareWorkCat2IsCritical}
                                                                                onChange={(e) => setSoftwareWorkCat2IsCritical(e.target.checked)}
                                                                            />
                                                                        }
                                                                        label="Ошибка критическая?"
                                                                    />
                                                                    <FormControl fullWidth sx={{ mt: 1 }}>
                                                                        <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация ошибки</InputLabel>
                                                                        <Select value={softwareWorkCat2Detail} onChange={(e) => setSoftwareWorkCat2Detail(e.target.value)}>
                                                                            {softwareWorkOptions.map((opt) => (
                                                                                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    </FormControl>
                                                                </>
                                                            )}
                                                        </Box>
                                                    </Grid>
                                                )}
                                                <Grid item>
                                                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                        <Typography variant="subtitle1">Ошибка оператора повлияла на оценку?</Typography>
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    checked={operatorErrorHasError}
                                                                    onChange={(e) => setOperatorErrorHasError(e.target.checked)}
                                                                />
                                                            }
                                                            label="Есть ошибка?"
                                                        />
                                                        {operatorErrorHasError && (
                                                            <>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={operatorErrorIsCritical}
                                                                            onChange={(e) => setOperatorErrorIsCritical(e.target.checked)}
                                                                        />
                                                                    }
                                                                    label="Ошибка критическая?"
                                                                />
                                                                <FormControl fullWidth sx={{ mt: 1 }}>
                                                                    <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация ошибки</InputLabel>
                                                                    <Select value={operatorErrorDetail} onChange={(e) => setOperatorErrorDetail(e.target.value)}>
                                                                        {operatorErrorAffectedRatingOptions.map((opt) => (
                                                                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </>
                                                        )}
                                                    </Box>
                                                </Grid>
                                            </>
                                            ) : formVariant === 'Вариант 3' ? (
                                                <>
                                                    <Grid item>
                                                        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                            <Typography variant="subtitle1">Корректность выбора</Typography>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={selectionHasError}
                                                                            onChange={(e) => setSelectionHasError(e.target.checked)}
                                                                        />
                                                                    }
                                                                    label="Есть ошибка?"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={selectionIsCritical}
                                                                            onChange={(e) => setSelectionIsCritical(e.target.checked)}
                                                                            disabled={!selectionHasError}
                                                                        />
                                                                    }
                                                                    label="Ошибка критическая?"
                                                                />
                                                            </Box>
                                                            <FormControl fullWidth sx={{ mt: 1 }}>
                                                                <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация</InputLabel>
                                                                <Select value={selectionErrorDetail} onChange={(e) => setSelectionErrorDetail(e.target.value)}>
                                                                    <MenuItem value="Нет ошибки">Нет ошибки</MenuItem>
                                                                    {selectionCorrectnessOptions.map((opt) => (
                                                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item>
                                                        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                            <Typography variant="subtitle1">Соблюдение ТоВ</Typography>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={tovHasError}
                                                                            onChange={(e) => setTovHasError(e.target.checked)}
                                                                        />
                                                                    }
                                                                    label="Есть ошибка?"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={tovIsCritical}
                                                                            onChange={(e) => setTovIsCritical(e.target.checked)}
                                                                            disabled={!tovHasError}
                                                                        />
                                                                    }
                                                                    label="Ошибка критическая?"
                                                                />
                                                            </Box>
                                                            <FormControl fullWidth sx={{ mt: 1 }}>
                                                                <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация</InputLabel>
                                                                <Select value={tovErrorDetail} onChange={(e) => setTovErrorDetail(e.target.value)}>
                                                                    <MenuItem value="Нет ошибки">Нет ошибки</MenuItem>
                                                                    {tovComplianceOptions.map((opt) => (
                                                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                            {tovErrorDetail && ['Не_соответствует_ситуации_и_ТОВ', 'Крит_нарушение_ТоВ'].includes(tovErrorDetail) && (
                                                                <FormControl fullWidth sx={{ mt: 2 }}>
                                                                    <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Соблюдение ТоВ 2 категория</InputLabel>
                                                                    <Select value={tovComplianceCategory2} onChange={(e) => setTovComplianceCategory2(e.target.value)}>
                                                                        {tovComplianceCat2Options.map((opt) => (
                                                                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            )}
                                                        </Box>
                                                    </Grid>
                                                    <Grid item>
                                                        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                            <Typography variant="subtitle1">Корректность эскалации</Typography>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={escalationHasError}
                                                                            onChange={(e) => setEscalationHasError(e.target.checked)}
                                                                        />
                                                                    }
                                                                    label="Есть ошибка?"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={escalationIsCritical}
                                                                            onChange={(e) => setEscalationIsCritical(e.target.checked)}
                                                                            disabled={!escalationHasError}
                                                                        />
                                                                    }
                                                                    label="Ошибка критическая?"
                                                                />
                                                            </Box>
                                                            <FormControl fullWidth sx={{ mt: 1 }}>
                                                                <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация</InputLabel>
                                                                <Select value={escalationErrorDetail} onChange={(e) => setEscalationErrorDetail(e.target.value)}>
                                                                    <MenuItem value="Нет ошибки">Нет ошибки</MenuItem>
                                                                    {escalationCorrectnessOptions.map((opt) => (
                                                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item>
                                                        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                            <Typography variant="subtitle1">Тип эскалации</Typography>
                                                            <FormControlLabel
                                                                control={
                                                                    <Switch
                                                                        checked={escalationTypeHasEscalation}
                                                                        onChange={(e) => setEscalationTypeHasEscalation(e.target.checked)}
                                                                    />
                                                                }
                                                                label="Есть эскалация?"
                                                            />
                                                            {escalationTypeHasEscalation && (
                                                                <FormControl fullWidth sx={{ mt: 1 }}>
                                                                    <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Тип эскалации</InputLabel>
                                                                    <Select value={escalationType} onChange={(e) => setEscalationType(e.target.value)}>
                                                                        {escalationTypeOptions.map((opt) => (
                                                                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            )}
                                                        </Box>
                                                    </Grid>
                                                    <Grid item>
                                                        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                            <Typography variant="subtitle1">Лояльность/компенсация</Typography>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={loyaltyHasError}
                                                                            onChange={(e) => setLoyaltyHasError(e.target.checked)}
                                                                        />
                                                                    }
                                                                    label="Есть ошибка?"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={loyaltyIsCritical}
                                                                            onChange={(e) => setLoyaltyIsCritical(e.target.checked)}
                                                                            disabled={!loyaltyHasError}
                                                                        />
                                                                    }
                                                                    label="Ошибка критическая?"
                                                                />
                                                            </Box>
                                                            <FormControl fullWidth sx={{ mt: 1 }}>
                                                                <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация</InputLabel>
                                                                <Select value={loyaltyErrorDetail} onChange={(e) => setLoyaltyErrorDetail(e.target.value)}>
                                                                    <MenuItem value="Нет ошибки">Нет ошибки</MenuItem>
                                                                    {loyaltyCompensationOptions.map((opt) => (
                                                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item>
                                                        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                            <Typography variant="subtitle1">Другие ошибки в решении Категория1</Typography>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={otherErrorsCat1HasError}
                                                                            onChange={(e) => setOtherErrorsCat1HasError(e.target.checked)}
                                                                        />
                                                                    }
                                                                    label="Есть ошибка?"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={otherErrorsCat1IsCritical}
                                                                            onChange={(e) => setOtherErrorsCat1IsCritical(e.target.checked)}
                                                                            disabled={!otherErrorsCat1HasError}
                                                                        />
                                                                    }
                                                                    label="Ошибка критическая?"
                                                                />
                                                            </Box>
                                                            <FormControl fullWidth sx={{ mt: 1 }}>
                                                                <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация</InputLabel>
                                                                <Select value={otherErrorsCat1Detail} onChange={(e) => setOtherErrorsCat1Detail(e.target.value)}>
                                                                    <MenuItem value="Нет ошибки">Нет ошибки</MenuItem>
                                                                    {otherErrorsOptions.map((opt) => (
                                                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>
                                                    {otherErrorsCat1HasError && (
                                                        <Grid item>
                                                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                                <Typography variant="subtitle1">Другие ошибки в решении Категория2</Typography>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Switch
                                                                                checked={otherErrorsCat2HasError}
                                                                                onChange={(e) => setOtherErrorsCat2HasError(e.target.checked)}
                                                                            />
                                                                        }
                                                                        label="Есть ошибка?"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Switch
                                                                                checked={otherErrorsCat2IsCritical}
                                                                                onChange={(e) => setOtherErrorsCat2IsCritical(e.target.checked)}
                                                                                disabled={!otherErrorsCat2HasError}
                                                                            />
                                                                        }
                                                                        label="Ошибка критическая?"
                                                                    />
                                                                </Box>
                                                                <FormControl fullWidth sx={{ mt: 1 }}>
                                                                    <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация</InputLabel>
                                                                    <Select value={otherErrorsCat2Detail} onChange={(e) => setOtherErrorsCat2Detail(e.target.value)}>
                                                                        <MenuItem value="Нет ошибки">Нет ошибки</MenuItem>
                                                                        {otherErrorsOptions.map((opt) => (
                                                                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                        </Grid>
                                                    )}
                                                    {otherErrorsCat2HasError && (
                                                        <Grid item>
                                                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                                <Typography variant="subtitle1">Другие ошибки в решении Категория3</Typography>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Switch
                                                                                checked={otherErrorsCat3HasError}
                                                                                onChange={(e) => setOtherErrorsCat3HasError(e.target.checked)}
                                                                            />
                                                                        }
                                                                        label="Есть ошибка?"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Switch
                                                                                checked={otherErrorsCat3IsCritical}
                                                                                onChange={(e) => setOtherErrorsCat3IsCritical(e.target.checked)}
                                                                                disabled={!otherErrorsCat3HasError}
                                                                            />
                                                                        }
                                                                        label="Ошибка критическая?"
                                                                    />
                                                                </Box>
                                                                <FormControl fullWidth sx={{ mt: 1 }}>
                                                                    <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация</InputLabel>
                                                                    <Select value={otherErrorsCat3Detail} onChange={(e) => setOtherErrorsCat3Detail(e.target.value)}>
                                                                        <MenuItem value="Нет ошибки">Нет ошибки</MenuItem>
                                                                        {otherErrorsOptions.map((opt) => (
                                                                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                        </Grid>
                                                    )}
                                                    <Grid item>
                                                        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                            <Typography variant="subtitle1">Корректность работы в ПО Категория1</Typography>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={softwareWorkCat1HasError}
                                                                            onChange={(e) => setSoftwareWorkCat1HasError(e.target.checked)}
                                                                        />
                                                                    }
                                                                    label="Есть ошибка?"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={softwareWorkCat1IsCritical}
                                                                            onChange={(e) => setSoftwareWorkCat1IsCritical(e.target.checked)}
                                                                            disabled={!softwareWorkCat1HasError}
                                                                        />
                                                                    }
                                                                    label="Ошибка критическая?"
                                                                />
                                                            </Box>
                                                            <FormControl fullWidth sx={{ mt: 1 }}>
                                                                <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация</InputLabel>
                                                                <Select value={softwareWorkCat1Detail} onChange={(e) => setSoftwareWorkCat1Detail(e.target.value)}>
                                                                    <MenuItem value="Нет ошибки">Нет ошибки</MenuItem>
                                                                    {softwareWorkOptions.map((opt) => (
                                                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>
                                                    {softwareWorkCat1HasError && (
                                                        <Grid item>
                                                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                                <Typography variant="subtitle1">Корректность работы в ПО Категория2</Typography>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Switch
                                                                                checked={softwareWorkCat2HasError}
                                                                                onChange={(e) => setSoftwareWorkCat2HasError(e.target.checked)}
                                                                            />
                                                                        }
                                                                        label="Есть ошибка?"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Switch
                                                                                checked={softwareWorkCat2IsCritical}
                                                                                onChange={(e) => setSoftwareWorkCat2IsCritical(e.target.checked)}
                                                                                disabled={!softwareWorkCat2HasError}
                                                                            />
                                                                        }
                                                                        label="Ошибка критическая?"
                                                                    />
                                                                </Box>
                                                                <FormControl fullWidth sx={{ mt: 1 }}>
                                                                    <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация</InputLabel>
                                                                    <Select value={softwareWorkCat2Detail} onChange={(e) => setSoftwareWorkCat2Detail(e.target.value)}>
                                                                        <MenuItem value="Нет ошибки">Нет ошибки</MenuItem>
                                                                        {softwareWorkOptions.map((opt) => (
                                                                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                        </Grid>
                                                    )}
                                                    <Grid item>
                                                        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                            <Typography variant="subtitle1">Ошибка оператора повлияла на оценку?</Typography>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={operatorErrorHasError}
                                                                            onChange={(e) => setOperatorErrorHasError(e.target.checked)}
                                                                        />
                                                                    }
                                                                    label="Есть ошибка?"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={operatorErrorIsCritical}
                                                                            onChange={(e) => setOperatorErrorIsCritical(e.target.checked)}
                                                                            disabled={!operatorErrorHasError}
                                                                        />
                                                                    }
                                                                    label="Ошибка критическая?"
                                                                />
                                                            </Box>
                                                            <FormControl fullWidth sx={{ mt: 1 }}>
                                                                <InputLabel sx={{ position: 'relative', top: 0, transform: 'none' }}>Детализация</InputLabel>
                                                                <Select value={operatorErrorDetail} onChange={(e) => setOperatorErrorDetail(e.target.value)}>
                                                                    <MenuItem value="Нет ошибки">Нет ошибки</MenuItem>
                                                                    {operatorErrorAffectedRatingOptions.map((opt) => (
                                                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>
                                                </>
                                        ) : (
                                            <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                                                Пожалуйста, выберите вариант формы для продолжения.
                                            </Typography>
                                        )}
                                        <Grid item>
                                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                                <Typography variant="subtitle1">Комментарии</Typography>
                                                <TextField
                                                    fullWidth
                                                    label="Комментарии"
                                                    value={comments}
                                                    onChange={(e) => setComments(e.target.value)}
                                                    multiline
                                                    rows={3}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ) : (
                            <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                                Пожалуйста, выберите вариант формы для продолжения.
                            </Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        {draft && <Button onClick={handleClearDraft} color="error">Очистить черновик</Button>}
                        <Button onClick={handleCloseCheckDialog}>Закрыть</Button>
                        <Button onClick={handleSaveCheck} variant="contained" disabled={!formVariant}>
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </LocalizationProvider>
    );
}