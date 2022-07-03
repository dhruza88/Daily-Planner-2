
var headerDate = moment().format('dddd MMM Do YYYY, hh:mm:ss a');
$("#currentDay").text(headerDate);

var times = [ 9, 10, 11, 12, 13, 14, 15, 16, 17 ];

// function getStandardTime(hour) {
//     return hour > 12 ? hour - 12 : hour;
// }

function getStandardTimeObject(hour) {
    if (hour >= 12) {
        const returnHr = hour === 12 ? hour : Number(hour - 12);
        return {
            hr: returnHr,
            ampm: 'pm',
            rowClass: this.getRowClass(hour)
        }
    } else {
        return {
            hr: hour,
            ampm: 'am',
            rowClass: this.getRowClass(hour)
        }
    }
}

 // NOTES ADD

 // Arrow Function Notation ES6 JS
 // funtionName() => {};
 // (variableForFunc) => {};

// +=  take the thing + what I'm giving on the otherside of the equals

function getRowClass(realHour) {
    const curHour = new Date().getHours();
    let timeClass = 'present';
    if (realHour < curHour) {
        timeClass = 'past'
    }
    if (realHour > curHour) {
        timeClass = 'future'
    }
    return timeClass;
}

function buildRows(){ 
    let newForm = document.getElementById('container');
    newForm.innerHTML = '';
    let rowHtml = '';
    times.forEach((eachHour) => {
        // const amPm = eachHour < 12 ? 'am' : 'pm';
        // const realHour = this.getStandardTime(eachHour);
        const realHourObj = this.getStandardTimeObject(eachHour);
        rowHtml += `
            <div id="row">
                <div>${realHourObj.hr}${realHourObj.ampm}</div>
                <div class="${realHourObj.rowClass}">
                    <input id="entry${eachHour}" type="text" name="description" placeholder="Enter Activities..." />    
                </div>
                <div id="btn${eachHour}" onClick="onSave(${eachHour})"></div>
            </div>
        `;
    });

    newForm.innerHTML = rowHtml;
    this.setSavedData();
}


// When a User attempts to save
// Check to see if localStorage exists
    // IF NOT set localStorage as initial item
    // ELSE updated existing localStorage object and add new Obj


// localStorage('dailySchedule')
    // [{ hour: #, txt: '' }]
function onSave(hr) {
    const hourText = document.getElementById(`entry${hr}`).value;
    
    let builtSchedule = [];
    if (localStorage.getItem('dailySchedule')) {
        // Get the actual daily schedule
        // filter the actual daily schedule to see if the current hour exists
        // set the builtSchedule back

        var dailySchedule = JSON.parse(localStorage.getItem('dailySchedule'));
        dailySchedule = dailySchedule.filter(
            (eachSched) => eachSched.hour !== hr
        );

        builtSchedule = dailySchedule;
    }
    builtSchedule.push(
        {
            hour: hr,
            txt: hourText
        }
    )
    localStorage.setItem('dailySchedule',JSON.stringify(builtSchedule));
    alert("Schedule has been updated!");
    this.setSavedData();
}
function setSavedData()  {
    if (localStorage.getItem('dailySchedule')) {
        const dailySchedule = JSON.parse(localStorage.getItem('dailySchedule'));
        dailySchedule.forEach((currentSchedule) => {
            document.getElementById(`entry${currentSchedule.hour}`).value = currentSchedule.txt;
        } );
    } 
}


