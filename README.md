💰 Personal Finance Visualizer
A full-stack finance tracking application built with Next.js, MongoDB, Recharts, and ShadCN UI. Developed as part of a Full-stack Developer Internship Assignment.

🌟 Project Overview
The Personal Finance Visualizer helps users manage their daily expenses, categorize spending, and set monthly budgets. It offers a clean dashboard UI with charts, summaries, modals, and responsive design.

✅ Stage 1: Core Transactions
🔨 Features Implemented
✅ Add new transaction (amount, description, date)

✅ View all transactions in a list

✅ Edit and delete individual transactions

✅ Form validation and error handling

✅ Monthly expense bar chart (via Recharts)

✅ Responsive design for mobile and desktop

✅ Styled inputs using ShadCN UI

✅ Clean, modern UI with TailwindCSS

✅ Stage 2: Category Support & Dashboard
🔄 Transaction Enhancements
✅ Added category field to transactions

✅ Styled dropdown for category selection

✅ Updated transaction list UI with category badges

✅ Highlight edited row in transaction list

📊 Data Visualization
✅ Category-wise Pie Chart

✅ Improved Monthly Bar Chart with dynamic data

✅ Fully responsive charts (Recharts)

📌 Dashboard Enhancements
✅ Total Expense card

✅ Top Spending Category card

✅ Most Recent Transactions card

💄 UI & UX Improvements
✅ Smooth scroll to edit form

✅ Styled error messages

✅ Fully mobile-first layout

✅ Stage 3: Budgeting & UX Polish
💸 Budget Management
✅ Add, edit, and delete monthly budgets

✅ Prevent duplicate (category + month) budgets

✅ Validation for budget amount and date

✅ Radix-based Budget Modal for smooth UX

✅ Clean layout for budget list with month and category

📊 Budget Visualization
✅ Budget vs Actual chart (category-wise comparison)

✅ All charts styled and responsive

📋 Dashboard Layout
✅ Transaction section with edit/delete actions

✅ Budget section with highlight for conflicts

✅ One-click modals for both add/edit operations

🌈 UI/UX Polish
✅ Integrated Sonner for toast notifications

✅ Loading spinners (lucide-react) for button actions

✅ Skeleton UI while fetching dashboard data

✅ Dark mode support via Tailwind

✅ All modals, buttons, and inputs powered by ShadCN & Radix Dialog

🔄 State & Logic
✅ Context API used to manage global transaction/budget state

✅ Local state for modal visibility and editing logic

✅ Fetching and mutation wrapped in reusable useLoadingButton() hook

✅ Reusable showToast() utility for toasts

🛠️ Tech Stack
Layer	Technology
Frontend	Next.js (App Router), React
Styling	TailwindCSS, ShadCN UI, Radix Dialog
Charts	Recharts
State Mgmt	React Context API
Backend	API Routes in Next.js
Database	MongoDB Atlas
Deployment	Vercel
Notifications	Sonner

🌱 Future Enhancements
🔐 User authentication & multi-user accounts

📁 Export transactions as CSV/Excel

📈 Yearly trends visualization

📅 Recurring transactions support

🧠 AI-based spending insights

🗃️ Pagination and filtering

🌍 Localization and multi-currency support

🚀 Deployment
This project is deployed on Vercel for fast, global access.