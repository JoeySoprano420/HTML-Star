const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');
const compileCommand = 'tsc'; // TypeScript compiler command if using TypeScript

// Function to execute shell commands
function execCommand(command, cwd = __dirname) {
    try {
        execSync(command, { stdio: 'inherit', cwd });
    } catch (error) {
        console.error(`Error executing command "${command}":`, error.message);
        process.exit(1);
    }
}

// Ensure the distribution directory exists
function ensureDistDirectory() {
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
    }
}

// Clean up previous build files
function cleanBuild() {
    console.log('Cleaning up previous build files...');
    if (fs.existsSync(distPath)) {
        fs.rmdirSync(distPath, { recursive: true });
    }
    ensureDistDirectory();
}

// Compile TypeScript (or other source files)
function compileSource() {
    console.log('Compiling source code...');
    execCommand(`${compileCommand} --outDir ${distPath}`, srcPath);
}

// Bundle the compiled files (if necessary)
function bundleFiles() {
    console.log('Bundling files...');
    // Example using a bundler like Webpack or Rollup
    // execCommand('webpack --config webpack.config.js', distPath);

    // For simplicity, we assume TypeScript already handles bundling
    // Remove this if you use another bundling tool
}

// Copy static assets (if any)
function copyStaticAssets() {
    console.log('Copying static assets...');
    const assetsPath = path.join(srcPath, 'assets');
    if (fs.existsSync(assetsPath)) {
        fs.cpSync(assetsPath, path.join(distPath, 'assets'), { recursive: true });
    }
}

// Main compilation function
function compile() {
    cleanBuild();
    compileSource();
    bundleFiles();
    copyStaticAssets();
    console.log('Compilation completed successfully.');
}

// Execute compilation
compile();
