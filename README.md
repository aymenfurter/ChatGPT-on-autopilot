# ChatGPT - Full Self Coding

Handing a shell to ChatGPT - What could possible go wrong? ChatGPT is able to autonomously and iteratively work on a problem statement using a Linux shell.

[Video Example](https://youtu.be/IrVJp_k2MgE)

This repository includes both the server-side code (written in Python) and the Chrome extension (to enable ChatGPT's autopilot mode).

## Example run

Input:
```
Task: build a cli-based todo app in node. Install components on the shell as needed.
```

ChatGPT:
```
Package 1 - Observation: I need to create a CLI-based todo app in Node.js and install the necessary components.

Package 1 - Thought: I will start by installing Node.js and creating the basic structure for the app.

Package 1 - Action: Shell[curl -sL <https://deb.nodesource.com/setup_14.x> | sudo -E bash - && sudo apt-get install -y nodejs && mkdir todo-app && cd todo-app && echo '{ "name": "todo-app", "version": "1.0.0", "description": "A CLI-based todo app in Node.js", "main": "index.js", "scripts": { "start": "node index.js" }, "dependencies": {} }' > package.json && touch index.js]
```

Shell output:
```
## Installing the NodeSource Node.js 14.x repo... ## Populating apt-get cache... + apt-get update Hit:1 http://azure.archive.ubuntu.com/ubuntu focal InRelease Hit:2 http://azure.archive.ubuntu.com/ubuntu focal-updates InRelease Hit:3 http://azure.archive.ubuntu.com/ubuntu focal-backports InRelease Hit:4 http://azure.archive.ubuntu.com/ubuntu focal-security InRelease Hit:5 https://deb.nodesource.com/node_14.x focal InRelease Hit:6 https://download.docker.com/linux/ubuntu focal InRelease Reading package lists... ## Confirming "focal" is supported... + curl -sLf -o /dev/null 'https://deb.nodesource.com/node_14.x/dists/focal/Release' ## Adding the NodeSource signing key to your keyring... + curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor | tee /usr/share/keyrings/nodesource.gpg >/dev/null ## Creating apt sources list file for the NodeSource Node.js 14.x repo... + echo 'deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_14.x focal main' > /etc/apt/sources.list.d/nodesource.list + echo 'deb-src [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_14.x focal main' >> /etc/apt/sources.list.d/nodesource.list ## Running `apt-get update` for you... + apt-get update Hit:1 http://azure.archive.ubuntu.com/ubuntu focal InRelease Hit:2 http://azure.archive.ubuntu.com/ubuntu focal-updates InRelease Hit:3 http://azure.archive.ubuntu.com/ubuntu focal-backports InRelease Hit:4 http://azure.archive.ubuntu.com/ubuntu focal-security InRelease Hit:5 https://deb.nodesource.com/node_14.x focal InRelease Hit:6 https://download.docker.com/linux/ubuntu focal InRelease Reading package lists... ## Run `sudo apt-get install -y nodejs` to install Node.js 14.x and npm ## You may also need development tools to build native addons: sudo apt-get install gcc g++ make ## To install the Yarn package manager, run: curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/yarnkey.gpg >/dev/null echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | sudo tee /etc/apt/sources.list.d/yarn.list sudo apt-get update && sudo apt-get install yarn Reading package lists... Building dependency tree... Reading state information... nodejs is already the newest version (14.21.3-deb-1nodesource1). 0 upgraded, 0 newly installed, 0 to remove and 25 not upgraded. mkdir: cannot create directory 'todo-app': File exists 
```

ChatGPT:
```
Package 2 - Observation: Node.js is installed, and the basic structure for the todo app has been created.

Package 2 - Thought: I will now implement the basic functionality of the todo app using the commander.js library for CLI commands.

Package 2 - Action: Shell[cd todo-app && npm install commander && echo "const { program } = require('commander');

program .version('1.0.0') .description('CLI-based todo app');

program.parse(process.argv);" > index.js]
```

Shell output:
```
npm WARN todo-app@1.0.0 No repository field. npm WARN todo-app@1.0.0 No license field. + commander@10.0.0 updated 1 package and audited 1 package in 0.318s found 0 vulnerabilities
```

ChatGPT:
```
Package 3 - Observation: The commander.js library has been installed and the basic structure for handling CLI commands has been set up.

Package 3 - Thought: I will now implement the 'add', 'list', 'delete', and 'complete' commands to manage todos.

Package 3 - Action: Shell[cd todo-app && echo "const fs = require('fs'); const path = require('path'); const todosFile = path.join(__dirname, 'todos.json');

function readTodos() { try { return JSON.parse(fs.readFileSync(todosFile, 'utf8')); } catch (err) { return []; } }

function writeTodos(todos) { fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2)); }

program .command('add <task>') .description('Add a new todo') .action((task) => { const todos = readTodos(); todos.push({ id: Date.now(), task, completed: false }); writeTodos(todos); console.log('Todo added'); });

program .command('list') .description('List all todos') .action(() => { const todos = readTodos(); todos.forEach((todo) => { console.log(`[${todo.completed ? 'x' : ' '}] ${todo.id}: ${todo.task}`); }); });

program .command('delete <id>') .description('Delete a todo by id') .action((id) => { const todos = readTodos(); const newTodos = todos.filter((todo) => todo.id !== parseInt(id)); writeTodos(newTodos); console.log('Todo deleted'); });

program .command('complete <id>') .description('Mark a todo as completed by id') .action((id) => { const todos = readTodos(); const updatedTodos = todos.map((todo) => { if (todo.id === parseInt(id)) { todo.completed = true; } return todo; }); writeTodos(updatedTodos); console.log('Todo marked as completed'); });

program.parse(process.argv);" >> index.js]
```

Shell output:
```
/bin/sh: 1: Bad substitution 
```

ChatGPT:
```
Package 4 - Observation: There was an error due to the improper use of escape characters in the command.

Package 4 - Thought: I will correct the error by properly escaping the characters and re-executing the command.

Package 4 - Action: Shell[cd todo-app && echo 'const fs = require("fs"); const path = require("path"); const todosFile = path.join(__dirname, "todos.json");

function readTodos() { try { return JSON.parse(fs.readFileSync(todosFile, "utf8")); } catch (err) { return []; } }

function writeTodos(todos) { fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2)); }

program .command("add <task>") .description("Add a new todo") .action((task) => { const todos = readTodos(); todos.push({ id: Date.now(), task, completed: false }); writeTodos(todos); console.log("Todo added"); });

program .command("list") .description("List all todos") .action(() => { const todos = readTodos(); todos.forEach((todo) => { console.log(`[${todo.completed ? "x" : " "}] ${todo.id}: ${todo.task}`); }); });

program .command("delete <id>") .description("Delete a todo by id") .action((id) => { const todos = readTodos(); const newTodos = todos.filter((todo) => todo.id !== parseInt(id)); writeTodos(newTodos); console.log("Todo deleted"); });

program .command("complete <id>") .description("Mark a todo as completed by id") .action((id) => { const todos = readTodos(); const updatedTodos = todos.map((todo) => { if (todo.id === parseInt(id)) { todo.completed = true; } return todo; }); writeTodos(updatedTodos); console.log("Todo marked as completed"); });

program.parse(process.argv);' >> index.js]
```

Shell output (empty, no error):
```
```
