const allEmployee = [];

// create a fuction to add a new employee
const addNewEmployee = (
  name,
  email,
  dept_name,
  phone_number,
  gender,
  language
) => {
  // create employee id
  const employee_id = 100 + (allEmployee.length + 1);
  // check if the employee exist with that id or not
  let anyEmployee = findEmployeeByID(employee_id);
  let verifyEmail = findEmployeeByEmail(email);
  if (anyEmployee || verifyEmail) {
  } else {
    let newEmployee = {};
    newEmployee.employee_id = employee_id;
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.dept_name = dept_name;
    newEmployee.phone_number = phone_number;
    newEmployee.gender = gender;
    newEmployee.language = language;

    allEmployee.push(newEmployee);
  }
};

const findEmployeeByID = (employee_id) => {
  let foundEmployee = null;

  for (let index = 0; index < allEmployee.length; index++) {
    const employee = allEmployee[index];

    if (employee.employee_id === employee_id) {
      foundEmployee = employee;
    }
  }
  return foundEmployee;
};

const findEmployeeByEmail = (email) => {
  let foundEmployee = null;
  for (let index = 0; index < allEmployee.length; index++) {
    const element = allEmployee[index];
    if (element.email === email) {
      foundEmployee = element;
    }
  }
  return foundEmployee;
};

const deleteEmployee = (employee_id) => {
  let anyEmployee = findEmployeeByID(Number(employee_id));

  if (anyEmployee) {
    const newAllEmployee = allEmployee.filter((value) => {
      if (value.employee_id == employee_id) {
        return false;
      } else {
        return true;
      }
    });
    allEmployee.splice(0);
    allEmployee.push(...newAllEmployee);
    return true;
  } else {
    return false;
  }
};
const postEmployee = () => {
  let isvalid = true;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;

  let dept_name = document.querySelector("#department").value;

  let phone = document.getElementById("phone").value;
  let gender = genderFunc();
  let language = lanuageFunc();

  function genderFunc() {
    let gen = document.getElementsByName("gender");
    for (i = 0; i < gen.length; i++) {
      if (gen[i].checked) {
        return gen[i].value;
      }
    }
  }

  function lanuageFunc() {
    let lan_array = [];
    let lan = document.getElementsByName("language");
    for (i = 0; i < lan.length; i++) {
      if (lan[i].checked) {
        lan_array.push(lan[i].value);
      }
    }
    return lan_array;
  }

  if (!name) {
    isvalid = false;
    document.getElementById("name-error").innerHTML = "Name is Required";
  }
  if (!email) {
    isvalid = false;
    document.getElementById("email-error").innerHTML = "Email is Required";
  }
  if (dept_name === document.querySelector("#department")[0].value) {
    isvalid = false;
    document.getElementById("dept_name-error").innerHTML =
      "Department is Required";
  }
  if (!phone) {
    isvalid = false;
    document.getElementById("phone-error").innerHTML =
      "Phone Number is Required";
  }
  if (!gender) {
    isvalid = false;
    document.getElementById("gender-error").innerHTML = "Gender is Required";
  }
  if (language.length == 0) {
    isvalid = false;
    document.getElementById("language-error").innerHTML =
      "Language is Required";
  }

  if (isvalid) {
    addNewEmployee(name, email, dept_name, phone, gender, language);
    displayEmployee();
    clearEmployeeForm();
  }

  return false;
};

const postEditEmployee = () => {
  let isvalid = true;
  let id = document.getElementById("emp_id").value;
  let name = document.getElementById("update_name").value;
  let email = document.getElementById("update_email").value;
  let phone = document.getElementById("update_phone").value;
  let dept_name = document.querySelector("#update_department").value;
  let gender;
  let language = [];

  let bengali = document.getElementById("update_bengali");
  let english = document.getElementById("update_hindi");
  let hindi = document.getElementById("update_english");

  if (bengali.checked) {
    language.push("Bengali");
  }
  if (english.checked) {
    language.push("English");
  }
  if (hindi.checked) {
    language.push("Hindi");
  }

  if (document.getElementById("update_male").checked) {
    gender = document.getElementById("update_male").value;
  }

  if (document.getElementById("update_female").checked) {
    gender = document.getElementById("update_female").value;
  }

  if (document.getElementById("update_others").checked) {
    gender = document.getElementById("update_others").value;
  }

  if (!name) {
    isvalid = false;
    document.getElementById("update_name-error").innerHTML = "Name is Required";
  }
  if (!email) {
    isvalid = false;
    document.getElementById("update_email-error").innerHTML =
      "Email is Required";
  }
  if (dept_name === document.querySelector("#department")[0].value) {
    isvalid = false;
    document.getElementById("update_dept_name-error").innerHTML =
      "Department is Required";
  }
  if (!phone) {
    isvalid = false;
    document.getElementById("updatephone-error").innerHTML =
      "Phone Number is Required";
  }
  if (!gender) {
    isvalid = false;
    document.getElementById("updategender-error").innerHTML =
      "Gender is Required";
  }
  if (language.length == 0) {
    isvalid = false;
    document.getElementById("updatelanguage-error").innerHTML =
      "Language is Required";
  }

  const modifiedData = {
    emp_name: name,
    emp_email: email,
    emp_dept_name: dept_name,
    emp_phone: phone,
    emp_gender: gender,
    emp_language: language,
  };

  if (isvalid) {
    updateEmployee(id, modifiedData);
    displayEmployee();
    clearEditEmployeeForm();
  }

  return false;
};

const displayEmployee = () => {
  // Get HTML element in which we will insert our dynamic table
  const employeeDataTable = document.getElementById("allEmployeeList");

  // Prepare the dynamic table.
  const employeeTable = `
  <table id ="emp_table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Employee Id</th>
      <th>Gender</th>
      <th>Language</th>
      <th>Phone Number</th>
      <th>Department Name</th>
      <th colspan = "2">Action</th>
    </tr>
  </thead>

  <tbody>
    ${allEmployee
      .map((employee) => {
        return `
    <tr>
      <td>${employee.name}</td>
      <td>${employee.email}</td>
      <td>${employee.employee_id}</td>
      <td>${employee.gender}</td>
      <td>${employee.language}</td>
      <td>${employee.phone_number}</td>
      <td>${employee.dept_name}</td>
      <td><input type="button" value="Delete" data_id = "${employee.employee_id}" onclick = "return deleteHandler(this)"></td>
      <td><input type="button" value="Edit" data_id = "${employee.employee_id}" onclick = "return editHandler(this)"></td>
    </tr>`;
      })
      .join(" ")}
  </tbody>
</table>
  `;
  if (allEmployee.length == 0) {
    employeeDataTable.innerHTML = "No Data to Show!";
  } else {
    employeeDataTable.innerHTML = employeeTable;
  }
};
const deleteHandler = (thisElement) => {
  let employee_id = thisElement.getAttribute("data_id");

  let isDelete = deleteEmployee(employee_id);

  if (isDelete) {
    displayEmployee();
  } else {
    alert("Can not delete");
  }
};

const editHandler = (thisElement) => {
  let employee_id = thisElement.getAttribute("data_id");
  let anyEmployee = findEmployeeByID(Number(employee_id));

  if (anyEmployee) {
    document.getElementById("emp_id").value = `${anyEmployee.employee_id}`;

    document.getElementById("update_name").value = anyEmployee.name;
    document.getElementById("update_email").value = anyEmployee.email;
    document.querySelector("#update_department").value = anyEmployee.dept_name;
    document.getElementById("update_phone").value = anyEmployee.phone_number;

    let edit_gender = anyEmployee.gender;
    if (edit_gender === "Male") {
      document.getElementById("update_male").checked = true;
    } else if (edit_gender === "Female") {
      document.getElementById("update_female").checked = true;
    } else if (edit_gender === "Others") {
      document.getElementById("update_others").checked = true;
    }

    let edit_language = anyEmployee.language;
    for (let i = 0; i < edit_language.length; i++) {
      if (edit_language[i] === "Bengali") {
        document.getElementById("update_bengali").checked = true;
      } else if (edit_language[i] === "Hindi") {
        document.getElementById("update_hindi").checked = true;
      } else if (edit_language[i] === "English") {
        document.getElementById("update_english").checked = true;
      }
    }
  } else {
    alert("Something Went Wrong. Please Try Later!");
  }
};

const clearEmployeeForm = () => {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.querySelector("#department").value =
    document.querySelector("#department")[0].value;

  let gen_male = document.getElementById("male").checked;
  let gen_female = document.getElementById("female").checked;
  let gen_others = document.getElementById("others").checked;

  if (gen_male) {
    document.getElementById("male").checked = false;
  } else if (gen_female) {
    document.getElementById("female").checked = false;
  } else if (gen_others) {
    document.getElementById("others").checked = false;
  }

  let lan_bengali = document.getElementById("bengali").checked;
  let lan_hindi = document.getElementById("hindi").checked;
  let lan_english = document.getElementById("english").checked;

  if (lan_bengali) {
    document.getElementById("bengali").checked = false;
  }
  if (lan_hindi) {
    document.getElementById("hindi").checked = false;
  }
  if (lan_english) {
    document.getElementById("english").checked = false;
  }
};
const clearEditEmployeeForm = () => {
  document.getElementById("emp_id").value = "";
  document.getElementById("update_name").value = "";
  document.getElementById("update_email").value = "";
  document.getElementById("update_phone").value = "";
  document.querySelector("#update_department").value =
    document.querySelector("#update_department")[0].value;

  let gen_male = document.getElementById("update_male").checked;
  let gen_female = document.getElementById("update_female").checked;
  let gen_others = document.getElementById("update_others").checked;

  if (gen_male) {
    document.getElementById("update_male").checked = false;
  } else if (gen_female) {
    document.getElementById("update_female").checked = false;
  } else if (gen_others) {
    document.getElementById("update_others").checked = false;
  }

  let lan_bengali = document.getElementById("update_bengali").checked;
  let lan_hindi = document.getElementById("update_hindi").checked;
  let lan_english = document.getElementById("update_english").checked;

  if (lan_bengali) {
    document.getElementById("update_bengali").checked = false;
  }
  if (lan_hindi) {
    document.getElementById("update_hindi").checked = false;
  }
  if (lan_english) {
    document.getElementById("update_english").checked = false;
  }
};

const updateEmployee = (id, modifiedData) => {
  let anyEmployee = findEmployeeByID(Number(id));
  if (anyEmployee) {
    if (modifiedData.emp_name) {
      anyEmployee.name = modifiedData.emp_name;
    }
    if (modifiedData.emp_email) {
      anyEmployee.email = modifiedData.emp_email;
    }
    if (modifiedData.emp_phone) {
      anyEmployee.phone_number = modifiedData.emp_phone;
    }
    if (modifiedData.emp_dept_name) {
      anyEmployee.dept_name = modifiedData.emp_dept_name;
    }
    if (modifiedData.emp_gender) {
      anyEmployee.gender = modifiedData.emp_gender;
    }
    if (modifiedData.emp_language) {
      anyEmployee.language = modifiedData.emp_language;
    }

    return anyEmployee;
  } else {
    return null;
  }
};

const displayFilteredEmployee = () => {
  let input, filter, table, tr, td, i;
  input = document.getElementById("emp_search");
  filter = input.value.toUpperCase();
  table = document.getElementById("emp_table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
};
