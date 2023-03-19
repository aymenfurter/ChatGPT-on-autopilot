# ChatGPT - Full Self Coding

Handing a shell to ChatGPT - What could possible go wrong? ChatGPT is able to autonomously and iteratively work on a problem statement using a Linux shell.

This repository includes both the server-side code (written in Python) and the Chrome extension (to enable ChatGPT's autopilot mode).

## Example run

Input:
```
Task: build a cli-based todo app in node. Install components on the shell as needed.
```

ChatGPT:
```
Package 1 - Observation: I need to create a command-line todo app using Node.js.

Package 1 - Thought: I should first check if Node.js is installed and install necessary dependencies.

Package 1 - Action: Shell[node -v || curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash - && sudo apt-get install -y nodejs && npm init -y && npm install --save yargs]
```

Shell output:
```
v14.21.3
Reading package lists...
Building dependency tree...
Reading state information...
nodejs is already the newest version (14.21.3-deb-1nodesource1).
0 upgraded, 0 newly installed, 0 to remove and 8 not upgraded.
Wrote to /tmp/package.json:

{
  "name": "tmp",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "yargs": "^17.7.1"
  },
  "devDependencies": {},
  "description": ""
}


npm WARN tmp@1.0.0 No description
npm WARN tmp@1.0.0 No repository field.

+ yargs@17.7.1
updated 1 package and audited 16 packages in 0.453s
found 0 vulnerabilities

```

ChatGPT:
```
Package 2 - Observation: Node.js is installed, and the yargs package has been added.

Package 2 - Thought: I need to create the main JavaScript file for the todo app and implement the basic commands.

Package 2 - Action: Shell[echo 'const yargs = require("yargs");

yargs.command("add", "Add a new task", {}, argv => {
console.log(Task added: ${argv.task});
});

yargs.command("list", "List all tasks", {}, () => {
console.log("Listing all tasks");
});

yargs.command("delete", "Delete a task", {}, argv => {
console.log(Task deleted: ${argv.task});
});

yargs.parse();
' > todo.js && node todo.js list]
```

Shell output:
```
Listing all tasks
```

ChatGPT:
```
Package 3 - Observation: The basic structure of the todo app has been created, and the "list" command is working.

Package 3 - Thought: Now, I need to implement actual functionality for adding, listing, and deleting tasks by storing them in a file.

Package 3 - Action: Shell[echo 'const fs = require("fs");
const yargs = require("yargs");

const loadTasks = () => {
try {
const dataBuffer = fs.readFileSync("tasks.json");
const dataJSON = dataBuffer.toString();
return JSON.parse(dataJSON);
} catch (error) {
return [];
}
};

const saveTasks = tasks => {
const dataJSON = JSON.stringify(tasks);
fs.writeFileSync("tasks.json", dataJSON);
};

yargs.command("add", "Add a new task", {
task: {
describe: "Task description",
demandOption: true,
type: "string"
}
}, argv => {
const tasks = loadTasks();
tasks.push({ task: argv.task });
saveTasks(tasks);
console.log(Task added: ${argv.task});
});

yargs.command("list", "List all tasks", {}, () => {
const tasks = loadTasks();
tasks.forEach(task => {
console.log(task.task);
});
});

yargs.command("delete", "Delete a task", {
task: {
describe: "Task description",
demandOption: true,
type: "string"
}
}, argv => {
const tasks = loadTasks();
const remainingTasks = tasks.filter(task => task.task !== argv.task);
saveTasks(remainingTasks);
console.log(Task deleted: ${argv.task});
});

yargs.parse();
' > todo.js && node todo.js add --task="Sample task" && node todo.js list && node todo.js delete --task="Sample task" && node todo.js list]
```

Shell output:
```
Task added: Sample task
Sample task
Task deleted: Sample task
 ```
