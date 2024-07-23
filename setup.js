const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const htmlStarPath = path.resolve(__dirname, 'HTML-Star');
const myWebConsolePath = path.resolve(__dirname, 'My_Web_Console');

// Function to execute shell commands
function execCommand(command, cwd = __dirname) {
    try {
        execSync(command, { stdio: 'inherit', cwd });
    } catch (error) {
        console.error(`Error executing command "${command}":`, error.message);
        process.exit(1);
    }
}

// Install dependencies for HTML Star
function installHtmlStarDependencies() {
    console.log('Installing dependencies for HTML Star...');
    execCommand('npm install', htmlStarPath);
}

// Build HTML Star project
function buildHtmlStar() {
    console.log('Building HTML Star project...');
    execCommand('npm run build', htmlStarPath);
}

// Integrate HTML Star with My_Web_Console
function integrateWithMyWebConsole() {
    console.log('Integrating HTML Star with My_Web_Console...');
    
    const htmlStarSrcPath = path.join(htmlStarPath, 'src');
    const myWebConsoleHtmlStarPath = path.join(myWebConsolePath, 'src/html_star');
    
    // Ensure the destination directory exists
    if (!fs.existsSync(myWebConsoleHtmlStarPath)) {
        fs.mkdirSync(myWebConsoleHtmlStarPath, { recursive: true });
    }
    
    // Copy HTML Star source files
    fs.readdir(htmlStarSrcPath, (err, files) => {
        if (err) {
            console.error('Error reading HTML Star source directory:', err);
            process.exit(1);
        }
        
        files.forEach(file => {
            const srcFile = path.join(htmlStarSrcPath, file);
            const destFile = path.join(myWebConsoleHtmlStarPath, file);
            
            fs.copyFile(srcFile, destFile, err => {
                if (err) {
                    console.error(`Error copying file ${file}:`, err);
                    process.exit(1);
                }
            });
        });
    });
}

// Build My_Web_Console project
function buildMyWebConsole() {
    console.log('Building My_Web_Console project...');
    execCommand('npm install', myWebConsolePath);
    execCommand('npm run build', myWebConsolePath);
}

// Main setup function
function setup() {
    installHtmlStarDependencies();
    buildHtmlStar();
    integrateWithMyWebConsole();
    buildMyWebConsole();
    console.log('Setup completed successfully.');
}

// Execute setup
setup();
