# How do Pick and Omit utility types prevent code duplication while creating specialized "slices" of a master interface? Discuss how this keeps your code DRY (Don't Repeat Yourself).

## Introduction

বড় TypeScript project-এ একটি common সমস্যা হলো **code duplication** — একই interface-এর বিভিন্ন "version" বার বার define করা। যেমন আমাদের কাছে যদি একটি `User` interface থাকে যেখানে ২০টি field আছে। এখন আমাদের দরকার:
- Registration form-এর জন্য শুধু কিছু field
- Public profile-এর জন্য password ছাড়া বাকি field
- Admin panel-এর জন্য আলাদা set
প্রতিটির জন্য নতুন interface লিখলে **DRY (Don't Repeat Yourself)** principle ভঙ্গ হয়। TypeScript-এর `Pick` এবং `Omit` utility types এই সমস্যার সমাধান করে।

---

প্রথমে একটা উদাহারন দেখা যাক যে `Pick` এবং `Omit` ছাড়া কি ধরনের প্রবলেম হয়- 

```typescript
// This is a user interface where all information is stored.
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: Date;
  address: string;
  role: "admin" | "user" | "moderator";
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  profilePicture: string;
}
 
// যদি আমরা এইভাবে UserRegistrationForm বানাতে চাই তাহলে আমাদের এই information গুলোর একটা কপি বানাতে হচ্ছে।
interface UserRegistrationForm {
  firstName: string;    
  lastName: string;     
  email: string;        
  password: string;     
  phoneNumber: string;  
}
 
// আরও duplication
interface PublicProfile {
  id: number;          
  firstName: string;    
  lastName: string;     
  profilePicture: string; 
  isVerified: boolean;  
}
```

এইভাবে যদি একটা প্রজেক্ট করা হয় তাহলে যখন `User` interface এ কোনোকিছু পরিবর্তন হয় , তাহলে সব duplicate interface এও manually update করতে হবে, যেটা maintain করা কঠিন।

---

### `Pick` কীভাবে কাজ করে?

`Pick<Type, Keys>` ব্যবহার করে একটি existing type থেকে শুধু নির্দিষ্ট কিছু property যেগুলো আমাদের প্রয়োজন শুধু সেগুলো নিয়ে নতুন type তৈরি করা যায়।
 
**Syntax:** `Pick<OriginalType, "key1" | "key2" | "key3">`
 
```typescript
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: Date;
  address: string;
  role: "admin" | "user" | "moderator";
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  profilePicture: string;
}
 
// Pick দিয়ে Registration form-এর type তৈরি
type UserRegistrationForm = Pick<User, "firstName" | "lastName" | "email" | "password" | "phoneNumber">;
 
```
It's equivalent to:
```typescript
{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}
```
 
```typescript
// Public profile-এর জন্য
type PublicProfile = Pick<User, "id" | "firstName" | "lastName" | "profilePicture" | "isVerified">;
 
// Login form-এর জন্য
type LoginCredentials = Pick<User, "email" | "password">;
```
---

### `Omit` কীভাবে কাজ করে?
 
`Omit<Type, Keys>` একটি existing type থেকে নির্দিষ্ট property **বাদ দিয়ে** নতুন type তৈরি করে।
 
**Syntax:** `Omit<OriginalType, "key1" | "key2">`
 
যখন বেশিরভাগ property দরকার কিন্তু কয়েকটি বাদ দিতে হবে, তখন `Pick` এর চেয়ে `Omit` বেশি সুবিধা দেয়:
 
```typescript
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;     
  phoneNumber: string;
  dateOfBirth: Date;
  address: string;
  role: "admin" | "user" | "moderator";
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  profilePicture: string;
}
 
// Public-এ দেখানোর জন্য password এবং sensitive info বাদ দিয়ে একটা type তৈরি করা যায়।
type PublicUser = Omit<User, "password" | "address">;
 
// Update করার সময় id, createdAt পরিবর্তন করা যাবে না
type UserUpdatePayload = Omit<User, "id" | "createdAt" | "role">;

```

## Conclusion
 
`Pick` এবং `Omit` হলো TypeScript-এর দুটি অত্যন্ত শক্তিশালী utility type যা **DRY principle** বজায় রেখে flexible type system তৈরি করতে সাহায্য করে।
 
একটি **Main Interface** তৈরি করে যেখানে সব properties রেখে, তারপর বিভিন্ন context-এর জন্য `Pick` বা `Omit` দিয়ে specialized "slices" তৈরি হয়। এতে:
 
1. **Maintenance সহজ হয়** — একটি জায়গায় পরিবর্তন করলে সব কিছু update হয়
2. **Bug কমে** — Type system নিজেই wrong data prevent করে
3. **Code readable হয়** — প্রতিটি type-এর নাম তার purpose বলে দেয়
