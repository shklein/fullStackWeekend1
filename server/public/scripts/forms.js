$(document).ready(function (){
getEmployees();
getPayroll();

//Add employee
$('.employeeinfo').on('submit', addEmployee);

//Deletes employee
$('#employeeList').on('click', '.deleteEmp', deleteEmployee);

});

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
    type: 'POST',
    url: '/employees/' + empID,
    success: function (data) {
      getEmployees();
    },
  });
}

function getPayroll () {
$.ajax({
    type: 'GET',
    url: '/employees/payroll',
    success: function (data) {
      console.log(data);
      $('#payroll').empty();
      $('#payroll').append('$' + data);
    }
  });
};
