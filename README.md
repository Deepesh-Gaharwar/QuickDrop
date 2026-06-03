# QuickDrop - A File Sharing App

QuickDrop is a full-stack application designed for seamless and temporary file sharing. Users can effortlessly upload files and receive a unique, secure invite code to share with others. To ensure privacy and optimal storage management, all shared files and their associated codes automatically expire and are securely deleted after 24 hours. 

## Key Features

* **Effortless File Uploads:** Drag-and-drop functionality for quick and easy file uploads.
* **Secure Invite Codes:** Generates unique invite codes for every upload session to share with recipients.
* **Auto-Expiring Data:** Built-in 24-hour expiration mechanism that automatically deletes files and database records to maintain data privacy.
* **Bulk Downloads:** Ability to download multiple shared files simultaneously as a compressed ZIP archive.
* **Individual File Viewing/Downloading:** Support for serving and accessing single files directly from a shared batch.
* **Responsive Design:** Clean, modern, and mobile-responsive user interface.

## Technical Details

* **Frontend:**
    * **Framework:** Built with **React.js** and **Vite** for a fast and modern development experience.
    * **Styling:** Styled using **Tailwind CSS** for a clean, responsive, and utility-first user interface.
    * **Routing:** Client-side routing is handled by **React Router DOM**.
    * **File Handling:** Utilizes **React Dropzone** for drag-and-drop file upload capabilities.
    * **Utilities:** **Axios** for handling asynchronous API requests and **React Icons** for UI iconography.
* **Backend:**
    * **Framework:** Developed with **Node.js** and **Express.js** to create a robust RESTful API.
    * **Database:** **MongoDB** is used as the database, with **Mongoose** for modeling the auto-expiring file schemas.
    * **File Processing:** **Multer** is integrated for handling multipart/form-data (file uploads), and **Archiver** is used to dynamically zip files for bulk downloading.
    * **Unique Identifiers:** **UUID** is used to generate secure and unique invite codes.
    * **Middleware:** **CORS** for handling cross-origin requests securely between the frontend and backend.

## API Endpoints

### File Routes (`/api`)

* `POST /upload` - Uploads an array of files and returns a unique invite code.
* `GET /download/:code` - Validates the code and downloads all associated files as a ZIP archive.
* `GET /files/:code` - Retrieves the list and metadata of uploaded files for a specific valid code.
* `GET /file/:code/:savedName` - Serves a single specific file from a shared batch.

---

## Setup Instructions

To run this project locally, follow these steps:

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn
* MongoDB (local instance or a cloud service like MongoDB Atlas)

### Backend Setup

1.  **Clone the backend repository:**
    ```bash
    git clone https://github.com/Deepesh-Gaharwar/QuickDrop-backend.git
    cd QuickDrop-backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the `QuickDrop-backend` directory and add the following environment variables:
    ```env
    PORT=5000
    MONGODB_URI=<your_mongodb_connection_string>
    FRONTEND_URL=http://localhost:5173
    ```
    *(Note: Check your specific `db.js` file if your MongoDB URI variable is named differently)*
4.  **Start the server:**
    ```bash
    npm run dev
    ```

### Frontend Setup

1.  **Clone the frontend repository:**
    ```bash
    git clone https://github.com/Deepesh-Gaharwar/QuickDrop-frontend.git
    cd QuickDrop-frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the `QuickDrop-frontend` directory and add the backend URL:
    ```env
    VITE_BASE_URL=http://localhost:5000
    ```
    *(Adjust the variable name if your Axios instance uses a different standard environment variable)*
4.  **Start the development server:**
    ```bash
    npm run dev
    ```

The application should now be running, with the frontend available at `http://localhost:5173` and the backend at `http://localhost:5000`.