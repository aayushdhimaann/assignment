# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Job Posting Board with Email Automation

## Project Overview
This project is a full-stack job posting board where companies can register, verify their accounts via email, post jobs, and send automated emails to candidates. It utilizes the MERN (MongoDB, Express.js, React.js, Node.js) stack, focusing on authentication and email automation.

## Technologies Used
- **Frontend**:
  - **React.js**: For building the responsive user interface.
  - **React Hook Form**: For handling form validations.
  - **Zod**: For schema validation to ensure data consistency.

- **Backend**:
  - **Node.js**: JavaScript runtime for the server.
  - **Express.js**: Web framework for building RESTful APIs.
  - **Nodemailer**: For sending automated emails.
  - **MongoDB**: NoSQL database for storing company details, job postings, and email logs.

- **Authentication**:
  - **JWT (JSON Web Tokens)**: For secure authentication and authorization.

## Figma Design
The UI design for this project is based on the following Figma file:
[Figma Design Link](https://www.figma.com/design/3ru768FzQDG5J6CLC1IPB4/Cuvette-Assignment?node-id=0-1&t=4kRZ1x3vuXhWBiu7-1)

## Functional Requirements

### User Registration (Company)
- Companies can register by providing basic details.
- Email verification is required to activate the account; unverified users cannot post jobs.

### Company Login
- Implement an auto-login system using JWT or session-based authentication.

### Job Posting
- Authenticated companies can post jobs with the following details:
  - Job Title
  - Job Description
  - Experience Level
  - Candidate Email
  - End Date

### Candidate Email Automation
- Companies can send job alerts or updates to multiple candidates via email.
- Emails contain:
  - Job details
  - Sender information

### Logout
- Provide an option to clear tokens or sessions and log out.

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (running locally or using a cloud service)
- npm or yarn

### Clone the Repository
```bash
git clone <repository-url>
cd job-posting-board
