# 📖 BookNest Frontend

The frontend for BookNest is a responsive React application built with Vite that provides an intuitive interface for users to browse books, take adaptive quizzes, track their progress, and improve their English language skills.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
```bash
cd frontend
npm install
```

### Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔧 Configuration

The frontend automatically configures itself to communicate with the backend based on the current window location. No additional configuration is typically needed for development.

For production deployments, ensure that:
1. The backend is accessible from the frontend domain
2. CORS is properly configured on the backend
3. The build is deployed to a static hosting service

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── Components/         # Reusable UI components
│   │   ├── Layout/         # Page layouts (GuestLayout, MainLayout)
│   │   ├── Context/        # React Context providers (UserContext)
│   │   ├── Home/           # Home page components
│   │   ├── LearnLanguage/  # Language learning/quiz components
│   │   ├── ProfileUser/    # User profile components
│   │   ├── ...             # Other feature components
│   ├── App.jsx             # Main application component with routing
│   ├── App.css             # Global styles
│   ├── index.css           # Tailwind CSS base styles
│   └── main.jsx            # Entry point
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
└── README.md               # This file
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🧩 Key Features

### User Authentication
- Registration and login forms
- JWT token storage and management
- Protected routes for authenticated users

### Book Discovery
- Browse and search book catalog
- Filter by category and difficulty level
- View book details and ratings
- Trending books showcase

### Language Learning
- Adaptive quiz system based on CEFR levels
- Vocabulary tracking and management
- Progress visualization and statistics
- Achievement system with badges

### User Profile
- Personal information management
- Reading statistics and history
- Book library and completed books
- Avatar customization

## 🔌 API Integration

The frontend communicates with the BookNest backend REST API at `/api/*` endpoints. Key integrated services include:

- Authentication (`/api/auth`)
- User profiles (`/api/profile`)
- Book catalog (`/api/books`)
- Progress tracking (`/api/progress`)
- Quiz system (`/api/reader`)
- Vocabulary management (`/api/vocabulary`)
- Achievements (`/api/achievements`)

## 💡 Development Guidelines

### Component Structure
- Follow the existing component organization in `/src/Components`
- Create new features in appropriately named subdirectories
- Use functional components with React hooks
- Implement proper PropTypes or TypeScript definitions

### Styling
- Uses TailwindCSS for utility-first styling
- Follow existing color schemes and spacing conventions
- Create reusable component classes when appropriate
- Maintain responsive design principles

### State Management
- Uses React Context for global state (UserContext)
- Local component state for UI-specific data
- Consider custom hooks for complex logic
- Avoid prop drilling by lifting state appropriately

### Data Fetching
- Uses Axios for HTTP requests
- Centralize API calls in service files when possible
- Implement proper loading and error states
- Use React Query or similar for advanced caching (future enhancement)

## � Testing

Currently, the project doesn't have a test suite configured. Consider adding:
- Unit tests with Jest and React Testing Library
- Integration tests for critical user flows
- End-to-end tests with Cypress or Playwright

## 📱 Responsive Design

The application is designed to be fully responsive:
- Mobile-first approach
- Tested on various screen sizes
- Touch-friendly interfaces
- Adaptive layouts for different devices

## 🚨 Troubleshooting

### Common Issues

**Module not found errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Port already in use:**
```bash
# Change port in vite.config.js or kill existing process
lsof -ti:5173 | xargs kill -9  # macOS/linux
```

**Blank page after build:**
- Check browser console for errors
- Ensure backend API is accessible
- Verify correct build output paths

**CSS not applying:**
- Verify TailwindCSS is properly configured
- Check for typos in class names
- Ensure purge content includes all template files

## 📄 License

This project is part of the BookNest platform and follows the same licensing terms.

## 👥 Contributing

Please read the main repository's CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.