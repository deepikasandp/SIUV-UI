# Serverless Image Upload Application (Frontend)

## Overview

This project is the **frontend** for the Serverless Image Upload & View Application. It is built using React and TypeScript, and it enables users to upload images directly to AWS S3 via pre-signed URLs generated by a backend service.

This app is part of a larger system that involves a serverless architecture using AWS Lambda, SQS, and RDS (MySQL) for backend processing and image management.

## Features

- **Image Upload**: Upload images directly to AWS S3 using pre-signed URLs.
- **Pre-signed URL Integration**: Requests a pre-signed URL from the Node.js service to allow secure file uploads to S3.
- **User-friendly Interface**: Built with React and Material UI for a modern, responsive interface.
- **Token-Based Image Viewing**: Users upload images associated with a token number, which can be later retrieved for viewing.

## Project Structure

The project structure follows a typical React application format. Here’s an outline:

```
/src
  /components   # React components
  /services     # API services for fetching pre-signed URLs
  /utils        # Utility functions
  /styles       # Custom styles and themes
```

## Key Technologies

- **React** (with **TypeScript** for type safety)
- **Material UI**: For responsive UI components and layout
- **AWS S3**: For scalable image storage
- **Pre-signed URLs**: For secure, direct uploads to S3

## Setup & Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/deepikasandp/SIUV-UI.git
   ```

2. Navigate to the project directory:

   ```bash
   cd SIUV-UI
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Usage

1. On the main page, you can upload an image by entering a token number (unique identifier) in the URL and selecting an image to upload.
2. The app requests a pre-signed URL from the backend service.
3. Once the pre-signed URL is retrieved, the image is uploaded directly to AWS S3.
4. Upon successful upload, the app displays a confirmation message.

## Backend Service

The backend service is a Node.js application that generates pre-signed URLs for image uploads. The backend communicates with AWS S3, SQS, and other services.

## How It Works

- The user uploads an image by selecting a file and providing a token number.
- The frontend communicates with the backend Node.js service to get a pre-signed URL.
- The image is then uploaded directly to AWS S3 using this pre-signed URL.
- AWS Lambda is triggered when the image is uploaded, and it processes the metadata, saving it to an RDS database.

## Environment Variables

To connect to the backend and AWS services, you will need to configure the following environment variables in a `.env` file:

```bash
REACT_APP_API_URL=<Your Backend API URL>
```

Make sure the backend is set up correctly to provide the pre-signed URLs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.