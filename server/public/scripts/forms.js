$(document).ready(function (){
var staff = [];
getEmployees();

//Add employee
$('.employeeinfo').on('submit', addEmployee);

//Deletes employee
$('#employeeList').on('click', '.deleteEmp', deleteEmployee);

});

function totalSalaries(array) {
  var totalSalary = 0;
  var monthlySalary = 0;
for (var i = 0; i < array.length; i++) {
  console.log(array[i]);
totalSalary += parseInt(array[i].employeesalary);
  monthlySalary = Math.round(totalSalary / 12);
  }
  return monthlySalary;
}

function appendSalary(monthlySalary) {

  $('#container').append('<div class="payroll"></div>');
    var $pr = $('#container').children().last();

    $pr.append('<p>Total Monthly Salary: ' + monthlySalary + '</p>');
}

//Utility function
function getEmpId(button) {
  // get the employee ID
  var empId = button.parent().data('empID');
  console.log('getEmpId', empId);
  return empId;
}

//AJAX functions
function getEmployees () {
  $.ajax({
      type: 'GET',
      url: '/employees',
      success: function (employees) {
        $('#employeeList').empty();
          employees.forEach(function (emp) {

            $container = $('<div class="data">' + emp.first_name + " " + emp.last_name + ': ' + emp.title + ' Salary: ' + emp.salary + '</div>');
              $('#employeeList').append($container);
              $($container).append('<button class="deleteEmp">Delete</button>');
              $container.data('empID', emp.id);
          });



}
});
};

function addEmployee (event) {
  event.preventDefault();
  var employee = {};

  $.each($('.employeeinfo').serializeArray(), function (i, field) {
    employee[field.name] = field.value;
  });
  $.ajax({
    type: 'POST',
    url: '/employees',
    data: employee,
    success: function (data) {

    }
  });
};

function deleteEmployee(event) {
  event.preventDefault();

 var empID = getEmpId($(this));


  $.ajax({
    type: 'DELETE',
    url: '/employees/' + empID,
    success: function (data) {
      getEmployees();
    },
  });
}
