const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const packageJsonPath = path.resolve(__dirname, 'package.json');
const distPath = path.resolve(__dirname, 'dist');
const buildScriptPath = path.resolve(__dirname, 'build.js');

// Function to execute shell commands
function execCommand(command, cwd = __dirname) {
    try {
        execSync(command, { stdio: 'inherit', cwd });
    } catch (error) {
        console.error(`Error executing command "${command}":`, error.message);
        process.exit(1);
    }
}

// Check if package.json exists
if (!fs.existsSync(packageJsonPath)) {
    console.error('Error: package.json file not found.');
    process.exit(1);
}

// Load package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Increment version
function incrementVersion() {
    const versionParts = packageJson.version.split('.').map(Number);
    versionParts[2] += 1; // Increment patch version
    packageJson.version = versionParts.join('.');
    console.log(`Updating version to ${packageJson.version}`);
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
}

// Build project
function buildProject() {
    console.log('Building project...');
    execCommand('node build.js');
}

// Publish package
function publishPackage() {
    console.log('Publishing package to npm...');
    execCommand('npm publish');
}

// Main publish function
function publish() {
    incrementVersion();
    buildProject();
    publishPackage();
    console.log('Package published successfully.');
}

// Execute publish
publish();
