import parser_help_functions as ph
import os


file_not_found = True
while file_not_found:
    file_name = input("What year will we be working on today? (xxxx)\n>>")
    file_name += ".txt"
    if os.path.isfile(file_name):
        file_not_found = False
        data = ph.SourceData(file_name)
    else:
        print("That year isn't working. Either the file wasn't named <year>.txt or",
                "it's not in the same directory as this file. Please try again!\n")

retry = True   
while retry:
    print("Press 1 to parse the year_data into day lines")
    print("========== Checking yearly data ==============")
    print("Press 2 to show days with x number of line elements")
    print("Press 3 to select a slice range of days from the year_data_lines")
    print("Press 4 to see all day line entries that don't end with prayer")
    print("Press 5 to check all day + verse lines")
    print("============ Processing date info ============")
    print("Press 6 to process all day + verse lines")
    print("Press 7 to process ending info lines (warning run option 6 first!!!)")
    print("Press 8 to process the last three lines (warning run option 7 first!!!)")
    print("Press 9 to process the watchword lines (warning run option 8 first!!!)")
    print("Press 'dict' to see all key/values in the new_year_dict")
    print("Type 'all' to see all remaining year_data_lines entries")
    print("Leave blank to exit")
    option = input("\n>>")

    if option == '1':
        for day in data.year_data:
            data.year_data_lines.append(data.parse_day_to_line(day))

    elif option == '2':
        number_of_lines = input("Show me days with x number of elements?\n>>")
        if "<" in number_of_lines:
            number_of_lines = number_of_lines.replace("<", "")
            data.show_number_of_days("<", number_of_lines)
        elif ">" in number_of_lines:
            number_of_lines = number_of_lines.replace(">", "")
            data.show_number_of_days(">", number_of_lines)
        else:
            data.show_number_of_days("", number_of_lines)

    elif option == '3':
        range_start = input("Please enter a start range\n>>")
        range_end = input("Please enter an end range\n>>")
        if range_start == "0" or range_start == "":
            for _ in data.year_data_lines[:int(range_end)]:
                print(_)
        elif range_end == "":
            for _ in data.year_data_lines[int(range_start):]:
                print(_)
        else:
            for _ in data.year_data_lines[int(range_start):int(range_end)]:
                print(_)
        print("\n\n")

    elif option == '4':
        missing_prayer = []
        for day in data.year_data_lines:
            if not any(ending in day[-1][-1][-12:] for ending in data.day_ending_words):
                missing_prayer.append(day)
        for day in missing_prayer:
            print(day, "\n")
            print(f'The last 12 digits of the last element are:\n{day[-1][-1][-12:]}\n')
        print("\n\n")

    elif option == '5':
        data.show_day_and_verse_info()

    elif option == '6':
        year_list = data.year_data_lines
        for count, day in enumerate(year_list):
            day_list = data.find_date_verse_lines(day)
            data.new_year_dict[count + 1].append(day_list)
            data.remove_lines_from_year_list(count, day_list[0], (day_list[0] + 1))
        print("\n\nFinished processing all day + verse lines\n\n")

    elif option == '7':
        data.find_missing_prayer_line()
        print("\n\nFinished processing ending info lines\n\n")

    elif option == '8':
        data.find_last_three_lines()
        print("\n\nFinished processing all final three lines\n\n")

    elif option == '9':
        data.find_watchword_lines()
        print("\n\nFinished processing all watchword lines\n\n")

    elif option == 'dict':
        for key, value in data.new_year_dict.items():
            print(f'{key} : {value}')

    elif option == 'all':
        print("\n\n")
        for count, line in enumerate(data.year_data_lines):
            print(count, " - ", line, "\n")
        print("\n\n")
    else:
        print("That's ok. We can try again later.")
        retry = False

