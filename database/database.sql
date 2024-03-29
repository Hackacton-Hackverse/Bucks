CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    due_date DATE,
    comments TEXT,
    completed BOOLEAN DEFAULT 0,
    priority INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);