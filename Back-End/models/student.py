import datetime


class Student(dict):

    def __init__(self, student):

        dict.__init__(self,
                      first_name=student.get('first_name'),
                      last_name=student.get('last_name'),
                      create_date=datetime.date.today().isoformat(),
                      last_update_time=datetime.datetime.utc().isoformat(),
                      existing_skills=student.get("existing_skills"),
                      desired_skills=student.get('desired_skills'),
                      courses=student.get("courses"))


