import re
import json

class SourceData:
    def __init__(self, source_file):
        self.source_file = source_file
        self.length_of_year = 0
        self.year_data = []
        self.year_data_lines = []
        self.day_verse_list = []
        self.last_three_lines = []
        self.ending_info = []
        self.total_entries_ok = True
        self.day_of_the_week_list = ['Monday', 'Tuesday', 'Wednesday', 
                                    'Thursday', 'Friday', 'Saturday', 
                                    'Sunday']
        self.day_ending_words = ["Amen!", "amen!", "Amen.", "Hallelujah!", 
                                "ng to be?", "ry of God!", " for Burial)",
                                "fessions.)"]
        self.leap_year_list = ['2016', '2020', '2024', '2028', '2032']
        self.update_year_data()
        self.new_year_dict = self.create_new_year_dict()



####################### Working with full year data ###########################
    def create_new_year_dict(self):
        '''
        Creates a new dictonary with a key for every day in the 
        year_data list and a value of an empty list.
        '''
        year_dict = {}
        for count, day in enumerate(self.year_data):
            year_dict[count + 1] = []
        return year_dict


    def find_file_start(self):
        '''
        Takes a self.source_file and then searches the first three lines to see
        if there are any instences of "©" or "Moravian Daily" in them. Returns 
        the number of lines to skip.
        '''
        with open(self.source_file, encoding='utf8') as s:
            num_of_items_found = 0
            for _ in range(10):
                this_line = s.readline()
                if "©" in this_line or "Moravian Daily" in this_line or len(this_line) < 5:
                    num_of_items_found += 1
                else:
                    break
            return num_of_items_found


    def parse_file_into_days(self):
        '''
        Takes a self.source_file and line to start looking on (skip to) and 
        returns a list of lists where each element is a line from the file. 
        '''
        with open(self.source_file, encoding='utf8') as current_file:
            day_entry_list = []
            self.year_data = []
            blank_lines = 0
            for line in current_file.readlines()[self.find_file_start():]:
                if len(line) > 5:
                    day_entry_list.append(line.replace("\n", "").replace("\t", ""))
                    blank_lines = 0
                elif blank_lines >= 1 and len(day_entry_list) > 0: 
                    self.year_data.append(day_entry_list)
                    day_entry_list = []
                    blank_lines = 0
                else:
                    blank_lines += 1
            if len(day_entry_list) > 0:
                self.year_data.append(day_entry_list)


    def check_day_spacing(self):
        '''
        Prints out days with likely spacing issues. If a day starts with the day
        and has more that 5 entries, there is probably a missing space.
        '''
        for day in self.year_data_lines:
            for day_name in self.day_of_the_week_list:
                if day_name + ", " in day[0][1] and len(day) > 5:
                    print(f'Check the spacing after {day[0][1]}')


    def check_year_for_num_of_days(self):
        '''
        Extracts the year from the file name and checks if it is a leap year or
        not and then returns whether or not it has the correct number of 
        entries. Incorrect number of entries would indicate that the original
        file has a spacing problem.
        '''
        year_name = self.source_file.split('.')[0]
        length = len(self.year_data)
        if year_name in self.leap_year_list and length == 366:
            return True, length
        elif year_name not in self.leap_year_list and length == 365:
            return True, length
        else:
            return False, length


    def update_year_data(self):
        '''
        Reparses the source file to split things into days and checks to see if
        the number of day entries for the year matches the expected value 
        (365 or 366). Returns True or False depending on the check.
        '''
        self.parse_file_into_days()
        for day in self.year_data:
            self.year_data_lines.append(self.parse_day_to_line(day))
        self.check_parsed_data()


    def check_parsed_data(self):
        self.total_entries_ok, self.length_of_year = self.check_year_for_num_of_days()
        print(f'Correct number of total entries for {self.source_file} is',
                f'{self.total_entries_ok} with {self.length_of_year} found!\n')
        if not self.total_entries_ok:
            self.check_day_for_entry_size()
        return self.total_entries_ok


    def show_number_of_days(self, mod, numb):
        '''
        Prints all day entries (which are list) that are of a certain length.
        If a great or less then modifer is passed before the number it will 
        return that number + all > or < itself.
        '''
        for line in self.year_data_lines:
            if mod == ">":
                if len(line) > int(numb):
                    print(line, "\n")
            elif mod == "<":
                if len(line) < int(numb):
                    print(line, "\n")
            else:
                if len(line) == int(numb):
                    print(line, "\n")   

    def clear(self, num):
        for _ in range(num): 
            print()


    def check_day_for_entry_size(self):
        '''
        Takes a parsed day entry list and a file name used for that list and 
        checks if each entry is smaller than 5. Returns the line that is the 
        wrong size. 
        '''
        for line in self.year_data:
            if len(line) < 5:
                print(line, "\n")


    def remove_lines_from_year_list(self, position, *args):
        '''
        Removes from the year_data list, one or many entries from a day.
        The position repersents the day index and the args are the indexes 
        within the day to remove from the list. This will allow my to whittle 
        away at the year_data as I identify and remove specific day info.
        '''
        mylist = list(args)
        mylist.sort(reverse=True)
        for item in mylist:
            del self.year_data_lines[position][item]


    def show_day_and_verse_info(self):
        '''
        Searches the year_data and pulles out all date + verse lines.
        Then it checks if any of those are too small are large and prints them.
        Finally it offers to print all lines found and returs all lines found. 
        '''
        date_line_found_list = []
        problem_list = []
        for day in self.year_data_lines:
            date_line_found_list.append(self.find_date_verse_lines(day))
        for count, entry in enumerate(date_line_found_list):
            if entry is None:
                print(f'Please check {date_line_found_list[count + 1]}')
            else:
                if len(entry) > 7 or len(entry) < 6:
                    problem_list.append(entry)
                for item in entry[2:]:
                    if len(item) > 30:
                        if entry not in problem_list:
                            problem_list.append(entry)
        print(f'\n\nThere were {len(date_line_found_list)} date line entries found',
                ' for this year!\n\n')
        if len(problem_list) > 0:
            print('\nThere may be an issue with the line(s) below:')
            for line in problem_list:
                print(line)
            show_list = input("\n\nWould you like to see the entire list?(y/n)\n>>")
            if show_list == 'y':
                for line in date_line_found_list:
                    print(f'Length = {len(line)} - {line}')
                print("\n\n")
        else:
            show_list = input("\nEverything looks normal. Would you like to see the entire list?(y/n)\n>>")
            if show_list == 'y':
                for line in date_line_found_list:
                    print(f'Length = {len(line)} - {line}')
                print("\n\n")
        return date_line_found_list


    def process_date_verse_days(self, verse_type):
        if verse_type == "normal":
            for count, day in enumerate(self.year_data_lines):
                day_list = self.find_date_verse_lines(day)
                self.new_year_dict[count + 1].append(day_list)
                self.remove_lines_from_year_list(count, day_list[0], (day_list[0] + 1))
        elif verse_type == "special":
            for count, day in enumerate(self.year_data_lines):
                day_list = self.find_special_verse_lines(day)
                if len(day_list) > 0:
                    self.new_year_dict[count + 1].append(day_list[1:])
                    self.remove_lines_from_year_list(count, day_list[0], (day_list[0] + 1))


    def order_dict_results(self):
        for key, value in self.new_year_dict.items():
            self.new_year_dict[key] = sorted(value, key=lambda value: value[0])


    def remove_indexes_from_dict(self):
        missed_values = 0
        for day in self.year_data_lines:
            if len(day) > 0:
                print(day, " - This should not still be in the year_data_lines list")
                missed_values += 1
        if missed_values == 0:
            for key, value in self.new_year_dict.items():
                new_day_line = []
                for line in value:
                    new_day_line.append(line[1:])
                self.new_year_dict[key] = new_day_line
        else:
            print('\n\nI stopped before removing the indexes from the dict\n\n')


    def process_all(self):
        self.process_date_verse_days("normal")
        self.find_missing_prayer_line()
        self.find_last_three_lines()
        self.find_watchword_lines()
        self.process_date_verse_days("special")
        self.find_remaining_info_lines()
        self.order_dict_results()
        self.remove_indexes_from_dict()

    def output_to_json(self):
        if len(self.new_year_dict) > 10:
            file_name = self.source_file[:-4] + '.json'

            with open(file_name, 'w') as out:
                json.dump(self.new_year_dict, out)
            print(f'\n\n{file_name} has been created successfully!\n\n')
        else:
            print(f'\n\nIt looks like there is a problem with the new_year_data (too short). Did you fully parse all of the data?\n\n')




########################## Working with day data ##############################


    def parse_day_to_line(self, day):
        '''
        Takes each day list in the year_data and splits it into seperate lists.
        Each line list will start with the origonal index followed by the 
        line text.
        '''
        day_list = []
        for count, line in enumerate(day):
            day_list.append([count, line])
        return day_list


    def find_date_verse_lines(self, day_entry):
        '''
        Returns a list of date and verses from a single date entry. The first 
        element will be the starting index of the date list it was read from 
        (so I can keep things in order). The second element will be the name of 
        the css class to use, third will be the date and all other elements
        will be verses for that day. This function will be called first.
        '''
        for day in self.day_of_the_week_list:
            for count, line in enumerate(day_entry):

                if day + "," in line[-1] and "—" in line[-1]:
                    day_verse_line =  [line[0], "dateVerse"] + re.split('[—;]', \
                    line[-1].replace("\n", "")) + \
                    day_entry[count + 1][-1].replace("\n", "").split(";")

                    for count, item in enumerate(day_verse_line):
                        try:
                            if type(item) == str:
                                day_verse_line[count] = item.strip()
                            if item == "":
                                day_verse_line.pop(count)
                        except:
                            print(f'We are on {day_verse_line}')

                    return day_verse_line


    def find_missing_prayer_line(self):
        '''
        Finds day entries that do not end in a prayer. Removed the line
        from the year_data and adds to the endign_list a list with the 
        index, class name and line. This function will be called second. 
        '''
        for count, day in enumerate(self.year_data_lines):
            if not any(ending in day[-1][-1][-12:] for ending in self.day_ending_words):
                info_index = day[-1][0]
                self.new_year_dict[count +1].append([info_index, "info", day[-1][-1]])
                self.remove_lines_from_year_list(count, -1)


    def find_last_three_lines(self):
        '''
        Finds the last three lines of each day which will be the 
        watchword(day), doctrinal, and prayer. 
        '''
        for count, day in enumerate(self.year_data_lines):

            self.new_year_dict[count + 1].append([day[-3][0], "watchD", day[-3][1]])
            self.new_year_dict[count + 1].append([day[-2][0], "docT", day[-2][1]])
            self.new_year_dict[count + 1].append([day[-1][0], "prayer", day[-1][1]])
            for _ in range(3):
                self.remove_lines_from_year_list(count, -1)


    def find_watchword_lines(self):
        '''
        Finds all lines that start with "Watchword for " and adds them to the dict.
        '''
        for count, day in enumerate(self.year_data_lines):
            for index, line in enumerate(day):
                if "Watchword for " in line[1] or "Watchword  for " in line[1]:
                    self.new_year_dict[count + 1].append([line[0], "watchO", line[1]])
                    self.remove_lines_from_year_list(count, index)
                    

    def find_special_verse_lines(self, day_entry):
        '''
        Returns a list of special date and verses from a single date entry. The first 
        element will be the starting index of the date list it was read from 
        (so I can keep things in order). The second element will be the name of 
        the css class to use, third will be the date and all other elements
        will be verses for that day.
        '''
        day_verse_line = []
        for line_count, line in enumerate(day_entry):
            if "—" in line[1] and ";" in line[1] and len(line[1]) < 80:
                line[1] = line[1].strip()
                if line[-1] == ";":
                    line = line[1][-1].replace(";", "")
                try:
                    day_verse_line =  [line[0], "specialVerse"] + re.split('[—;]', \
                    line[-1].replace("\n", "")) + \
                    day_entry[line_count + 1][-1].replace("\n", "").split(";")
                except IndexError:
                    print(f'There was an indexerror in {day_entry}')
                for count, item in enumerate(day_verse_line):
                    try:
                        if type(item) == str:
                            day_verse_line[count] = item.strip()
                        if item == "":
                            day_verse_line.pop(count)
                    except:
                        print(f'We are on {day_verse_line}')
                return [line_count] + day_verse_line
        return day_verse_line




    def find_remaining_info_lines(self):
        '''
        Finds all remaining lines from the year_data list and adds them
        to the new_year_dict. All remaining lines are assumed to be
        info lines.
        '''
        for count, day in enumerate(self.year_data_lines):
            if len(day) > 0:
                for line in day:
                    day_verse_line = [line[0], "info", line[1]]
                    self.new_year_dict[count + 1].append(day_verse_line)
                while len(day) > 0:
                    self.remove_lines_from_year_list(count, 0)

