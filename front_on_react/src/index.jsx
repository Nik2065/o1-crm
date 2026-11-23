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
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">CRM</div>
          <div>
            <div className="brand-title">Client Desk</div>
            <div className="brand-caption">Макет MVP</div>
          </div>
        </div>

        <nav className="nav flex-column gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-link text-start ${activeTab === tab.id ? "active" : ""}`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="small text-secondary">Текущий пользователь</div>
          <div className="fw-semibold">Анна Мельникова</div>
          <span className="badge text-bg-light border">Руководитель</span>
        </div>
      </aside>

      <main className="content">
        <TopBar />
        {activeTab === "clients" && <ClientsPage />}
        {activeTab === "files" && <FilesPage />}
        {activeTab === "tasks" && <TasksPage />}
        {activeTab === "users" && <UsersPage />}
        {activeTab === "auth" && <AuthPage />}
      </main>
    </div>
  );
}

function TopBar() {
  return (
    <div className="topbar">
      <div>
        <h1>CRM система</h1>
        <div className="text-secondary">Организации, контакты, файлы, задачи и пользователи</div>
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-outline-secondary btn-sm" type="button">
          Экспорт
        </button>
        <button className="btn btn-primary btn-sm" type="button">
          Создать
        </button>
      </div>
    </div>
  );
}

function ClientsPage() {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();

  const filteredOrganizations = useMemo(() => {
    if (!normalized) return organizations;
    return organizations.filter((org) => {
      const orgContacts = contacts.filter((contact) => contact.organizationId === org.id);
      return [org.name, org.inn, org.phone, org.email, ...orgContacts.flatMap((contact) => [contact.name, contact.phone, contact.email])]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
    });
  }, [normalized]);

  return (
    <section className="page-section">
      <div className="section-header">
        <div>
          <h2>Организации и контакты</h2>
          <p>Единый список клиентской базы с поиском по названию, ФИО, телефону, email и ИНН.</p>
        </div>
        <div className="actions">
          <button className="btn btn-outline-primary btn-sm" type="button">
            Добавить контакт
          </button>
          <button className="btn btn-primary btn-sm" type="button">
            Добавить организацию
          </button>
        </div>
      </div>

      <div className="toolbar">
        <input
          className="form-control"
          placeholder="Поиск по клиентам, контактам, телефону, email или ИНН"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-7">
          <div className="panel">
            <div className="panel-title">Организации</div>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Организация</th>
                    <th>Контакты</th>
                    <th>Статус</th>
                    <th>Ответственный</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrganizations.map((org) => (
                    <tr key={org.id}>
                      <td>
                        <div className="fw-semibold">{org.name}</div>
                        <div className="small text-secondary">{org.inn} · {org.email}</div>
                      </td>
                      <td>{contacts.filter((contact) => contact.organizationId === org.id).length}</td>
                      <td>
                        <span className={`badge ${statusClass(org.status)}`}>{org.status}</span>
                      </td>
                      <td>{userName(org.managerId)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-5">
          <div className="panel">
            <div className="panel-title">Контакты</div>
            <div className="contact-list">
              {contacts.map((contact) => (
                <div className="contact-item" key={contact.id}>
                  <div>
                    <div className="fw-semibold">{contact.name}</div>
                    <div className="small text-secondary">{contact.position}</div>
                    <div className="small">{orgName(contact.organizationId)}</div>
                  </div>
                  <div className="text-end small">
                    <div>{contact.phone}</div>
                    <div className="text-secondary">{contact.email}</div>
                  </div>
                </div>
              ))}
            </div>
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
