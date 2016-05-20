var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

//Routes
router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done){
    if (err) {
      res.sendState(500);
    }

    client.query('SELECT * FROM employees WHERE active = true', function (err, result) {
      done();
      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done){
    if (err) {
      res.sendState(500);
    }
    client.query("INSERT INTO employees (first_name, last_name, title, salary) VALUES ('" + req.body.employeefirstname + "', '"  + req.body.employeelastname + "','" + req.body.employeejobtitle + "','" + req.body.employeesalary + "')");
    res.send('added');
});
});

router.post('/:id', function (req, res) {
  var id = req.params.id;
   console.log(id);
   pg.connect(connectionString, function (err, client, done) {
     if (err) {
       console.log(err);
      res.sendStatus(500);
     }

    client.query('UPDATE employees SET active = false WHERE employees.id = $1',
                   [id],
                   function (err, result) {
                     done();

                     if (err) {
                      console.log(err);
                      res.sendStatus(500);
                      return;
                   }

                   res.sendStatus(200);
                  });
   });
 });

 router.get('/payroll', function (req, res) {
   var total;

   pg.connect(connectionString, function (err, client, done){
     if (err) {
       res.sendState(500);
     }
     client.query('SELECT SUM(salary) / 12 AS monthly FROM employees WHERE active = true', function (err, result) {
     total = (result.rows[0].monthly);
     done();
     res.send(total);
   });

   });
 });


module.exports = router;
