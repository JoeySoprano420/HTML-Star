const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const htmlStarPath = path.resolve(__dirname, 'HTML-Star');
const myWebConsolePath = path.resolve(__dirname, 'My_Web_Console');
const activationFilePath = path.join(myWebConsolePath, 'src/html_star/activation.js');

// Function to execute shell commands
function execCommand(command, cwd = __dirname) {
    try {
        execSync(command, { stdio: 'inherit', cwd });
    } catch (error) {
        console.error(`Error executing command "${command}":`, error.message);
        process.exit(1);
    }
}

// Register HTML Star Language
function registerHtmlStarLanguage() {
    console.log('Registering HTML Star language in My_Web_Console...');

    const activationContent = `
    // HTML Star Language Activation Script

    const registerLanguage = require('my-web-console').registerLanguage;

    // Define the language settings
    const htmlStarConfig = {
        name: 'HTML Star',
        extension: '.htmlstar',
        syntax: 'htmlstar',
        version: '1.0.0',
        description: 'A powerful and versatile programming language derived from HTML with advanced features.'
    };

    // Register the language
    registerLanguage(htmlStarConfig);
    console.log('HTML Star language registered successfully.');
    `;

    // Ensure the destination directory exists
    if (!fs.existsSync(path.dirname(activationFilePath))) {
        fs.mkdirSync(path.dirname(activationFilePath), { recursive: true });
    }

    // Write activation script
    fs.writeFileSync(activationFilePath, activationContent.trim(), 'utf8');
}

// Configure Environment Variables
function configureEnvironment() {
    console.log('Configuring environment variables...');

    const envFilePath = path.join(myWebConsolePath, '.env');
    const envContent = `
    # Environment Variables for My_Web_Console

    HTML_STAR_PATH=${path.resolve(htmlStarPath)}
    `;

    fs.writeFileSync(envFilePath, envContent.trim(), 'utf8');
    console.log('Environment variables configured successfully.');
}

// Run Post-Installation Tasks
function postInstallationTasks() {
    console.log('Running post-installation tasks...');

    execCommand('npm install', myWebConsolePath);
    execCommand('npm run build', myWebConsolePath);
    console.log('Post-installation tasks completed.');
}

// Main activation function
function activate() {
    registerHtmlStarLanguage();
    configureEnvironment();
    postInstallationTasks();
    console.log('Activation completed successfully.');
}

// Execute activation
activate();
