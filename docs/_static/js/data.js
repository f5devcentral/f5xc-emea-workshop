function getInfo(key) {        
    try {
        const data = JSON.parse(localStorage.getItem('data'));
        return data[key];
    } catch(error) {
        console.log('Getting data for',key,'with error',error);
        return error
    }            
}

function replacePlaceholderWithValue(placeholder, value) {
    var elements = document.getElementsByTagName("*");
  
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
  
      if (element.hasChildNodes()) {
        for (var j = 0; j < element.childNodes.length; j++) {
          var node = element.childNodes[j];
  
          if (node.nodeType === 3) { // Text node
            var text = node.nodeValue;
            var replacedText = text.replace(new RegExp("\\$\\$" + placeholder + "\\$\\$", "g"), value);
  
            if (replacedText !== text) {
              element.replaceChild(document.createTextNode(replacedText), node);
            }
          } else if (node.nodeType === 1 && node.tagName.toLowerCase() === 'a') { // <a> tag
            var href = node.getAttribute('href');
  
            if (href && href.indexOf('$$' + placeholder + '$$') !== -1) {
              var replacedHref = href.replace(new RegExp("\\$\\$" + placeholder + "\\$\\$", "g"), value);
              node.setAttribute('href', replacedHref);
            }
          }
        }
      }
    }
  }
  
  function displayJSON(jsonInput, statusText) {
    // Create HTML elements
    const jsonContainer = document.createElement('div');
    const buttonContainer = document.createElement('div');
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
    statusLabel.innerHTML = '1 Click Config';
  
    // Set CSS styles
    jsonContainer.style.position = 'relative';
    jsonContainer.style.margin = '1em 0';
    jsonContainer.style.border = '1px solid #ddd';
    jsonContainer.style.borderRadius = '3px';
    jsonContainer.style.backgroundColor = '#f6f8fa';
    jsonContainer.style.padding = '20px';
    jsonContainer.style.fontFamily = 'Courier, monospace';
    jsonContainer.style.fontSize = '16px';
    jsonContainer.style.minHeight = '25px'; 
  
    buttonContainer.style.position = 'absolute';
    buttonContainer.style.top = '5px';
    buttonContainer.style.right = '5px';
  
    copyButton.style.padding = '5px 10px';
    copyButton.style.marginLeft = '10px';
    copyButton.style.borderRadius = '3px';
    copyButton.style.border = 'none';
    copyButton.style.backgroundColor = '#0366d6';
    copyButton.style.color = '#fff';
    copyButton.style.cursor = 'pointer';
  
    toggleButton.style.padding = '5px 10px';
    toggleButton.style.borderRadius = '3px';
    toggleButton.style.border = 'none';
    toggleButton.style.backgroundColor = '#0366d6';
    toggleButton.style.color = '#fff';
    toggleButton.style.cursor = 'pointer';
  
    statusLabel.style.display = 'block';
    statusLabel.style.marginTop = '0px';
  
    content.style.display = 'none';
    content.style.whiteSpace = 'pre-wrap'; 
    content.style.wordWrap = 'break-word'; 
  
    // Add buttons to their container
    buttonContainer.appendChild(toggleButton);
    buttonContainer.appendChild(copyButton);
  
    // Add elements to container
    jsonContainer.appendChild(buttonContainer);
    jsonContainer.appendChild(statusLabel);
    jsonContainer.appendChild(content);
  
    // Append after current script tag
    const currentScript = document.currentScript;
    currentScript.parentNode.insertBefore(jsonContainer, currentScript.nextSibling);
  
    // Set JSON data into content
    content.textContent = JSON.stringify(jsonInput, null, 2);
  
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
        statusLabel.innerHTML = statusText;
        jsonContainer.style.height = 'auto'; 
        statusLabel.style.marginTop = '20px';
      } else {
        content.style.display = 'none';
        toggleButton.innerHTML = 'Show';
        statusLabel.innerHTML = '1 Click Config';
        statusLabel.style.marginTop = '0px';
      }
    });
  }
  
  




document.addEventListener("DOMContentLoaded", function() {
    const data = JSON.parse(localStorage.getItem('data'))
    const { makeId, hostArcadia, ceArcadia, namespace } = data;
    replacePlaceholderWithValue('makeId', makeId);
    replacePlaceholderWithValue('hostArcadia', hostArcadia);
    replacePlaceholderWithValue('ceArcadia', ceArcadia);
    replacePlaceholderWithValue('namespace', namespace);
  });