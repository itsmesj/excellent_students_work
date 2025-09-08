const names = document.getElementById("nameInput");
const ages = document.getElementById("ageInput");
const grades = document.getElementById("gradeInput");
const addBtn = document.getElementById("addBtn");
const tableBody = document.querySelector("#studentTable tbody");
let editstudents = null;

addBtn.addEventListener("click", 
()=>{
    
        const name = names.value.trim();
        const age = ages.value;
        const grade = grades.value;

    if (!name || !age || !grade){
        alert("plz fill all the fields carefully")
        return;
    }


    if(editstudents){
      editstudents.cells[0].textContent = name;
      editstudents.cells[1].textContent = age;
      editstudents.cells[2].textContent = grade;
      blankinput();
      editstudents = null;
      return;
    }

    const tr = document.createElement("tr");

    const nametd = document.createElement("td");
    nametd.innerHTML = name;

    const agetd = document.createElement("td")
    agetd.innerHTML = age;

    const gradetd = document.createElement("td")
    gradetd.innerHTML = grade;

    const buttontd = document.createElement("td")
    
    const editbtn = document.createElement("button")
    editbtn.innerHTML = "Edit";
    const dlttbtn = document.createElement("button")
    dlttbtn.innerHTML = "delete";

    buttontd.append(editbtn,dlttbtn)

    tr.append(nametd,agetd,gradetd,buttontd);
    tableBody.appendChild(tr)
    

    dlttbtn.addEventListener("click",()=>{
        tr.remove()
    })

    editbtn.addEventListener("click",()=>{
      names.value = name; 
      ages.value = age;
      grades.value = grade;
      addBtn.innerHTML = "Update";
      editstudents = tr;
    })

    blankinput();
  }
)

function blankinput(){
    names.value = '';
    ages.value = '';
    grades.value = '';
}

  const toggleThemeBtn = document.getElementById("toggleTheme");
  toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });