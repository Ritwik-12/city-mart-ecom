# Ecom Frontend

Responsive React + Vite + Tailwind frontend for the `Ritwik-12/sb-ecom` Spring Boot e-commerce API.

## Stack

- React 19
- Vite
- Tailwind CSS v4
- React Router
- Axios
- Redux Toolkit
- React Hook Form + Zod-ready validation
- Lucide React
- React Icons
- Sonner

## Run

Requirements:

- Node.js 20+ recommended
- Spring Boot backend running on `http://localhost:9090`

```bash
npm install
```

Create `.env`:

```env
VITE_API_BASE_URL=http://localhost:9090
VITE_APP_NAME=Ecom
```

Then:

```bash
npm run dev
```

Open `http://localhost:5173`.

## Backend integration

Implemented against the current backend controllers:

- `POST /api/auth/signin`
- `POST /api/auth/signup`
- `POST /api/auth/signout`
- `GET /api/auth/user`
- `GET /api/public/categories`
- `GET /api/public/products`
- `GET /api/public/category/{categoryId}/products`
- `GET /api/public/products/keyword/{keyword}`
- `POST /api/carts/products/{productId}/quantity/{quantity}`
- `GET /api/carts/users/cart`
- `PUT /api/cart/product/{productId}/quantity/{operation}`
- `DELETE /api/cart/{cartId}/product/{productId}`
- `GET /api/user/address`
- `POST /api/address`
- `PUT /api/address/{addressId}`
- `DELETE /api/address/{addressId}`
- `POST /api/order/users/payments/{paymentMethod}`
- Admin category and product APIs, including image upload

The backend uses a JWT cookie and also accepts a Bearer token. The frontend Axios client therefore uses `withCredentials: true`.

## Important backend gaps noted

The current backend does not expose:

- A public `GET product by productId` endpoint. The product details page temporarily loads the public product list and finds the requested ID.
- Wishlist APIs.
- User order-history / order-by-id APIs.
- A real payment gateway flow.

The frontend leaves these areas ready for the corresponding backend APIs instead of inventing endpoints.

## Image handling

Product API responses from `/api/public/products` include a constructed image URL. Other product search/category responses may return a filename. The frontend normalizes both forms and falls back to a local placeholder when an image cannot be loaded.

Marketing hero banners are local SVG assets so the application works without depending on a third-party image CDN.
