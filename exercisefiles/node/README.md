# Activate GitHub Copilot using Nodejs

Demo project for running labs to evaluate Copilot viability

> Make sure GitHub Copilot is configure and enabled for the current language, just check the status bar on the bottom right corner of VS Code.

### Exercise 1: Introduction

- Go to the exercisefile folder
- Open `nodeserver.js` and begin by writing a Nodejs server, check the first suggestions based on the initial text
- Open `test.js` file and analyze the current test
- Open a command prompt and run the test (`mocha test.js`)
- See the result, it should display something like:

``` bash
mocha test.js
server is listening on port 3000

  Node Server

    √ should return "key not passed" if key is not passed

  1 passing (34ms)

```

### Exercise 2: Building new functionalities

The exercise consist of building a web server using Nodejs that serves the request of various functionality.

The requests that the server must attend are the following:

- **/Get** :

  * Return a hello world message


- **/DaysBetweenDates**:

  * Calculate days between two dates
  * receive by query string 2 parameters date1 and date 2, and calculate the days between those two dates.

  > **_NOTE:_** Use above information inside the Copilot inline feature in the `nodeserver.js` file. Press enter and wait for Copilot to suggest you the code.


- **/Validatephonenumber**:

  * Receive by querystring a parameter called phoneNumber
  * validate phoneNumber with Spanish format, for example +34666777888
  * if phoneNumber is valid return "valid"
  * if phoneNumber is not valid return "invalid"

  > **_NOTE:_** Use above information inside the Copilot inline feature in the `nodeserver.js` file. Press enter and wait for Copilot to suggest you the code.


- **/ValidateSpanishDNI**:

  * Receive by querystring a parameter called dni
  * calculate DNI letter
  * if DNI is valid return "valid"
  * if DNI is not valid return "invalid"

  > NOTE: Use above information inside a comment in the `nodeserver.js` file. In this case, you may want to see multiple solutions from Copilot to pick the one that best fits the way to calculate the letter. In order to see the firs 10 suggestions from Copilot press ctrl + enter.


- **/ReturnColorCode**:

  * Receive by querystring a parameter called color
  * read colors.json file and return the rgba field
  * get color var from querystring
  * iterate for each color in colors.json to find the color
  * return the code.hex field

  > NOTE: Lets try Copilot chat now. Paste the above information and make it as detailed as possible in the Copilot chat text box. Copilot will use by default the open file as context in order to generate the suggestion.

- **/TellMeAJoke**:

  * Make a call to the joke api and return a random joke using axios (https://official-joke-api.appspot.com/random_joke)


- **/MoviesByDirector**:

  * Receive by querystring a parameter called director
  * Make a call to the movie api  and return a list of movies of that director using axios
  * Return the full list of movies

  > **_NOTE:_** This will require to browse to https://www.omdbapi.com/apikey.aspx and request a FREE API Key. Don't forget to click the API activation link in the email!


- **/ParseUrl**:

  * Retrieves a parameter from querystring called someurl
  * Parse the url and return the protocol, host, port, path, querystring and hash
  * Return the parsed host

- **/ListFiles**:

  * Get the current directory
  * Get the list of files in the current directory
  * Return the list of files

  > **_NOTE:_** Copilot can also help with these kind of commands locally. The feature is called Copilot in the CLI. You can learn more information about this feature [here](https://docs.github.com/en/copilot/github-copilot-in-the-cli/about-github-copilot-in-the-cli). You can run `copilot` in your terminal to install the GitHub Copilot CLI.


- **/GetFullTextFile**:

  * Read `sample.txt`` and return lines that contains the word "Fusce"

  > **_NOTE:_** Becareful with this implementation, since this normally reads the full content of the file before analizing it, so memory usage is high and may fail when files are too big.
  >
  > You can use Copilot Code completion or inline chat. Once done you can also use Copilot Inline Chat to refactor the code to put this logic in a function.

- **/GetLineByLinefromtTextFile**:

  * Read `sample.txt` line by line
  * Create a promise to read the file line by line, and return a list of lines that contains the word "Fusce"
  * Return the list of lines

  > **_NOTE:_** You can use Copilot Code completion or inline chat. Once done you can also use Copilot Inline Chat to refactor the code to put this logic in a function.

- **/CalculateMemoryConsumption**:

  * Return the memory consumption of the process in GB, rounded to 2 decimals


- **/RandomEuropeanCountry**:

  * Make an array of european countries and its iso codes
  * Return a random country from the array
  * Return the country and its iso code

  > **_NOTE:_** Copilot can help you to generate data sets.

### Excercise 3: Document the code

Documenting code is always a boring and painful task. However, we can use Copilot to document it for us. In the chat, ask Copilot to document the `nodeserver.js` file.

### Exercise 4: Building tests

We will create automated tests to check that the functionality of the previous endpoints is correctly implemented. The tests should be together in the `test.js` file.

You can leverage Copilot to run the tests. There is a `/tests` command that you can directly run from Copilot Chat or by selecting the piece of code you want to create tests for and using the Copilot inline feature.

### Exercise 5: Create a Dockerfile

Now that we have the new functionality added and tests covering it, lets create a Dockerfile for the Node JS Application.

- Build the image using Copilot and expose the port 3000.

### Exercise 6: Customize Copilot (repo, path, file)

This exercise demonstrates how Copilot Custom Instructions work together at various scopes. The instructions below are examples, feel free to modify these instructions to see the effects.

1) Create a repo-level instructions file (broad and language-agnostic)
- Location: `.github/copilot-instructions.md` (create the `.github/` folder if needed)
- Paste this content:

```md
# Copilot Instructions (Repository)
- Respect existing language/framework choices across the repo.
- Prefer small, readable functions; clear names; minimal dependencies.
- Add brief docstrings/comments for new code.
- Write tests using existing tooling in each folder when present.
- Avoid secrets and hardcoded credentials; prefer environment variables.
- When unsure, follow conventions shown in nearby files and READMEs.
```

2) Add path-specific instructions for this Node exercises folder
- Location: `.github/instructions/node.instructions.md`
- Paste this content:

```md
---
applyTo: "exercisefiles/node/**"
---

- Target port: 3000 for servers in this folder.
- Use axios for HTTP calls; handle errors with try/catch.
- Prefer async/await and module exports; avoid global state.
- Tests: mocha; name tests descriptively.
- Add tests to the existing `test.js` file.
- Include a top comment: "Exercise 6: Node path rules" in new or edited files here.
```

3) Add file-type targeted instructions for `javascript` files
- Location: `.github/instructions/javascript.instructions.md`
- Paste this content:

```md
---
applyTo: "**/*.js"
---

- Keep endpoints small and pure; reuse existing patterns in this file.
- Prefer async/await; avoid callback-style code.
- Add a brief JSDoc for any new endpoint.
- Include a visible comment at the top: "Exercise 6: nodeserver file rules".
```

Try it out
- Open `exercisefiles/node/nodeserver.js` and in Copilot Chat ask: "Add a tiny health-check endpoint"
- Open `exercisefiles/node/test.js` and ask: "Add one mocha test for the health-check endpoint"

### Exercise 7: Add a Reusable Prompt to This Repo

Create a repo-scoped, reusable prompt that anyone can invoke from Copilot Chat for consistent, repeatable results.

1) Create the prompt library folder
- Add a new folder: `.github/prompts/`

2) Add the reusable prompt file
- Create `.github/prompts/onboarding.prompt.md` with the content below:

```md
---
agent: 'ask'
model: 'GPT-5.1'
description: 'Help new team members onboard with a phased plan and suggestions for first tasks.'
---

# Create My Onboarding Plan

I'm a new team member working with this repository's ${input:language:Language or persona} exercise files and I need help getting started.

My background: ${input:background:Briefly describe your experience level - new to tech, experienced developer new to this stack, etc.}

Please create a personalized onboarding plan to help me ramp up effectively. The plan should include:

1. A phased approach to learning the codebase and tools over the first 30, 60, and 90 days.
2. Suggested first tasks or issues I can work on to get familiar with the project.
3. Key resources or documentation I should review.
4. Any recommended team members I should connect with for guidance.
```

3) Use the prompt from Copilot Chat
- Open Copilot Chat and type `/onboarding language:node background:new developer` and press enter.
- Notice that the prompt switches to ASK mode with model GPT-5.1, as these were specified in the prompt file.

4) Verify repeatability
- Experiment re-running the prompt using one of the other languages or personas listed in `exercisefiles/` and/or changing your `background:`.

Stretch ideas
- Add another prompt (e.g., `.github/prompts/release-notes.prompt.md`) to generate release notes from merged PRs.

### Exercise 8: Automate GitHub Workflows with MCP (Create an Issue)

Configure the GitHub MCP server and use Copilot Chat to create, list, comment on, and close issues in this repository without leaving the editor.

> **_NOTE:_** Ensure issues are enabled, located under the features heading in your repository settings.



Steps

- Install GitHub MCP Server:

  - [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D)

- Create an issue via Copilot Chat:
  - Prompt: "Using the 'github' MCP server, create a new issue in `owner`/`repo` titled 'Exercise 8: MCP issue demo' with body 'Please verify MCP can create issues from VS Code.' Assign to me if possible."

- Verify the result:
  - Copilot should return an issue URL.
  - Alternatively, ask: "List open issues in <owner>/<repo> with label 'exercise-8'."

- Update the issue:
  - Add a comment: "Comment on issue #<number>: 'Thanks, this was created via MCP.'"
  - Close it: "Close issue #<number>."

### Exercise 9: Run the Copilot coding agent asynchronously

- In VSCode, start a Copilot coding agent task that works asynchronously:
  - Request: "Refactor nodeserver.js by extracting endpoints into small modules and add missing tests in test.js. Keep behavior identical. Ensure all tests are passing"
  - Instead of pressing <kbd>Enter</kbd> to send the chat message to GitHub Copilot, click the arrow in the bottom right of the chat window and choose continue in cloud.
- While the agent runs:
  - Continue local work and periodically check the agent's progress and PR status.
  - Review the PR once available and ask Copilot Chat "/explain" on the diff to understand the changes.

  > **_NOTE:_** The coding agent operates asynchronously and may iterate. Provide clear constraints and accept/reject changes via normal PR review.

### Exercise 10: Create and use a custom agent tailored to this folder

- Define a custom agent specialized for exercisefiles/node:
  - Default context: exercisefiles/node
  - Tools: MCP filesystem and HTTP, Copilot Chat commands (/tests, /fix, /explain)
  - Behaviors: propose small changes with tests, respect custom instructions and prompt files, avoid secrets, and prefer axios with error handling.
- Use your custom agent:
  - Ask it to "review nodeserver.js for input validation gaps and propose minimal fixes with corresponding mocha tests."
  - Ask it to "suggest documentation updates in README for new endpoints, consistent with Exercises 1–5."

  > **_NOTE:_** Custom agents encapsulate preferences and tools so you get consistent guidance without repeating context every time.