function getInfo(key) {        
    try {
        const data = JSON.parse(localStorage.getItem('data'));
        return data[key];
    } catch(error) {
        console.log('Getting data for',key,'with error',error);
        return error
    }            
}

function displayJSON(jsonInput) {
    // Create HTML elements
    const jsonContainer = document.createElement('div');
    const copyButton = document.createElement('button');
    const toggleButton = document.createElement('button');
    const statusLabel = document.createElement('span');
    const content = document.createElement('pre');
  
    // Set IDs for later use
    jsonContainer.id = 'jsonContainer';
    copyButton.id = 'copyButton';
    toggleButton.id = 'toggleButton';
    content.id = 'content';
    statusLabel.id = 'statusLabel';
  
    // Set innerHTML of buttons and label
    copyButton.innerHTML = 'Copy';
    toggleButton.innerHTML = 'Show';
    statusLabel.innerHTML = 'JSON to copy:';
  
    // Set CSS styles
    jsonContainer.style.position = 'relative';
    jsonContainer.style.margin = '1em 0';
    jsonContainer.style.border = '1px solid #ddd';
    jsonContainer.style.borderRadius = '3px';
    jsonContainer.style.backgroundColor = '#f6f8fa';
    jsonContainer.style.padding = '20px';
    jsonContainer.style.fontFamily = 'Courier, monospace';
    jsonContainer.style.fontSize = '16px';
  
    copyButton.style.position = 'absolute';
    copyButton.style.top = '5px';
    copyButton.style.right = '5px';
    copyButton.style.padding = '5px 10px';
    copyButton.style.borderRadius = '3px';
    copyButton.style.border = 'none';
    copyButton.style.backgroundColor = '#0366d6';
    copyButton.style.color = '#fff';
    copyButton.style.cursor = 'pointer';
  
    toggleButton.style.position = 'absolute';
    toggleButton.style.top = '5px';
    toggleButton.style.right = '80px';
    toggleButton.style.padding = '5px 10px';
    toggleButton.style.borderRadius = '3px';
    toggleButton.style.border = 'none';
    toggleButton.style.backgroundColor = '#0366d6';
    toggleButton.style.color = '#fff';
    toggleButton.style.cursor = 'pointer';
  
    statusLabel.style.position = 'absolute';
    statusLabel.style.top = '10px';
    statusLabel.style.left = '5px';
  
    content.style.display = 'none';
    content.style.whiteSpace = 'pre-wrap'; // respect line-breaks
    content.style.wordWrap = 'break-word'; // break words properly
    content.style.marginTop = '40px'; // keep data below the buttons
  
    // Add elements to container
    jsonContainer.appendChild(copyButton);
    jsonContainer.appendChild(toggleButton);
    jsonContainer.appendChild(statusLabel);
    jsonContainer.appendChild(content);
  
    // Append after current script tag
    const currentScript = document.currentScript;
    currentScript.parentNode.insertBefore(jsonContainer, currentScript.nextSibling);
  
    // Set JSON data into content
    content.textContent = JSON.stringify(JSON.parse(jsonInput),null,2);
  
    // Set copy button click event
    copyButton.addEventListener('click', function() {
      navigator.clipboard.writeText(content.textContent).then(function() {
        alert('JSON copied to clipboard!');
      }).catch(function() {
        alert('Failed to copy JSON to clipboard.');
      });
    });
  
    // Set toggle button click event
    toggleButton.addEventListener('click', function() {
      if (content.style.display === 'none') {
        content.style.display = 'block';
        toggleButton.innerHTML = 'Hide';
        statusLabel.style.display = 'none';
      } else {
        content.style.display = 'none';
        toggleButton.innerHTML = 'Show';
        statusLabel.style.display = 'inline';
      }
    });
  }