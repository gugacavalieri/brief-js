# brief-js [![Build Status](https://travis-ci.org/gugacavalieri/brief-js.svg?branch=master)](https://travis-ci.org/gugacavalieri/brief-js)
Brief is a validation tool that can help you assert your http web service migrations.


# How to use it

1. First install it using `npm`:
```bash
npm install -g @gugacavalieri/brief-js
```

2. Create a config file (you can pass http headers if you like):
```json
{
    "domains": {
        "new": "https://jsonplaceholder.typicode.com",
        "old": "https://jsonplaceholder.typicode.com"
    },
    "http": {
        "timeout": 10000,
        "headers": {
            "Authorization": "Bearer ..."
        }
    },
    "endpoints": [
        { "method": "get", "url": "todos/1" }
    ]
}
```

3. Run it!
```bash
brief-js --config config.json
```

It should print response codes as well as different outputs in the endpoints that you defined in the config file.


# Future improvements:
* [ ] Replace axios
* [ ] Create log levels
* [ ] Improve tests (stryker)