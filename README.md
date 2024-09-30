# Job Journey

A job application tracker for the tech world. "Job Journey" helps individuals keep track of their job applications and interview processes through a drag-and-drop interface. Ideal for tech professionals navigating multiple job opportunities at once.

## Live Demo

Check out the live demo: [Job Journey](https://job-journey-sa-ar.vercel.app/)

## Features

- **Drag-and-Drop Interface**: Easily manage your job applications by dragging and dropping them through different stages of the hiring process.
- **Authentication**: Secure login via [Clerk](https://clerk.dev/) for user authentication.
- **Job Tracking**: Track each application's progress and status.
- **Tech Stack**:
  - React
  - TypeScript
  - Next.js
  - TailwindCSS
  - ShadCn UI
  - Drizzle for database queries
  - PostgreSQL database

## Installation and Setup

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Sa-ar/job-journey.git
    cd job-journey
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables:
    - Create a `.env.local` file in the root directory.
    - Add your database connection details (PostgreSQL) and other required environment variables. For example:
    ```bash
    DATABASE_URL=your_postgresql_database_url
    CLERK_FRONTEND_API=your_clerk_frontend_api_key
    CLERK_API_KEY=your_clerk_api_key
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running locally.

## Deployment

This application is deployed on [Vercel](https://vercel.com/) and is configured for seamless deployment with Vercel's Next.js integration. To deploy:

1. Push your changes to GitHub.
2. Vercel will automatically detect the changes and trigger a new deployment.

## Contribution

This project is open for anyone to view, but contributions are not actively being sought. Feel free to explore the code and reach out if you have any questions.

## License

There is currently no license associated with this project.

---

Built with ❤️ by [Saar](https://github.com/Sa-ar).
