# 🐾 Pet Sales Dashboard (Angular 19 + Material)

This project is a modern **Angular 19 application** that demonstrates **real-time pet sales analytics** using a **weekly line chart** and **daily sales table**, powered by [Material UI](https://material.angular.io/) and [angular-highcharts](https://github.com/cebor/angular-highcharts). It includes clean, maintainable services, component architecture, and strict TypeScript practices.

---

## 🚀 Features

- Angular 19 (Standalone APIs)
- Angular Material for UI components
- Highcharts integration for interactive charting
- Fully reactive forms with validations
- Global loader interceptor
- Modular folder structure
- Chart + Table visualization
- API-driven with separation of request/response models
- Mat-Dialog for Add/Edit operations
- Pagination, Sorting, Filtering supported
- Responsive design-ready layout
- Type-safe development with strict typings

---

## 📁 Folder Structure Overview

```
src/
├── app/
│   ├── auth/
│   │   │   ├── components/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   ├── auth-routing.module.ts
│   │   └── auth.module.ts
│   ├── core/
│   │   ├── enums/
│   │   ├── guards/
│   │   └── interceptors/
│   ├── features/
│   │   ├── attractions/
│   │   │   ├── components/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   ├── attractions-routing.module.ts
│   │   │   └── attractions.module.ts
│   │   ├── pet-sales/
│   │   │   ├── components/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   ├── pet-sales-routing.module.ts
│   │   │   └── pet-sales.module.ts
│   │   └── users/
│   │       ├── components/
│   │       ├── models/
│   │       ├── services/
│   │       ├── users-routing.module.ts
│   │       └── users.module.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── confirm-dialog/
│   │   │   └── loader/
│   │   ├── services/
│   │   └── environments/
│   ├── layout/
│   │   └── header/
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.module.ts
│   └── app.routes.ts
├── assets/
├── environments/
├── index.html
├── main.ts
└── styles.scss
```

---

## ⚙️ Setup Instructions

> Ensure Node.js (v18+) and Angular CLI (v16 or higher) are installed.

### 1. **Clone the Repository**

```bash
git clone <your-repository-link>
cd <project-folder>
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Run the Application**

```bash
ng serve
```

> Navigate to: [http://localhost:4200](http://localhost:4200)

---

## 📦 External Libraries Used

| Library              | Purpose                                  |
|----------------------|------------------------------------------|
| `@angular/material`  | UI components                            |
| `angular-highcharts` | Charts & analytics display               |
| `moment`             | Date handling for charts                 |

---

## 🧪 API Used

All data is fetched from:

-  `https://www.melivecode.com`

---

## 💡 Notes

- I did **not use any utility-first CSS framework** (like Tailwind) to reduce dependency overhead.
- All layouts and spacing are implemented using **custom CSS** for maintainability.
- Code is optimized with **Angular 19 standalone features**, **modular structure**, and **strict type-checking**.
- Focus was placed on **functionality and code reliability** with simple design, ensuring long-term scalability.

---

## ✅ Final Checklist

- [x] Angular 19 used with latest features
- [x] Highcharts for visual analytics
- [x] Clean folder structure
- [x] Loader with global interceptor
- [x] Request/Response models isolated
- [x] Dialog-based form management
- [x] Pagination and sorting implemented
- [x] Git-friendly structure ready to push

---

## 📧 Contact

For any queries or issues, feel free to reach out via email or open an issue on the repository.

---

> _Thank you for the opportunity. This submission reflects our professional engineering standards and latest Angular practices._