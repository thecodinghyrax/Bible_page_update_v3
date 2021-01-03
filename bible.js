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
    console.log(line);
    document.querySelector("body").appendChild(line1);
}

function watchO(line){
    var lineClass = line.shift();

    var watchWordOtherList = line[0].split("\u2014");
    var line1 = document.createElement('h3');
    var text1 = document.createTextNode(watchWordOtherList[0]);
    line1.appendChild(text1);
    document.querySelector("body").appendChild(line1);

    var line2 = document.createElement("p");
    var text2 = document.createTextNode(watchWordOtherList[1]);
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


//This sets the value of the day to today's "Day number"(current day number)
var today = new Date()
console.log("The current day is: "+today);
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
    var requestURL = "https://raw.githubusercontent.com/thecodinghyrax/Bible_page_update_v3/major-change-for-index/" + textYear + ".json"
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