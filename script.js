// calculate each grade of subjects
function gradecalculation(grade, credit) {
    
    switch(grade) {
        case "A+": return 4*credit;
        case "A": return 4*credit;
        case "A-": return 3.7*credit;
        case "B+": return 3.3*credit;
        case "B": return 3.0*credit;
        case "B-": return 2.7*credit;
        case "C+": return 2.3*credit;
        case "C": return 2.0*credit;
        case "C-": return 1.7*credit;
        case "D+": return 1.3*credit;
        case "D": return 1.0*credit;
        case "F": return 0.0*credit;
        default: return 0.0*credit;
    }
}

let counter = 1;

// add a new row of user input 
function addSubject() {
    let addNew = document.createElement("form");
    addNew.classList.add("add_new", 'key-${counter}');

    const subject_name = `
    <form class= "add_new key-${counter}">
        <p1 id="num">${counter+1}.</p1>
        <input type="text" placeholder="Enter subject" class="subjects key-${counter}" required>
        <input type="number" placeholder="Enter credit hour" min="0" class="credit_hours key-${counter}" required>
        <select class="grade key-${counter}" required>
            <option class="grade" value="select">Enter grade</option>
            <option class="grade" value="A+">A+</option>
            <option class="grade" value="A">A</option>
            <option class="grade" value="A-">A-</option>
            <option class="grade" value="B+">B+</option>
            <option class="grade" value="B">B</option>
            <option class="grade" value="B-">B-</option>
            <option class="grade" value="C+">C+</option>
            <option class="grade" value="C">C</option>
            <option class="grade" value="C-">C-</option>
            <option class="grade" value="D+">D+</option>
            <option class="grade" value="D">D</option>
            <option class="grade" value="F">F</option>
        </select>
    </form>
    `;

    addNew.innerHTML = subject_name;
    document.getElementById("course_wrapper").appendChild(addNew);
    counter++;
}

// remove last row of user input
function removeSubject() {
    var addNew = document.getElementsByClassName("add_new");
    var last= addNew[addNew.length-1];
    last.parentNode.removeChild(last);
    counter--;
}

// calculate CGPA 
function calculateCGPA() {
    const FINALCGPA = document.getElementById("cgpa_calculate");
    const RESULT = document.getElementById("result_2");
    const SELECTGRADE = document.querySelectorAll("select.grade");
    const INPUTCREDITHOUR = document.querySelectorAll("input.credit_hours");

    const listofGrades = [];
    const listofCreditHours = [];
    let totalCreditHours = 0;

    SELECTGRADE.forEach( // pass grade list to listofGrades array
        (e) => {
        let GRADES = e.options;
        const selectedIndex = e.selectedIndex;
        const selectedGrade = GRADES[selectedIndex];
        const gradeValue = selectedGrade.text.toUpperCase();
        listofGrades.push(gradeValue);
        }
    );
    console.log(listofGrades);

    INPUTCREDITHOUR.forEach( // pass credit hours list to listofUnits array
        (e) => {
        const credithoursValue = parseInt(e.value);
        totalCreditHours = totalCreditHours  + credithoursValue;
        listofCreditHours.push(credithoursValue);
        }
    );
    console.log(listofCreditHours, totalCreditHours);

    let gradecredithours= 0;
    for (let i=0; i<listofCreditHours.length; i++) {
        gradecredithours = gradecredithours + gradecalculation(listofGrades[i], listofCreditHours[i]);
    }

    const CGPA = gradecredithours/totalCreditHours;
    console.log(gradecredithours, CGPA);
    FINALCGPA.textContent = "CGPA: " + CGPA.toFixed(2);

    for(let i=0; i<listofGrades.length; i++) {
        
        if(listofGrades[i]=="C-" || listofGrades[i]=="D+" || listofGrades[i]=="D" || listofGrades[i]=="F") {RESULT.textContent= "Result: Fail"; break;}
        else {
            if(CGPA>= 3.70 && CGPA<= 4.00) {RESULT.textContent= "Result: Pass (Dean's Award)";}
            else if(CGPA>=3.00 && CGPA<=3.69) {RESULT.textContent= "Result: Pass";}
            else if(CGPA<3.00) {RESULT.textContent= "Result: Fail";}
        }
    }
}