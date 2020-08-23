def turn_string_to_list(str):
    if str == None:
        list = []
    else:
        list = str.split(",")
        for index, item in enumerate(list):
            list[index] = item.strip()
    return list