# Todo Summary Assistant

A full-stack productivity app that allows users to manage their personal to-do items, summarize pending tasks using the Gemini LLM API, and send the summary to a Slack channel.

---

## 🚀 Features

* ✅ Add, edit, and delete personal to-do items.
* 📋 View a list of current to-dos.
* 🧠 Summarize all pending to-dos using Gemini API.
* 🚀 Send the summary to a configured Slack channel.
* 🔔 Success/failure status for Slack, Supabase and Gemini API integration.

---

## 🛠️ Stack Used

* **Frontend**: React (Vite + JSX)
* **Backend**: Node.js + Express
* **Database**: Supabase (PostgreSQL)
* **LLM API**: Gemini (Google)
* **Messaging**: Slack Incoming Webhooks

---

## 🖼️ Screenshots
![Screenshot 2025-05-25 170129](https://github.com/user-attachments/assets/a5f022ad-bb6d-4d6f-bbe9-1aa7cc532941)

## 📂 Project Structure

```
/todo-summary-assistant
  /frontend       # React frontend
  /backend        # Node.js Express backend
```

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Aabhasmishra/Todo-Summary-Assistant.git
cd Todo-Summary-Assistant
```

### 2. Environment Variables

Create `.env` files in both the `frontend` and `backend` folders based on the `.env` files provided.

#### Backend (`/backend/.env`):

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_gemini_api_key
SLACK_WEBHOOK_URL=your_slack_webhook_url
PORT=5000
```

#### Frontend (`/frontend/.env`):

```env
VITE_API_URL=http://localhost:5000
```

### 3. Install Dependencies

#### Backend:

```bash
cd backend
npm install
```

#### Frontend:

```bash
cd ../frontend
npm install
```

### 4. Run the Application

#### Backend:

```bash
nodemon app.js
```

#### Frontend:

```bash
npm run dev
```

---

## 🧠 Gemini API Integration

Gemini is used to summarize the list of pending to-dos.

**Endpoint:**

```http
POST /summarize
```

**Description:**

* Fetches all pending to-dos from Supabase.
* Sends them to Gemini API to generate a meaningful summary.
* Posts the summary to Slack.

---

## 💬 Slack Integration

The project uses Slack's **Incoming Webhooks** to post summaries.

### Setup Slack Webhook:

1. Go to [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks).
2. Click "Create an app" > Select your workspace.
3. Add features and functionality > Incoming Webhooks.
4. Enable Webhooks and generate a Webhook URL.
5. Add this URL to your `.env` as `SLACK_WEBHOOK_URL`.

### ✅ AI Generated Summary Example
![summery](https://github.com/user-attachments/assets/ef8fcb0e-37ec-4845-b991-40ec2efaf009)
---

## 🧱 Design & Architecture Decisions

* Used **Supabase** as an easy-to-integrate hosted PostgreSQL solution.
* Selected **Gemini API** for summarization due to its generous free-tier and speed.
* Used **Slack Webhooks** for simplicity and real-time communication.
* Backend and frontend are decoupled for better scalability and clarity.

### 🔄 Application Flow Diagram
### App Flow
![total logic](https://github.com/user-attachments/assets/6278801b-a548-4a16-a533-925eb0457afb)
### Frontend Flow
![frontend logic](https://github.com/user-attachments/assets/93f74a86-d0a1-4f67-ac8f-0fce1d63a308)
### Backend Flow
![backend logic](https://github.com/user-attachments/assets/e4e141d9-f9f2-498b-8e83-3199eb77a4ab)
---

## 🔗 Useful Links

* [Supabase Documentation](https://supabase.com/docs)
* [Gemini API](https://ai.google.dev/)
* [Slack Webhooks Guide](https://api.slack.com/messaging/webhooks)

---

## 🌐 Deployment (Optional)

If you deploy it, feel free to add:

* Vercel/Netlify/Firebase URL for frontend
* Railway/Render for backend

---

## 📄 License

This project is open-source and available under the MIT License.
