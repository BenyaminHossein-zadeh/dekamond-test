**Built with ❤️ for Dekamond Team**

# 🚀 Dekamond Test Application

A modern, full-stack authentication and dashboard application built with Next.js 15, featuring server-side rendering, custom toast notifications, Beatufull not found page and a beautiful Persian UI.

## ✨ Features

### 🔐 Authentication System
- **Secure Login**: Phone number and password authentication
- **Password Strength Indicator**: Real-time password strength with 4 levels (ضعیف، متوسط، قوی، خیلی قوی)
- **Show/Hide Password**: Toggle password visibility with eye icon
- **Form Validation**: Comprehensive client and server-side validation
- **Cookie-based Sessions**: Secure authentication with HTTP-only cookies
- **Auto-redirect**: Smart routing based on authentication status

### 🎨 User Interface
- **Persian RTL Support**: Full right-to-left language support
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Custom Toast Notifications**: Beautiful notification system with 4 types
- **Loading States**: Smooth loading animations and spinners
- **Modern UI**: Clean, modern design with gradients and animations

### 🏗️ Architecture
- **Server-Side Rendering (SSR)**: Better SEO and performance
- **App Router**: Next.js 15 App Router with modern patterns
- **Server Components**: Optimized rendering with server components
- **Client Components**: Interactive features with client components
- **Middleware**: Route protection and authentication checks
- **TypeScript**: Full type safety throughout the application

### 🔧 Technical Features
- **Custom Toast System**: Built from scratch without external packages
- **Password Validation**: Advanced password strength algorithm
- **Theme Context**: Global theme management with cookies
- **Form Handling**: Server actions for form submissions
- **Error Handling**: Comprehensive error management
- **Accessibility**: ARIA labels and keyboard navigation

## 🛠️ Technologies Used

- **Framework**: Next.js 15.3.4
- **Language**: TypeScript 5
- **Styling**: SCSS Modules
- **Font**: Vazirmatn (Persian font)
- **Icons**: Custom SVG icons
- **State Management**: React Context + Server State
- **Authentication**: Cookie-based sessions
- **Deployment**: Ready for Vercel/Netlify

## 📁 Project Structure

```
dekamond-test/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/              # Authentication pages
│   │   │   ├── page.tsx       # Login page (server component)
│   │   │   ├── AuthForm.tsx   # Login form (client component)
│   │   │   └── actions.ts     # Server actions for auth
│   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── page.tsx       # Dashboard page (server component)
│   │   │   └── DashboardContent.tsx # Dashboard content (client)
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Home page with loading
│   │   └── not-found.tsx      # 404 page
│   ├── components/            # Reusable components
│   │   ├── Button/           # Button component
│   │   ├── Input/            # Input component
│   │   ├── ThemeToggle/      # Theme toggle component
│   │   └── Toast/            # Toast notification system
│   ├── core/                 # Core functionality
│   │   ├── context/          # React contexts
│   │   ├── services/         # API and storage services
│   │   └── validation/       # Form validation logic
│   ├── types/                # TypeScript type definitions
│   ├── styles/               # Global styles
│   └── middleware.ts         # Next.js middleware
├── public/                   # Static assets
└── package.json             # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BenyaminHossein-zadeh/dekamond-test.git
   cd dekamond-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Authentication Flow

### Login Process
1. **Form Validation**: Client-side validation for phone and password
2. **Password Strength**: Real-time strength indicator with 4 levels
3. **Server Action**: Form submission to server action
4. **API Integration**: Fetches user data from RandomUser API
5. **Cookie Setting**: Sets secure authentication cookies
6. **Redirect**: Automatic redirect to dashboard

### Password Requirements
- **Minimum Length**: 8 characters
- **Uppercase Letters**: At least one
- **Lowercase Letters**: At least one
- **Numbers**: At least one
- **Special Characters**: At least one (!@#$%^&*(),.?":{}|<>)

### Password Strength Levels
- **ضعیف (Weak)**: Score 0-2, Red color
- **متوسط (Medium)**: Score 3-4, Yellow color
- **قوی (Strong)**: Score 5-6, Green color
- **خیلی قوی (Very Strong)**: Score 7+, Blue color

## 🎨 Theme System

### Features
- **Light/Dark Mode**: Toggle between themes
- **Persistent Storage**: Theme preference saved in cookies
- **Server-Side Rendering**: Theme applied on initial load
- **Smooth Transitions**: CSS transitions for theme changes

### Usage
```typescript
import { useTheme } from '@/core/context/ThemeContext';

const { theme, toggleTheme } = useTheme();
```

## 🔔 Toast Notification System

### Features
- **4 Types**: Success, Error, Warning, Info
- **Auto-dismiss**: Configurable duration
- **Manual Close**: X button to dismiss
- **Progress Bar**: Visual countdown
- **RTL Support**: Proper positioning for Persian
- **Dark Theme**: Automatic theme adaptation

### Usage
```typescript
import { useToast } from '@/components/Toast';

const { showToast } = useToast();

showToast({
  type: 'success',
  title: 'موفقیت!',
  message: 'عملیات با موفقیت انجام شد',
  duration: 3000
});
```

## 🛡️ Security Features

### Authentication
- **HTTP-Only Cookies**: Secure session storage
- **Server-Side Validation**: Comprehensive input validation
- **Middleware Protection**: Route-level authentication checks
- **Password Hashing**: Secure password handling (in production)

### Data Protection
- **CORS Protection**: Cross-origin request protection
- **XSS Prevention**: Input sanitization
- **CSRF Protection**: Form token validation
- **Secure Headers**: Security headers configuration

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

### Features
- **Mobile-First**: Responsive design approach
- **Touch-Friendly**: Optimized for touch devices
- **Flexible Layouts**: Adaptive component layouts
- **Optimized Images**: Responsive image handling

## 🌐 Internationalization

### RTL Support
- **Persian**: Full right-to-left support
- **Font Optimization**: Vazirmatn font for Persian text
- **Layout Adaptation**: RTL-aware component positioning
- **Text Direction**: Automatic text direction handling

### Language Features
- **Persian UI**: All text in Persian
- **RTL Layout**: Right-to-left layout support
- **Cultural Adaptation**: Persian date/time formats

## 🔧 Custom Components

### Button Component
```typescript
<Button variant="primary" size="medium" onClick={handleClick}>
  کلیک کنید
</Button>
```

### Input Component
```typescript
<Input
  type="text"
  name="phone"
  label="شماره موبایل"
  required
  error={errors.phone}
/>
```

### Theme Toggle
```typescript
<ThemeToggle />
```

## 👨‍💻 Author

**Benyamin Hosseinzadeh**
- Developed for Dekamond Team
- Built with Next.js and TypeScript
- Persian UI specialist

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation

---

**Built with ❤️ for Dekamond Team**

