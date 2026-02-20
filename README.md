# 🛍️ Nova Shop - Modern E-Commerce Platform

<div align="center">

**A cutting-edge, fully responsive e-commerce platform built with modern web technologies**

[🌐 Live Demo](https://nova-shop8705.vercel.app/)

</div>

---

### 🏠 Homepage
<div>
  <i>Stunning hero section with smooth animations and modern design</i>
</div>

### 🛒 Products Page
<div>
  <i>Advanced filtering system with seamless product browsing</i>
</div>

### 🌙 Dark Mode
<div>
  <i>Beautiful dark theme for comfortable nighttime shopping</i>
</div>

---

## ✨ Features

### 🎨 **User Interface**
- ✅ **Modern & Responsive Design** - Flawless experience across all devices
- ✅ **Dark/Light Theme Toggle** - Personalized browsing with theme persistence
- ✅ **Smooth Animations** - Powered by Framer Motion for delightful interactions
- ✅ **Interactive Components** - Lottie animations and micro-interactions
- ✅ **Beautiful Gradients** - Eye-catching color schemes and visual effects

### 🛍️ **E-Commerce Functionality**
- ✅ **Product Catalog** - Browse 100+ products across multiple categories
- ✅ **Advanced Filtering** - Filter by category, brand, price range, and search
- ✅ **Shopping Cart** - Add, remove, and update quantities with ease
- ✅ **Cart Persistence** - Cart data saved across browser sessions
- ✅ **Product Details** - Comprehensive product information with images
- ✅ **Category Pages** - Dedicated pages for each product category
- ✅ **Real-time Notifications** - Toast messages for user actions

### 🔐 **Authentication & Security**
- ✅ **Clerk Integration** - Secure authentication and user management
- ✅ **Protected Routes** - Cart and checkout accessible only to authenticated users
- ✅ **User Profiles** - Personalized user experience with profile management

### ⚡ **Performance & Optimization**
- ✅ **Lazy Loading** - Components and pages load on-demand
- ✅ **Code Splitting** - Optimized bundle size with React Router
- ✅ **Image Optimization** - Lazy loading for images and assets
- ✅ **Fast Load Times** - Optimized for speed with Vite build tool
- ✅ **SEO Friendly** - Proper meta tags and semantic HTML

### 🎯 **Additional Features**
- ✅ **Smooth Scrolling** - Scroll-to-top button for easy navigation
- ✅ **Breadcrumbs** - Clear navigation path for better UX
- ✅ **Loading States** - Skeleton loaders and spinners
- ✅ **Error Handling** - Graceful error messages and fallbacks
- ✅ **Mobile Menu** - Touch-optimized sidebar navigation
- ✅ **Sticky Header** - Always-accessible navigation bar

---

## 🛠️ Tech Stack

### **Core Technologies**
- **React.js 18.x** - Modern React with Hooks and Context API
- **Vite 5.x** - Lightning-fast build tool and dev server
- **JavaScript ES6+** - Modern JavaScript features
- **HTML5 & CSS3** - Semantic markup and modern styling

### **Styling & UI**
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Framer Motion** - Production-ready animation library
- **Lottie React** - Lightweight animations from JSON
- **Lucide React** - Beautiful & consistent icons
- **React Icons** - Popular icon library integration

### **Routing & Navigation**
- **React Router DOM** - Declarative routing for React
- **React Scroll to Top** - Smooth scroll functionality

### **State Management**
- **React Context API** - Global state management
- **Custom Hooks** - Reusable stateful logic

### **Authentication**
- **Clerk** - Complete user management platform

### **Data & API**
- **Axios** - Promise-based HTTP client
- **DummyJSON API** - Mock product data

### **UI Components & Libraries**
- **React Slick** - Carousel component
- **React Toastify** - Toast notifications
- **Slick Carousel** - Responsive carousel

---

## 📂 Project Structure

```
Nova_Shop/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, videos, animations
│   ├── components/        # Reusable components
│   │   ├── Homepage_Components/
│   │   │   ├── Carousel.jsx
│   │   │   ├── Category.jsx
│   │   │   ├── Deals.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── MidBanner.jsx
│   │   │   ├── Reviews.jsx
│   │   │   └── UseCaseSection.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductListView.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── FilterSection.jsx
│   │   ├── MobileFilter.jsx
│   │   ├── Pagination.jsx
│   │   ├── Breadcrums.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/           # React Context providers
│   │   ├── CartContext.jsx
│   │   └── DataContext.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── SingleProduct.jsx
│   │   ├── CategoryProduct.jsx
│   │   ├── Cart.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── PolicyHub.jsx
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── package.json           # Dependencies
└── README.md              # Project documentation

