const Stack = require("./stack");
const Queue = require("./queue");

const stack = new Stack();
const queue = new Queue();

console.log("Stack operations");
stack.push(36)
stack.push(10)
stack.push(89)
console.log("Stack items: ", stack.printStack());
console.log("Popped item: ", stack.pop());
console.log("Top of the stack: ", stack.peek());
console.log("Stack size: ", stack.size());
console.log("Stack items: ", stack.printStack());

console.log("Queue operations");
queue.enqueue(36)
queue.enqueue(10)
queue.enqueue(89)
console.log("Queue items: ", queue.printQueue());
console.log("Deleted item: ", queue.dequeue());
console.log("Front of the queue: ", queue.front());
console.log("Queue size: ", queue.size());
console.log("Queue items: ", queue.printQueue());