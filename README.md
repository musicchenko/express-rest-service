# Install

First of all you need to install all dependencies

```npm install```

Next you can run application from root directory

```npm start```

Now you can make queries to the local server. I used Postman for testing

Use for create:
```
http://localhost:4000/users
http://localhost:4000/boards
http://localhost:4000/tasks
```
# Examples
For post query:
```
http://localhost:4000/*name*?*key1*=*value1*
```
or just
```
http://localhost:4000/*name*
```
For put parameters:
```
http://localhost:4000/*name*/*id*?*key1*=*value1*&*key2*=*value2*
```
For delete: 
```
http://localhost:4000/*name*/*id*
```
For get:
```
http://localhost:4000/*name*/*id*
```
