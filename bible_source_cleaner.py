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
    print("Press 1 to parse the source again (start over)")
    print("========== Checking yearly data ==============")
    print("Press 2 to show days with x number of elements")
    print("Press 3 to select a slice range of days from the year data")
    print("Press 4 to see all day entries that don't end with prayer")
    print("Press 5 to print all day + verse lines")
    print("============ Processing date info ============")
    print("Press 6 to process all day + verse lines(warning run option 5 first!!!)")``
    print("Press 7 to see the processed day_verse_list(temp use)")
    print("Press 8 to process ending info lines (warning run option 6 first!!!)")
    print("Press 9 to see the processed ending_info lines")
    print("Press 10 to process the last three lines (warning run option 8 first!!!")
    print("Press 'dict' to see all key/values in the new_year_dict")
    print("Type 'all' to see all remaining year_data entries")
    print("Leave blank to exit")
    option = input("\n>>")
    data.clear(80)
    if option == '1':
        data.update_year_data()
        if data.total_entries_ok:
            print("Gratz. We did it!")
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
        list_data = data.year_data
        if range_start == "0" or range_start == "":
            for _ in list_data[:int(range_end)]:
                print(_)
        elif range_end == "":
            for _ in list_data[int(range_start):]:
                print(_)
        else:
            for _ in list_data[int(range_start):int(range_end)]:
                print(_)
        print("\n\n")
    elif option == '4':
        missing_prayer = []
        for day in data.year_data:
            if not any(ending in day[-1][-12:] for ending in data.day_ending_words):
                missing_prayer.append(day)
        for day in missing_prayer:
            print(day, "\n")
            print(f'The last 12 digits of the last element are:\n{day[-1][-12:]}\n')
        print("\n\n")
    elif option == '5':
        data.temp_list = data.show_day_and_verse_info() # might skip the temp_list when done
    elif option == '6':
        year_list = data.year_data
        for count, day in enumerate(year_list):
            day_list = data.find_date_verse_lines(day)
            # data.day_verse_list.append(day_list)
            data.new_year_dict[count + 1].append(day_list)
            data.remove_lines_from_year_list(count, day_list[0], (day_list[0] + 1))
    elif option == '7':
        for day in data.day_verse_list:
            print(day)
        print(f'Is the processed date_verse == to the temp_list? {data.day_verse_list == data.temp_list} ')
        print(f'day_verse_list is {len(data.day_verse_list)} and data.temp_list is {len(data.temp_list)}')
    elif option == '8':
        data.find_missing_prayer_line()
    elif option == '9':
        print("\n\n")
        for line in data.ending_info:
            print(line)
        print("\n\n")
    elif option == '10':
        data.find_last_three_lines()
    elif option == 'dict':
        for key, value in data.new_year_dict.items():
            print(f'{key} : {value}')
    elif option == 'all':
        print("\n\n")
        for line in data.year_data:
            print(line)
        print("\n\n")
    else:
        print("That's ok. We can try again later.")
        retry = False

