const addBtn = document.getElementById('addBtn');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const gradeInput = document.getElementById('grade');
const tableBody = document.querySelector('#studentTable tbody');
const toggleThemeBtn = document.getElementById('toggleTheme');

let editRow =null;
let editIndex = null;

window.onload=()=>{
    loadStudents();
    loadTheme();
}

addBtn.addEventListener('click',()=>{
    const name = nameInput.value.trim();
    const age = ageInput.value;
    const grade = gradeInput.value;
      if(!name ||!age ||!grade) {
        alert('Please fill all field');
        return;
      }

      const student = {name, age , grade};

      if(editRow!== null){
        updateStudentInTable(editRow, student);
        updateStudentInStorage(editIndex, student);
        editRow = null;
        editIndex = null;
        addBtn.textContent = "Add student";
      }else{
        addStudentToTable(student);
        saveStudentToStorage(student);
      }

      resetForm();
});

     function addStudentToTable(student, index = null){
        const tr = document.createElement('tr');

        const nameTd = document.createElement('td');
        nameTd.textContent =student.name;

         const ageTd = document.createElement('td');
        ageTd.textContent =student.age;

         const gradeTd = document.createElement('td');
        gradeTd.textContent =student.grade; 

        const actionTd = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.style.marginRight = '6px';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        editBtn.addEventListener('click',()=>{
            nameInput.value = student.name;
            ageInput.value = student.age;
            gradeInput.value = student.grade;
            addBtn.textContent = "Update Student";
            editRow = tr;
            editIndex = index??  getStudent().findIndex(s=>s.name === student.name && s.age === student.age && s.grade === student.grade);

        });

        deleteBtn.addEventListener('click',()=>{
            tr.remove();
            deleteStudentFromStorage(index);
            resetForm();
        });

        actionTd.append(editBtn, deleteBtn);
        tr.append(nameTd, ageTd, gradeTd, actionTd);

        if(parseInt(student.grade) >= 90){
           tr.classList.add('highlight');
        }else if(parseInt(student.grade)>= 35){
            tr.classList.add('highlight-fail');
        }
        tableBody.appendChild(tr);

     }

     function updateStudentInTable(row, student){
        row.cells[0].textContent = student.name;
        row.cells[1].textContent = student.age;
        row.cells[2].textContent = student.grade;

        row.classList.remove('highlight', 'highlight-fail');

         if(parseInt(student.grade) >= 90){
           row.classList.add('hightlight');
         }
         if(parseInt(student.grade) <= 35){
             row.classList.add('highlight-fail');
         }
 

     }

     function saveStudentToStorage(student){
        const students = getStudents();
        students.push(student);
        localStorage.setItem('student',JSON.stringify(students));

     }
     
     function getStudents(){
      return JSON.parse(localStorage.getItem('students')) || []
     }

     function loadStudents(){
      const students = getStudents();
      students.forEach((student,index)=>{
        addStudentToTable(student,index);
      });
     }

     function updateStudentInStorage(index, updatedStudent){
        const students = getStudents();
        students[index] =updatedStudent;
        localStorage.setItem('student',JSON.stringify(students));

     }

     function deleteStudentFromStorage(){
        const students = getStudents();
        students.splice(index, 1);
        localStorage.setItem('student', JSON.stringify(students));
     }

     function resetForm(){
        nameInput.value = "";
        ageInput.value = "";
        gradeInput.value = "";
        addBtn.textContent = "Add student";
        editRow = null;
        editIndex = null;

    
     }

     toggleThemeBtn.addEventListener('click',()=>{
        document.body.classList.toggle('dark');
        localStorage.setItem('theme',document.body.classList.contains('dark')? 'dark' : 'light');
     });

     function loadStudents(){
        const theme = localStorage.getItem('theme');
        if(theme==='dark'){
            document.body.classList.add('dark');
        }
     }




