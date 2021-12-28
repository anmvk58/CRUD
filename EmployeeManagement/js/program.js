$(function() {
    $(".header").load("header.html");
    $(".main").load("home.html");
    $(".footer").load("footer.html");
});

function clickNavHome() {
    $(".main").load("home.html");
}

function clickNavViewListEmployees() {
    $(".main").load("viewlistemployees.html");
    buildTable();
}

var employees = [];
var counter = 0;

function Employee(name, department, phone) {
    this.id = ++counter;
    this.name = name;
    this.department = department;
    this.phone = phone;
}

function initEmployees() {
    $.get("https://615080c2a706cd00179b7498.mockapi.io/api/v1/students", function(data, status){
        // console.log(data)
        data.forEach(function(item){
                $('tbody').append(
                    '<tr>' +
                    '<td>' + item.id + '</td>' +
                    '<td>' + item.full_name + '</td>' +
                    '<td>' + item.university + '</td>' +
                    '<td>' + item.age + '</td>' +
                    '<td>' +
                    '<a class="edit" title="Edit" data-toggle="tooltip" onclick="openUpdateModal(' + item.id + ')"><i class="material-icons">&#xE254;</i></a>' +
                    '<a class="delete" title="Delete" data-toggle="tooltip" onClick="openConfirmDelete(' + item.id + ')"><i class="material-icons">&#xE872;</i></a>' +
                    '</td>' +
                    '</tr>')
        })
})
    // if (null == employees || employees.length == 0) {
    //     // init data
    //     employees.push(new Employee("Trấn Thành", "MC", "(171) 555-2222"));
    //     employees.push(new Employee("Thủy Tiên", "Ca Sĩ", "(313) 555-5735"));
    //     employees.push(new Employee("Công Vinh", "Cầu Thủ", "(503) 555-9931"));
    // }

    console.log(employees);
}

function buildTable() {
    setTimeout(function name(params) {

        $('tbody').empty();
        initEmployees();

        // employees.forEach(function(item) {
        //     $('tbody').append(
        //         '<tr>' +
        //         '<td>' + item.name + '</td>' +
        //         '<td>' + item.department + '</td>' +
        //         '<td>' + item.phone + '</td>' +
        //         '<td>' +
        //         '<a class="edit" title="Edit" data-toggle="tooltip" onclick="openUpdateModal(' + item.id + ')"><i class="material-icons">&#xE254;</i></a>' +
        //         '<a class="delete" title="Delete" data-toggle="tooltip" onClick="openConfirmDelete(' + item.id + ')"><i class="material-icons">&#xE872;</i></a>' +
        //         '</td>' +
        //         '</tr>')
        // });

    }, 1500);
}

function openAddModal() {
    resetForm();
    openModal();
}

function resetForm() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("department").value = "";
    document.getElementById("phone").value = "";
}

function openModal() {
    $('#myModal').modal('show');
}

function hideModal() {
    $('#myModal').modal('hide');
}

function addEmployee() {
    var name = $("#name").val;
    var department = document.getElementById("department").value;
    var phone = document.getElementById("phone").value;

    // TODO validate
    // then fail validate ==> return;

    employees.push(new Employee(name, department, phone));

    hideModal();
    showSuccessAlert();
    buildTable();
}

function openUpdateModal(id) {

    // get index from employee's id
    var index = employees.findIndex(x => x.id == id);

    // fill data
    document.getElementById("id").value = employees[index].id;
    document.getElementById("name").value = employees[index].name;
    document.getElementById("department").value = employees[index].department;
    document.getElementById("phone").value = employees[index].phone;

    openModal();
}

function save() {
    var id = document.getElementById("id").value;

    if (id == null || id == "") {
        addEmployee();
    } else {
        updateEmployee();
    }
}

function updateEmployee() {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var department = document.getElementById("department").value;
    var phone = document.getElementById("phone").value;

    // TODO validate
    // then fail validate ==> return;

    // get index from employee's id
    var index = employees.findIndex(x => x.id == id);

    // update employee
    employees[index].name = name;
    employees[index].department = department;
    employees[index].phone = phone;

    hideModal();
    showSuccessAlert();
    buildTable();
}


function openConfirmDelete(id) {
    // get index from employee's id
    var index = employees.findIndex(x => x.id == id);
    var name = employees[index].name;

    var result = confirm("Want to delete " + name + "?");
    if (result) {
        deleteEmployee(id);
    }
}

function deleteEmployee(id) {
    // TODO validate
    var index = employees.findIndex(x => x.id === id);
    employees.splice(index, 1);

    showSuccessAlert();
    buildTable();
}

function showSuccessAlert() {
    $("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
        $("#success-alert").slideUp(500);
    });
}