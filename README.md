# Портфолио — Ilkin Ibadov

Лендинг-портфолио fullstack-разработчика на Next.js с поддержкой RU/EN, анимациями, контактной формой (Supabase + Resend) и AI-помощником для улучшения сообщения.

## Стек

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion
- **i18n:** next-intl (русский по умолчанию)
- **Формы:** react-hook-form + Zod
- **БД:** Supabase (таблица `contacts`)
- **Email:** Resend (уведомление владельцу + копия пользователю)
- **AI:** OpenAI API (`gpt-4o-mini`) — улучшение текста в форме

## Запуск локально

```bash
npm install
cp .env.example .env
# Заполните переменные в .env (см. ниже)
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) — по умолчанию откроется русская версия (`/ru`).

## Переменные окружения

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL проекта Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Публичный ключ Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (только на сервере) |
| `RESEND_API_KEY` | API-ключ Resend |
| `RESEND_FROM_EMAIL` | Отправитель на **верифицированном** домене, напр. `Ilkin Ibadov <contact@ilkinibadov.com>` (не `onboarding@resend.dev`) |
| `OWNER_EMAIL` | Email для уведомлений о новых заявках |
| `OPENAI_API_KEY` | Для AI-кнопки «Улучшить сообщение» |

## Supabase

Выполните SQL из [`supabase/migrations/001_contacts.sql`](supabase/migrations/001_contacts.sql) в Supabase SQL Editor.

Таблица `contacts` хранит: имя, телефон, email, комментарий, дата. RLS включён; вставка только через API с service role key.

## Реализация формы

Цикл обработки заявки:

1. **Frontend** — валидация полей (Zod + react-hook-form), состояния loading / success / error
2. **API** — `POST /api/contact` повторная серверная валидация
3. **Supabase** — сохранение записи в `contacts`
4. **Resend** — два письма: владельцу сайта и копия отправителю
5. **Ответ** — JSON `{ ok: true }` или ошибка с кодом

## AI-инструменты

### На сайте

- Секция «Как использую AI» — описание практик (LLM в production, Cursor/Copilot, менторство)
- Кнопка **«Улучшить сообщение (AI)»** — `POST /api/ai/polish` отправляет черновик в OpenAI и подставляет улучшенный текст в поле комментария
- **Плавающий AI-чат** (правый нижний угол) — `POST /api/ai/chat` отвечает от первого лица об опыте, стеке и проектах; посторонние вопросы вежливо отклоняются

### При разработке (Cursor / Copilot)

| Задача | Сделано с AI | Исправлено вручную |
|--------|----------------|---------------------|
| Структура проекта и boilerplate | Да | Архитектура i18n, API routes |
| Переводы RU/EN | Черновик | Факты из резюме, формулировки |
| Стили и анимации | Подсказки Tailwind/Framer | Цвета `#334EAC`, `#F7F2EB`, отступы |
| API contact + Resend | Шаблон | Обработка ошибок, HTML писем |
| Валидация Zod | Да | Сообщения i18n |

## Деплой (Vercel)

1. Загрузите репозиторий на GitHub
2. Импортируйте проект в [Vercel](https://vercel.com)
3. Добавьте все переменные из `.env.example`
4. После деплоя проверьте форму end-to-end

## Скрипты

```bash
npm run dev    # разработка
npm run build  # production-сборка
npm run start  # запуск production
npm run lint   # ESLint
```

## Структура страницы

- **О себе** — био, стек, языки, образование
- **Как работаю** — подход + AI-практики
- **Опыт** — карточки с местами работы
- **Контакты** — форма обратной связи
