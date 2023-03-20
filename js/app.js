(function () {
  let btnAddStudent = document.querySelector("#add-student");
  let modal = document.querySelector(".modal");
  let listBodyStudents = document.querySelector(".list-body");

  let formStudent = document.querySelector("#form-student");
  let modalClose = document.querySelectorAll("[modal-close]");

  addListenerToggelClass(btnAddStudent, "show");

  listBodyStudents.addEventListener("click", function (e) {
    if (e.target.classList.contains("student-delete-btn")) {
      let id = e.target.dataset.id;
      deleteStudent(id);
      showStudents();
    }
  });

  modalClose.forEach((element) => {
    addListenerToggelClass(element, "show");
  });

  formStudent.addEventListener("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    if (!formData.get("name")) return;
    addNewStudent({ id: Math.floor(new Date().getTime() / 1000), name: formData.get("name") });
    ToggelCloseModal();
    showStudents();
    this.reset();
  });

  showStudents();

  function addListenerToggelClass(element, classElement) {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      ToggelCloseModal();
    });
  }

  function deleteStudent(id) {
    let students = getStudents();

    return setStudents(students.filter((e) => e.id != id));
  }

  function ToggelCloseModal() {
    modal.classList.toggle("show");
  }

  function addNewStudent(student) {
    let students = getStudents();
    students.push(student);
    return setStudents(students);
  }

  function getStudents() {
    return JSON.parse(localStorage.getItem("student-management-data")) || [];
  }

  function setStudents(data) {
    return localStorage.setItem("student-management-data", JSON.stringify(data));
  }

  function showStudents() {
    listBodyStudents.innerHTM = "";
    let lists = "";
    getStudents().forEach((element) => {
      lists += `
            <div class="list-item">
                        <div class="card student-card">
                            <div class="card-body">
                                <div class="student-profile">
                                    <img class="student-image" src="https://i.pravatar.cc/300" alt="">
                                </div>
                                <h1 class="student-name">${element.name}</h1>
                            </div>
                            <div class="card-footer">
                                <div class="flex justify-content-center">
                                    <button class="btn btn-outline-danger student-delete-btn"  data-id="${element.id}"> delete</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
    });
    listBodyStudents.innerHTML = lists;
  }
})();
