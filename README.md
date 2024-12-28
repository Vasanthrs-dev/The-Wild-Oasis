# Hotel Management Dashboard 🏨

This project is a feature-rich hotel management application built with **React** and **Supabase**. It allows hotel employees to efficiently manage bookings, cabins, guests, and more, all through a user-friendly dashboard.

---

## 🚀 Live Demo

[Click here to view the live application](#)  
(Replace `#` with your deployed app link)

---

## 🖼️ Screenshots

### Login Page
![Login Screenshot](https://github.com/user-attachments/assets/4a068a4b-2e9b-4f11-9a22-3432113c9995)


### Dashboard View
![Dashboard Screenshot](https://github.com/user-attachments/assets/8e02bc3d-a3e2-4f50-940f-2f4fddfa2834)


### Booking Table
![Booking Screenshot](https://github.com/user-attachments/assets/960a2c5f-fa24-4c61-b082-d86d0864645d)


### Cabins Management
![Cabins Screenshot](https://github.com/user-attachments/assets/11ef139e-8a1d-4860-abd8-f496c5d2f4e7)




---

## 📋 Features

- **Dashboard**: Displays a summary of hotel performance (check-ins, bookings, sales, etc.) for the last 7, 30, or 90 days.
- **Cabin Management**: Add, update, delete, or view cabins with details like photos, capacity, price, and discounts.
- **Booking Management**: Manage bookings with statuses like "Unconfirmed," "Checked In," and "Checked Out." Includes filtering and editing capabilities.
- **Guest Management**: Store and manage guest information, including names, emails, national IDs, and more.
- **Check-In & Check-Out**: Seamless flow for guest check-ins and check-outs, with payment validation.
- **Dark Mode**: Toggle dark mode for a better user experience.
- **Form Management**: Efficient forms with validation for user input and actions.

---

## 🛠️ Technology Decisions

| Feature                       | Technology Used              | Why?                                           |
|-------------------------------|------------------------------|-----------------------------------------------|
| **Routing**                   | React Router                | Industry standard for SPA navigation.         |
| **Styling**                   | Styled Components           | Component-scoped CSS within JavaScript.       |
| **Remote State Management**   | React Query                 | Handles caching, re-fetching, and offline support. |
| **UI State Management**       | Context API                 | Simplifies state sharing for smaller apps.    |
| **Form Management**           | React Hook Form             | Handles form state creation and validation.   |
| **Charts**                    | Recharts                    | Simple and customizable library for data visualization. |
| **Backend**                   | Supabase                    | Scalable and real-time database solution.     |

---

## 📋 Business Requirements

This application meets the following requirements:
- User authentication for hotel employees.
- Table views for managing cabins, bookings, and guests.
- Actions like add, update, delete, check-in, and check-out.
- Statistics dashboard for performance tracking.
- Configurable app settings (e.g., pricing, max/min bookings).
