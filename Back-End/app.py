from flask import Flask, request, jsonify
from flask_cors import CORS
from models.student import Student
from db_functions.db_functions import DbFunctions
from Validators.validator import Validators
from static_files.static_info import magic_skills, courses
from flask_jwt_extended import JWTManager, create_access_token
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
import json


app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
db = DbFunctions()
validator = Validators()
app.config['MONGO_DBNAME'] = 'Hogwarts'
app.config['MONGO_URI'] = 'mongodb://localhost:27017'
app.config['JWT_SECRET_KEY'] = 'secret'
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)



@app.route('/users/register', methods=["POST"])
def register():
    email = request.get_json()['email']
    does_email_exist = db.get_user(email)
    if does_email_exist != None:
        response = app.response_class(response=json.dumps({'error': "Email has already been registered."}), status=400, mimetype="application/json")
        return response
    else:
        first_name = request.get_json()['first_name']
        last_name = request.get_json()['last_name']
        password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
        result = db.register_user(first_name, last_name, email, password)
        response = app.response_class(response=json.dumps({'result': result}), status=200,
                                      mimetype="application/json")
        return response

@app.route('/users/login', methods=['POST'])
def login():
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
    user = db.get_user(email)
    if user:
        if bcrypt.check_password_hash(user['password'], password):
            access_token = create_access_token(identity = {
                'first_name': user['first_name'],
                'last_name': user['last_name'],
                'email': user['email']
            })
            result = jsonify({'token':access_token})
        else:
            response_body = {"error":"Invalid username and/or password."}
            result = app.response_class(response=json.dumps(response_body), status=401, mimetype="application/json")
    else:
        response_body = {"error":"Email address has not been registered."}
        result = app.response_class(response=json.dumps(response_body), status=401, mimetype="application/json" )
    return result



@app.route("/students")
def get_students_route():
    if request.args.get('skill'):
        skill = request.args.get('skill')
        students_with_skill = db.get_students_who_have_skill(skill)
        response = app.response_class(
            response=json.dumps({"Students with skill '{}'.".format(skill): students_with_skill}), status=200,
            mimetype="application/json")
        return response
    if request.args.get('desired_skill'):
        desired_skill = request.args.get('desired_skill')
        students_wanting_skill = db.get_students_who_want_skill(desired_skill)
        response = app.response_class(
            response=json.dumps(
                {"Students with want to have the '{}' skill.".format(desired_skill): students_wanting_skill}),
            status=200,
            mimetype="application/json")
        return response
    if request.args.get('date'):
        date = request.args.get('date')
        students_created_on_date = db.get_student_by_date(date)
        response = app.response_class(response=json.dumps(students_created_on_date), status=200,
                                      mimetype="application/json")
        return response
    if request.args.get('month'):
        month_and_year = request.args.get('month')
        for i in month_and_year:
            try:
                validator.validate_item_is_int(i)
            except Exception as error:
                response = app.response_class(response=json.dumps({"Error": str(error)}), status=400,
                                              mimetype="application/json")
                return response
        month_and_year = month_and_year.split("-")
        month = int(month_and_year[0])
        year = int(month_and_year[1])
        students_created_this_month = db.get_students_by_month(month, year)
        response = app.response_class(response=json.dumps(students_created_this_month), status=200,
                                      mimetype="application/json")
        return response
    else:
        all_students = db.get_all_students()
        response = app.response_class(response=json.dumps(all_students), status=200, mimetype="application/json")
        return response

@app.route("/students/skills")
def get_skills_for_each_student():
    skills = {}
    for i in magic_skills:
        count = db.get_students_who_have_skill(i)
        skills[i] = count
    response = app.response_class(response=json.dumps(skills), status=200, mimetype="application/json")
    return response

@app.route("/students/courses")
def get_students_in_each_course():
    courses_to_return = {}
    for i in courses:
        count = db.get_students_who_have_class(i)
        courses_to_return[i] = count
    response = app.response_class(response=json.dumps(courses_to_return), status=200, mimetype="application/json")
    return response

@app.route("/student", methods=['POST'])
def add_student_route():
    content = request.json
    try:
        validator.validate_new_student(content)
    except Exception as error:
        response = app.response_class(response=json.dumps({"Error": str(error)}), status=400,
                                      mimetype="application/json")
        return response
    new_student = Student(content)
    student_id = db.add_student(new_student)
    response = app.response_class(response=json.dumps({"student_id": student_id}), status=200,
                                  mimetype="application/json")
    return response

@app.route("/student/<student_id>", methods=['DELETE'])
def delete_student_route(student_id):
    delete_password = request.args.get("delete_key")
    try:
        validator.validate_objectid(student_id)
        validator.validate_delete_password(delete_password)
    except Exception as error:
        response = app.response_class(response=json.dumps({'Error': str(error)}), status=400,
                                      mimetype="application/json")
        return response
    deleted_student = db.delete_student(student_id)
    if not deleted_student:
        response_body = {"Error": "Id '{}' does not exist.".format(student_id)}
        response = app.response_class(response=json.dumps(response_body), status=404, mimetype="application/json")
    else:
        response_body = {"Status": "Student with id {} was successfully deleted.".format(student_id)}
        response = app.response_class(response=json.dumps(response_body), status=200, mimetype="application/json")
    return response

@app.route("/student/<student_id>")
def get_single_student_route(student_id):
    try:
        validator.validate_objectid(student_id)
    except Exception as error:
        response = app.response_class(response=json.dumps({"Error": str(error)}), status=400,
                                      mimetype="application/json")
        return response
    student = db.get_single_student(student_id)
    if not student:
        response_body = {"Error": "Id '{}' does not exist.".format(student_id)}
        response = app.response_class(response=json.dumps(response_body), status=404, mimetype="application/json")
    else:
        response = app.response_class(response=json.dumps(student), status=200, mimetype="application/json")
    return response

@app.route("/student/update_student/<student_id>", methods=['POST'])
def set_student_skills_route(student_id):
    try:
        validator.validate_objectid(student_id)
    except Exception as error:
        response = app.response_class(response=json.dumps({"Error": str(error)}), status=400,
                                      mimetype="application/json")
        return response
    student = db.get_single_student(student_id)
    if not student:
        response_body = {"Error": "Id '{}' does not exist.".format(student_id)}
        response = app.response_class(response=json.dumps(response_body), status=404, mimetype="application/json")
        return response
    else:
        updates_to_user = request.json
        try:
            updated_student = db.update_student(student_id, updates_to_user)
            response=app.response_class(response=json.dumps(updated_student), status=200, mimetype="application/json")
            return response
        except Exception as error:
            response=app.response_class(response=json.dumps({"Error": str(error)}), status=400, mimetype="application/json")
            return response




if __name__ == '__main__':
    app.run(debug=True)

