var hourNow = parseInt(moment().format('H'));
var classes = [".8AM", ".9AM", ".10AM", ".11AM", ".12PM", ".1PM", ".2PM", ".3PM", ".4PM", ".5PM", ".6PM"]
var time = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var classIndex = time.indexOf(hourNow);
$("#currentDay").text(moment().format('dddd, MMMM D, YYYY'));
var currentDayCheck = moment().format('dddd, MMMM D, YYYY')
var allEvents

//colors blocks based on whether it is a workday hour or not 
if (hourNow < 9) {
    allFuture();
}
else if (hourNow > 17) {
    allPast();
}
else {
    formatTimes()
}

//startup functions to grab data from local storage data and to determine if app opened on a new day
grabData();
checkDay()

/// sets future class if before 9 am
function allFuture() {
    for (i = 1; i < classes.length; i++) {
        $(classes[i]).addClass("future");
    }
    $(classes[0]).addClass("present");
}

/// sets past class if after 6 pm
function allPast() {
    for (i = 0; i < classes.length - 1; i++) {
        $(classes[i]).addClass("past");
    }
    $(classes[time.length - 1]).addClass("present");
}

/// uses moment api if during workday of 9 am - 6 pm
function formatTimes() {
    $(classes[classIndex]).addClass("present");
    for (i = 0; i < classIndex; i++) {
        $(classes[i]).addClass("past");
    }
    for (i = classIndex + 1; i < classes.length; i++) {
        $(classes[i]).addClass("future");
    }
}

//save button function, stores in allEvents array and local storage data
$(".saveBtn").on("click", function () {
    var di = $(this).data('index');
    allEvents[di] = $(classes[di]).val();
    localStorage.setItem('allEvents', JSON.stringify(allEvents))
    alert("Saved")

})

//grabData function, restores data to rows from local storage
function grabData() {
    allEvents = JSON.parse(localStorage.getItem("allEvents"));
    if (allEvents == null) {
        allEvents = ["", "", "", "", "", "", "", "", "", "", ""];
        return;
    }
    for (i = 0; i < classes.length; i++) {
        ($(classes[i])).val(allEvents[i]);
    }
}

//click event for the clear button
$(".clearEvent").on("click", function () {
    cleardata()
})

//clear data function, clears allnote array, all rows and stores empty array in local storage
function cleardata() {
    var confirmDelete = confirm("Are you sure you want to clear all data?");
    if (confirmDelete == true) {
        allEvents = ["", "", "", "", "", "", "", "", "", "", ""];
        localStorage.setItem('allEvents', JSON.stringify(allEvents));
        grabData();
    }
}

//function that compares current day with last day stored in local storage. offers user to clear data if day has changed.
function checkDay() {
    var dateSet = localStorage.getItem("date");
    if (dateSet == null) {
        localStorage.setItem('date', currentDayCheck);
    }
    else if (currentDayCheck !== dateSet) {
        localStorage.setItem('date', currentDayCheck);
        var confirmNewDay = confirm("It's a new day, would you like to clear your calendar?")
        if (confirmNewDay == true) {
            cleardata()
            localStorage.setItem('date', currentDayCheck);
        }
    }
}

//save all button function, stores everything in allEvents array and local storage data
$(".saveEvent").on("click", function () {
    for (i = 0; i < classes.length; i++) {
        allEvents[i] = $(classes[i]).val();
    }
    localStorage.setItem('allEvents', JSON.stringify(allEvents))
    alert("All Events Saved")
})