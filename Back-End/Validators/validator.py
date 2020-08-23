import bson
from static_files.static_info import delete_password
import re


class Validators:
    delete_password = delete_password

    def validate_delete_password(self, password):
        if password != delete_password:
            raise ValueError("The password you entered is incorrect.")

    def validate_new_student(self, student):
        try:
            self.validate_student_keys(student)
            self.validate_student_name(student["first_name"], student['last_name'])
        except Exception as error:
            raise error

    def validate_student_keys(self, student):
        try:
            student['first_name']
        except Exception as e:
            raise ValueError("First name is required.")
        try:
            student['last_name']
        except Exception as e:
            raise ValueError("Last name is required.")

    def validate_student_name(self, first_name, last_name):
        supported_characters = "^[a-zA-Z ]+([a-zA-Z ]+)?$"
        first_name = str(first_name)
        last_name = str(last_name)
        if not re.search(supported_characters, first_name):
            raise ValueError("First name contains an invalid character.")
        if first_name is "" or first_name is None:
            raise ValueError("First name is missing.")
        if not re.search(supported_characters, last_name):
            raise ValueError("Last name contains an invalid character.")
        if last_name is "" or last_name is None:
            raise ValueError("Last name is missing.")

    def validate_objectid(self, object_id):
        if not bson.objectid.ObjectId.is_valid(object_id):
            raise ValueError("'{}' is an invalid id.".format(object_id))

    def validate_item_is_int(self, item):
        if not isinstance(item, int):
            raise ValueError("Query parameter must be an int.")






