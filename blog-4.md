# How do the four pillars of OOP—Inheritance, Polymorphism, Abstraction, and Encapsulation—help manage logic and reduce complexity in large-scale TypeScript projects?

## Introduction

যখন একটি software project ছোট থাকে, তখন যেকোনো ভাবে code লিখলেও চলে। কিন্তু project বড় হওয়ার সাথে সাথে complexity বাড়ে — হাজারো lines of code, ডজনখানেক developer, পরিবর্তনশীল requirements। এই complexity সামলাতে **Object-Oriented Programming (OOP)** একটি proven পদ্ধতি।
 
OOP-এর চারটি মূল স্তম্ভ হলো:
1. **Encapsulation** — Data hide করা এবং সুরক্ষিত করা
2. **Inheritance** — Parent থেকে Child-এ বৈশিষ্ট পাওয়া
3. **Polymorphism** — একই method এর বিভিন্ন রুপ
4. **Abstraction** — অপ্রয়োজনীয় জিনিস সরিয়ে সরল interface দেওয়া
TypeScript এই চারটি pillar-কে `class`, `interface`, `abstract`, `private`, `protected` keywords দিয়ে সুন্দরভাবে implement করে। 
 
---

## Pillar 1: Inheritance

Inheritance হলো একটি class (child/subclass) অন্য একটি class (parent/superclass)-এর properties এবং methods পায়। এতে common code parent-এ একবার লেখা হয়, আর child class শুধু তার unique behavior add করে।

```typescript
// Parent class
class Employee {
  constructor(
    public name: string,
    protected salary: number
  ) 

  getDetails(): void {
    console.log(`Employee: ${this.name}`);
  }

  calculateSalary(): number {
    return this.salary;
  }
}

// Child class
class Manager extends Employee {
  constructor(
    name: string,
    salary: number,
    private bonus: number
  ) {
    super(name, salary);
  }

  calculateSalary(): number {
    return this.salary + this.bonus;
  }
}

class Developer extends Employee {
  constructor(
    name: string,
    salary: number,
    private projectBonus: number
  ) {
    super(name, salary);
  }

  calculateSalary(): number {
    return this.salary + this.projectBonus;
  }
}

const manager = new Manager("Karim", 80000, 20000);
const developer = new Developer("Rahim", 50000, 10000);

manager.getDetails();
console.log("Manager Salary:", manager.calculateSalary());

developer.getDetails();
console.log("Developer Salary:", developer.calculateSalary());   
```

---

## Pillar 2: Polymorphism

Polymorphism মানে "many forms" — একই method call ভিন্ন class-এ ভিন্ন behavior দেখায়। ফলে একই interface ব্যবহার করে বিভিন্ন কাজ করা যায়। কোড maintain করা সহজ হয়।

```typescript
// Parent class
class Animal {
  makeSound() {
    console.log("Animal makes a sound");
  }
}

// Child class 
class Dog extends Animal {
  makeSound() {
    console.log("Dog says: ghew ghew!");
  }
}

// Child class 
class Cat extends Animal {
  makeSound() {
    console.log("Cat says: Meow!");
  }
}

const cat = new Cat();
const dog = new Dog();
cat.makeSound();
dog.makeSound();
```

---

## Pillar 3: Abstraction

Abstraction মানে হচ্ছে কোড কি করে সেটা দেখানো এবং কিভাবে করে সেটা লুকানো। ফলে অন্য user / developer জানবে কি করতে হবে, কিন্তু ভিতরে কিভাবে কাজ হচ্ছে সেটা দেখবে না।
যেটা user কে অপ্রয়োজনীয় জিনিস না দেখিয়ে সহজ interface দেয়।

```typescript
// Abstraction using abstract class

// Idea
abstract class Vehicle {
  abstract start(): void;
  abstract stop(): void;
}

// Implementation
class Car extends Vehicle {
  start(): void {
    console.log("Car started");
  }

  stop(): void {
    console.log("Car stopped");
  }
}

class Bike extends Vehicle {
  start(): void {
    console.log("Bike started");
  }

  stop(): void {
    console.log("Bike stopped");
  }
}

// Create objects
const car = new Car();
car.start();

const bike = new Bike();
bike.stop();
```
 
---
 
## Pillar 4: Encapsulation

Encapsulation মানে হলো একটি ক্লাস এর ভিতরের ডাটা এবং implementation details বাইরে থেকে লুকিয়ে রাখা এবং শুধু নির্দিষ্ট public interface এর মাধ্যমে access দেওয়া।

TypeScript-এ এটি করা হয় `private`, `protected`, এবং `public` access modifiers দিয়ে।


```typescript
class UserAccount {
  public username: string;
  private password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  // Public method to change password
  changePassword(oldPassword: string, newPassword: string): void {
    if (this.password === oldPassword) {
      this.password = newPassword;
      console.log("Password changed successfully");
    } else {
      console.log("Wrong old password");
    }
  }

  // Public method to check password
  login(password: string): void {
    if (this.password === password) {
      console.log("Login successful");
    } else {
      console.log("Invalid password");
    }
  }
}

const user1 = new UserAccount("Rahim", "1234");

user1.login("1234"); 

user1.changePassword("1234", "5678");

user1.login("5678"); 
```

---
 
## Conclusion
 
OOP-এর চারটি pillar — Encapsulation, Inheritance, Polymorphism, এবং Abstraction — একসাথে কাজ করে large-scale TypeScript projects-এ **maintainability, scalability, এবং readability** নিশ্চিত করে।
 

 