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
    print("Press 2 to check possible line spacing issues")
    print("Press 3 to check all day + verse lines")
    print("============ Searching year_data ============")
    print("Press 4 to show days with x number of line elements")
    print("Press 5 to select a slice range of days from the year_data_lines")
    print("Press 6 to see all day line entries that don't end with prayer")
    print("============ Processing date info ============")
    print("Press 7 to appempt to process all (entire year at once)")
    print("Press 8 to process all day + verse lines")
    print("Press 9 to process ending info lines (warning run option 7 first!!!)")
    print("Press 10 to process the last three lines (warning run option 8 first!!!)")
    print("Press 11 to process the watchword lines (warning run option 9 first!!!)")
    print("Press 12 to process the special day + verse lines (warning run option 10 first!!!)")
    print("Press 13 to process the remaining info lines (warning run option 11 first!!!)")
    print("============ Dict cleanup ============")
    print("Press 14 to sort the values of the dict")
    print("Press 15 to remove all index references from the dict")
    print("============ Output to JSON ============")
    print("Press 16 to output the parsed data to a json file (warning fully parse data first!!!!)")
    print("Press 'dict' to see all key/values in the new_year_dict")
    print("Type 'all' to see all remaining year_data_lines entries")
    print("Leave blank to exit")
    option = input("\n>>")
    print('\n\n')

    if option == '1':
        data = ph.SourceData(file_name)

    elif option == '2':
        data.check_day_spacing()
        print('\n\n')

    elif option == '3':
        data.show_day_and_verse_info()
        print('\n\n')

    elif option == '4':
        number_of_lines = input("Show me days with x number of elements?\n>>")
        if "<" in number_of_lines:
            print("\n\n")
            number_of_lines = number_of_lines.replace("<", "")
            data.show_number_of_days("<", number_of_lines)
            print("\n\n")
        elif ">" in number_of_lines:
            print("\n\n")
            number_of_lines = number_of_lines.replace(">", "")
            data.show_number_of_days(">", number_of_lines)
            print("\n\n")
        else:
            print("\n\n")
            data.show_number_of_days("", number_of_lines)
            print("\n\n")

    elif option == '5':
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

    elif option == '6':
        missing_prayer = []
        for day in data.year_data_lines:
            if not any(ending in day[-1][-1][-12:] for ending in data.day_ending_words):
                missing_prayer.append(day)
        for day in missing_prayer:
            print(day, "\n")
            print(f'The last 12 digits of the last element are:\n{day[-1][-1][-12:]}\n')
        print("\n\n")

    elif option == '7':
        data.process_all()
        print("\n\nFinished processing the entire year data\n\n")

    elif option == '8':
        data.process_date_verse_days("normal")
        print("\n\nFinished processing all day + verse lines\n\n")

    elif option == '9':
        data.find_missing_prayer_line()
        print("\n\nFinished processing ending info lines\n\n")

    elif option == '10':
        data.find_last_three_lines()
        print("\n\nFinished processing all final three lines\n\n")

    elif option == '11':
        data.find_watchword_lines()
        print("\n\nFinished processing all watchword lines\n\n")

    elif option == '12':
        data.process_date_verse_days("special")
        print("\n\nFinished processing all special day + verse lines\n\n")

    elif option == '13':
        data.find_remaining_info_lines()
        print("\n\nFinished processing all remaining info lines\n\n")
        
    elif option == '14':
        data.order_dict_results()

    elif option == '15':
        data.remove_indexes_from_dict()

    elif option == '16':
        data.output_to_json()

    elif option == 'dict':
        print("\n\n")
        for key, value in data.new_year_dict.items():
            print(f'{key} : {value}')
        print("\n\n")

    elif option == 'all':
        print("\n\n")
        for count, line in enumerate(data.year_data_lines):
            if len(line) > 0:
                print(count, " - ", line, "\n")
        print("\n\n")
    else:
        print("See ya later.")
        retry = False

