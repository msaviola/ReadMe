const fs = require('fs');
const util = require('util');
const inquirer = require('inquirer');

const thenableWriteFile = util.promisify(fs.writeFile);

function getHtmlOutput(answers) {
    const title = answers.title;
    const description = answers.description;
    const tableofContents = answers.tableofContents;
    const installation = answers.installation;
    const usage = answers.usage;
    const license = answers.license;
    const contributing = answers.contributing;
    const tests = answers.tests;
    const questions = answers.questions;
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>ReadMe</title>
</head>
<body>
    <div class="container">
        <div id="basics" aria-label="Basic information">
            <h3>${title}</h3>
            <p>Description: ${description}</p>
        </div>
        <div id="ToC" aria-labelledby="#ToC-header">
            <h3 id="ToC-header">Table of Contents</h3>
            <p>
                ${tableofContents}
            </p>
            <p>Installation: ${installation}</p>
            <p>Usage: ${usage}</p>
            <p>License: ${license}</p>
            <p>Contributors: ${contributing}</p>
            <p>Tests: ${tests}</p>
            <p>Questions: ${questions}</p>
        </div>
        
    </div>
</body>
</html>`
}
inquirer
    .prompt([
        {
            name: 'title',
            message: 'What will be the title of this file? '
        },
        {
            name: 'description',
            message: 'Type a short description: '
        },
        {
            name: 'tableofContents',
            message: 'Add a Table of Contents:'
        },
        {
            name: 'installation',
            message: 'What needs to be installed?'
        },
        {
            name: 'usage',
            message: 'What is the usage '
        },
        {
            name: 'license',
            message: 'What licenses do you need? '
        },
        {
            name: 'contributing',
            message: 'Who contributed?'
        },
        {
            name: 'tests',
            message: 'What tests need to be done?'
        },
        {
            name: 'questions',
            message: 'What questions need to be answered? '
        },
    ])
    .then(function (answers) {
        return getHtmlOutput(answers);
    })
    .then(function (htmlOutput) {
        return thenableWriteFile('./ReadMe.html', htmlOutput);
    })
    .then(function () {
        console.log('All done!');
    })
    .catch(function (error) {
        console.log('Oh noes! An error!', error);
    });