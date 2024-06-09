# Habit Tracker

A simple habit tracker application built using Node.js, Express, EJS, and MongoDB. This application allows users to add habits, track their progress, and manage their streaks.

## Features

- Add new habits
- Track the status of habits (Done, Not Done, No Action)
- Update the status of habits for the last 6 days
- Navigate through previous and next days to update habit status
- Display current streak and maximum streak for each habit

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/habit-tracker.git
    cd habit-tracker
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/habit-tracker
    ```

    Replace `mongodb://localhost:27017/habit-tracker` with your MongoDB connection string if using MongoDB Atlas or a different setup.

4. **Start the application:**

    ```sh
    npm start
    ```

    The application should now be running on `http://localhost:3000`.

## Usage

1. **Add a new habit:**

   - Navigate to the home page.
   - Enter the name of the habit and click "Add Habit".
   - The new habit will appear in the list below.

2. **View and update habit details:**

   - Click on a habit in the list to view its details.
   - The detail page shows the status for the last 6 days.
   - Click the "Previous" button to load the previous 6 days.
   - Click the "Next" button to load the next 6 days.
   - Click on a date to toggle its status between "Done", "Not Done", and "No Action".



