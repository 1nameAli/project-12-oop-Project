"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
class Student {
    constructor(n) {
        this.name = n;
    }
}
class Person {
    constructor() {
        this.students = [];
    }
    addStudent(obj) {
        this.students.push(obj);
    }
    listStudents() {
        return this.students.map(student => student.name).join(", ");
    }
}
const persons = new Person();
const programStart = (person) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Welcome!");
    const ans = yield inquirer_1.default.prompt({
        name: "Select",
        type: "list",
        message: "What do you want to do?",
        choices: ["staff", "student", "exit"]
    });
    if (ans.Select === "staff") {
        console.log("Welcome staff!");
    }
    else if (ans.Select === "student") {
        const studentAction = yield inquirer_1.default.prompt({
            name: "Action",
            type: "list",
            message: "Do you want to view existing students or add a new student?",
            choices: ["View existing students", "Add new student"]
        });
        if (studentAction.Action === "View existing students") {
            if (person.students.length === 0) {
                console.log("No students found.");
            }
            else {
                console.log(`Current students: ${person.listStudents()}`);
            }
        }
        else if (studentAction.Action === "Add new student") {
            const studentAns = yield inquirer_1.default.prompt({
                name: "student",
                type: "input",
                message: "Enter student's name:"
            });
            const student = person.students.find(val => val.name === studentAns.student);
            if (!student) {
                const newStudent = new Student(studentAns.student);
                persons.addStudent(newStudent);
                console.log(`Hello, I am ${newStudent.name}. Nice to meet you!`);
                console.log(`New student added.`);
                console.log(`Current student list: ${persons.listStudents()}`);
            }
            else {
                console.log(`Hello, I am ${student.name}. Nice to meet you!`);
                console.log(`Existing student list: ${persons.listStudents()}`);
            }
        }
    }
    else if (ans.Select === "exit") {
        console.log("Exiting the program...");
    }
});
programStart(persons);
