//load file system
var fs = require ('fs');

// Step 1. Create all single-d and multi-d arrays AS empty arrays (initially)
    //push single string data/elements into an array as a single element 
    //push array data into array to for multi-d arrays
    
//single-d arrays --valid
var departmentId = []; //done
var departments = []; //done

//mulit-d arrays
var employeeId = [];
var employeeName = [];
var salaries = [];

//process "load_dept_names.txt" file 
fs.readFile('load_dept_names.txt', 'utf8', function(err, data){
    if (err) throw err;

    var deptDataClean = data.replace(/INSERT INTO `departments` VALUES \n/g, "");
    var deptDataArray = deptDataClean.split('\n');
    
    for (var i = 0; i < deptDataArray.length; i++){
        //populate multi-d arrays with DATA
        departmentId.push(deptDataArray[i].slice(2, 6));
        departments.push(deptDataArray[i].slice(9,-3));
        
        //populate multi-d arrays with empty sub-arrays (NO DATA)
        employeeId.push([]);
        employeeName.push([]);
        salaries.push([]);
    }
    
    // console.log(departmentId);
    // console.log(departments);
    // console.log(employeeId);
    // console.log(employeeName);
    // console.log(salaries);
});

//process "load_dept_emp.txt" file 
fs.readFile('load_dept_emp.txt', 'utf8', function(err, data){
    if (err) throw err;
    
    var employeeDataClean = data.replace(/INSERT INTO `dept_emp` VALUES /g, "");
    var employeeDataArray = employeeDataClean.split('\n');
    
    for (var i = 0; i < employeeDataArray.length; i++){
        if (employeeDataArray[i].slice(28, 32) == '9999') {
            
            //console.log(employeeDataArray[i].slice(8, 12));
            //console.log(employeeDataArray[i].slice(1,6));
            
            employeeId[departmentId.indexOf(employeeDataArray[i].slice(8, 12))].push(employeeDataArray[i].slice(1, 6));
        }
    }
    
    console.log(employeeId);
});

//var globalEmployeeNameArray;

fs.readFile('load_employee.txt', 'utf8', function(err, data){
    if (err) throw err;

    var employeeNameClean = data.replace(/INSERT INTO `employees` VALUES /g, "");
    var employeeNameArray = employeeNameClean.split('\n');
    
    //console.log(employeeNameArray);
    
    for (var i = 0; i < employeeNameArray.length; i++) {
        employeeNameArray[i].slice(21, -20);
        //console.log(employeeNameArray[i].slice(1, 6));
        for (var j = 0; j < employeeId.length; j++) {
            for (var k = 0; k < employeeId[j].length; k++) {
                if (employeeNameArray[i].slice(1, 6) == employeeId[j][k]) {
                    employeeName[j][k] = employeeNameArray[i].slice(21, -20).split(",").reverse().join(" ").replace(/'/g, "");
                }
            }
        }
        //employeeName[employeeId.indexOf(employeeNameArray[i].slice(1, 6))].push(employeeNameArray[i].slice(21, -20));
        console.log(employeeName);
    }
});

fs.readFile('load_salaries1.txt', 'utf8', function(err, data){ //file has been loaded and file has been put intom data
    if (err) throw err;
   
   var employeeSalaryClean = data.replace(/INSERT INTO `salaries` VALUES /g, "");
   var employeeSalaryArray = employeeSalaryClean.split('\n');
   
   console.log(employeeSalaryArray);
   
   for (var i = 0; i < employeeSalaryArray.length; i++) {
       if (employeeSalaryArray[i].slice(27, 31) == '9999') {
           for (var j = 0; j < employeeId.length; j++) { //looping through sub array of employee id
               for (var k = 0; k < employeeId[j].length; k++) { //compare it to employee id 
                   if (employeeId[j][k] == employeeSalaryArray[i].slice(1, 6)) {
                      salaries[j].push(employeeSalaryArray[i].slice(7, 12)); //pushing salaries in
                   }
               }
           }
            //console.log(employeeSalaryArray[i].slice(7, 12));
            //console.log(employeeSalaryArray[i].slice(1, 6));
            
            //salaries[employeeId.indexOf(employeeSalaryArray[i].slice(1, 6))].push(employeeSalaryArray[i].slice(27, 31));
       }
   }
   console.log(salaries);
});    
