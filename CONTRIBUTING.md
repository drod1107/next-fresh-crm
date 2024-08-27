# Contributing to NextFresh CRM

If you're bothering to read this, you're thinking about helping out. First of all - THANK YOU.

 This guide will help you create issues, work on them, and submit your changes for review. Please follow the steps outlined below - most are industry best practices, and if you aren't use to working in a pro setting, this will be a great exercise to up your game! If you have a bit more experience and feel we've overlooked something in our docs, please reach out to <david@windrose.dev>! I'd be delighted to chat!

## Table of Contents

- [Creating an Issue](#creating-an-issue)
- [Creating a Branch](#creating-a-branch)
- [Making Changes](#making-changes)
- [Creating a Pull Request](#creating-a-pull-request)
- [Code Review and Merging](#code-review-and-merging)
- [Best Practices](#best-practices)

## Creating an Issue

1. **Go to the Repository's Issues Tab**:
   Navigate to the repository on GitHub and click on the "Issues" tab.

2. **Click on "New Issue"**:
   - Choose a relevant issue template if available or select "Open a blank issue."
   - Provide a clear and descriptive title for your issue.
   - In the description, include all relevant details such as the problem, steps to reproduce, expected behavior, and any other necessary information.

3. **Assign Labels (if applicable)**:
   - Assign labels that best describe the issue (e.g., `bug`, `enhancement`, `documentation`).

4. **Submit the Issue**:
   - Click "Submit new issue" to create the issue.

*Note: You do not need to create a project associated with the repository in order to create issue tickets. However, you may choose to create a project board for better organization if desired.*

## Creating a Branch

1. **Start from the `dev` Branch**:
   - Ensure you are on the `dev` branch:

     ```bash
     git checkout dev
     ```

2. **Pull the Latest Changes**:
   - Before creating a new branch, pull the latest changes from the remote repository:

     ```bash
     git pull origin dev
     ```

3. **Create a New Branch**:
   - Create a new branch for your issue using the naming convention `issue-<issue-number>-<short-description>`:

     ```bash
     git checkout -b issue-123-fix-contact-form
     ```

   Replace `123` with your issue number and `fix-contact-form` with a brief description of the task.

## Making Changes

1. **Work on Your Branch**:
   - Make the necessary code changes, commits, and ensure that your commits are descriptive and follow best practices (e.g., atomic commits).

2. **Test Your Changes**:
   - Thoroughly test your changes locally to ensure they work as expected and do not introduce any new issues.

3. **Commit Your Changes**:
   - Add and commit your changes:

     ```bash
     git add .
     git commit -m "Fix contact form validation issue (#123)"
     ```

## Creating a Pull Request

1. **Push Your Branch to GitHub**:
   - Push your branch to the remote repository:

     ```bash
     git push origin issue-123-fix-contact-form
     ```

2. **Create a Pull Request (PR)**:
   - Go to the repository on GitHub.
   - You should see a prompt to create a pull request for your newly pushed branch. Click on "Compare & pull request."
   - Ensure the PR is set to merge into the `dev` branch.
   - Provide a detailed description of what your PR does, linking the related issue (e.g., `Closes #123`).
   - Assign a reviewer from the Windrose.dev team.

## Code Review and Merging

1. **Request a Review**:
   - All pull requests must be reviewed by a member of the Windrose.dev team before they can be merged into the `dev` branch.

2. **Make Necessary Changes**:
   - If the reviewer requests changes, address them promptly and push the updates to the same branch. The PR will be updated automatically.

3. **Merging**:
   - Once the PR is approved, a team member will merge the branch into `dev`. If you have permissions, avoid merging your own PR.

## Best Practices

- **Commit Messages**: Use clear and concise commit messages that explain what changes are being made and why.
- **Branch Naming**: Follow the branch naming convention to keep the repository organized.
- **Code Style**: Adhere to the code style and linting rules defined in the project.
- **Communication**: Keep the issue discussion updated with your progress, especially if you encounter any blockers.

Thank you for your contributions! Following these guidelines ensures that the codebase remains clean, maintainable, and easy to collaborate on.

---
