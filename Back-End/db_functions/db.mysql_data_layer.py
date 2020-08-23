import mysql.connector
from decouple import config
from db_functions import BaseDBLayer


class MySqlDataLayer(BaseDBLayer):

    def add_student(self, first_name, last_name, create_date, last_update_time, existing_skills, desired_skills,
                    courses):
        try:
            cursor = self.__mydb.cursor()
            self.__mydb.start_transaction()
            sql = "INSERT INTO students (first_name, last_name,  create_date, last_update_time, existing_skills, " \
                  "desired_skills, courses)  VALUES (%s, %s, %s,%s,%s,%s,%s)"
            val = (first_name, last_name, create_date, last_update_time, existing_skills, desired_skills, courses)
            cursor.execute(sql, val)
            print(cursor.lastrowid, "new id inserted.")
            student_id = cursor.lastrowid

            sql = "INSERT INTO skills (  Potion making, Spells, Quidditch ,Animagus , " \
                  "Apparate, Metamorphmagi, Parseltongue (talking with snakes)) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            val = (first_name, last_name, create_date, last_update_time, existing_skills, desired_skills, courses)
            cursor.execute(sql, val)
            skills_id = cursor.lastrowid

            sql = "INSERT INTO student_and_skills (student_id, skills_id) VALUES (%s, %s)"
            val = (student_id, skills_id)
            cursor.execute(sql, val)
            self.__mydb.commit()
            return student_id, skills_id

        except mysql.connector.Error as error:
            print("Failed to update record to database rollback: {}".format(error))
            self.__mydb.rollback()


        finally:
            cursor.close()

    def shutdown_db(self):
        self.__mydb.close()

    def __connect(self):
        try:
            self.__mydb = mysql.connector.connect(
                host="localhost",
                user=config('MYSQL_USER'),
                passwd=config('PASSWORD'),
                database="Hogwarts"
            )
            self.__mydb.autocommit = False
        except Exception as e:
            print(e)

    def __init__(self):
        super().__init__()
        self.__connect()
