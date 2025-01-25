/* :::::::::   guidelines how best to write a function   ::::::::: */

/*
1.  Define the problem:
    Before you start writing a function, clearly define the problem you're trying to solve.
    What is the function supposed to do? What inputs will it take, and what outputs will it produce?
2.  Identify the inputs and outputs:
    Determine what data the function will need to operate on (inputs) and what data it will produce (outputs).
    This will help you decide what parameters to pass to the function and what data to return.
3.  Break down the problem:
    Break down the problem into smaller, manageable tasks.
    This will help you identify the individual steps the function needs to perform.
4.  Choose a starting point:
    You don't always need to start by declaring a variable.
    You can start with a loop, a conditional statement, or even a function call. The key is to start with the most logical step that solves the problem.
5.  Use a top-down approach:
    Start with the high-level logic of the function and then drill down into the details.
    This will help you ensure that the function is well-structured and easy to understand.
6.  Keep it simple:
    Don't try to do too much in a single function.
    Keep the function focused on a specific task, and break it down into smaller functions if necessary.
7.  Use meaningful variable names:
    Choose variable names that clearly indicate what the variable represents.
    This will make your code easier to understand and maintain.
8.  Test and iterate:
    Test your function with different inputs and edge cases.
    Iterate on the function until it produces the desired output.

*/


/* :::::::::   guidelines how best to combine functions, call one inside another   ::::::::: */
/*
1.  Single Responsibility Principle (SRP):
    Each function should have a single responsibility and should not be responsible for multiple, unrelated tasks.
    This means that a function should do one thing and do it well.
2.  Separation of Concerns (SoC):
    Break down your code into smaller functions, each responsible for a specific concern or task.
    This makes your code more modular, reusable, and easier to maintain.
3.  Function Hierarchy:
    Think of your functions as a hierarchy, where higher-level functions call lower-level functions to perform specific tasks.
    This helps to organize your code and make it more readable.
4.  Data Flow:
    Consider the flow of data through your functions.
    Which functions need to access or modify specific data? This can help you decide which functions should call others.
5.  Readability and Maintainability:
    Consider how easy it is to read and understand your code.
    If a function is doing too much, it may be harder to understand and maintain.


*/


/* :::::::::   async function, what they do and how to call them    ::::::::: */
/*
Async Function Basics

When you call an async function, it returns a Promise. A Promise is a special type of object that represents a value that may not be available yet, but will be resolved at some point in the future.


Using 'await' or 'then':

When you use await or then with an async function, you're essentially telling the code to wait for the Promise to resolve before continuing execution.

await is used within an async function to pause execution until the Promise is resolved. It's a more concise way to write asynchronous code.
then is a method that's called on a Promise when it's resolved. It's used to specify a callback function that will be executed when the Promise is resolved.
What happens when you don't use 'await' or 'then'?

If you don't use await or then when calling an async function, the code will continue executing without waiting for the Promise to resolve. This can lead to unexpected behavior, as the code may try to use the result of the async function before it's available.

In this case, the async function will still execute, but the code will not wait for it to complete. Instead, it will continue executing the next line of code, potentially leading to errors or unexpected behavior.

Calling an async function without 'await' or 'then'

If you want to call an async function without using await or then, you can simply assign the result of the async function to a variable. However, keep in mind that the variable will hold a Promise, not the actual result of the async function.

Here's an example:


:::::   javascript start

const result = myAsyncFunction();
console.log(result); // Output: Promise { <pending> }

:::::   javascript end


In this case, result is a Promise that will be resolved at some point in the future. If you try to use result as if it were the actual result of the async function, you may get unexpected behavior.

When to call an async function without 'await' or 'then'

There are some cases where you might want to call an async function without using await or then. For example:

When you're using a library that expects a Promise to be returned, but you don't need to wait for the result.
When you're using a framework that handles Promises automatically, such as React or Angular.
When you're writing a test and want to verify that an async function returns a Promise.
In general, however, it's a good practice to use await or then when calling an async function to ensure that your code waits for the result before continuing execution.


Best Practices

Always use await or then when calling an async function, unless you have a specific reason not to.
Make sure to handle errors properly when using await or then.
Use try-catch blocks to catch any errors that may occur when calling an async function.
Consider using async-await syntax instead of then for more concise and readable code.


*/