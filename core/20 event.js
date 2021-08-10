/*
Event Emitter for GASLibv3
Simple source, simple to learn
and simple to use :-)

Hasanudin H Syafaat
7 Agustus 2021
@botindonesia
*/

class EventEmitter {
    constructor() {
        this.observers = {};
    }

    on(events, ...listeners) {
        return listeners.forEach(listener => this.addListener(events, listener));
    }

    once(event, listener) {
        const onceEvent = (...args) => {
            listener(...args);
            this.off(event, onceEvent);
        }
        return this.addListener(event, onceEvent);
    }

    addListener(events, listener) {
        if (!Array.isArray(events)) events = [events];
        events.forEach(event => {
            this.observers[event] = this.observers[event] || [];
            this.observers[event].push(listener);
        });

        return this;
    }

    listenerCount(event) {
        if (!this.observers[event]) return 0;
        return this.observers[event].length;
    }

    off(event, listener) {
        if (!this.observers[event]) return;
        if (!listener) {
            delete this.observers[event];
            return;
        }

        this.observers[event] = this.observers[event].filter(l => l !== listener);
    }

    emit(events, ...args) {
        if (!Array.isArray(events)) events = [events];
        events.forEach(event => {
            if (this.observers[event]) {
                const cloned = [].concat(this.observers[event]);
                cloned.forEach(observer => {
                    observer(...args);
                });
            }
        });

        if (this.observers['*']) {
            const cloned = [].concat(this.observers['*']);
            cloned.forEach(observer => {
                observer.apply(observer, [[...events], ...args]);
            });
        }
    }
}