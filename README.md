# GitHub Copilot Hackathon

A comprehensive learning repository demonstrating GitHub Copilot's capabilities across multiple programming languages and use cases. Build real-world applications with AI-powered coding assistance.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Quickstart](#quickstart)
- [How to Run](#how-to-run)
- [Testing](#testing)
- [Contributing](#contributing)
- [Resources](#resources)

## Overview

This repository provides hands-on exercises and challenges to help developers learn and master GitHub Copilot. Whether you're building web servers, REST APIs, or data science applications, you'll find practical examples that demonstrate how AI-assisted coding can improve your productivity and code quality.

**What you'll learn:**
- How to effectively use GitHub Copilot for code generation and completion
- Best practices for prompt engineering with AI assistants
- Building complete applications across Node.js, .NET, Java, Python, and C++
- Test-driven development with Copilot assistance
- Documentation and containerization with AI support

### Key Features

- **Guided Exercises**: Step-by-step labs for beginners with detailed instructions
- **Real-World Challenges**: Advanced scenarios for experienced developers
- **Multi-Language Support**: Examples in Node.js, TypeScript, .NET, Java (Spring Boot & Quarkus), Python, and C++
- **Complete Solutions**: Reference implementations for all exercises
- **Dev Container Ready**: Pre-configured development environment with all dependencies

### GitHub Copilot Tips

Remember these shortcuts as you work through the exercises:

- **Tab** - Accept Copilot suggestions
- **Ctrl + Enter** - View multiple suggestions
- **Ctrl + I** - Start inline Copilot chat within your code
- **Copilot Chat** - Use for explanations, refactoring, and documentation
- Press **Enter** and wait if suggestions don't appear immediately

## Tech Stack

The repository includes examples and exercises using:

- **Languages**: JavaScript, TypeScript, C#, Java, Python, C++
- **Frameworks**: Node.js, Express, .NET 8.0, Spring Boot, Quarkus
- **Testing**: Mocha, xUnit, JUnit
- **Tools**: Docker, Maven, npm, cmake
- **Data Science**: Jupyter notebooks, pandas, matplotlib

## Repository Structure

```
.
├── .devcontainer/          # Dev container configuration
├── exercisefiles/          # Guided lab exercises
│   ├── node/              # Node.js server exercises
│   ├── node_typescript/   # TypeScript exercises
│   ├── dotnet/            # .NET Minimal API exercises
│   ├── springboot/        # Spring Boot REST API exercises
│   ├── quarkus/           # Quarkus REST API exercises
│   ├── c++/               # C++ CLI tool exercises
│   ├── dataengineer/      # Python data engineering exercises
│   └── datascientist/     # Python data science exercises
├── challenges/            # Advanced challenges
│   ├── expensetracker/   # Full-stack expense tracking app
│   ├── bdd/              # Behavior-driven development challenge
│   ├── eshop/            # E-commerce shopping cart
│   ├── memorygame/       # Memory game implementation
│   ├── chatwebsockets/   # Real-time chat with WebSockets
│   └── cryptoanalisis/   # Cryptocurrency market analysis
├── completesolution/     # Reference implementations
├── Resources/            # Additional documentation and guides
├── LICENSE               # MIT License
├── SECURITY.md          # Security policy and reporting
├── SUPPORT.md           # Support and issue filing guidelines
└── CODE_OF_CONDUCT.md   # Community code of conduct
```

## Quickstart

### Prerequisites

**GitHub Copilot Access**

You'll need an active GitHub Copilot license. If you don't have one, request a 30-day trial at: https://github.com/github-copilot/signup

**IDE Extensions**

Install the GitHub Copilot extension for your IDE:

- [Visual Studio Code](https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot?tool=vscode)
- [Visual Studio 2022](https://learn.microsoft.com/en-us/visualstudio/ide/visual-studio-github-copilot-extension?view=vs-2022) and [Copilot Chat](https://learn.microsoft.com/en-us/visualstudio/ide/visual-studio-github-copilot-chat?view=vs-2022)
- [JetBrains IDEs](https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot?tool=jetbrains)

**Copilot CLI (Optional)**

Install the GitHub CLI with Copilot support: [Installation Guide](https://github.com/cli/cli#installation)

### Getting Started with GitHub Codespaces

**Recommended: The fastest way to get started!**

1. Click the **Code** button at the top of this repository
2. Select **Codespaces** tab
3. Click **Create codespace on main**
4. Wait for the environment to initialize (~2-3 minutes)
5. Start coding with all dependencies pre-installed!

The dev container includes:
- Node.js 20.x LTS with npm
- .NET 8.0 SDK
- Java 17 with Maven 3.9.10
- Python 3.11
- Docker support
- cmake for C++ projects
- All required VS Code extensions

### Local Development Setup

If you prefer to work locally, install the following:

**Required Tools:**

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker Desktop](https://docs.docker.com/engine/install/)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for VS Code

**Technology-Specific Requirements (if not using dev containers):**

- **Node.js**: [Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
  ```bash
  npm install --global mocha
  npm install axios
  ```

- **.NET**: [Install .NET 8.0 SDK](https://dotnet.microsoft.com/download)

- **Java**: [Install Java 17+](https://learn.microsoft.com/en-us/java/openjdk/install) and [Maven](https://maven.apache.org/install.html)

- **Python**: [Install Python 3.11+](https://www.python.org/downloads/)

- **C++**: [Install cmake](https://cmake.org/download/)

**Using Dev Containers Locally:**

1. Clone this repository
2. Open the folder in VS Code
3. When prompted, click "Reopen in Container"
4. Wait for the container to build and all dependencies to install
5. You're ready to start!

## How to Run

### Node.js Exercises

```bash
cd exercisefiles/node
npm install
node nodeserver.js

# Run tests
mocha test.js
```

### TypeScript/Node.js Exercises

```bash
cd exercisefiles/node_typescript
npm install
npm start

# Run tests
npm test
```

### .NET Minimal API

```bash
cd exercisefiles/dotnet

# Run the application
dotnet run --project ./MinimalAPI/MinimalAPI.csproj

# Run tests
dotnet test
```

### Java Spring Boot

```bash
cd exercisefiles/springboot/copilot-demo

# Run the application
mvn spring-boot:run

# Run tests
mvn test

# Package the application
mvn package
```

### Java Quarkus

```bash
cd exercisefiles/quarkus

# Run in development mode
mvn quarkus:dev

# Run tests
mvn test

# Package the application
mvn package
```

### C++ CLI Tool

```bash
cd exercisefiles/c++

# Build
cmake -S . -B build
cmake --build build

# Run
./build/main

# Run tests
./build/run-tests
```

### Python Data Engineering/Science

```bash
cd exercisefiles/dataengineer
# or
cd exercisefiles/datascientist

# Install dependencies
pip install -r requirements.txt

# Open Jupyter notebooks
jupyter notebook
```

## Testing

Each project includes tests to validate your implementations:

| Technology | Test Framework | Command |
|------------|---------------|---------|
| Node.js | Mocha | `mocha test.js` |
| .NET | xUnit | `dotnet test` |
| Spring Boot | JUnit | `mvn test` |
| Quarkus | JUnit | `mvn test` |
| C++ | Custom | `./build/run-tests` |

**Testing Best Practices:**
- Run tests before making changes to understand the baseline
- Use Copilot's `/tests` command to generate test cases
- Run tests frequently as you implement new features
- Verify all tests pass before moving to the next exercise

## Contributing

We welcome contributions! Here's how to get involved:

### Contribution Guidelines

1. **Fork** the repository
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Follow existing code style** in each language/framework
4. **Add or update tests** for new functionality
5. **Run all tests** to ensure nothing breaks
6. **Update documentation** if you change functionality
7. **Submit a Pull Request** with a clear description

### Code Style

- **Node.js/TypeScript**: Follow the patterns in existing files, use async/await
- **.NET**: Use C# conventions, prefer minimal API patterns
- **Java**: Follow standard Java conventions, use meaningful variable names
- **Python**: Follow PEP 8 style guidelines
- **C++**: Use modern C++ practices (C++11 or later)

### Pull Request Guidelines

- Provide a clear title and description
- Reference any related issues
- Ensure all tests pass
- Keep changes focused and minimal
- Respond to review feedback promptly

### Community Standards

This project follows the [Microsoft Open Source Code of Conduct](./CODE_OF_CONDUCT.md). Please be respectful and inclusive in all interactions.

### Reporting Issues

- **Bugs**: Use GitHub Issues and provide reproduction steps
- **Security Vulnerabilities**: Follow our [Security Policy](./SECURITY.md)
- **Questions**: Check [Support](./SUPPORT.md) for resources

## Labs (Guided Exercises)

Structured exercises with step-by-step instructions:

- [Node.js Server](./exercisefiles/node/README.md)
- [TypeScript Node Server](./exercisefiles/node_typescript/README.md)
- [.NET Minimal Web API](./exercisefiles/dotnet/README.md)
- [Java Spring Boot REST API](./exercisefiles/springboot/README.md)
- [Java Quarkus REST API](./exercisefiles/quarkus/README.md)
- [C++ CLI Tool](./exercisefiles/c++/README.md)
- [Python Data Engineering](./exercisefiles/dataengineer/README.md)
- [Python Data Science](./exercisefiles/datascientist/README.md)

Each lab includes:
- Introduction to key concepts
- Multiple progressive exercises
- Testing instructions
- Dockerization guidance
- Advanced Copilot features (custom instructions, reusable prompts, MCP servers)

## Challenges (Advanced)

Test your skills with these real-world scenarios:

- [Expense Tracker](./challenges/expensetracker/README.md) - Full-stack expense management app
- [BDD Challenge](./challenges/bdd/README.md) - Behavior-driven development scenarios
- [E-Shop Cart](./challenges/eshop/eshop.md) - Shopping cart implementation
- [Memory Game](./challenges/memorygame/memorygame.md) - Interactive memory game
- [WebSocket Chat](./challenges/chatwebsockets/chatwebsockets.md) - Real-time chat application
- [Crypto Analysis](./challenges/cryptoanalisis/crypto.md) - Cryptocurrency market analysis

Challenges provide high-level requirements with minimal guidance—perfect for practicing with Copilot!

## Resources

### Documentation

- [Copilot Cheatsheet](./Resources/README.md) - Quick reference for shortcuts and commands
- [About GitHub Copilot](https://docs.github.com/en/copilot/about-github-copilot)
- [Getting Started with Copilot](https://docs.github.com/en/copilot/using-github-copilot/getting-started-with-github-copilot)
- [Code Referencing in Copilot](https://docs.github.com/en/copilot/using-github-copilot/finding-public-code-that-matches-github-copilot-suggestions)
- [Copilot Chat in Your IDE](https://docs.github.com/en/copilot/github-copilot-chat/using-github-copilot-chat-in-your-ide)
- [Copilot CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli/enabling-github-copilot-in-the-cli)

### Learning Paths

- [GitHub Copilot MS Learn Modules](https://learn.microsoft.com/en-us/training/browse/?terms=github%20copilot)
- [GitHub Copilot Certifications](https://resources.github.com/learn/certifications/)

### Repository Policies

- [License (MIT)](./LICENSE)
- [Security Policy](./SECURITY.md)
- [Support Guidelines](./SUPPORT.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

Copyright (c) Microsoft Corporation.

---

**Happy Coding with GitHub Copilot! 🚀**
