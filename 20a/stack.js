class Stack {
    constructor() {
        this.stack = [];
    }

    push(item) {
        this.stack.push(item);
    }

    pop() {
        if(this.isEmpty()) {
            return "Stack underflow";
        }

        return this.stack.pop();
    }

    peek() {
        if(this.isEmpty()) {
            return "Stack underflow";
        }

        return this.stack[this.stack.length - 1];
    }

    isEmpty() {
        if(this.stack.length == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    size() {
        return this.stack.length;
    }

    printStack() {
        return this.stack.join(" ");
    }
}

module.exports = Stack;