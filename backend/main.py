# coding:utf-8
import datetime
from flask import Flask, request, abort
from flask_cors import CORS
import pymysql

# initialize Flask
app = Flask(__name__)
CORS(app)

# database indentifiers . . .
database = 'TODOAPP'
password = 'your-password'

# attemp to connect to database . . .
try:
    conn = pymysql.connect(host='localhost', user='root', password=password, db=database)
except:
    print("Error, server failed to connect to mysql dataase, aborting . . .")
    exit(-1)

# initilalising woking cursor . . 
cursor = conn.cursor()


def check_user_id(user_id: str):
    """method to know if user id exists in database"""

    if user_id is None or user_id == '':
        return False

    cursor.execute("SELECT * FROM Users WHERE user_id=%s", (user_id,))
    user = cursor.fetchall()
    return True if user else False


def check_task_id(task_id: str):
    """method to know if task id exists in database"""

    if task_id is None or task_id == '':
        return False
    
    cursor.execute("SELECT * FROM Tasks WHERE task_id = %s", (task_id,))
    task = cursor.fetchall()
    return True if task else False


@app.route("/create-user", methods=["POST"])
def add_user():
    """route to add user inside database"""    
    datas = request.get_json()
    if datas is None or datas == {}:
        abort(500, 'bad input json')
        
    else:
        email = datas.get("email")
        password = datas.get("password")

        if email is None or email == "" or password == "" or password is None:
            abort(500, 'bad input, fields email and password are required')
        
        sql_req = """INSERT INTO Users (email, password) VALUES (%s, %s);"""
        values = (email, password)
        
        try:
            cursor.execute(sql_req, values)
        except Exception as e:
            abort(500, f'user with email {email} already exists in database')

        conn.commit()
        return {'response': 'success'}


@app.route("/create-task", methods=["POST"])
def add_task():
    """route to add task inside database"""

    datas = request.get_json()
    if datas is None or datas == {}:
        abort(500, 'bad input json')
        
    else:
        user_id = datas.get('user_id')
        title = datas.get("title")
        subtitle = datas.get("subtitle")
        comments = datas.get("comments")
        due_date = datas.get("due_date")

        # first, check if user with user_id exists
        user_exists = check_user_id(user_id)
        
        if not user_exists:
            abort(500, f'error, user with user_id {user_id} doesnt exists in the database, aborting')

        if title is None or title == "" or user_id == "" or user_id is None:
            abort(500, 'bad input, fields title and user_id are required')
        
        sql_req = """INSERT INTO Tasks (title, subtitle, comments, due_date, completed, user_id) VALUES (%s, %s, %s, %s, %s, %s);"""
        values = (title, subtitle, comments, due_date, 0, user_id)
        
        try:
            cursor.execute(sql_req, values)
        except Exception as e:
            abort(500, f'error when creating task with on from user with id {user_id}, arborting.')

        conn.commit()
        return {'response': 'success'}


@app.route('/delete-task', methods=["POST"])
def delete_task():
    """route to delete task inside database"""

    datas = request.get_json()
    if datas is None or datas == {}:
        abort(500, 'bad input json')

    task_id = datas.get('task_id')
    user_id = datas.get('user_id')
    user_exists = check_user_id(user_id)
    task_exists = check_task_id(task_id)

    if not user_exists:
        abort(500, f'error, user with user_id {user_id} doesnt exists in the database, aborting')
    if not task_exists:
        abort(500, f'error, user with task_id {task_id} doesnt exists in the database, aborting')

    try:
        cursor.execute("DELETE FROM Tasks WHERE task_id = %s", (task_id,))
    except Exception as e:
        abort(500, f'error when deleting task with id {task_id}, arborting.')

    conn.commit()
    return {'response': 'success'}


@app.route('/complete-task', methods=["POST"])
def complete_task():
    """route to mark task as completed inside database"""

    datas = request.get_json()
    if datas is None or datas == {}:
        abort(500, 'bad input json')

    task_id = datas.get('task_id')
    user_id = datas.get('user_id')
    user_exists = check_user_id(user_id)
    task_exists = check_task_id(task_id)

    if not user_exists:
        abort(500, f'error, user with user_id {user_id} doesnt exists in the database, aborting')
    if not task_exists:
        abort(500, f'error, user with task_id {task_id} doesnt exists in the database, aborting')

    try:
        cursor.execute("UPDATE Tasks SET completed = 1 WHERE task_id = %s", (task_id,))
    except Exception as e:
        abort(500, f'error when marking as completed task with id {task_id}, arborting.')

    conn.commit()
    return {'response': 'success'}


@app.route("/get-tasks/<state>", methods=["POST"])
def get_tasks(state: str):
    """route method for get all tasks inside database"""
    
    datas = request.get_json()
    if datas is None or datas == {}:
        abort(500, 'bad input json')

    user_id = datas.get('user_id')
    user_exists = check_user_id(user_id)

    if not user_exists:
        abort(500, f'error, user with user_id {user_id} doesnt exists in the database, aborting')

    # computing curent date
    current_date = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    if state == 'all':
        try:
            cursor.execute("SELECT * FROM Tasks WHERE user_id= %s", (user_id,))
        except Exception as e:
            abort(500, f'error when parsing database for getting tasks with state {state} tasks for user with user_id {user_id}, arborting.')
        
        result = cursor.fetchall()        
        conn.commit()
        return result
    
    elif state == 'done':
        try:
            cursor.execute("SELECT * FROM Tasks WHERE user_id= %s AND completed=%s", (user_id, 1))
        except Exception as e:
            abort(500, f'error when parsing database for getting tasks with state{state} for user with user_id {user_id}, arborting.')
        
        result = cursor.fetchall()      
        output = []  
        conn.commit()
        for res in result:
            output.append({'title':res[1], 'subtitle':res[2] if res[2] is not None else '', 'comments':res[3] if res[3] is not None else '', 'due_date':str(res[4])})
        print(output, flush=True)
        return output
    
    elif state == 'to-do':
        try:
            cursor.execute("SELECT * FROM Tasks WHERE user_id= %s AND due_date > %s", (user_id, current_date))
        except Exception as e:
            abort(500, f'error when parsing database for getting tasks with state {state} for user with user_id {user_id}, arborting.')
        
        result = cursor.fetchall()      
        output = []  
        conn.commit()
        for res in result:
            output.append({'title':res[1], 'subtitle':res[2] if res[2] is not None else '', 'comments':res[3] if res[3] is not None else '', 'due_date':str(res[4])})
        print(output, flush=True)
        return output
    
    elif state == 'expired':
        try:
            cursor.execute("SELECT * FROM Tasks WHERE user_id= %s AND %s >= due_date", (user_id, current_date))
        except Exception as e:
            abort(500, f'error when parsing database for getting tasks with state {state} for user with user_id {user_id}, arborting.')
        
        result = cursor.fetchall()      
        output = []  
        conn.commit()
        for res in result:
            output.append({'title':res[1], 'subtitle':res[2] if res[2] is not None else '', 'comments':res[3] if res[3] is not None else '', 'due_date':str(res[4])})
        print(output, flush=True)
        return output
    

@app.route("/")
def root():
    return "// TO DO API, DOCUMENTATION COMING SOON"


# executing server . . .
if __name__ == "__main__":
    app.run(debug=True)