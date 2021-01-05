# Daily Bible Verse Project

This is a small project written for the [CENTRALIA COMMUNITY CHURCH](https://cccog.com). We receive a yearly text file that contains information, bible verses and prayers for each day of the year. Our goal was to turn that into a webpage that could be imbedded into the churches Squarespace site.

## Background

This project (while currently meeting the need) is still a work in progress. I ([thecodinghyrax](https://github.com/thecodinghyrax)) am not a professional developer, but I do have a keen interest in programming and all things tech. ~~The current version of this project is head and shoulders above the first but still requires some manual intervention to get the text formatted correctly. The goal is to one day run a single script and have either 1. The entire page updated with the new text or 2. Display the errors and allow the user to fix them as the process goes.~~
Now in version 3, the parser has been rewritten from scratch with the benefit of my personal knowledge growth in Python and as well a fresh approach to the problem. Analyzing many years worth of data has given me a clearer picture of what the edge cases are and as a result, I have rebuilt the parser as a command line application, complete with several tools to query the data and identify problem areas (incorrect line spacing, typos, ect). I have also improved the structure of the JSON file so it eliminates most of the JavaScript parsing that was being done previously. 

## How it works
~~Currently we are heavy Windows users and the text is generated on a Mac so the text is first “converted” to be more usable on Windows, it is then converted into a JSON format and then each entry is further parsed to split the information into lists (within the JSON file). Once the data is prepared, it is left on this github repo where the JS file can call on it for the daily information.~~ The command line application has several options to see the shape of the data and potential issues that can be corrected and rechecked on the fly. The parsing steps now can be attempted as one step or individually if problems occur. The strategy now is to first parse the days into lists, then look for and remove known day entries such as Date + verse lines, special day + verse lines, watchword, doctorial text, and prayer lines. All remaining lines are treated as “info” lines. As the lines are removed from the day entries, they are ”tagged” with a name to be used for by the JavaScript and CSS, and an index to keep the original order, followed by the entry text. This is then added to a python dictionary, sorted into the original order and then outputted to a JSON file to be read by the JavaScript. The JavaScript will retrieve each day entry from the JSON file and display in the index.html page. All files are hosted on CCCO’s github pages site and then embedded into their SquareSpace site as an iframe.   

## Struggles

### 1.	Converting from Mac to Windows
~~Although the first pass of the parser does a pretty good job of finding and replacing Unicode bits that Windows doesn’t like, there always seem to be a few new ones that slip in from time to time. Currently, I have had to modify the firstpass.py file to add new characters as needed. My hope it that eventually this will become a non-issue as everything will eventually be accounted for.~~ All fixed by using UTF-8 encoding 😊

### 2.	Inconsistent formatting

~~The text file we receive is structured pretty well but there are only so many different day formats that I can reasonably account for. Currently, the day must conform to one of 5 different formats based on the number of entries for the day in the JSON. Once the text is parsed, I will usually have to go back and restructure some of the days to conform to the proper format (special holidays tend to be tricky).  I have created a word doc on this repo with a list of changes I had to make manually.~~ Mostly fixed with tools built into the parser that allows for identifying issues and fixing them (if need be) before converting the whole thing into JSON. As the original document is created by humans, there will always be some checking / fixing that needs to be done. 

### 3.	Manual updating of the JS

~~This is minor, but each year the JS has to be altered to include the next years text. Would love to make this editing part of the parsing scripts.~~ Mostly fixed by including a list of leap years to check against but there is still one value to change(update at the top of the JS file to tell it what the most recent year available is. 

### 4.	No GUI

~~To parse the text file currently, you need to run each python script individually, make adjustments to the text as you go (see #2) and then rerun the scripts to reparse the altered text. This requires a Python 3 environment, CLI skills, file management and detailed knowledge of the scripts. I have started a control script to run all of the separate scripts but more work is needed. I would eventually like to build out a packaged GUI that could be simple to install and use. More work to do.~~ Still no GUI but using it as a more fully featured CLI is acceptable at this point. 

## Conclusion 
This project has a very specific use case but is currently in a workable state. Check out the final results here [Moravian Daily Text](https://cccog.com/moravian).

