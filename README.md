# **Revive Mart 🛒 - (SecondHand Marketplace Web Application)**

This is the frontend of the **SecondHand Marketplace Web Application**, where users can buy and sell used items. It is built using **React**, **Redux**, **TypeScript**, and **Tailwind CSS** for a responsive and modern UI. Users can browse listings, create new listings, view their dashboard, and communicate with sellers.

**Live Link** - https://revive-mart-brown.vercel.app

---

## Features

- **User Authentication**: Login and registration using JWT tokens for secure access.
- **Dynamic Routing**: Implemented with React Router for seamless navigation.
- **Dashboard**: Users can manage their listings, profile, and transaction history.
- **Listings Management**: Create, update, delete, and view listings.
- **Search & Filters**: Search items by categories, price, and condition.
- **Responsive Design**: Optimized for mobile and desktop screens using Tailwind CSS.
- **State Management**: Handled with Redux Toolkit for efficient global state management.
- **Modals for CRUD Operations**: Forms for adding and editing listings appear as modals for better user experience.

---

## Installation

1. **Clone the Repository**:
```bash
git clone https://github.com/your-username/secondhand-marketplace-frontend.git
cd secondhand-marketplace-frontend
```

2. **Install Dependencies**:
```bash
npm install
```

3. **Set Up Environment Variables**:
Create a `.env` file in the root directory and add:
```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_NEXTAUTH_URL=
NEXT_PUBLIC_BACKEND_URL=
```

4. **Run Development Server**:
```bash
npm run dev
```

5. **Build for Production**:
```bash
npm run build
```

6. **Preview Production Build**:
```bash
npm run preview
```

---

## Project Structure

```
📦src
 ┣ 📂app
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📂auth
 ┃ ┃ ┃ ┗ 📂[...nextauth]
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂cart
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂dashboard
 ┃ ┃ ┣ 📂listing
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂profile
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂purchase-history
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂sales-history
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂sidebar
 ┃ ┃ ┃ ┣ 📜AdminSidebar.tsx
 ┃ ┃ ┃ ┗ 📜UserSidebar.tsx
 ┃ ┃ ┣ 📂users
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂product-details
 ┃ ┃ ┗ 📂[productId]
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂products
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂register
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂wishlist
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜error.tsx
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜loading.tsx
 ┃ ┣ 📜not-found.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂components
 ┃ ┣ 📂home
 ┃ ┃ ┣ 📜Banner.tsx
 ┃ ┃ ┣ 📜Categories.tsx
 ┃ ┃ ┣ 📜FeaturedProducts.tsx
 ┃ ┃ ┣ 📜ProductCard.tsx
 ┃ ┃ ┣ 📜SpecialOffers.tsx
 ┃ ┃ ┗ 📜WhyChooseUs.tsx
 ┃ ┣ 📂shared
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜Navbar.tsx
 ┃ ┃ ┗ 📜Providers.tsx
 ┃ ┗ 📂ui
 ┃ ┃ ┣ 📜button.tsx
 ┃ ┃ ┣ 📜card.tsx
 ┃ ┃ ┣ 📜dialog.tsx
 ┃ ┃ ┣ 📜input.tsx
 ┃ ┃ ┣ 📜label.tsx
 ┃ ┃ ┗ 📜table.tsx
 ┣ 📂lib
 ┃ ┗ 📜utils.ts
 ┣ 📂redux
 ┃ ┣ 📂features
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┗ 📜authSlice.ts
 ┃ ┃ ┣ 📂cart
 ┃ ┃ ┃ ┗ 📜cartSlice.ts
 ┃ ┃ ┣ 📂listing
 ┃ ┃ ┃ ┗ 📜listingSlice.ts
 ┃ ┃ ┣ 📂order
 ┃ ┃ ┃ ┗ 📜orderSlice.ts
 ┃ ┃ ┗ 📂wishlist
 ┃ ┃ ┃ ┗ 📜wishlistSlice.ts
 ┃ ┗ 📜store.ts
 ┣ 📂types
 ┃ ┗ 📜next-auth.d.ts
 ┗ 📂utils
 ┃ ┣ 📜authOptions.ts
 ┃ ┗ 📜axiosInstance.ts
```

---

## API Integration

The frontend communicates with the backend via RESTful APIs. Example of fetching all listings:

```typescript
import axios from 'axios';

const fetchListings = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/listings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching listings", error);
    return [];
  }
};
```

---

## Tech Stack

- **Frontend Framework**: Nextjs (with TypeScript)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS, Shadcn UI
- **Routing**: Next Router
- **Authentication**: JWT (via backend)
- **API Requests**: Axios
- **Auth**: NextAuth

---

## Available Scripts

- **Start Development Server**:
```bash
npm run dev
```

- **Build for Production**:
```bash
npm run build
```

- **Preview Production Build**:
```bash
npm run preview
```

## Future Improvements

- Implement messaging system for real-time communication.
- Implement wishlist and review systems.
- Enhance accessibility and SEO.
- Optimize performance for large data handling.

---

## Author

[Nur Alam Chowdhury](https://github.com/Nur-Alam-Limon)