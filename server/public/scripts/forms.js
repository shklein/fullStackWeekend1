$(document).ready(function (){
var staff = [];
getEmployees();
//Places info into object, adds object to array, &c.
$('.employeeinfo').on('submit', addEmployee);

  $('#employeeinfo').find('input[type=text]').val('');
  $('#employeeinfo').find('input[type=number]').val('');





//Deletes entry
$('.person').on('click', 'button', function () {
  $(this).parent().remove();
});

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
//AJAX functions
function getEmployees () {
  $.ajax({
      type: 'GET',
      url: '/employees',
      success: function (employees) {
        console.log(employees);
        $('#employeeList').empty();
          employees.forEach(function (emp) {
            console.log(emp);
            $container = $('<div></div>');
            var empData = ['first_name', 'last_name', 'title', 'salary'];
          empData.forEach(function (prop) {
              var $el = $('<div id="' + prop + '" name="' + prop + '" />');
              $el.val(emp[prop]);
              $container.append($el);
              $('#employeeList').append($container);
          });
          $container.data('empID', employees.id);
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
  console.log(employee);
  $.ajax({
    type: 'POST',
    url: '/employees',
    data: employee,
    success: function (data) {
      console.log(data);
    }
  });
};
