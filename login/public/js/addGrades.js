const recordActivityForm = document.getElementById("grade-student-form");

recordActivityForm.addEventListener('submit', async function(event) {
   event.preventDefault();

   const activityName = document.getElementById("activity-name").value;
   const grade = document.getElementById("grade-fill").value;
   const overallGrade = document.getElementById("overall-grade-fill").value;

   const params = new URLSearchParams(window.location.search);
   const schoolid = params.get("studentID");

   const response = await fetch('/addGrades', {
       method: 'POST',
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ activityName, grade, overallGrade, schoolid })
   });

   const data = await response.json();
   alert(data.message);
});