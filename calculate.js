// Getting the outputs
const resultdays = document.querySelector(".result-days");
const resultmonths = document.querySelector(".result-months");
const resultyears = document.querySelector(".result-years");
// Getting the form
const ageform = document.querySelector("#myform");
ageform.addEventListener("submit", (e) => {
    e.preventDefault();
});

// Getting each input field
const input_day = document.querySelector(".input_day");
const input_month = document.querySelector(".input_month");
const input_year = document.querySelector(".input_year");
// Getting labels
const labelday = document.querySelector(".day");
const labelmonth = document.querySelector(".mnth");
const labelyear = document.querySelector(".yr");
// Getting errors
const dayerror = document.querySelector(".error_day");
const montherror = document.querySelector(".error_month");
const yearerror = document.querySelector(".error_year");
// Getting submit button
const btn = document.querySelector(".arrow-btn");

let isValid = false;

// Function to validate all inputs
function validateInputs() {
    isValid = true;

    // Validate day
    if (input_day.value === "" || input_day.value > 31 || input_day.value <= 0) {
        dayerror.textContent = "Must be a valid date";
        labelday.style.color = "red";
        input_day.style.borderColor = "red";
        isValid = false;
    } else {
        dayerror.textContent = "";
        labelday.style.color = "";
        input_day.style.borderColor = "";
    }

    // Validate month
    if (input_month.value === "" || input_month.value > 12 || input_month.value <= 0) {
        montherror.textContent = "Must be a valid month";
        labelmonth.style.color = "red";
        input_month.style.borderColor = "red";
        isValid = false;
    } else {
        montherror.textContent = "";
        labelmonth.style.color = "";
        input_month.style.borderColor = "";
    }

    // Validate year
    const currentYear = new Date().getFullYear();
    if (input_year.value === "" || input_year.value <= 0 || input_year.value >= currentYear) {
        yearerror.textContent = "Must be a valid year in the past";
        labelyear.style.color = "red";
        input_year.style.borderColor = "red";
        isValid = false;
    } else {
        yearerror.textContent = "";
        labelyear.style.color = "";
        input_year.style.borderColor = "";
    }

    // Additional checks for days and months
    if (input_month.value == 2 && input_day.value > 29) {
        montherror.textContent = "February cannot have more than 29 days";
        labelmonth.style.color = "red";
        input_month.style.borderColor = "red";
        isValid = false;
    } else if (input_month.value == 2 && input_day.value == 29 && !leapYear(input_year.value)) {
        montherror.textContent = "February 29 is only valid in a leap year";
        labelmonth.style.color = "red";
        input_month.style.borderColor = "red";
        isValid = false;
    }

    const monthsWith30Days = { 4: 'April', 6: 'June', 9: 'September', 11: 'November' };
    if (monthsWith30Days[input_month.value] && input_day.value == 31) {
        montherror.textContent = `${monthsWith30Days[input_month.value]} cannot have 31 days`;
        labelmonth.style.color = "red";
        input_month.style.borderColor = "red";
        isValid = false;
    }

    return isValid;
}

// Function to check for leap year
function leapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Counting function to animate the result
function countUp(startDays, startMonths, startYears, targetDays, targetMonths, targetYears) {
    const duration = 2000; // Total duration of the animation in milliseconds
    const interval = 50; // Interval between updates in milliseconds
    const steps = duration / interval;

    const stepDays = (targetDays - startDays) / steps;
    const stepMonths = (targetMonths - startMonths) / steps;
    const stepYears = (targetYears - startYears) / steps;

    let currentDays = startDays;
    let currentMonths = startMonths;
    let currentYears = startYears;

    const counter = setInterval(() => {
        currentDays += stepDays;
        currentMonths += stepMonths;
        currentYears += stepYears;

        // Update the displayed values
        resultdays.textContent = Math.round(currentDays);
        resultmonths.textContent = Math.round(currentMonths);
        resultyears.textContent = Math.round(currentYears);

        // Stop the animation when the target is reached.
        if (Math.round(currentDays) >= targetDays && Math.round(currentMonths) >= targetMonths && Math.round(currentYears) >= targetYears) {
            clearInterval(counter);
            resultdays.textContent = targetDays;
            resultmonths.textContent = targetMonths;
            resultyears.textContent = targetYears;
        }
    }, interval);
}

// Event listener for the submit button
btn.addEventListener("click", (e) => {
    if (validateInputs()) {
        const dateOfBirth = `${input_month.value}/${input_day.value}/${input_year.value}`;
        const birthdayobj = new Date(dateOfBirth);
        const ageDiff = Date.now() - birthdayobj.getTime();
        const ageDate = new Date(ageDiff);

        const ageYears = ageDate.getUTCFullYear() - 1970;
        const ageMonths = ageDate.getUTCMonth();
        const ageDays = ageDate.getUTCDate();

        // Start the counting animation
        countUp(0, 0, 0, ageDays, ageMonths, ageYears);
    } else {
        // Maintain the result spans even if inputs are invalid
        resultyears.textContent = resultyears.textContent || 'Invalid';
        resultmonths.textContent = resultmonths.textContent || 'Invalid';
        resultdays.textContent = resultdays.textContent || 'Invalid';
    }
});
