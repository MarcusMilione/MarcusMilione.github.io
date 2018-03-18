var mainForm = document.getElementById("mainForm");
var submitBtn = document.getElementById("submit");
var startDateElem = document.getElementById("startMonth");
var endDateElem = document.getElementById("endMonth");
startDateElem.addEventListener('blur', function () {
  if (startDateElem.value !== "") {
    endDateElem.min = startDateElem.value;
  }
});
mainForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  var title = document.getElementById("titleURL").value;
  var startDate = startDateElem.value;
  var endDate = endDateElem.value;
  var getStartDate = moment(startDate);
  var getEndDate = moment(endDate);
  var diffDays = getEndDate.diff(getStartDate, 'days');
  submitBtn.value = "Loading";
  fetch("https://goodreads-pages.now.sh/" + title).then(function (res) {
    if (!res.ok) {
      throw Error(res.statusText);
    }

    res.text().then(function (val) {
      console.log(val);
      submitBtn.value = "Search";

      if (val === "Not Found") {
        return;
      }

      ;
      var pagesPerDay = Math.ceil(val / diffDays);

      if (diffDays == 0) {
        pagesPerDay = val;
      }

      var result = document.getElementById("result");
      result.innerHTML = "Read " + pagesPerDay + " Pages Per Day.";

      if (isNaN(pagesPerDay)) {
        result.innerHTML = "Please Enter A Valid Book Title.";
      }
    });
  }).catch(function (err) {
    var error = document.getElementById("titleError");
    result.innerHTML = "Enter a valid book title.";
    submitBtn.value = "CALCULATE";
    console.log(err);
  });
});