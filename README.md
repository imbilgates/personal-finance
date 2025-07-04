# 💰 Personal Finance Visualizer - Stage 1

A full-stack finance tracker application built with **Next.js**, **MongoDB**, **Recharts**, and **ShadCN UI**. This project is submitted as part of the Full-stack Developer Internship Assignment.

---

## 🚀 Features Implemented (Stage 1)

✅ Add new transaction (amount, description, date)  
✅ View all transactions in a list  
✅ Edit and delete individual transactions  
✅ Monthly expense bar chart using Recharts  
✅ Responsive design (mobile + desktop)  
✅ Form validation for user inputs  
✅ Clean and modern UI with TailwindCSS & shadcn/ui  

---

## 🛠️ Tech Stack

| Layer       | Technology |
|-------------|------------|
| Frontend    | Next.js (App Router), React |
| Styling     | Tailwind CSS, ShadCN UI |
| Charts      | Recharts |
| Backend     | API Routes in Next.js |
| Database    | MongoDB Atlas |
| Deployment  | Vercel |

---

## 📦 Folder Structure (Stage 1)

personal-finance/
├── app/
│   ├── api/
│   │   └── transactions/
│   │       ├── route.js           # Handles GET and POST
│   │       └── [id]/route.js      # Handles PUT and DELETE
│   └── page.js                    # Main dashboard page
├── components/
│   ├── TransactionForm.js         # Add/edit transaction form
│   ├── TransactionList.js         # Lists all transactions
│   ├── MonthlyChart.js            # Monthly bar chart
│   ├── CategoryPieChart.js        # Category-wise pie chart
│   └── SummaryCards.js            # Total, top category, recent
├── lib/
│   ├── mongodb.js                 # MongoDB connection
│   └── constants.js              # CATEGORIES array and other shared constants
├── models/
│   └── Transaction.js             # Mongoose schema for transactions
├── public/
│   └── (assets if any, like logo, icons, etc.)
├── styles/
│   └── (global.css or Tailwind config if needed)
├── .env.local                     # MongoDB URI and other env vars
├── README.md                      # Project documentation
├── package.json                   # Dependencies and scripts
└── tailwind.config.js             # TailwindCSS config (if customized)



💰 Personal Finance Visualizer - Stage 2
A feature-rich full-stack personal finance tracker built with Next.js, MongoDB, Recharts, and ShadCN UI. This project is developed as part of the Full-stack Developer Internship Assignment.

🚀 Features Implemented (Stage 2 ✅)
🔄 Core Transaction Features
✅ Add, edit, and delete transactions

✅ Each transaction has: amount, description, date, and new category field

✅ Form validation for all fields

📊 Data Visualization
✅ Monthly Bar Chart of expenses (via Recharts)

✅ Category-wise Pie Chart to visualize spending patterns

✅ Charts are responsive and adapt to mobile/tablet/desktop

📋 Transaction List UI
✅ Responsive, clean layout

✅ Displays amount, date, description, category (like a table)

✅ Highlighting row on edit

✅ Category badge design

📌 Dashboard Summary
✅ Total Expense

✅ Top Spending Category

✅ Most Recent Transactions

💅 UI & UX
✅ Styled dropdown for categories

✅ Styled date input

✅ Input focus, validation, and error messages

✅ Smooth scroll to form on edit

✅ Fully responsive design (mobile-first)

📊 Sample Categories
    [Food, Travel, Shopping, Bills, Entertainment, Health, Education, Other]

Folder Structure (Stage 2)

personal-finance/
├── app/
│   ├── api/
│   │   └── transactions/
│   │       ├── route.js           # GET, POST
│   │       └── [id]/route.js      # PUT, DELETE
│   └── page.js
├── components/
│   ├── TransactionForm.js
│   ├── TransactionList.js
│   ├── MonthlyChart.js
│   ├── CategoryPieChart.js
│   └── SummaryCards.js
├── lib/
│   ├── mongodb.js
│   └── constants.js               # CATEGORIES array
├── models/
│   └── Transaction.js
├── public/
├── styles/
├── .env.local
└── README.md


