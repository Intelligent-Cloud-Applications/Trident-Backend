# Trident Website (Temp App)

A modern, responsive, and animated web application built for Trident Academy of Technology using React, Vite, and Tailwind CSS. The project incorporates advanced animations, smooth scrolling, and dynamic routing to deliver a premium user experience.

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Animations:** 
  - [GSAP](https://gsap.com/) (GreenSock Animation Platform)
  - [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scrolling:** [Lenis](https://lenis.studiofreight.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography Animation:** [Split-Type](https://www.npmjs.com/package/split-type)

## 📁 Project Structure

The project follows a modular architecture:

- `src/components/`: Reusable UI components (e.g., Header, Footer, Hero, Testimonials, Placements).
- `src/pages/`: Page-level components corresponding to different routes (e.g., About, Alumni, Career, NAAC, NBA, NIRF).
- `src/utils/`: Utility functions and animation helpers.
- `src/data/`: Static data and configuration files.
- `src/assets/`: Images, icons, and other static assets.

## 🛠️ Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Install the dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

### Production Build

To build the application for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🎨 Features

- **Advanced Animations:** Utilizes GSAP and Framer Motion for scroll-triggered animations, page transitions, and interactive elements.
- **Responsive Design:** Fully responsive layout built with Tailwind CSS, ensuring a seamless experience across all devices.
- **Comprehensive Pages:** Includes specialized pages for AICTE, NAAC, NBA, and BPUT compliance, along with academic and placement information.
- **Smooth Scrolling:** Integrated Lenis for a fluid and native-feeling scroll experience.

## 📝 Linting

This project uses ESLint for code quality and consistency:

```bash
npm run lint
```
