import { log } from "console";
import inquirer from "inquirer";

class Student {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
}

class Person {
  students: Student[] = [];

  addStudent(obj: Student) {
    this.students.push(obj);
  }

  listStudents() {
    return this.students.map(student => student.name).join(", ");
  }
}

const persons = new Person();

const programStart = async (person: Person) => {
  console.log("Welcome!");

  const ans = await inquirer.prompt({
    name: "Select",
    type: "list",
    message: "What do you want to do?",
    choices: ["staff", "student", "exit"]
  });

  if (ans.Select === "staff") {
    console.log("Welcome staff!");
  } else if (ans.Select === "student") {
    const studentAction = await inquirer.prompt({
      name: "Action",
      type: "list",
      message: "Do you want to view existing students or add a new student?",
      choices: ["View existing students", "Add new student"]
    });

    if (studentAction.Action === "View existing students") {
      if (person.students.length === 0) {
        console.log("No students found.");
      } else {
        console.log(`Current students: ${person.listStudents()}`);
      }
    } else if (studentAction.Action === "Add new student") {
      const studentAns = await inquirer.prompt({
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
      } else {
        console.log(`Hello, I am ${student.name}. Nice to meet you!`);
        console.log(`Existing student list: ${persons.listStudents()}`);
      }
    }
  } else if (ans.Select === "exit") {
    console.log("Exiting the program...");
  }
};

programStart(persons);
