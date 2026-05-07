// Problem - 1 (solution)
function filterEvenNumbers( numbers: number[] ): number[] {
    return numbers.filter(num => num % 2 === 0);
}

// Problem - 2 (solution)
function reverseString(input: string): string {
    return input.split("").reverse().join("");
}

// Problem - 3 (solution)
type StringOrNumber = string | number;
function checkType ( input: StringOrNumber ): string {
    if(typeof input === "string") {
        return "String";
    } else {
        return "Number";
    }
}

// Problem - 4 (solution) 
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// Problem - 5 (solution)
interface Book {
    title: string;
    author: string;
    publishedYear: number;
}
function toggleReadStatus (book: Book): Book & { isRead: boolean } {
    return {
        ...book,
        isRead: true,
    };
}

// Problem - 6 ( solution )
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Student extends Person {
  grade: string;

  constructor(name: string, age: number, grade: string) {
    super(name, age); 
    this.grade = grade;
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}

// Problem - 7 (solution)
function getIntersection(arr1: number[], arr2: number[]): number[] {
  return arr1.filter(item => arr2.includes(item));
}

