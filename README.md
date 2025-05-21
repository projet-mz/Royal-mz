# Amarck Royal International School Management System

A modern, user-friendly educational management system for Amarck Royal International School, serving students from creche to JHS 3.

## Features

- **Admin Dashboard**: Comprehensive overview of school metrics and management functions
- **Teacher Portal**: Efficient class management and student performance tracking
- **Student Portal**: Age-appropriate interfaces for different grade levels
- **Parent Portal**: Multi-child dashboard for monitoring academic progress

## Tech Stack

- **Frontend**: Next.js 14 (App Router) with TypeScript
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API
- **Form Handling**: React Hook Form with Zod validation
- **Mock Data**: Static JSON data for frontend development

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm 9.0.0 or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/amarck-royal.git
   cd amarck-royal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin portal pages
│   ├── teacher/           # Teacher portal pages
│   ├── student/           # Student portal pages
│   └── parent/            # Parent portal pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── forms/            # Form components
│   └── charts/           # Data visualization components
├── lib/                  # Utility functions and types
│   ├── utils/           # Helper functions
│   ├── types/           # TypeScript type definitions
│   └── hooks/           # Custom React hooks
├── styles/              # Global styles
└── data/               # Mock data for development
```

## Development

### Code Style

- Follow the TypeScript strict mode guidelines
- Use functional components with hooks
- Implement proper type checking throughout
- Follow the established component architecture

### Component Architecture

- Build reusable UI components with clear props interfaces
- Implement proper component composition
- Create logical component hierarchy
- Use consistent naming conventions

### State Management

- Use React Context API for shared state
- Implement reducers for complex state logic
- Maintain clear state initialization and updates
- Handle loading and error states properly

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS team for the utility-first CSS framework
- shadcn/ui team for the beautiful component library 