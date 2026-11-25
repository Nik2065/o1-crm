import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { clientFiles, contacts, organizations, tasks, users } from "./mockData";

const tabs = [
  { id: "clients", label: "Организации и контакты" },
  { id: "files", label: "Файлы клиента" },
  { id: "tasks", label: "Задачи" },
  { id: "users", label: "Пользователи" },
  { id: "auth", label: "Вход и доступ" }
];

function userName(id) {
  return users.find((user) => user.id === id)?.name || "-";
}

function orgName(id) {
  return organizations.find((org) => org.id === id)?.name || "-";
}

function contactName(id) {
  return contacts.find((contact) => contact.id === id)?.name || "-";
}

function statusClass(status) {
  const map = {
    "В работе": "text-bg-primary",
    Клиент: "text-bg-success",
    Новый: "text-bg-info",
    Новая: "text-bg-secondary",
    Выполнена: "text-bg-success",
    Просрочена: "text-bg-danger",
    Активен: "text-bg-success",
    Приглашен: "text-bg-warning",
    Заблокирован: "text-bg-dark"
  };
  return map[status] || "text-bg-light";
}

function priorityClass(priority) {
  const map = {
    Высокий: "text-bg-danger",
    Обычный: "text-bg-primary",
    Низкий: "text-bg-secondary"
  };
  return map[priority] || "text-bg-light";
}

function App() {
  const [activeTab, setActiveTab] = useState("clients");

  return (
    <div className="app-shell">
      <AppHeader />
      <div className="app-body">
        <aside className="sidebar">
          <nav className="nav flex-column gap-1" aria-label="Основная навигация">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-link text-start ${activeTab === tab.id ? "active" : ""}`}
                type="button"
                aria-current={activeTab === tab.id ? "page" : undefined}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="content">
          {activeTab === "clients" && <ClientsPage />}
          {activeTab === "files" && <FilesPage />}
          {activeTab === "tasks" && <TasksPage />}
          {activeTab === "users" && <UsersPage />}
          {activeTab === "auth" && <AuthPage />}
        </main>
      </div>
      <AppFooter />
    </div>
  );
}

function AppHeader() {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-mark" aria-hidden="true">O1</div>
        <div className="brand-copy">
          <h1>CRM система</h1>
          <div className="brand-caption">Только нужное. Ничего лишнего</div>
        </div>
      </div>

      <div className="header-account">
        <div className="account-details">
          <div className="account-name">Анна Мельникова <span className="account-login">(amel1)</span></div>
          <span className="badge text-bg-light border">Руководитель</span>
        </div>
        <button className="btn btn-outline-secondary btn-sm" type="button">Выйти</button>
      </div>
    </header>
  );
}

function AppFooter() {
  return (
    <footer className="app-footer">
      <span>O1 · CRM система</span>
    </footer>
  );
}

function ClientsPage() {
  const [activeTab, setActiveTab] = useState("organizations");
  const [organizationQuery, setOrganizationQuery] = useState({ name: "", channels: "" });
  const [appliedOrganizationQuery, setAppliedOrganizationQuery] = useState({ name: "", channels: "" });
  const [contactQuery, setContactQuery] = useState({ name: "", phone: "" });
  const [appliedContactQuery, setAppliedContactQuery] = useState({ name: "", phone: "" });

  const filteredOrganizations = useMemo(() => organizations.filter((org) => {
    const linkedContacts = contacts.filter((contact) => contact.organizationId === org.id);
    const nameMatches = !appliedOrganizationQuery.name.trim()
      || org.name.toLowerCase().includes(appliedOrganizationQuery.name.trim().toLowerCase());
    const channels = [org.phone, org.email, ...linkedContacts.flatMap((contact) => [contact.phone, contact.email])];
    const channelsMatches = !appliedOrganizationQuery.channels.trim()
      || channels.some((value) => value?.toLowerCase().includes(appliedOrganizationQuery.channels.trim().toLowerCase()));

    return nameMatches && channelsMatches;
  }), [appliedOrganizationQuery]);

  const filteredContacts = useMemo(() => contacts.filter((contact) => {
    const nameMatches = !appliedContactQuery.name.trim()
      || contact.name.toLowerCase().includes(appliedContactQuery.name.trim().toLowerCase());
    const phoneMatches = !appliedContactQuery.phone.trim()
      || contact.phone.toLowerCase().includes(appliedContactQuery.phone.trim().toLowerCase());

    return nameMatches && phoneMatches;
  }), [appliedContactQuery]);

  return (
    <section className="page-section">
      <div className="section-header">
        <div>
          <h2>Организации и контакты</h2>
          <p>Ищите организации и контакты на отдельных вкладках.</p>
        </div>
      </div>

      <div className="crm-tabs" role="tablist" aria-label="Тип записей">
        <button
          id="organizations-tab"
          className={`crm-tab ${activeTab === "organizations" ? "active" : ""}`}
          type="button"
          role="tab"
          aria-selected={activeTab === "organizations"}
          aria-controls="organizations-panel"
          onClick={() => setActiveTab("organizations")}
        >
          Организации
        </button>
        <button
          id="contacts-tab"
          className={`crm-tab ${activeTab === "contacts" ? "active" : ""}`}
          type="button"
          role="tab"
          aria-selected={activeTab === "contacts"}
          aria-controls="contacts-panel"
          onClick={() => setActiveTab("contacts")}
        >
          Контакты
        </button>
      </div>

      <div
        id="organizations-panel"
        className="crm-tab-panel"
        role="tabpanel"
        aria-labelledby="organizations-tab"
        hidden={activeTab !== "organizations"}
      >
          <form
            className="toolbar crm-search-form"
            onSubmit={(event) => {
              event.preventDefault();
              setAppliedOrganizationQuery(organizationQuery);
            }}
          >
            <div className="crm-search-fields">
              <input
                className="form-control"
                aria-label="Наименование организации"
                placeholder="Наименование"
                value={organizationQuery.name}
                onChange={(event) => setOrganizationQuery({ ...organizationQuery, name: event.target.value })}
              />
              <input
                className="form-control"
                aria-label="Телефон или email организации"
                placeholder="Телефон, email"
                value={organizationQuery.channels}
                onChange={(event) => setOrganizationQuery({ ...organizationQuery, channels: event.target.value })}
              />
            </div>
            <button className="btn btn-primary" type="submit">Искать</button>
            <button className="btn btn-primary crm-add-button" type="button">Добавить организацию</button>
          </form>

          <div className="panel">
            <div className="table-responsive">
              <table className="table align-middle mb-0 crm-data-table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Наименование</th>
                    <th scope="col">Контакты</th>
                    <th scope="col">Комментарий</th>
                    <th scope="col">Сотрудники</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrganizations.length ? filteredOrganizations.map((org) => {
                    const linkedContacts = contacts.filter((contact) => contact.organizationId === org.id);
                    return (
                      <tr key={org.id}>
                        <td>{org.id}</td>
                        <td>
                          <div className="fw-semibold">{org.name}</div>
                          <div className="small text-secondary">ИНН: {org.inn}</div>
                        </td>
                        <td>
                          <div className="crm-contact-details">
                            <div>{org.phone}</div>
                            <div>{org.email}</div>
                            {linkedContacts.map((contact) => (
                              <div className="crm-contact-detail" key={contact.id}>
                                <span className="fw-semibold">{contact.name}</span>
                                <span>{contact.phone}</span>
                                <span>{contact.email}</span>
                                {contact.messenger && <span>{contact.messenger}</span>}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td>{org.comment || "—"}</td>
                        <td>{userName(org.managerId)}</td>
                      </tr>
                    );
                  }) : (
                    <tr><td className="text-center text-secondary py-4" colSpan="5">Ничего не найдено</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
      </div>
      <div
        id="contacts-panel"
        className="crm-tab-panel"
        role="tabpanel"
        aria-labelledby="contacts-tab"
        hidden={activeTab !== "contacts"}
      >
          <form
            className="toolbar crm-search-form"
            onSubmit={(event) => {
              event.preventDefault();
              setAppliedContactQuery(contactQuery);
            }}
          >
            <div className="crm-search-fields">
              <input
                className="form-control"
                aria-label="ФИО контакта"
                placeholder="ФИО"
                value={contactQuery.name}
                onChange={(event) => setContactQuery({ ...contactQuery, name: event.target.value })}
              />
              <input
                className="form-control"
                aria-label="Телефон контакта"
                placeholder="Телефон"
                value={contactQuery.phone}
                onChange={(event) => setContactQuery({ ...contactQuery, phone: event.target.value })}
              />
            </div>
            <button className="btn btn-primary" type="submit">Искать</button>
          </form>

          <div className="panel">
            <div className="table-responsive">
              <table className="table align-middle mb-0 crm-data-table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">ФИО</th>
                    <th scope="col">Контакты</th>
                    <th scope="col">Комментарий</th>
                    <th scope="col">Организация</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.length ? filteredContacts.map((contact) => (
                    <tr key={contact.id}>
                      <td>{contact.id}</td>
                      <td>
                        <div className="fw-semibold">{contact.name}</div>
                        <div className="small text-secondary">{contact.position}</div>
                      </td>
                      <td>
                        <div className="crm-contact-details">
                          <div>{contact.phone}</div>
                          <div>{contact.email}</div>
                          <div>{contact.messenger || "—"}</div>
                        </div>
                      </td>
                      <td>{contact.comment || "—"}</td>
                      <td>{orgName(contact.organizationId)}</td>
                    </tr>
                  )) : (
                    <tr><td className="text-center text-secondary py-4" colSpan="5">Ничего не найдено</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </section>
  );
}

function FilesPage() {
  return (
    <section className="page-section">
      <div className="section-header">
        <div>
          <h2>Файлы клиента</h2>
          <p>Хранение КП, договоров и других документов с привязкой к организации, контакту и загрузившему пользователю.</p>
        </div>
        <button className="btn btn-primary btn-sm" type="button">
          Загрузить файл
        </button>
      </div>

      <div className="panel">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Файл</th>
                <th>Тип</th>
                <th>Клиент</th>
                <th>Контакт</th>
                <th>Загрузил</th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>
              {clientFiles.map((file) => (
                <tr key={file.id}>
                  <td>
                    <div className="fw-semibold">{file.title}</div>
                    <div className="small text-secondary">{file.size} · {file.comment}</div>
                  </td>
                  <td>{file.type}</td>
                  <td>{orgName(file.organizationId)}</td>
                  <td>{file.contactId ? contactName(file.contactId) : "-"}</td>
                  <td>{userName(file.uploadedById)}</td>
                  <td>{file.uploadedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function TasksPage() {
  const [status, setStatus] = useState("Все");
  const [assignee, setAssignee] = useState("Все");

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = status === "Все" || task.status === status;
    const assigneeMatch = assignee === "Все" || task.assigneeId === Number(assignee);
    return statusMatch && assigneeMatch;
  });

  return (
    <section className="page-section">
      <div className="section-header">
        <div>
          <h2>Задачи</h2>
          <p>Задачи могут быть связаны с организацией, контактом или оставаться без связи.</p>
        </div>
        <button className="btn btn-primary btn-sm" type="button">
          Создать задачу
        </button>
      </div>

      <div className="toolbar row g-2">
        <div className="col-12 col-md-4">
          <select className="form-select" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option>Все</option>
            <option>Новая</option>
            <option>В работе</option>
            <option>Просрочена</option>
            <option>Выполнена</option>
          </select>
        </div>
        <div className="col-12 col-md-4">
          <select className="form-select" value={assignee} onChange={(event) => setAssignee(event.target.value)}>
            <option>Все</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="task-grid">
        {filteredTasks.map((task) => (
          <div className="task-card" key={task.id}>
            <div className="d-flex justify-content-between gap-3">
              <h3>{task.title}</h3>
              <span className={`badge ${priorityClass(task.priority)}`}>{task.priority}</span>
            </div>
            <p>{task.description}</p>
            <div className="task-meta">
              <span className={`badge ${statusClass(task.status)}`}>{task.status}</span>
              <span>Срок: {task.dueDate}</span>
              <span>Ответственный: {userName(task.assigneeId)}</span>
              <span>{task.relationType}: {relationLabel(task)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function relationLabel(task) {
  if (task.relationType === "Организация") return orgName(task.relationId);
  if (task.relationType === "Контакт") return contactName(task.relationId);
  return "нет";
}

function UsersPage() {
  return (
    <section className="page-section">
      <div className="section-header">
        <div>
          <h2>Пользователи</h2>
          <p>Руководитель добавляет пользователей, назначает роли и управляет статусом доступа.</p>
        </div>
        <button className="btn btn-primary btn-sm" type="button">
          Пригласить пользователя
        </button>
      </div>

      <div className="panel">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Пользователь</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Статус</th>
                <th>Последний вход</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="fw-semibold">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className={`badge ${statusClass(user.status)}`}>{user.status}</span>
                  </td>
                  <td>{user.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function AuthPage() {
  return (
    <section className="page-section">
      <div className="section-header">
        <div>
          <h2>Вход и доступ</h2>
          <p>Email и пароль, приглашение нового пользователя и восстановление доступа через почту.</p>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-4">
          <div className="auth-panel">
            <h3>Вход</h3>
            <label className="form-label">Email</label>
            <input className="form-control mb-3" value="anna.melnikova@example.com" readOnly />
            <label className="form-label">Пароль</label>
            <input className="form-control mb-3" type="password" value="password" readOnly />
            <button className="btn btn-primary w-100" type="button">Войти</button>
            <button className="btn btn-link w-100 mt-2" type="button">Сбросить пароль</button>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="auth-panel">
            <h3>Приглашение</h3>
            <label className="form-label">Email пользователя</label>
            <input className="form-control mb-3" value="new.manager@example.com" readOnly />
            <label className="form-label">Роль</label>
            <select className="form-select mb-3" value="Менеджер" disabled>
              <option>Менеджер</option>
              <option>Руководитель</option>
            </select>
            <button className="btn btn-outline-primary w-100" type="button">Отправить приглашение</button>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="auth-panel">
            <h3>Первый вход</h3>
            <label className="form-label">Новый пароль</label>
            <input className="form-control mb-3" type="password" value="password" readOnly />
            <label className="form-label">Повтор пароля</label>
            <input className="form-control mb-3" type="password" value="password" readOnly />
            <button className="btn btn-success w-100" type="button">Задать пароль</button>
          </div>
        </div>
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
