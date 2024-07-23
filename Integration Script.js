const fs = require('fs');
const path = require('path');

const injectHTMLStar = () => {
  const htmlStarPath = path.resolve(__dirname, 'HTML-Star/src');
  const myWebConsolePath = path.resolve(__dirname, 'My_Web_Console/src/html_star');

  fs.cp(htmlStarPath, myWebConsolePath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error copying HTML Star files:', err);
    } else {
      console.log('HTML Star files successfully copied to My_Web_Console.');
    }
  });
};

injectHTMLStar();
