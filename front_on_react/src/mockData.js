export const users = [
  {
    id: 1,
    name: "Анна Мельникова",
    email: "anna.melnikova@example.com",
    role: "Руководитель",
    status: "Активен",
    lastLogin: "16.11.2026 09:40"
  },
  {
    id: 2,
    name: "Илья Сафонов",
    email: "ilya.safonov@example.com",
    role: "Менеджер",
    status: "Активен",
    lastLogin: "16.11.2026 10:12"
  },
  {
    id: 3,
    name: "Мария Орлова",
    email: "maria.orlova@example.com",
    role: "Менеджер",
    status: "Приглашен",
    lastLogin: "-"
  },
  {
    id: 4,
    name: "Павел Ким",
    email: "pavel.kim@example.com",
    role: "Менеджер",
    status: "Заблокирован",
    lastLogin: "05.11.2026 17:22"
  }
];

export const organizations = [
  {
    id: 101,
    name: "ООО Ромашка",
    inn: "7701456789",
    phone: "+7 495 120-45-10",
    email: "office@romashka.ru",
    site: "romashka.ru",
    address: "Москва, ул. Лесная, 12",
    status: "В работе",
    managerId: 2,
    comment: "Интересуются внедрением CRM для отдела продаж."
  },
  {
    id: 102,
    name: "АО Север Трейд",
    inn: "7802567781",
    phone: "+7 812 210-30-22",
    email: "info@sever-trade.ru",
    site: "sever-trade.ru",
    address: "Санкт-Петербург, Невский пр., 80",
    status: "Клиент",
    managerId: 1,
    comment: "Договор на сопровождение до конца года."
  },
  {
    id: 103,
    name: "ИП Волкова Елена",
    inn: "503401234567",
    phone: "+7 916 333-18-44",
    email: "volkova@example.com",
    site: "-",
    address: "Мытищи, Олимпийский пр., 9",
    status: "Новый",
    managerId: 3,
    comment: "Запросили коммерческое предложение."
  }
];

export const contacts = [
  {
    id: 201,
    organizationId: 101,
    name: "Дмитрий Кравцов",
    position: "Коммерческий директор",
    phone: "+7 925 880-19-45",
    email: "d.kravtsov@romashka.ru",
    messenger: "Telegram @d_kravtsov"
  },
  {
    id: 202,
    organizationId: 101,
    name: "Ольга Рябова",
    position: "Финансовый менеджер",
    phone: "+7 925 200-33-55",
    email: "o.ryabova@romashka.ru",
    messenger: "WhatsApp"
  },
  {
    id: 203,
    organizationId: 102,
    name: "Сергей Лапин",
    position: "Руководитель продаж",
    phone: "+7 921 450-88-10",
    email: "s.lapin@sever-trade.ru",
    messenger: "Telegram @lapin_sales"
  },
  {
    id: 204,
    organizationId: null,
    name: "Алина Морозова",
    position: "Предприниматель",
    phone: "+7 999 140-77-01",
    email: "alina.morozova@example.com",
    messenger: "Telegram @amorozova"
  }
];

export const tasks = [
  {
    id: 301,
    title: "Отправить уточненное КП",
    description: "Обновить стоимость внедрения и отправить Дмитрию.",
    relationType: "Контакт",
    relationId: 201,
    assigneeId: 2,
    authorId: 1,
    dueDate: "2026-11-17",
    priority: "Высокий",
    status: "В работе"
  },
  {
    id: 302,
    title: "Проверить договор сопровождения",
    description: "Сверить дату продления и список услуг.",
    relationType: "Организация",
    relationId: 102,
    assigneeId: 1,
    authorId: 1,
    dueDate: "2026-11-20",
    priority: "Обычный",
    status: "Новая"
  },
  {
    id: 303,
    title: "Позвонить по новому запросу",
    description: "Уточнить потребности и количество пользователей.",
    relationType: "Организация",
    relationId: 103,
    assigneeId: 3,
    authorId: 1,
    dueDate: "2026-11-15",
    priority: "Высокий",
    status: "Просрочена"
  },
  {
    id: 304,
    title: "Подготовить шаблон письма",
    description: "Сделать общий шаблон для отправки КП.",
    relationType: "Без связи",
    relationId: null,
    assigneeId: 2,
    authorId: 2,
    dueDate: "2026-11-22",
    priority: "Низкий",
    status: "Новая"
  }
];

export const clientFiles = [
  {
    id: 401,
    organizationId: 101,
    contactId: 201,
    title: "КП Ромашка внедрение CRM v2.pdf",
    type: "Коммерческое предложение",
    uploadedById: 2,
    uploadedAt: "12.11.2026 15:34",
    size: "842 КБ",
    comment: "Отправлено Дмитрию по email после правки стоимости."
  },
  {
    id: 402,
    organizationId: 101,
    contactId: 202,
    title: "Договор Ромашка проект.docx",
    type: "Договор",
    uploadedById: 1,
    uploadedAt: "13.11.2026 11:05",
    size: "128 КБ",
    comment: "Черновик договора для согласования с финансами."
  },
  {
    id: 403,
    organizationId: 102,
    contactId: 203,
    title: "Акт Север Трейд октябрь.pdf",
    type: "Акт",
    uploadedById: 1,
    uploadedAt: "03.11.2026 18:20",
    size: "390 КБ",
    comment: "Закрывающий документ за октябрь."
  },
  {
    id: 404,
    organizationId: 103,
    contactId: null,
    title: "КП Волкова базовый пакет.pdf",
    type: "Коммерческое предложение",
    uploadedById: 3,
    uploadedAt: "16.11.2026 12:18",
    size: "510 КБ",
    comment: "Первичная версия, отправка еще не подтверждена."
  }
];
