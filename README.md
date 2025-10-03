# CPS Academy - Modern Learning Management System

A sleek, modern, and fully responsive Learning Management System built with Next.js 14, featuring role-based access, progress tracking, and interactive course content with engaging animations.

**Next.js** **React** **Tailwind CSS** **Strapi** **Vercel** **Railway**

## 🚀 Live Demo
**View Live Demo on Vercel**  
*[Add your Vercel deployment link here]*

## ✨ Features

**🎓 Role-Based Access** – Four user roles (Student, Normal User, Social Media Manager, Developer) with customized content access  
**📱 Fully Responsive** – Optimized for mobile, tablet, and desktop devices  
**📊 Progress Tracking** – Visual progress indicators with localStorage persistence  
**🎬 Video Integration** – Modal-based video player with real video content  
**⚡ Real-time Updates** – Instant progress updates and completion tracking  
**🎨 Modern UI/UX** – Professional design with gradient backgrounds and smooth animations  
**🔔 Interactive Notifications** – Alert system for user actions and access restrictions  
**📚 Course Management** – Comprehensive module and lesson organization  
**🔄 Loading States** – Elegant loading animations and skeleton screens  
**♿ Accessible** – ARIA labels and keyboard navigation support  

## 🛠️ Tech Stack

**Framework:** Next.js 14 (App Router)  
**Frontend:** React 18, Context API  
**Styling:** Tailwind CSS  
**Backend:** Strapi Headless CMS  
**Authentication:** JWT Tokens  
**Deployment:** Vercel (Frontend), Railway (Backend)  
**Icons:** Heroicons  
**State Management:** React Context + Local Storage  

## 📦 Installation

**Clone the repository**
```bash
git https://github.com/Dev-Maidul/CPS-Academy
cd cps-academy
```

**Install dependencies**
```bash
npm install
```

**Environment Setup**
```bash
cp .env.example .env.local
```
Add your environment variables:
```env
NEXT_PUBLIC_STRAPI_URL=your-strapi-backend-url
NEXT_PUBLIC_APP_URL=your-frontend-url
```

**Run the development server**
```bash
npm run dev
```

**Open your browser**  
Navigate to `http://localhost:3000`

## 🎮 Usage

### 1. User Authentication
- Register/Login with different roles
- Experience role-based content access
- Student role for full video access

### 2. Course Navigation
- Browse available courses
- View detailed course information
- Access module-based curriculum

### 3. Progress Tracking
- Mark lessons as completed
- Track module progress
- Monitor overall course completion
- Progress persists across sessions

### 4. Video Learning
- Watch embedded video lessons
- Auto-save progress on video completion
- Access learning resources
- Responsive video player

## ✅ Key Features in Detail

**Role-Based Content** – Different access levels for each user role  
**Progress Persistence** – LocalStorage integration for progress tracking  
**Mobile-First Design** – Seamless experience across all devices  
**Fake Data Fallback** – Comprehensive demo data for presentation  
**Form Validation** – Client-side validation with helpful error messages  
**Error Handling** – Graceful error handling with user-friendly messages  

## 🏗️ Project Structure

```
cps-academy/
├── app/
│   ├── contexts/
│   │   └── AuthContext.js          # Authentication context
│   ├── courses/
│   │   └── [id]/
│   │       └── page.js             # Course details page
│   ├── layout.js                   # Root layout
│   ├── page.js                     # Landing page
│   └── globals.css                 # Global styles
├── components/
│   ├── CourseCard.js               # Reusable course component
│   └── Navigation.js               # Main navigation
├── public/
│   └── favicon.ico                 # App favicon
├── package.json
└── README.md
```

## 🔧 API Endpoints

### GET `/api/courses/:id?populate=deep,3`
**Description:** Fetch course details with modules and lessons  
**Response:** Course object with nested module and lesson data

### POST `/api/auth/local`
**Description:** User authentication  
**Request Body:**
```json
{
  "identifier": "string",
  "password": "string"
}
```

### GET `/api/users/me`
**Description:** Get current user data  
**Response:** User object with role information

## 🎨 Customization

### Changing Color Scheme
Edit Tailwind classes in course components:

```jsx
// Current primary color
bg-blue-600 hover:bg-blue-700

// Change to different color
bg-green-600 hover:bg-green-700
```

### Adding New User Roles
Update the role checking function:

```javascript
const getUserRoleAccess = (role) => {
  const accessLevels = {
    student: { canWatchVideos: true },
    instructor: { canManageContent: true },
    admin: { fullAccess: true }
    // Add new roles here
  }
  return accessLevels[role] || accessLevels.normal
}
```

### Modifying Course Structure
Update the fake data generator for different course formats:

```javascript
const generateCourseData = (courseId) => {
  // Customize module and lesson structure
  return {
    modules: {
      data: [
        {
          attributes: {
            title: "Custom Module",
            lessons: {
              data: [
                // Custom lesson structure
              ]
            }
          }
        }
      ]
    }
  }
}
```

## 🤝 Contributing

1. **Fork the repository**

2. **Create your feature branch**
```bash
git checkout -b feature/AmazingFeature
```

3. **Commit your changes**
```bash
git commit -m 'Add some AmazingFeature'
```

4. **Push to the branch**
```bash
git push origin feature/AmazingFeature
```

5. **Open a Pull Request**

## 🙏 Acknowledgments

**Next.js** – The React Framework for production  
**Tailwind CSS** – Utility-first CSS framework  
**Strapi** – Leading open-source headless CMS  
**Vercel** – Platform for frontend developers  
**Railway** – Modern app deployment platform  

## 📞 Contact

**Your Name**  
**Phone:** [Your Phone Number]  
**Email:** [Your Email]  
**GitHub:** [Your GitHub Profile]  
**LinkedIn:** [Your LinkedIn Profile]  
**Portfolio:** [Your Portfolio Website]  

**Project Repository:** https://github.com/Dev-Maidul/CPS-Academy  
**Live Demo:** [Vercel Deployment Link]  


