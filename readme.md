# Bucks TodoList-App

This project consists of a backend developed in Python using Flask, PyMySQL, and Flask-CORS, and a frontend developed with HTML, CSS, and vanilla JavaScript.

## Getting Started

To start using this project, follow the steps below:

### 1. Database Setup

- Open the `database.sql` file located in the `database` folder.
- Execute the SQL commands in your MySQL database management tool (e.g., phpMyAdmin) to create the necessary database structure.
- Once the database is created, execute the following command to create a user with email 'gg@gg.com' and password '12345':

```sql
INSERT INTO users (email, password) VALUES ('gg@gg.com', '12345');
```

### 2. Backend Setup

- Open the `backend/main.py` file.
- Modify the `DATABASE_NAME` and `DATABASE_PASSWORD` variables with the appropriate values for your MySQL database connection.
- Save the changes.

### 3. Install Python Requirements

- Open a terminal or command prompt.
- Navigate to the root directory of the project.
- Run the following command to install the required Python packages:

```bash
pip install FLASK
pip install pymysql
pip install flask_cors
```

### 4. Start the Backend

- Open a terminal or command prompt.
- Navigate to the `backend` directory.
- Run the following command to start the backend server:

```bash
python main.py
```

### 5. Start the Frontend

- Open the `frontend/app.html` file in your web browser.

Voilà! You should now be able to see the frontend of the project and interact with it.

## Additional Notes

- Make sure you have Python and MySQL installed on your system before starting the backend.
- For the frontend, no additional setup is required as it runs directly in the web browser.
