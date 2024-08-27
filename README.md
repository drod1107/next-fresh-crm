Here’s the updated `README.md` for the root level, which now includes a file directory of the other `README.md` files within the project:

---

# Welcome to NextFresh CRM

## Overview

NextFresh CRM is a CRM solution built using Next.js 14 with the App Router, Tailwind CSS, MongoDB, and Amazon S3 for file storage. The project is structured to provide modularity, ease of development, and scalability. This documentation will guide you through setting up the project locally, deploying it to production, and understanding the project structure.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project Locally](#running-the-project-locally)
- [Deployment](#deployment)
- [Directory Structure](#directory-structure)
- [Tailwind CSS Configuration](#tailwind-css-configuration)
- [Setting up MongoDB](#setting-up-mongodb)
- [Setting up Amazon S3](#setting-up-amazon-s3)
- [Packages and Dependencies](#packages-and-dependencies)
- [File Directory of README.md Files](#file-directory-of-readmemd-files)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/next-fresh-crm.git
   cd next-fresh-crm
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   Ensure all required packages are installed. If any are missing, they can be installed via `npm`.

## Environment Variables

Environment variables are critical for the project to function correctly. Use the `example.env.local` file as a template for your `.env.local` file.

### Required Variables

- `MONGODB_URI`: MongoDB connection string.
- `AWS_ACCESS_KEY_ID`: Amazon S3 Access Key ID.
- `AWS_SECRET_ACCESS_KEY`: Amazon S3 Secret Access Key.
- `AWS_REGION`: Region where your S3 bucket is located.
- `S3_BUCKET_NAME`: Name of the S3 bucket.
- `NEXTAUTH_SECRET`: Secret for NextAuth.js.
- `NEXTAUTH_URL`: The base URL of your app for authentication.

### Example `.env.local`

```bash
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=us-west-2
S3_BUCKET_NAME=your-s3-bucket-name
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

## Running the Project Locally

To start the development server, use the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Deployment

This project is set up to be deployed on Vercel. Follow these steps to deploy:

1. **Connect your GitHub repository to Vercel.**
2. **Set up the environment variables** in Vercel using the `.env.local` values.
3. **Deploy the project** using the Vercel dashboard.

Ensure that all necessary environment variables are set in the Vercel dashboard before deploying.

## Directory Structure

The project is structured as follows:

- `public/`: Static assets like images and icons.
- `src/`: Contains the application code, including API routes, components, pages, and utilities.
- `components/`: Reusable React components.
- `lib/`: Helper libraries like MongoDB connections.
- `models/`: MongoDB models.
- `types/`: TypeScript type definitions.
- `utils/`: Utility functions like Amazon S3 integration.

## Tailwind CSS Configuration

Tailwind CSS is used for styling the project. The configuration file is located at `tailwind.config.ts`.

### Key Configuration

- **Purge**: Unused styles are purged based on the files in `./src/**/*.{js,ts,jsx,tsx}`.
- **Extend**: You can extend the default theme with custom colors, spacing, and more.

## Setting up MongoDB

1. **Create a MongoDB Atlas account** and set up a cluster.
2. **Create a database and a user** with read/write permissions.
3. **Obtain the connection string** and update the `MONGODB_URI` in your `.env.local` file.

## Setting up Amazon S3

1. **Create an S3 bucket** in the AWS Management Console.
2. **Configure bucket permissions** to allow your application to upload and retrieve files.
3. **Create an IAM user** with `AmazonS3FullAccess` and generate access keys.
4. **Update the `.env.local` file** with the S3 credentials.

## Packages and Dependencies

Here is a list of critical packages required by the project. They should be included in `package.json`, but ensure they are installed:

- **Next.js**: Framework used for the project.
- **React & ReactDOM**: Essential React libraries.
- **Tailwind CSS**: Utility-first CSS framework.
- **MongoDB & Mongoose**: For database management.
- **AWS SDK**: For interacting with Amazon S3.
- **NextAuth.js**: For authentication.
- **TypeScript**: For type safety.

If any packages are missing, install them using:

```bash
npm install <package-name>
```

## File Directory of `README.md` Files

Below is a list of all `README.md` files within the project, linked according to their respective directories:

- [`app/` README](src/app/README.md)
- [`components/` README](src/components/README.md)
- [`lib/` README](src/lib/README.md)
- [`models/` README](src/models/README.md)
- [`utils/` README](src/utils/README.md)

Each linked file provides in-depth documentation specific to the components, utilities, models, or routes found within that directory.

---
