const finalYear = 2021 // Update this value after every new year is added !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const leapYears = [2016, 2020, 2024, 2028, 2032];


//This sets the value of the day to today's "Day number"(current day number)
var today = new Date()
var todayString = new Date().toISOString().substring(0, 10);
console.log("The current day is: "+today);
var day = Math.ceil((today - new Date(today.getFullYear(), 0, 1)) / 86400000);
var year = today.getFullYear();


//This will hold the default day and year values. It can also be updated from the 
// functions in the next and previous buttons. 
var defaults = {
    year : year,
    day : day,
    todayString : todayString
}

// This is the request function. This will pull in the data from github with a file name that
// matches final<year>.json
function getJsonFile(textYear){
    // var requestURL = "https://raw.githubusercontent.com/CCCOG/gh-pages/master/" + textYear + ".json"
    var requestURL = "https://raw.githubusercontent.com/thecodinghyrax/Bible_page_update_v3/major-change-for-index/" + textYear + ".json"
    var request = new XMLHttpRequest();
    request.open('GET', requestURL)
    request.responseType = 'json';
    request.send();
    return request
}


// This creates a link from the supplied verse. Assmuptions - They will always want the NIV translation.
function createLink(verse){
    var gatewayLinkMain = "https://www.biblegateway.com/passage/?search=";
      link = gatewayLinkMain + verse + "&version=NIV";
    return link
}

// Creates an HTML line for specialVerses or dateVerse line
function verses(line){
    var lineClass = line.shift()
    var line1 = document.createElement("h2");
    line1.className = lineClass;
    if (lineClass === "dateVerse"){
        var text1 = document.createTextNode("Daily Text - " + line.shift());
    } else {
        var text1 = document.createTextNode(line.shift());
    }
    line1.appendChild(text1);
    document.querySelector("body").appendChild(line1);

    var line2 = document.createElement("h3");
    var text2 = document.createTextNode("Daily Scripture Lessions");
    line2.appendChild(text2);
    document.querySelector("body").appendChild(line2);

    for (var i = 0; i < line.length; i++){
        var para = document.createElement("p");
        var span = document.createElement("span");
        var anchor = document.createElement("a");
        var text = document.createTextNode(line[i]);
        var tab = document.createTextNode("\t\t");
        anchor.appendChild(text);
        anchor.setAttribute("href", createLink(line[i]));
        anchor.setAttribute("target", "_blank");
        span.appendChild(anchor);
        para.appendChild(span);
        para.appendChild(tab);
        document.querySelector("body").appendChild(para);
    }
}

function infoLine(line){
    var lineClass = line.shift();
    if (line[0].length > 40){
        var line1 = document.createElement("p");
        console.log("The line.length is: " + line[0].length);
    line1.innerHTML = "<b>" + line.shift() + "</b><br/>";
    } else {
        var line1 = document.createElement("h2");
    line1.innerHTML = line.shift();
    }
    line1.className = lineClass;
    document.querySelector("body").appendChild(line1);
}

function watchO(line){
    var lineClass = line.shift();

    var watchWordOtherList = line[0].split("\u2014");
    var line1 = document.createElement('h3');
    var text1 = document.createTextNode(watchWordOtherList[0].trim());
    line1.appendChild(text1);
    document.querySelector("body").appendChild(line1);

    var line2 = document.createElement("p");
    var text2 = document.createTextNode(watchWordOtherList[1].trim());
    line2.className = lineClass;
    line2.appendChild(text2);
    document.querySelector("body").appendChild(line2);
}

function watchD(line){
    var lineClass = line.shift();
    var line1 = document.createElement("h3");
    line1.className = lineClass;
    text1 = document.createTextNode("Watchword For the Day");
    line1.appendChild(text1);
    document.querySelector("body").appendChild(line1);
    var line2 = document.createElement("p");
    line2.className = lineClass;
    text2 = document.createTextNode(line.shift());
    line2.appendChild(text2);
    document.querySelector("body").appendChild(line2);
}

function docT(line){
    var lineClass = line.shift();
    var line1 = document.createElement("h3");
    line1.className = lineClass;
    text1 = document.createTextNode("Doctrinal Text");
    line1.appendChild(text1);
    document.querySelector("body").appendChild(line1);
    var line2 = document.createElement("p");
    line2.className = lineClass;
    text2 = document.createTextNode(line.shift());
    line2.appendChild(text2);
    document.querySelector("body").appendChild(line2);
}

function prayer(line){
    var lineClass = line.shift();
    var line1 = document.createElement("h3");
    line1.className = lineClass;
    text1 = document.createTextNode("Prayer");
    line1.appendChild(text1);
    document.querySelector("body").appendChild(line1);
    var line2 = document.createElement("p");
    line2.className = lineClass;
    text2 = document.createTextNode(line.shift());
    line2.appendChild(text2);
    document.querySelector("body").appendChild(line2);
}

// Test function for displaying day data
function dayDisplay(currentDayEntry) {
    //This is a reset of the body
    var body = document.querySelector("body");
    body.innerHTML = '';

    currentDayEntry.forEach(line => {
        if (line[0] === "dateVerse" || line[0] === "specialVerse") {
            verses(line);
        } else if (line[0] === "info"){
            infoLine(line);
        } else if (line[0] === "watchO"){
            watchO(line);
        } else if (line[0] === "watchD"){
            watchD(line);
        } else if (line[0] === "docT"){
            docT(line);
        } else if (line[0] === "prayer"){
            prayer(line);
        } 
    });
}

function main(mainYear){

var request = getJsonFile(mainYear);


//This is where all the functions are called after the JSON is requested and loaded
request.onload = function() {
    
    // Main function handles all of the other function calls. 
    // This will be recalled after the "next" and/or "previous" buttons are clicked
    var data = request.response;
    dayDisplay(data[defaults.day]);

    
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
    inputField.setAttribute("value", defaults.todayString);
    inputField.setAttribute("min", "2016-01-01");
    var lastDayOfThisYear = new Date(finalYear, 11, 31).toISOString().substring(0, 10);
    inputField.setAttribute("max", lastDayOfThisYear);

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
    if ((defaults.year === year && leapYears.includes(year) && defaults.day >= 366) || (defaults.year === year && defaults.day >= 365)){
        document.getElementById("next").style.visibility = "hidden";
    } else {
        document.getElementById("next").style.visibility = "visible";
    };
    
    // Defines the funtion to advance to the next day entry 
    function next() {
        // What to do if its the last day of a non-leap year and not the current year
        if (defaults.day === 365 && defaults.year != year && !leapYears.includes(defaults.year)){
            defaults.year += 1;
            defaults.day = 1
            // What to do if it's on the last day of a leap year and not the current year
        } else if (defaults.day === 366 && defaults.year != year){
            defaults.year += 1;
            defaults.day = 1;
            // What to do if it's the last day of the current year
        } else if ( defaults.year === year && (defaults.day === 365 && !leapYears.includes(defaults.year)) || (defaults.day === 366 && leapYears.includes(defaults.year)) ) {
            console.log("End of the year. Do nothing when the Next button is clicked!");
        } else {
            defaults.day += 1;
        }

        main(defaults.year);
        this.outerHTML = this.outerHTML; //This is needed to "Reset"the body element to prevent every action from doubling every time its activated. 
    };

    // Defines the function to advance to the previous day entry
    function previous() {

        // What to do if the previous year is not 2016 and the previous year is not a leapyear
        if (defaults.day === 1 && !leapYears.includes((defaults.year - 1)) && defaults.year >= 2017){
            // defaults.year = Number(defaults.year)
            defaults.year -= 1;
            defaults.day = 365;
        } else if (defaults.day === 1 && leapYears.includes((defaults.year - 1)) && defaults.year >= 2017){
            // defaults.year = Number(defaults.year)
            defaults.year -= 1;
            defaults.day = 366; //defaults.year is a leap year
        } else if (defaults.day === 1 && defaults.year === 2016){  
            console.log("Do nothing as this is the first day of the first year we have data for (2016)");
        } else {
            defaults.day -= 1;
        }
        main(defaults.year); 
        this.outerHTML = this.outerHTML; //This is needed to "Reset"the body element to prevent every action from doubling every time its activated. 
        };

    document.getElementById('next').onclick = next;
    document.getElementById('previous').onclick = previous;
    document.body.addEventListener("keyup", function(event) {
        if (event.code === "ArrowRight") {            
            event.preventDefault();
            this.outerHTML = this.outerHTML;
            next();
        } 
        if (event.code === "ArrowLeft"){
            event.preventDefault();
            this.outerHTML = this.outerHTML;
            previous();
        }
    });


    document.getElementById("search").onclick = function () {
        var x = document.getElementById("input")
        var searchInput = x.value;
        console.log("Here is what is returned from the date input : ");
        console.log(searchInput);
        var inputList = searchInput.split("-");
        // console.log(inputList);
        defaults.year = Number(inputList[0]);
        console.log("The year after searching is : " + defaults.year);
        
        var searchDay = new Date(defaults.year, (inputList[1] - 1), inputList[2]);
        var searchDayOfTheYear = Math.ceil((searchDay - new Date(inputList[0], 0, 0)) / 86400000);
        // console.log("The searchDay value is : " + searchDay);
        // console.log("The searchDayOfTheYear is : " + searchDayOfTheYear);
        defaults.day = searchDayOfTheYear;
        console.log("The defaults.day value after serching is : " + defaults.day);
        
        main(defaults.year);        
    };
  
};// onload()
    
};// main()

// Initial call of the main() function
main(defaults.year);