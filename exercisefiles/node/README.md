# Node.js Server with GitHub Copilot

## Overview

This tutorial teaches you how to use GitHub Copilot to build a Node.js web server with multiple API endpoints. You will learn to leverage Copilot's code suggestions, inline chat, and chat features to write code faster and more efficiently.

**What you'll learn:**
- Accept and use GitHub Copilot code suggestions
- Use Copilot Chat and inline chat to generate code
- Build API endpoints with various functionalities
- Write tests and documentation with Copilot
- Create a Dockerfile using Copilot

**Expected outcome:** A working Node.js web server with multiple endpoints, tests, and a Dockerfile.

## Prerequisites

Before starting this tutorial, ensure you have:
- GitHub Copilot access (see root README for setup instructions)
- Node.js and npm installed
- Mocha installed globally (`npm install --global mocha`)
- Axios installed (`npm install axios`)
- Visual Studio Code with GitHub Copilot extensions installed

## Setup

1. Navigate to the exercise directory:

   ```bash
   cd exercisefiles/node
   ```

2. Verify GitHub Copilot is active by checking the status bar in the bottom-right corner of VS Code.

## Using GitHub Copilot

**Key actions:**
- Accept suggestions by pressing **Tab**
- View more suggestions with **Ctrl + Enter** (or **Cmd + Enter** on Mac)
- Open inline chat with **Ctrl + I** (or **Cmd + I** on Mac)
- Open Copilot Chat from the sidebar

## Exercises

### Exercise 1: Introduction to the Project

1. Open the `nodeserver.js` file and review the initial Node.js server code.

2. Open the `test.js` file and examine the existing test.

3. Run the test to verify the initial setup:

   ```bash
   mocha test.js
   ```

   **Expected output:**

   ```bash
   server is listening on port 3000

     Node Server
       
       √ should return "key not passed" if key is not passed

     1 passing (34ms)
   ```

### Exercise 2: Build API Endpoints

Build a web server with the following endpoints. Use GitHub Copilot to help generate the code.

#### 1. GET endpoint

**Requirements:**
- Return a "Hello World" message

**Tip:** Start typing a comment or function name and let Copilot suggest the implementation.

#### 2. /DaysBetweenDates endpoint

**Requirements:**
- Calculate days between two dates
- Accept two query parameters: `date1` and `date2`
- Return the number of days between the dates

**Tip:** Use Copilot inline chat. Type the requirements as a comment, press **Enter**, and wait for Copilot to suggest code.

#### 3. /ValidatePhoneNumber endpoint

**Requirements:**
- Accept a query parameter: `phoneNumber`
- Validate phone numbers in Spanish format (e.g., `+34666777888`)
- Return `"valid"` or `"invalid"`

**Tip:** Use Copilot inline chat by pressing **Ctrl + I**, then describe the requirements.

#### 4. /ValidateSpanishDNI endpoint

**Requirements:**
- Accept a query parameter: `dni`
- Calculate and validate the DNI letter
- Return `"valid"` or `"invalid"`

**Tip:** Add the requirements as a comment. Press **Ctrl + Enter** to see multiple suggestions from Copilot and choose the best implementation.

#### 5. /ReturnColorCode endpoint

**Requirements:**
- Accept a query parameter: `color`
- Read the `colors.json` file
- Find the matching color
- Return the `code.hex` field

**Tip:** Use Copilot Chat. Paste the requirements into the chat window. Copilot will use the open file as context.

#### 6. /TellMeAJoke endpoint

**Requirements:**
- Make an API call to `https://official-joke-api.appspot.com/random_joke`
- Use axios to fetch a random joke
- Return the joke

**Tip:** Let Copilot suggest the axios call structure.

#### 7. /MoviesByDirector endpoint

**Requirements:**
- Accept a query parameter: `director`
- Make an API call to the OMDB API using axios
- Return the full list of movies by that director

**Note:** You need a free API key from https://www.omdbapi.com/apikey.aspx

**Tip:** Describe the API call in a comment and let Copilot generate the code.

#### 8. /ParseUrl endpoint

**Requirements:**
- Accept a query parameter: `someurl`
- Parse the URL and extract protocol, host, port, path, query string, and hash
- Return the parsed host

**Tip:** Use Copilot to suggest URL parsing methods.

#### 9. /ListFiles endpoint

**Requirements:**
- Get the current directory
- List all files in the directory
- Return the file list

**Tip:** You can also use Copilot in the CLI for file system commands.

#### 10. /GetFullTextFile endpoint

**Requirements:**
- Read `sample.txt`
- Return all lines containing the word "Fusce"

**Warning:** This implementation reads the entire file into memory, which may fail for large files.

**Tip:** Use Copilot code completion or inline chat. After implementing, use Copilot inline chat to refactor the code into a separate function.

#### 11. /GetLineByLineFromTextFile endpoint

**Requirements:**
- Read `sample.txt` line by line
- Use a promise to read the file
- Return a list of lines containing the word "Fusce"

**Tip:** Use Copilot code completion or inline chat. After implementing, ask Copilot to refactor the logic into a reusable function.

#### 12. /CalculateMemoryConsumption endpoint

**Requirements:**
- Calculate the memory consumption of the process
- Return the value in GB, rounded to 2 decimal places

**Tip:** Let Copilot suggest the Node.js memory API.

#### 13. /RandomEuropeanCountry endpoint

**Requirements:**
- Create an array of European countries with ISO codes
- Return a random country and its ISO code

**Tip:** Copilot can generate data sets for you.

### Exercise 3: Document the Code

1. Open Copilot Chat from the sidebar.

2. Ask Copilot to document the `nodeserver.js` file.

   **Example prompt:** "Document the nodeserver.js file with JSDoc comments."

3. Review the generated documentation and accept the suggestions.

### Exercise 4: Write Tests

1. Open the `test.js` file.

2. Use GitHub Copilot to generate tests for the endpoints you created.

   **Tip:** You can use the `/tests` command in Copilot Chat or select the code you want to test and use Copilot inline chat.

3. Run the tests to verify your implementation:

   ```bash
   mocha test.js
   ```

### Exercise 5: Create a Dockerfile

1. Create a new file named `Dockerfile` in the exercise directory.

2. Use GitHub Copilot to generate a Dockerfile that:
   - Builds a Docker image for the Node.js application
   - Exposes port 3000

   **Tip:** Start typing "FROM node" and let Copilot suggest the rest.

3. Build the Docker image:

   ```bash
   docker build -t node-server .
   ```

4. Run the container:

   ```bash
   docker run -p 3000:3000 node-server
   ```

## Troubleshooting

### GitHub Copilot is not providing suggestions

- Verify Copilot is active by checking the status bar in the bottom-right corner of VS Code.
- Ensure you have an active Copilot license.
- Check that Copilot is enabled for JavaScript files in VS Code settings.
- Try reloading the VS Code window (**Ctrl + Shift + P** → "Reload Window").

### Tests are failing

- Ensure all dependencies are installed: `npm install`
- Verify Mocha is installed globally: `npm install --global mocha`
- Check that the server is running on port 3000.
- Review the test output for specific error messages.

### API calls are failing

- For the OMDB API, ensure you have a valid API key.
- Check your internet connection.
- Verify the API endpoint URLs are correct.

### File reading errors

- Ensure `sample.txt` and `colors.json` exist in the exercise directory.
- Check file permissions.

## Summary

You have completed the Node.js tutorial with GitHub Copilot! You practiced:
- Creating new features with Copilot suggestions
- Working with external APIs
- Generating documentation
- Writing tests
- Creating a Dockerfile

**Explore more Copilot features:**
- `/fix` - Fix problems in your code
- `/explain` - Get explanations of code
- `/doc` - Generate documentation
- `/tests` - Generate tests