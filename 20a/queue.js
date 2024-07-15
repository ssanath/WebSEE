class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(item) {
        this.queue.push(item);
    }

    dequeue() {
        if(this.isEmpty()) {
            return "Queue underflow";
        }

        return this.queue.shift();
    }

    front() {
        if(this.isEmpty()) {
            return "Queue underflow";
        }

        return this.queue[0];
    }

    isEmpty() {
        if(this.queue.length == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    size() {
        return this.queue.length;
    }

    printQueue() {
        return this.queue.join(" ");
    }
}

module.exports = Queue;