import re

class SourceData:
    def __init__(self, source_file):
        self.source_file = source_file
        self.length_of_year = 0
        self.year_data = []
        self.day_verse_list = []
        self.last_three_lines = []
        self.ending_info = []
        self.temp_list = []
        self.total_entries_ok = True
        self.day_of_the_week_list = ['Monday', 'Tuesday', 'Wednesday', 
                                    'Thursday', 'Friday', 'Saturday', 
                                    'Sunday']
        self.day_ending_words = ["Amen!", "amen!", "Amen.", "Hallelujah!", 
                                "ng to be?", "ry of God!"]
        self.leap_year_list = ['2016', '2020', '2024', '2028', '2032']
        self.months_list = ['January', 'February', 'March', 'April', 'May', 
                            'June', 'July', 'August', 'September', 'October', 
                            'November', 'December']
        self.books_of_bible_list = ['Genesis','Exodus', 'Leviticus', 'Numbers', 
                                    'Deuteronomy', 'Joshua', 'Judges', 'Ruth', 
                                    '1 Samuel', '2 Samuel', '1 Kings', 
                                    '2 Kings', '1 Chronicles', '2 Chronicles', 
                                    'Ezra', 'Nehemiah', 'Esther', 'Job',
                                    'Psalms', 'Proverbs', 'Ecclesiastes',
                                    'Song of Solomon', 'Isaiah', 'Jeremiah', 
                                    'Lamentations', 'Ezekiel', 'Daniel', 
                                    'Hosea', 'Joel', 'Amos', 'Obadiah',
                                    'Jonah', 'Micah', 'Nahum', 'Habakkuk', 
                                    'Zephaniah', 'Haggai', 'Zechariah', 
                                    'Malachi', 'Matthew', 'Mark', 'Luke', 
                                    'John', 'Acts', 'Romans', '1 Corinthians', 
                                    '2 Corinthians', 'Galatians', 'Ephesians', 
                                    'Philippians', 'Colossians', 
                                    '1 Thessalonians', '2 Thessalonians', 
                                    '1 Timothy', '2 Timothy', 'Titus', 
                                    'Philemon', 'Hebrews', 'James', '1 Peter', 
                                    '2 Peter', '1 John', '2 John', '3 John', 
                                    'Jude', 'Revelation']
        self.start_line = self.find_file_start()
        self.update_year_data()
        self.new_year_dict = self.create_new_year_dict()



####################### Working with full year data ###########################
    def create_new_year_dict(self):
        '''
        Creates a new dictonary with an key for every day in the 
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


    def parse_files_by_day(self):
        '''
        Takes a self.source_file and line to start looking on (skip to) and 
        returns a list of lists where each element is a line from the file. 
        '''
        with open(self.source_file, encoding='utf8') as current_file:
            day_entry_list = []
            self.year_data = []
            blank_lines = 0
            for line in current_file.readlines()[self.start_line:]:
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


    def check_year_for_num_of_days(self):
        '''
        Extracts the year from the file name and checks if it is a leap year or
        not and then returns whether or not it has the correct number of 
        entries. Incorrect number of entries would indicated that the day 
        parsing has a spacing problem.
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
        self.parse_files_by_day()
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
        return that number + all > or < it's self.
        '''
        for line in self.year_data:
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
            del self.year_data[position][item]


    def show_day_and_verse_info(self):
        '''
        Searches the year_data and pulles out all date + verse lines.
        It then check if any of those are too small are large and prints them.
        Finally it offers to print all lines found and returs all lines found. 
        '''
        self.clear(80)
        date_line_found_list = []
        problem_list = []
        for line in self.year_data:
            date_line_found_list.append(self.find_date_verse_lines(line))
        for entry in date_line_found_list:
            if len(entry) > 7 or len(entry) < 6:
                problem_list.append(entry)
        print(f'\n\nThere were {len(date_line_found_list)} date line entries found',
                ' for this year!\n\n')
        if len(problem_list) > 0:
            print('\nThere may be an issue with the line(s) below:')
            for line in problem_list:
                print(line)
        else:
            show_list = input("\nEverything looks normal. Would you like to see the entire list?(y/n)\n>>")
            if show_list == 'y':
                for line in date_line_found_list:
                    print(line)
                print("\n\n")
        return date_line_found_list


########################## Working with day data ##############################


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

                if day + "," in line and "—" in line:
                    day_verse_line =  [count, "d+v"] + re.split('[—;]', \
                    line.replace("\n", "")) + \
                    day_entry[count + 1].replace("\n", "").split(";")

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
        for count, day in enumerate(self.year_data):
            if not any(ending in day[-1][-12:] for ending in self.day_ending_words):
                info_index = len(day) + 3
                # self.ending_info.append([info_index, "info", day[-1]])
                self.new_year_dict[count +1].append([info_index, "info", day[-1]])
                self.remove_lines_from_year_list(count, -1)

    def find_last_three_lines(self):
        '''
        Finds the last three lines of each day which will be the 
        watchword(day), doctrinal, and prayer. 
        '''
        for count, day in enumerate(self.year_data):
            self.new_year_dict[count + 1].append([day[-3]]) # See below
            self.new_year_dict[count + 1].append(day[-2])
            self.new_year_dict[count + 1].append(day[-1])
            for _ in range(3):
                self.remove_lines_from_year_list(count, -1)


###############################################################################
# Hello future me...You will need to rewrite most of this...uggg. On the
# initial parse 'parse_files_by_day' change the logic to add the origonial 
# day index as the first element in the list. That is the only way you are 
# going to know what the order was origonally. This does mean that every
# processing step after this initial one will need to be changed..Sorry :(