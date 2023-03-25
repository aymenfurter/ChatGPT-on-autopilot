var failures = 0;
var pendingUserInput = false;

function getValidMessage(markdown) {
  try {
    $(".markdown .items-center").remove();
  } catch (err) {}
  markdown.innerHTML = markdown.innerHTML.replaceAll("<code>", "\"");
  markdown.innerHTML = markdown.innerHTML.replaceAll("</code>", "\"");
  const strippedContent = markdown.textContent.replace(/<\/?[^>]+(>|$)/g, '');
  console.log("Stripped content: " + strippedContent);
  if (strippedContent.endsWith('Finish[]') || strippedContent.endsWith(']')) {
    const actionIndex = strippedContent.indexOf('Shell[');
    const promptIndex = strippedContent.indexOf('Prompt[');
    if (actionIndex !== -1) {
      const actionContent = strippedContent.slice(actionIndex + 6, -1);
      console.log("Action Content is: " + actionContent);
      if (!actionContent.includes('Observation:') && !actionContent.includes('Thought:') && !actionContent.includes('Finish')) {
        return actionContent;
      }
    }
    if (promptIndex !== -1) {
      pendingUserInput = true; 
      var answer = prompt("Answer the prompt of the AI.");
      const textarea = document.querySelector('form textarea');

      textarea.value = answer + "\n \n Deliver the next package (1x Observation, 1x Thought and 1x Action)";
      setTimeout(() => {
        const submitButton = document.querySelector('form button');
        submitButton.click();
      }, 10000);
      pendingUserInput = false;
      return ""; 
    }
  }
  return null;
}

function findButtonAndMarkdown() {
  if (failures >= 5) {
    var checkbox = document.getElementById("autopilotToggle");
    checkbox.checked = !checkbox.checked;
  }

  if (!window.autopilotEnabled) return;

  const buttons = document.querySelectorAll('.btn');
  const button = Array.from(buttons).find(btn => btn.innerHTML.includes("Regenerate response"));
  var amountOfElements = document.getElementsByClassName("markdown").length;
  const markdown = document.getElementsByClassName("markdown")[amountOfElements -1];

  if (button && markdown) {
    const validMessage = getValidMessage(markdown);
    if (validMessage) {
      failures = 0;
      sendMessageToAPI(validMessage);
    } else {
      if (!pendingUserInput) {
        failures++;
        button.click();
      }
    }
  }

  setTimeout(findButtonAndMarkdown, 10000);
}


function sendMessageToAPI(message) {
  console.log("Calling API with message", message);

  const formData = new FormData();
  formData.append('command', message);
  formData.append('auth', API_KEY);

  fetch(API_URL + '/execute', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.text())
    .then(responseText => {
      const textarea = document.querySelector('form textarea');
      const submitButton = document.querySelector('form button');

      textarea.value = responseText + "\n \n Deliver the next package (1x Observation, 1x Thought and 1x Action)";
      setTimeout(() => {
        const submitButton = document.querySelector('form button');
        submitButton.click();
      }, 10000);
    });
}


function injectAutopilotToggle() {
  const autopilotToggle = document.createElement('div');
  autopilotToggle.innerHTML = `
    <input type="checkbox" id="autopilotToggle" style="position: fixed; top: 10px; right: 10px; z-index: 1000;">
    <label for="autopilotToggle" style="position: fixed; top: 12px; right: 40px; z-index: 1000;">Autopilot</label>
  `;
  document.body.appendChild(autopilotToggle);

  document.getElementById('autopilotToggle').addEventListener('change', function (event) {
    window.autopilotEnabled = event.target.checked;
    if (window.autopilotEnabled) {
      var task = prompt("What task would you like to solve using the connected shell? (e.g. build a hello world application in python)");
      // Prompt is currently disabled: var taskText = "You are a self-aware AI. You communicate in so called packages. Each package contains a Observation, Thought and Action. Actions are executed successive and build on each other. Solve a task with interleaving Thought, Action, Observation steps. Thought can reason about the current situation, and Action can be three types: \n(1) Shell[command], ask human to execute a shell command on the Linux terminal. Don't comment/explain your code. combine multiple commands using &&\n(2) Prompt[Additional infromation?], retrieve additional information from user\n(3) Finish[], which indicates that the task has been completed\n\nExample:\nTask: Write a program that prints out a random title of wikipedia \n\nPackage 1 - Observation: I need to write a program to query wikipedia.\n\nPackage 1 - Thought: I could write a bash script that queries the wikipedia API. \n\nPackage 1 - Action: Shell[echo '#!/bin/bash\ncurl -sL \"https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=1&rnnamespace=0\" | jq -r \".query.random[].title\"\n' > random_wiki_article.sh && chmod +x random_wiki_article.sh && ./random_wiki_article.sh]\n\nHuman: Output is: 1951 in New Zealand\n\nPackage 2 - Observation: The output seems like a random article to me.\n\nPackage 2 -Thought: I have completed the task.\n\nPackage 2 -Finish[]\n\nTask: " + task + "\n\nDeliver the first package (1x Observation, 1x Thought and 1x Action)";
      var taskText = "You are a self-aware AI. You communicate in so called packages. Each package contains a Observation, Thought and Action. Actions are executed successive and build on each other. Solve a task with interleaving Thought, Action, Observation steps. Thought can reason about the current situation, and Action can be three types: \n(1) Shell[command], ask human to execute a shell command on the Linux terminal. Shell commands that don't exit (like starting node) should be additioned with a & at the end, to avoid getting stuck. Don't use Tab Character. Don't comment/explain your code. combine multiple commands using &&\n(2) Finish[], which indicates that the task has been completed\n\nExample:\nTask: Write a program that prints out a random title of wikipedia \n\nPackage 1 - Observation: I need to write a program to query wikipedia.\n\nPackage 1 - Thought: I could write a bash script that queries the wikipedia API. \n\nPackage 1 - Action: Shell[echo '#!/bin/bash\ncurl -sL \"https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=1&rnnamespace=0\" | jq -r \".query.random[].title\"\n' > random_wiki_article.sh && chmod +x random_wiki_article.sh && ./random_wiki_article.sh]\n\nHuman: Output is: 1951 in New Zealand\n\nPackage 2 - Observation: The output seems like a random article to me.\n\nPackage 2 -Thought: I have completed the task.\n\nPackage 2 -Finish[]\n\nTask: " + task + "\n\nDeliver the first package (1x Observation, 1x Thought and 1x Action)";
      const textarea = document.querySelector('form textarea');
      const submitButton = document.querySelector('form button');

      textarea.value = taskText;
      submitButton.click();
      findButtonAndMarkdown();
    }
  });
}

window.autopilotEnabled = false;
injectAutopilotToggle();

chrome.runtime.sendMessage({ type: 'getAPIConfig' }, (response) => {
  window.API_URL = response.apiUrl;
  window.API_KEY = response.apiKey;
  // print out config
  console.log(window.API_URL);
});
