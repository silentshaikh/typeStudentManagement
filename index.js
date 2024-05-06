#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    students;
    courseBalance;
    constructor(students, courseBalance) {
        this.students = students;
        this.courseBalance = courseBalance;
    }
    addStudent(name, id, course, feesPaid) {
        this.students.push({
            name: name,
            id: id,
            course: course,
            coursBalance: this.courseBalance,
            payFees: feesPaid,
        });
    }
    showStudentsStatus() {
        this.students.forEach((e) => {
            if (e.payFees === e.coursBalance) {
                console.log(chalk.bgGreen(`\n Congratulation ${chalk.bold(e.name)}, You are enrolled in the course.\n`));
                console.log(`Student Name: ${chalk.bold(e.name)}, \n ID: ${chalk.bold(e.id)}, \n Course: ${chalk.bold(e.course)}, \n Balance: ${chalk.bold(e.coursBalance)}, \n Fees Paid: ${chalk.bold(e.payFees)}.\n`);
            }
            else {
                console.log(chalk.bgRedBright(`\nDear ${chalk.bold(e.name)}, You are not enrolled in the course.\n So Plz pay the full fees of your course, than you can enrolled it.\n`));
                console.log(`Student Name: ${chalk.bold(e.name)}, \n ID: ${chalk.bold(e.id)}, \n Course: ${chalk.bold(e.course)}, \n Balance: ${chalk.bold(e.coursBalance)}, \n Fees Paid: ${chalk.bold(e.payFees)}.`);
            }
        });
    }
}
let ourStudents = new Student([], 0);
let isCondition = true;
console.log(chalk.greenBright("\n\t#############################"));
console.log(chalk.greenBright("\n\t# Student Management System #"));
console.log(chalk.greenBright("\n\t#############################\n"));
while (isCondition) {
    let StudentDetail = await inquirer.prompt([
        { name: "StudentName", message: "Enter Your Name", type: "string" },
        { name: "StudentId", message: "Enter Your ID", type: "string" },
        {
            name: "Courses",
            message: "Please Select your Course",
            type: "list",
            choices: [
                "Generative AI",
                "Blockchain",
                "Web Development",
                "Content Writer",
                "Graphic Designing",
                "Video Editing",
            ],
        },
        {
            name: "PayFee",
            message: (ans) => {
                if (ans.Courses === "Generative AI") {
                    ourStudents.courseBalance = 350;
                    return `The ${ans.Courses} Course is ${ourStudents.courseBalance}, So Please Pay the Fee`;
                }
                else if (ans.Courses === "Blockchain") {
                    ourStudents.courseBalance = 300;
                    return `The ${ans.Courses} Course is ${ourStudents.courseBalance}, So Please Pay the Fee`;
                }
                else if (ans.Courses === "Web Development") {
                    ourStudents.courseBalance = 150;
                    return `The ${ans.Courses} Course is ${ourStudents.courseBalance}, So Please Pay the Fee`;
                }
                else if (ans.Courses === "Content Writer") {
                    ourStudents.courseBalance = 250;
                    return `The ${ans.Courses} Course is ${ourStudents.courseBalance}, So Please Pay the Fee`;
                }
                else if (ans.Courses === "Graphic Designing") {
                    ourStudents.courseBalance = 200;
                    return `The ${ans.Courses} Course is ${ourStudents.courseBalance}, So Please Pay the Fee`;
                }
                else if (ans.Courses === "Video Editing") {
                    ourStudents.courseBalance = 190;
                    return `The ${ans.Courses} Course is ${ourStudents.courseBalance}, So Please Pay the Fee`;
                }
                else {
                    ourStudents.courseBalance = 0;
                    return `The ${ans.Courses} Course is ${ourStudents.courseBalance}, So Please Pay the Fee`;
                }
            },
            type: "number",
        },
        {
            name: "MoreStudent",
            message: "Do you want to add more Student",
            type: "confirm",
            default: true,
        },
    ]);
    if (isNaN(StudentDetail.PayFee) || StudentDetail.PayFee <= 0) {
        StudentDetail.PayFee = 0;
    }
    let notAddDuplicateId = ourStudents.students.find((e) => {
        return e.id === StudentDetail.StudentId;
    });
    if (StudentDetail.StudentName === "") {
        console.log(chalk.bgRedBright("\n  Please Enter your Name and plz fill the form again\n"));
    }
    if (StudentDetail.StudentId.length > 5 ||
        StudentDetail.StudentId.length < 5) {
        console.log(chalk.bgRedBright("\n  Please Enter ID Only 5 - Digits, Plz fill the form again\n"));
    }
    else {
        if (notAddDuplicateId) {
            console.log(chalk.bgRedBright(`\n  The Student ID ${chalk.bold(StudentDetail.StudentId)} has already exist,Plz fill the form again with new ID\n`));
        }
        else {
            ourStudents.addStudent(StudentDetail.StudentName, StudentDetail.StudentId, StudentDetail.Courses, StudentDetail.PayFee);
        }
    }
    isCondition = StudentDetail.MoreStudent;
}
ourStudents.showStudentsStatus();
isCondition = true;
while (isCondition) {
    let studentBalanceConfirm = await inquirer.prompt([
        {
            name: "ConfrimBalnceCheck",
            message: "Do you want to check your balance",
            type: "confirm",
            default: true,
        },
    ]);
    isCondition = studentBalanceConfirm.ConfrimBalnceCheck;
    if (isCondition) {
        let checkStudentBalance = await inquirer.prompt([
            {
                name: "CheckBalance",
                message: "Enter your ID for check your balance",
                type: "string",
            },
        ]);
        let fingId = ourStudents.students.find((e) => {
            return e.id === checkStudentBalance.CheckBalance;
        });
        if (fingId) {
            if (checkStudentBalance.CheckBalance === "") {
                console.log(" \nPlease Enter your ID for check your balance\n");
            }
            else {
                if (fingId.payFees < fingId.coursBalance) {
                    console.log(chalk.bgRedBright(`\n Dear ${chalk.bold(fingId.name)}, Your ${fingId.course} course fee is ${chalk.bold(fingId.coursBalance)} and you paid me ${chalk.bold(fingId.payFees)},So plz pay me full fee.\n`));
                }
                else if (fingId.payFees > fingId.coursBalance) {
                    console.log(chalk.bgRedBright(`\n Dear ${chalk.bold(fingId.name)}, Your ${fingId.course} course fee is ${chalk.bold(fingId.coursBalance)} and you paid me ${chalk.bold(fingId.payFees)},So plz pay a valid fee full fee.\n`));
                }
                else {
                    console.log(chalk.bgGreen(`\n Dear ${chalk.bold(fingId.name)}, Thank You so much for pay full fee of your ${fingId.course} course.\n`));
                }
            }
        }
        else {
            console.log(chalk.bgRedBright(`\n  The ${chalk.bold(checkStudentBalance.CheckBalance)} ID is not available.\n`));
        }
    }
}
isCondition = true;
while (isCondition) {
    let confirmFessPaid = await inquirer.prompt([
        {
            name: "StudentFeeConfirm",
            message: "Do you want to update your fee",
            type: "confirm",
            default: true,
        },
    ]);
    isCondition = confirmFessPaid.StudentFeeConfirm;
    if (isCondition) {
        let checkStudentId = await inquirer.prompt([
            {
                name: "checkId",
                message: "Enter your ID for your for update your fee status",
                type: "string",
            },
        ]);
        let findFeeId = ourStudents.students.find((e) => {
            return e.id === checkStudentId.checkId;
        });
        if (findFeeId) {
            let updateFee = await inquirer.prompt([
                {
                    name: "updateStudentFees",
                    message: "Enter your Fee",
                    type: "number",
                },
            ]);
            if (findFeeId.payFees === findFeeId.coursBalance) {
                console.log(chalk.bgRedBright(`\n Dear ${chalk.bold(findFeeId.name)}, You have paid the full fee of your ${chalk.bold(findFeeId.course)} course so you don't update your fee.\n`));
            }
            else {
                let payFees = updateFee.updateStudentFees;
                if (payFees > findFeeId.coursBalance ||
                    payFees < findFeeId.coursBalance) {
                    console.log(chalk.bgRedBright(`\n Dear ${chalk.bold(findFeeId.name)}, Your ${chalk.bold(findFeeId.course)} course fee is ${chalk.bold(findFeeId.coursBalance)} and you paid me ${chalk.bold(payFees)},So plz pay me valid fee.\n`));
                }
                else if (isNaN(updateFee.updateStudentFees)) {
                    payFees = 0;
                    console.log(chalk.bgRedBright(`\n Dear ${chalk.bold(findFeeId.name)}, Your ${chalk.bold(findFeeId.course)} course fee is ${chalk.bold(findFeeId.coursBalance)} and you paid me ${chalk.bold(payFees)},So plz pay me valid fee.\n`));
                }
                else {
                    findFeeId.payFees = payFees;
                }
                if (findFeeId.payFees === findFeeId.coursBalance) {
                    console.log(chalk.bgGreen(`\n Dear ${chalk.bold(chalk.bold(findFeeId.name))}, Thank You so much for pay full fee of your ${chalk.bold(chalk.bold(findFeeId.course))} course.\n`));
                }
            }
        }
        else {
            console.log(chalk.bgRedBright(`\n The ${chalk.bold(checkStudentId.checkId)} ID is not available.\n`));
        }
    }
}
if (!isCondition) {
    console.log(chalk.greenBright("\n\t#############################"));
    console.log(chalk.greenBright("\n\t# After Update Student Fee Status #"));
    console.log(chalk.greenBright("\n\t#############################\n"));
    ourStudents.showStudentsStatus();
}
isCondition = true;
while (isCondition) {
    let deleteStudent = await inquirer.prompt([
        { name: "confirmDelete", message: "Do you want to delete a Student", type: "confirm", default: false },
    ]);
    isCondition = deleteStudent.confirmDelete;
    if (isCondition) {
        let deleteStudId = await inquirer.prompt([
            { name: "deleteId", message: "Enter a ID for remove a Student", type: "string" },
        ]);
        let findDelteId = ourStudents.students.find((e) => e.id === deleteStudId.deleteId);
        if (findDelteId) {
            let removeStudent = ourStudents.students.filter((e) => {
                return e.id !== deleteStudId.deleteId;
            });
            ourStudents.students = removeStudent;
            let removeList = [];
            removeList.push(findDelteId);
            console.log(chalk.bgRed("\nList of the Removed Student"));
            removeList.forEach((e) => {
                console.log(chalk.bgRed(`\n${e.name} has been removed from the Student List\n`));
            });
        }
        else {
            console.log(chalk.bgRed(`\nThis ${deleteStudId.deleteId} is not available.\n`));
        }
        ;
    }
    if (ourStudents.students.length === 0) {
        break;
    }
}
if (ourStudents.students.length === 0) {
    console.log(chalk.bgRed('\nAll Student has been removed\n'));
}
else {
    console.log(chalk.greenBright("\n\t#############################"));
    console.log(chalk.greenBright("\n\t# After Remove a Student #"));
    console.log(chalk.greenBright("\n\t#############################\n"));
    ourStudents.showStudentsStatus();
}
