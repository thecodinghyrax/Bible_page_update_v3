// This creates a link from the supplied verse. Assmuptions - They will always want the NIV translation.
function createLink(verse){
    var gatewayLinkMain = "https://www.biblegateway.com/passage/?search=";
      link = gatewayLinkMain + verse + "&version=NIV";
    return link
}

// Creates an HTML line for date text
function dateLine(line){
    var line1 = document.createElement("h2");
    var text1 = document.createTextNode("Daily Text - " + line);
    line1.appendChild(text1);
    document.querySelector("body").appendChild(line1);
}

// Creates an HTML line for each verse in a verse line
function verseLine (line){    
        for (var j = 0; j < line.length; j++){
            var para = document.createElement("p");
            var span = document.createElement("span");
            var anchor = document.createElement("a");
            var text = document.createTextNode(line[j]);
            var tab = document.createTextNode("\t\t");
            anchor.appendChild(text);
            anchor.setAttribute("href", createLink(line[j]));
            anchor.setAttribute("target", "_blank");
            span.appendChild(anchor);
            para.appendChild(span);
            para.appendChild(tab);
            document.querySelector("body").appendChild(para);
            }
        //version = "NIV";
        }

// Leaving this in although its unused at this time. 
// Creates an HTML line for a text line that contains text + verse. 
// function textAndVerse(line) {
//     var para = document.createElement("p");
//     var span = document.createElement("span");
//     var verseSpan = document.createElement("span");
//     var anchor = document.createElement("a");
//     var text = document.createTextNode(line[0]);
//     var verseText = document.createTextNode(line[1]);
//     var tab = document.createTextNode("\t\t");

//     span.appendChild(text);
//     para.appendChild(span);
//     anchor.appendChild(verseText);
//     anchor.setAttribute("href", createLink(line[1]));
//     anchor.setAttribute("target", "_blank");
//     verseSpan.appendChild(anchor);
//     para.appendChild(verseSpan);
//     document.querySelector("body").appendChild(para);
//     version = "NIV";
    
// }

// Creates an HTML line for text only
function textOnly(line){
    var para = document.createElement("p");
    var text = document.createTextNode(line);
    para.appendChild(text);
    document.querySelector("body").appendChild(para);
}

// Creates an h3 section heading with text passed as "heading"
function sectionHeading(heading){
    var heading2 = document.createElement("h3");
    var text = document.createTextNode(heading);
    heading2.appendChild(text);
    document.querySelector("body").appendChild(heading2);
}

// Creates an h1 section heading with text passed as "line"
function textOnlyH1(line){
    var para = document.createElement("h1");
    var text = document.createTextNode(line);
    para.appendChild(text);
    document.querySelector("body").appendChild(para);
}

// Creates an h2 section heading with text passed as "line"
function textOnlyH2(line){
    var para = document.createElement("h2");
    var text = document.createTextNode(line);
    para.appendChild(text);
    document.querySelector("body").appendChild(para);
}

// The will handle all HTML for a JSON entry with five lines
function fiveLineDay(currentDayEntry){
    //This is a reset of the HTML body
    var body = document.querySelector("body");
    body.innerHTML = '';
    // Handeling line 1
    dateLine(currentDayEntry["line1"][0]);    
    // Handeling line 2
    sectionHeading("Daily Scripture Lessions");
    verseLine(currentDayEntry["line2"]);
    // Handeling line 3
    sectionHeading("Watchword For the Day");
    textOnly(currentDayEntry["line3"][0]);
    // Handeling line 4
    sectionHeading("Doctrinal Text");
    textOnly(currentDayEntry["line4"][0]);
    // Handeling line 5
    sectionHeading("Prayer");
    textOnly(currentDayEntry["line5"][0]);
}

// The will handle all HTML for a JSON entry with six lines
function sixLineDay(currentDayEntry){
    //This is a reset of the body
    var body = document.querySelector("body");
    body.innerHTML = '';
    // Handeling line 1
    textOnlyH1(currentDayEntry["line1"][0]);
    // Handeling line 2
    dateLine(currentDayEntry["line2"][0]);
    // Handeling line 3
    sectionHeading("Daily Scripture Lessions");
    verseLine(currentDayEntry["line3"]);
    // Handeling line 4
    sectionHeading("Watchword For the Day");
    textOnly(currentDayEntry["line4"]);
    // Handeling line 5
    sectionHeading("Doctrinal Text");
    textOnly(currentDayEntry["line5"]);
    // Handeling line 6
    sectionHeading("Prayer");
    textOnly(currentDayEntry["line6"]);
}

// The will handle all HTML for a JSON entry with seven lines
function sevenLineDay(currentDayEntry){
    //This is a reset of the body
    var body = document.querySelector("body");
    body.innerHTML = '';
    // Handeling line 1
    textOnlyH1(currentDayEntry["line1"][0]);
    // Handeling line 2
    dateLine(currentDayEntry["line3"][0]);//order is switched intentionally
    // Handeling line 3
    if (currentDayEntry["line2"].length == 2){
        sectionHeading(currentDayEntry["line2"][0]);
        textOnly(currentDayEntry["line2"][1]);
    } else {
        sectionHeading("Watchword for the Week");
        textOnly(currentDayEntry["line2"][0]);
    }
    
    // Handeling line 4
    sectionHeading("Daily Scripture Lessions");
    verseLine(currentDayEntry["line4"]);
    // Handeling line 5
    sectionHeading("Watchword For the Day");
    textOnly(currentDayEntry["line5"][0]);
    // Handeling line 6
    sectionHeading("Doctrinal Text");
    textOnly(currentDayEntry["line6"]);
    // Handeling line 7
    sectionHeading("Prayer");
    textOnly(currentDayEntry["line7"]);
}

// The will handle all HTML for a JSON entry with eigth lines - Please note....this is still broken
function eightLineDay(currentDayEntry){
    //This is a reset of the body
    var body = document.querySelector("body");
    body.innerHTML = '';
    // Handeling line 1
    textOnlyH1(currentDayEntry["line1"]);
    // Handeling line 2
    dateLine(currentDayEntry["line3"][0]);//order is switched intentionally
    // Handeling line 3    
    if (currentDayEntry["line2"].length <= 1){
        console.log("This currentDayEntry has no real entry for line2");
    } else {
        sectionHeading(currentDayEntry["line2"][0]);
        textOnly(currentDayEntry["line2"][1]);
        console.log(currentDayEntry["line2"]);
        console.log(currentDayEntry["line2"].slice(1));
    }
    // Handeling line 4
    sectionHeading("Daily Scripture Lessions");
    verseLine(currentDayEntry["line3"].slice(1));
    // Handeling line 5
    sectionHeading(currentDayEntry["line4"][0]);
    verseLine(currentDayEntry["line5"]);
    // Handeling line 6
    sectionHeading("Watchword For the Day");
    textOnly(currentDayEntry["line6"]);
    // Handeling line 7
    sectionHeading("Doctrinal Text");
    textOnly(currentDayEntry["line7"]);
    // Handeling line 7
    sectionHeading("Prayer");
    textOnly(currentDayEntry["line8"]);
}

// The will handle all HTML for a JSON entry with nine lines - Please note....this is still broken
function nineLineDay(currentDayEntry){
    //This is a reset of the body
    var body = document.querySelector("body");
    body.innerHTML = '';
    // Handeling line 1
    textOnlyH1(currentDayEntry["line1"][0]);
    // Handeling line 2
    dateLine(currentDayEntry["line3"]);
    // Handeling line 3
    if (currentDayEntry["line2"].length <= 1){
        console.log("This currentDayEntry has no real entry for line2");
        textOnlyH2(currentDayEntry["line2"][0]);
    } else {
        sectionHeading(currentDayEntry["line2"][0]);
        textOnly(currentDayEntry["line2"][1]);
        console.log(currentDayEntry["line2"]);
        console.log(currentDayEntry["line2"].slice(1));
    }
    // Handeling line 4
    sectionHeading("Daily Scripture Lessions");
    verseLine(currentDayEntry["line4"]);
    // Handeling line 5
    sectionHeading(currentDayEntry["line5"][0]);
    // Handeling line 6
    verseLine(currentDayEntry["line6"]);
    // Handeling line 7
    sectionHeading("Watchword For the Day");
    textOnly(currentDayEntry["line7"][0]);
    // Handeling line 8
    sectionHeading("Doctrinal Text");
    textOnly(currentDayEntry["line8"][0]);
    // Handeling line 9
    sectionHeading("Prayer");
    textOnly(currentDayEntry["line9"][0]);
}

//This sets the value of the day to today's "Day number"(current day number)
var today = new Date()
console.log(today);
var day = Math.ceil((today - new Date(today.getFullYear(), 0, 1)) / 86400000);


//day = 364 // For testing. Comment out when go live.
var year = today.getFullYear();
//year = 2018 // For testing. Comment out when go live.

//This will hold the default day and year values. It can also be update from the 
// functions in the next and previous buttons. 
var defaults = {
    year : year,
    day : day
}


// This is the request function. This will pull in the data from github with a file name that
// matches final<year>.json
function getJsonFile(textYear){
    // var requestURL = "https://raw.githubusercontent.com/thecodinghyrax/Bible_page_update_2019/master/final" + textYear + ".json"
    var requestURL = "" + textYear + ".json"
    var request = new XMLHttpRequest();
    request.open('GET', requestURL)
    request.responseType = 'json';
    request.send();
    return request
}

function main(mainYear){

var request = getJsonFile(mainYear);


//This is where all the functions are called after the JSON is requested and loaded
request.onload = function() {
    
    // Main function handles all of the other function calls. 
    // This will be recalled after the "next" and/or "previous" buttons are clicked
    var data = request.response;
    console.log(data);
    if (data.dayText[defaults.day]["line_count"] == 5){
        fiveLineDay(data.dayText[defaults.day]);
    } else if (data.dayText[defaults.day]["line_count"] == 6){
        sixLineDay(data.dayText[defaults.day]);
    } else if (data.dayText[defaults.day]["line_count"] == 7){
        sevenLineDay(data.dayText[defaults.day]);
    } else if (data.dayText[defaults.day]["line_count"] == 8){
        eightLineDay(data.dayText[defaults.day]);
    } else if (data.dayText[defaults.day]["line_count"] == 9){
        nineLineDay(data.dayText[defaults.day]);
    } else {
        console.log("I have failed to match a line_count for today!")
        }
    
    // This is creating the buttons and adding them to the HTML
    var div = document.createElement("div");
    var buttonPrevious = document.createElement("button");
    buttonPrevious.setAttribute("id", "previous");
    buttonPrevious.innerHTML = "Previous";
    var buttonNext = document.createElement("button");
    buttonNext.setAttribute("id", "next");
    buttonNext.innerHTML = "Next";
    var inputField = document.createElement("input");
    inputField.setAttribute("id", "input");
    inputField.setAttribute("type", "date");
    inputField.setAttribute("value", "2020-01-01");
    inputField.setAttribute("min", "2016-01-01");
    inputField.setAttribute("max", "2020-12-31");//This will need to be changed everytime a new year file is added. This will need to be changed after go live. Todo
    //inputField.innerHTML = "Next";
    var searchButton = document.createElement("button");
    searchButton.setAttribute("id", "search");
    searchButton.innerHTML = "Search";
    div.appendChild(buttonPrevious);
    div.appendChild(buttonNext);
    div.appendChild(inputField);
    div.appendChild(searchButton);
    document.querySelector("body").appendChild(div);
    

    //Hides the previous button if date entry is not found (null) This would happen if you were at the first entry
    if (defaults.day <= 1 && defaults.year <= 2016){
        document.getElementById("previous").style.visibility = "hidden";
    } else {
        document.getElementById("previous").style.visibility = "visible";
    };
    
    //Hides the next button if current day is the last day in the last JSON file
    if (defaults.day >= 366 && defaults.year == 2020){ //This will need to be changed everytime a new year file is added. This will need to be changed after go live. Todo
        document.getElementById("next").style.visibility = "hidden";
    } else {
        document.getElementById("next").style.visibility = "visible";
    };
    
    // Defines the funtion to advance to the next day entry 
    function next() {
        if (defaults.day == 365 && defaults.year != 2016){
            defaults.year = Number(defaults.year)
            defaults.year += 1;
            defaults.day = 1
            console.log("The day of the year is now (non-leap year) = " + defaults.day);
            console.log("The year is now (non-leap year) = " + defaults.year);
        } else if (defaults.day == 366 && defaults.year == 2016){
            defaults.year = Number(defaults.year)
            defaults.year += 1;
            defaults.day = 1;
            console.log("The day of the year is now (leap year) = " + defaults.day);
            console.log("The year is now (leap year) = " + defaults.year);
        } else {
            defaults.day += 1;
            console.log("The day of the year is now (normal day) = " + defaults.day);
            console.log("The year is now (normal day) = " + defaults.year);
        }
       
        console.log("The day of the year is now = " + defaults.day);
        console.log("The year is now = " + defaults.year);
        main(defaults.year);
        this.outerHTML = this.outerHTML; //This is needed to "Reset"the body element to prevent every action from doubling every time its activated. 
    };
    // Defines the function to advance to the previous day entry
    function previous() {
        if (defaults.day == 1 && defaults.year != 2017){
            defaults.year = Number(defaults.year)
            defaults.year -= 1;
            defaults.day = 365;
            console.log("The day of the year is now (non-2016)= " + defaults.day);
            console.log("The year is now (non-2016) = " + defaults.year);
        } else if (defaults.day == 1 && defaults.year == 2017){
            defaults.year = Number(defaults.year)
            defaults.year -= 1;
            defaults.day = 366; //2016 is a leap year
            console.log("The day of the year is now (leap year) = " + defaults.day);
            console.log("The year is now (leap year) = " + defaults.year);
        } else {
            defaults.day -= 1;
            console.log("The day of the year is now (normal day) = " + defaults.day);
            console.log("The year is now (normal day) = " + defaults.year);
        }
        main(defaults.year); 
        this.outerHTML = this.outerHTML; //This is needed to "Reset"the body element to prevent every action from doubling every time its activated. 
        };
    document.getElementById('next').onclick = next;
    document.getElementById('previous').onclick = previous;
    document.body.addEventListener("keyup", function(event) {
        if (event.keyCode === 39) {
            console.log("The Enter key was pressed");
            
            event.preventDefault();
            next();
            this.outerHTML = this.outerHTML;
        } else if (event.keyCode === 37){
            event.preventDefault();
            previous();
            this.outerHTML = this.outerHTML;
        }
    });


    document.getElementById("search").onclick = function () {
        var x = document.getElementById("input")
        var searchInput = x.value;
        // console.log("Here is what is returned from the date input : ");
        // console.log(searchInput);
        var inputList = searchInput.split("-");
        // console.log(inputList);
        defaults.year = inputList[0]
        console.log("The year after searching is : " + defaults.year);
        
        var searchDay = new Date(defaults.year, (inputList[1] - 1), inputList[2]);
        var searchDayOfTheYear = Math.ceil((searchDay - new Date(inputList[0], 0, 0)) / 86400000);
        // console.log("The searchDay value is : " + searchDay);
        // console.log("The searchDayOfTheYear is : " + searchDayOfTheYear);
        defaults.day = searchDayOfTheYear;
        console.log("The defaults.day value after serching is : " + defaults.day);
        
        main(defaults.year);
        
        

        
        
    };
  
};// main()
    


}

// Initial call of the main() function
main(defaults.year);
//console.log("This is the end of the js. defaults.year = " + defaults.year);