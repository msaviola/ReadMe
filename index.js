const fs = require('fs');
const util = require('util');
const inquirer = require('inquirer');

const thenableWriteFile = util.promisify(fs.writeFile);

function Output(answers) {
    const title = answers.title;
    const description = answers.description;
    const tableofContents = answers.tableofContents;
    const installation = answers.installation;
    const usage = answers.usage;
    const license = answers.license;
    const contributing = answers.contributing;
    const tests = answers.tests;
    const questions = answers.questions;
    return `
${title}
   Description: ${description}
        Table of Contents: ${tableofContents}
    Installation: ${installation} 
    Usage: ${usage}
    License: ${license}
    Contributors: ${contributing}
    Tests: ${tests}
    Questions: ${questions}`
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
            message: 'What is the usage? '
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
        return Output(answers);
    })
    .then(function (textOutput) {
        return thenableWriteFile('./ReadMe.text', textOutput);
    })
    .then(function () {
        console.log('All done!');
    })
    .catch(function (error) {
        console.log('Oh noes! An error!', error);
    });