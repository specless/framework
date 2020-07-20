## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Initial Setup

```bash
npm run setup
```
Running the setup process will walk you through a series of questions to get your project setup and boilerplate source code generated.

#### Note: Once setup, this `readme.md` will be replaced with a new readme file containing more detailed instructions for your project. 

### 3. Start The Development Environment

```bash
npm run dev
```
Running the development server will host your project locally and setup a communication channel with the [Specless Web Application](https://specless.app) so that you can preview your project while developing locally.

Once running, a browser window will be opened at `https://specless.app/localhost/[my-project-id]`. As long as the development server is running, you will be able to preview your project at this URL.

Once running, the develpment server will live reload automatically whenever any of your source files change.

#### Note: You will need to restart the development server if you make any changes to the `specless.json` file contained in the root directory.