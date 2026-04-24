# Cyberarians — Research & development platform

A modern platform for managing Research Analyst (RA) profiles, building research communities, and facilitating collaboration between researchers worldwide.

## Features

### Public Features
- **Researcher Directory**: Browse and search researchers by name, title, and expertise
- **Community Hub**: Discover and explore research communities
- **Detailed Profiles**: View comprehensive researcher profiles with ratings, expertise, and bios
- **Community Details**: See community information, members, and leadership

### Admin Features
- **Secure Authentication**: Login-protected admin dashboard (default password: `admin123`)
- **Researcher Management**: Add, edit, and delete researcher profiles
- **Community Management**: Create and manage research communities
- **Member Management**: Add/remove members and assign roles within communities
- **Dashboard Analytics**: Quick overview of platform statistics

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Data Storage**: JSON files (easily replaceable with a database)
- **Authentication**: Session-based with httpOnly cookies
- **Icons**: Lucide React

## Project Structure

```
cybrarian/
├── app/
│   ├── (public pages)
│   │   ├── page.tsx (homepage)
│   │   ├── researchers/
│   │   ├── communities/
│   ├── admin/
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── researchers/
│   │   ├── communities/
│   │   └── layout.tsx
│   ├── api/
│   │   └── admin/
│   │       ├── login/
│   │       └── logout/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── header.tsx
│   ├── footer.tsx
│   ├── admin-sidebar.tsx
│   ├── rating-stars.tsx
│   ├── researcher-form-modal.tsx
│   └── community-form-modal.tsx
├── services/
│   ├── researchers.ts (data operations)
│   └── communities.ts (data operations)
├── lib/
│   ├── auth.ts (authentication utilities)
│   └── utils.ts
├── data/
│   ├── researchers.json
│   └── communities.json
└── middleware.ts (route protection)
```

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cybrarian
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` to customize your admin password:
```env
ADMIN_PASSWORD=your-secure-password
```

### Running the Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Default Credentials

- **Default Admin Password**: `admin123`
- **Admin Dashboard**: [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)
- **Login Page**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

**Important**: Change the admin password in production by updating the `ADMIN_PASSWORD` environment variable.

## Usage

### Public Pages

1. **Homepage** - Overview of the platform with CTAs to explore researchers and communities
2. **Researchers Page** - Searchable grid of all researchers with ratings and expertise
3. **Researcher Detail** - Full profile with bio, expertise badges, and rating
4. **Communities Page** - Browse available research communities
5. **Community Detail** - View community information and member list

### Admin Dashboard

1. **Dashboard** - Overview statistics (researcher count, communities, members)
2. **Researchers Management**:
   - View all researchers in a table
   - Add new researchers with detailed information
   - Edit existing researcher profiles
   - Delete researchers with confirmation
3. **Communities Management**:
   - Create new communities
   - Edit community information
   - Add researchers as community members
   - Assign roles (Founder, Member)
   - Remove members from communities

## Data Management

### Researchers JSON Structure

```json
{
  "id": "1",
  "name": "Dr. Sarah Chen",
  "title": "Lead Research Analyst",
  "expertise": ["Data Science", "Machine Learning"],
  "rating": 4.8,
  "bio": "10+ years of research experience",
  "image": "https://example.com/image.jpg"
}
```

### Communities JSON Structure

```json
{
  "id": "1",
  "name": "AI & Machine Learning",
  "description": "Community description",
  "members": [
    {
      "id": "1",
      "name": "Dr. Sarah Chen",
      "role": "Founder"
    }
  ]
}
```

## API Routes

### Authentication
- `POST /api/admin/login` - Login with password
- `POST /api/admin/logout` - Logout

## Authentication & Security

- Admin routes are protected by middleware
- Sessions are stored in httpOnly cookies (more secure than localStorage)
- Session duration: 24 hours (customizable)
- Invalid or expired sessions redirect to login page

## Design System

### Colors
- **Primary**: Deep Blue (Research-focused, professional)
- **Secondary**: Soft Purple (Modern, approachable)
- **Neutrals**: Gray palette (Clean, minimal)

### Typography
- **Font**: Geist (modern, clean)
- **Headings**: Bold weights for visual hierarchy
- **Body**: Regular weight with appropriate line-height for readability

## Customization

### Changing the Admin Password

Update `.env.local`:
```env
ADMIN_PASSWORD=your-new-secure-password
```

### Modifying Colors

Edit `/app/globals.css` to update the design tokens:
```css
:root {
  --primary: oklch(0.35 0.15 260);
  /* ... other colors ... */
}
```

### Adding New Fields

1. Update JSON structure in `/data/`
2. Update TypeScript interfaces in `/services/`
3. Update form components in `/components/`

## Deployment

The application is ready for deployment to Vercel or any Node.js hosting:

```bash
npm run build
npm start
```

**Note**: For production, replace JSON file storage with a proper database (PostgreSQL, MongoDB, etc.) for better performance and reliability.

## Future Enhancements

- Database integration (PostgreSQL, MongoDB)
- User authentication for researchers
- Research publications/papers management
- Event scheduling and management
- Research collaboration requests
- Advanced search and filtering
- Analytics and reporting
- Email notifications

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
