# 🏏 Dolphin Club Cricket Championship 2025

A modern, responsive cricket tournament registration platform built for CSL employees. This application features a beautiful dark theme with gradient designs, real-time countdown timer, comprehensive registration system, and powerful admin dashboard.

## ✨ Features

### 🎯 User Features
- **Modern Homepage**: Beautiful hero section with tournament information
- **Live Countdown Timer**: Real-time countdown to registration deadline
- **Registration Form**: Comprehensive form with validation
- **Player Types**: Support for Batsmen, Bowlers, and All-Rounders
- **Wicket Keeper Option**: Players can indicate if they can keep wickets
- **Responsive Design**: Works perfectly on all devices
- **Micro Interactions**: Smooth animations and hover effects

### 🔧 Admin Features
- **Secure Login**: Admin authentication system
- **Dashboard**: Real-time statistics and player overview
- **Player Management**: View all registrations with search and filter
- **Data Export**: Export data in CSV and PDF formats
- **Statistics**: Live stats showing player type distribution

### 🎨 Design Features
- **Dark Theme**: Professional dark theme with gradient designs
- **Glass Morphism**: Modern glass effects and blur backgrounds
- **Animations**: Smooth transitions and micro-interactions
- **Typography**: Bold and varied typography for sports appeal
- **Color Gradients**: Eye-catching gradient designs throughout

## 🏆 Tournament Details

- **Event**: Dolphin Club Cricket Championship 2025
- **Dates**: December 15-22, 2025
- **Venue**: CSL Sports Complex
- **Format**: T20 Cricket (20 overs per side)
- **Participants**: CSL Employees Only
- **Registration Deadline**: December 10, 2025

### 💰 Prize Money
- **Winner**: ₹50,000 + Championship Trophy
- **Runner-up**: ₹25,000 + Silver Trophy
- **3rd Place**: ₹15,000 + Bronze Trophy
- **Individual Awards**: Best Batsman, Bowler, All-Rounder, Wicket Keeper

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cric_csl
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives
- **Database**: SQLite with better-sqlite3
- **Icons**: Lucide React
- **PDF Export**: jsPDF with autoTable
- **Animations**: Custom CSS animations and Tailwind

## 📁 Project Structure

```
cric_csl/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin pages
│   ├── register/          # Registration page
│   ├── actions.ts         # Server actions
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # UI components
│   └── countdown-timer.tsx
├── lib/                   # Utilities and database
│   ├── database.ts        # Database operations
│   └── utils.ts           # Utility functions
└── public/               # Static assets
```

## 🎮 Usage

### For Players

1. **Visit the Homepage**: View tournament information and countdown
2. **Register**: Click "Register Now" and fill out the form
3. **Provide Details**: Enter employee code, personal info, and playing preferences
4. **Submit**: Complete registration and receive confirmation

### For Administrators

1. **Access Admin Panel**: Navigate to `/admin`
2. **Login**: Use credentials (demo: admin/admin)
3. **View Dashboard**: See real-time statistics and player list
4. **Manage Data**: Search, filter, and export registration data
5. **Export Reports**: Download CSV or PDF reports

## 🔐 Admin Credentials

**Demo Credentials:**
- Username: `admin`
- Password: `admin`

> **Note**: In production, these should be changed to secure credentials and properly hashed.

## 📊 Database Schema

### Players Table
- `id`: Primary key
- `employee_code`: Unique employee identifier
- `full_name`: Player's full name
- `email`: Optional email address
- `phone`: Contact number
- `player_type`: Batsman, Bowler, or All-Rounder
- `batting_hand`: Left or Right
- `bowling_hand`: Left or Right (for All-Rounders)
- `wicket_keeper`: Boolean flag
- `created_at`: Registration timestamp

### Admin Users Table
- `id`: Primary key
- `username`: Admin username
- `password`: Admin password (should be hashed in production)

## 🎨 Customization

### Colors and Themes
Edit `tailwind.config.js` to customize colors and add new themes.

### Tournament Information
Update tournament details in:
- `app/page.tsx` (homepage content)
- `lib/utils.ts` (deadline date)
- `README.md` (documentation)

### Database
The SQLite database is automatically created on first run. To reset:
1. Delete `cricket_tournament.db`
2. Restart the application

## 🔧 Development

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Adding New Features
1. Create new components in `components/`
2. Add server actions in `app/actions.ts`
3. Update database schema in `lib/database.ts`
4. Style with Tailwind CSS classes

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full-featured experience
- **Tablet**: Optimized layout with touch-friendly controls
- **Mobile**: Mobile-first design with collapsible navigation

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Environment Variables
Create `.env.local` for production settings:
```env
NODE_ENV=production
DATABASE_URL=path/to/production/database
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏏 About

Built with ❤️ for the CSL cricket community. This platform aims to make tournament registration seamless and enjoyable while providing powerful management tools for organizers.

---

**Ready to play cricket? [Register Now!](http://localhost:3000/register)** 🏏
