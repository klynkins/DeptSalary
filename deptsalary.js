const fs = require('fs');

fs.readFile('load_dept_emp.txt', 'utf8', function(err, data){
    if (err) throw err;
    var newData = data.replace(/INSERT INTO `dept_emp` VALUES /g, "");
    var loadDeptArray = newData.split('\n');
    
    for(var i = 0; i < loadDeptArray.length; i++){
        if (loadDeptArray[i].slice(28,32) == '9999') {
            console.log(loadDeptArray[i]);
        }
    }
});

// 1. You will need the attached data files. 
// 2. The data will need to cleaned up/sanitized before you can use it programatically. fun.
// 3. This program uses the same logic that the hotel sales report used. 
// 4. Create a report that lists the total annual salaries by department.
// 5. You are only required to report on the first 20 employees
// 6. Work on this assignment alone. Don't let someone else solution rob you of the chance to create your own.

// var business = "Dept Co.";
// var departmentId = ["d001", "d002", "d003", "d004", ]; 
// var departments = ["management", "development", "sales", "marketing" ];
// var employeeId = [ [100, 102, 103, 104, 500], [200, 201, 202, 203, 204, 205], [300, 301, 302, 303], [400, 401, 402] ];
// var salaries = [ [85000, 85000, 95000, 105000, 150000], [65000, 65000, 75000, 75000, 85000, 95000], [55000, 65000, 75000, 95000], [55000, 65000, 75000] ];
// var employeeName = [ ["Ruth", "Sofía", "Elias", "Mathias", "Claude"], ["Kai", "Isaiah", "Amare", "Nadia", "Nolan", "Jason"], ["Alejandro", "Steven", "Brodi", "Mary"], ["Jose", "Nia", "Alicia"] ];

// var allDeptSalaryGrandTotal = 0;

// for (var i = 0; i < departmentId.length; i++) {
//     var thisDeptSalaryTotal = 0;
//     console.log(`
//     Department ${departmentId[i]} - ${departments[i]}:`);
//       for (var j = 0; j < employeeId[i].length; j++) {
//           console.log(`  ${j+1}. Employee ID: ${employeeId[i][j]}, Name: ${employeeName[i][j]}, Salary: ${salaries[i][j]}`);
//         allDeptSalaryGrandTotal += salaries[i][j];
//         thisDeptSalaryTotal += salaries[i][j];
//     }
//     console.log(`The total salary for ${departments[i]} is ${thisDeptSalaryTotal}`);
// }
// console.log("\n"); 
// console.log(`The total salaries for all departments is: ${allDeptSalaryGrandTotal}`);

