const mainForm = document.getElementById("mainForm");
const submitBtn = document.getElementById("submit");

let startDateElem = document.getElementById("startMonth");
let endDateElem = document.getElementById("endMonth");

startDateElem.addEventListener('blur', function () {
    if (startDateElem.value !== "") {
        endDateElem.min = startDateElem.value;
    }
});

mainForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const title = document.getElementById("titleURL").value;
    let startDate = startDateElem.value;
    let endDate = endDateElem.value;
    let getStartDate = moment(startDate);
    let getEndDate = moment(endDate);
    let diffDays = getEndDate.diff(getStartDate, 'days');
    submitBtn.value = "Loading";

    fetch("https://goodreads-pages.now.sh/" + title)
        .then((res) => {
            if (!res.ok) {
                throw Error(res.statusText)
            }
            
            res.text()
                .then((val) => {
                    console.log(val);
                    submitBtn.value = "Search";
                    if (val === "Not Found") {
                        return;
                    };
                    let pagesPerDay = Math.ceil(val / diffDays);
                    if (diffDays == 0) {
                        pagesPerDay = val;
                    }
                    const result = document.getElementById("result");
                    result.innerHTML = "Read " + pagesPerDay + " Pages Per Day.";
                    if (isNaN(pagesPerDay)) {
                        result.innerHTML = "Please Enter A Valid Book Title.";
                    }
                })
        })
        .catch((err) => {
            const error = document.getElementById("titleError");
            result.innerHTML = "Enter a valid book title.";
            submitBtn.value = "CALCULATE";
            console.log(err);
        });

});