from flask import Flask, request, render_template, jsonify
import psycopg2

app = Flask(__name__)

# Database connection
conn = psycopg2.connect(
    dbname="Employee",
    user="postgres",
    password="iphone21",
    host="localhost",
    port="5432"
)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/insert', methods=['POST'])
def insert():
    try:
        data = request.get_json()
        cursor = conn.cursor()
        query = "INSERT INTO employee (full_name, email, salary, city) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (data['fullName'], data['email'], data['salary'], data['city']))
        conn.commit()
        cursor.close()
        return jsonify({'message': 'Employee data inserted successfully'})
    except Exception as e:
        print(e)
        conn.rollback()
        return jsonify({'message': 'An error occurred'}), 500

if __name__ == '__main__':
    app.run(debug=True)
