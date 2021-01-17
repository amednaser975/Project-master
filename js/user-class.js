function User(first_name, last_name, age, email, password) {
    Object.defineProperty(this, "first_name", {
        value: first_name,
        enumerable: false,
        configurable: false,
        writable: false
    });
    Object.defineProperty(this, "last_name", {
        value: last_name,
        enumerable: false,
        configurable: false,
        writable: false
    });
    Object.defineProperty(this, "age", {
        value: age,
        enumerable: false,
        configurable: false,
        writable: false
    });
    Object.defineProperty(this, "email", {
        value: email,
        enumerable: false,
        configurable: false,
        writable: false
    });
    Object.defineProperty(this, "password", {
        value: password,
        enumerable: false,
        configurable: false,
        writable: false
    });
}