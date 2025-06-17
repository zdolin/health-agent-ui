# Health Agent UI

Frontend UI for the AI-powered [Health Agent Lab backend](https://github.com/zdolin/health-agent-lab) using Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

⚠️ **DISCLAIMER**: This is a Proof of Concept (POC) only. This tool is not intended to provide medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical decisions.

## Live Demo

View the live application: [https://health-agent-ui.vercel.app/](https://health-agent-ui.vercel.app/)

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern component library
- **Lucide React**: Beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zdolin/health-agent-ui.git
cd health-agent-ui
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Backend Integration

This UI connects to the [Health Agent Lab](https://github.com/zdolin/health-agent-lab) backend API. Make sure the backend server is running on the URL specified in your `NEXT_PUBLIC_API_URL` environment variable.

For backend setup instructions, see the main [Health Agent Lab README](https://github.com/zdolin/health-agent-lab).

## API Endpoints

The UI communicates with the following backend endpoints:
- `POST /triage` - Submit health concerns for AI analysis

## Development

### Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout component
│   ├── page.tsx        # Main application page
│   └── globals.css     # Global styles
├── components/         # Reusable UI components
│   └── ui/            # shadcn/ui components
└── lib/               # Utility functions
    └── utils.ts       # Helper utilities
```

## Deployment

The application is deployed on Vercel and automatically updates on pushes to the main branch.

### Environment Variables for Production

- `NEXT_PUBLIC_API_URL`: URL of the production backend API

## License

MIT License - see the main project README for details.
