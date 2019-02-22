//load file system
var fs = require ('fs');

// Step 1. Create all single-d and multi-d arrays AS empty arrays (initially)
    //push single string data/e;ements into an array as a single ekement 
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
        departmentId.push(deptDataArray[i].slice(2,6));
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
            
            employeeId[departmentId.indexOf(employeeDataArray[i].slice(8, 12))].push(employeeDataArray[i].slice(1,6));
        }
    }
    
    //console.log(employeeId);
});

fs.readFile('load_employee.txt', 'utf8', function(err, data){
    if (err) throw err;

    var employeeNameClean = data.replace(/INSERT INTO `employees` VALUES /g, "");
    var employeeNameArray = employeeNameClean.split('\n');
    
    //console.log(employeeNameArray);
    
    for (var i = 0; i < employeeNameArray.length; i++) {
        
        console.log(employeeNameArray[i].slice(1, 6));
        //console.log(employeeDataArray[i].slice(1,6));
        
        employeeName[employeeId.indexOf(employeeNameArray[i].slice(1, 6))].push(employeeNameArray[i].slice(21, ))
    }
});