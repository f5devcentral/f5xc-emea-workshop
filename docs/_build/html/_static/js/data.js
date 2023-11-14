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
    const toolTip = document.createElement('span'); // Tooltip element

    // Set IDs for later use
    jsonContainer.id = 'jsonContainer';
    copyButton.id = 'copyButton';
    toggleButton.id = 'toggleButton';
    content.id = 'content';
    statusLabel.id = 'statusLabel';
    toolTip.id = 'toolTip'; // Tooltip ID

    // Set innerHTML of buttons and label
    copyButton.innerHTML = 'Copy';
    toggleButton.innerHTML = 'Show';
    statusLabel.innerHTML = '1 Click Config';
    toolTip.innerHTML = 'Copied'; // Tooltip text

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

    // Tooltip styles
    toolTip.style.position = 'absolute';
    toolTip.style.bottom = '100%';
    toolTip.style.backgroundColor = '#555';
    toolTip.style.color = '#fff';
    toolTip.style.textAlign = 'center';
    toolTip.style.borderRadius = '12px';
    toolTip.style.padding = '5px 0';
    toolTip.style.zIndex = '1';
    toolTip.style.opacity = '0';
    toolTip.style.transition = 'opacity 0.3s';

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

    // Add tooltip to copy button
    copyButton.appendChild(toolTip);

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
        // Show tooltip
        toolTip.style.opacity = '1';
        // Hide tooltip after 3 seconds
        setTimeout(function() {
          toolTip.style.opacity = '0';
        }, 1500);
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
<<<<<<< HEAD
    const { makeId, hostArcadia, ceArcadia, namespace, ceOnPrem, awsSiteName, vk8sName, kubeconfig } = data;
=======
    const { makeId, hostArcadia, ceArcadia, namespace, ceOnPrem, awsSiteName, vk8sName } = data;
>>>>>>> class4-api
    replacePlaceholderWithValue('makeId', makeId);
    replacePlaceholderWithValue('hostArcadia', hostArcadia);
    replacePlaceholderWithValue('ceArcadia', ceArcadia);
    replacePlaceholderWithValue('namespace', namespace);
    replacePlaceholderWithValue('ceOnPrem.clusterName', ceOnPrem.clusterName);
    replacePlaceholderWithValue('awsSiteName', awsSiteName);
    replacePlaceholderWithValue('vk8sName', vk8sName);
<<<<<<< HEAD
    replacePlaceholderWithValue('kubeconfig', kubeconfig);
=======
>>>>>>> class4-api
    
    
  });

const info = JSON.parse(localStorage.getItem('data'));

const lbConfig = ({
  name,
  namespace,
  domains,
  poolName,
  wafPolicy,
  activeServicePolicies,
  ipi,
  userIdentification,
  botDefense,
  ddos,
  advertiseCustom,
  routes

}) => {
    const config = {
      "metadata": {
        "name": name,
        "namespace": namespace,
        "labels": {},
        "annotations": {},
        "disable": false
      },
      "spec": {
        "domains": domains,
        "http": {
          "dns_volterra_managed": true,
          "port": 80
        },
        "downstream_tls_certificate_expiration_timestamps": [],        
        "default_route_pools": [
          {
            "pool": {
              "tenant": "f5-emea-workshop-dblyrrcj",
              "namespace": namespace,
              "name": poolName,
              "kind": "origin_pool"
            },
            "weight": 1,
            "priority": 1,
            "endpoint_subsets": {}
          }
        ]
      }
    }


    if (wafPolicy) config.spec.app_firewall = {
                    "tenant": "f5-emea-workshop-dblyrrcj",
                    "namespace": namespace,
                    "name": wafPolicy,
                    "kind": "app_firewall"
                  }

    if (activeServicePolicies) {
      config.spec.active_service_policies = {policies: []};
      activeServicePolicies.forEach((item) => {
        config.spec.active_service_policies.policies.push({
          "tenant": "f5-emea-workshop-dblyrrcj",
          "namespace": namespace,
          "name": item,
          "kind": "service_policy"
        })
      });          
    }

    if (ipi) {
      config.spec.enable_ip_reputation = {
        ip_threat_categories: []
      }
      ipi.forEach((item) => {
        config.spec.enable_ip_reputation.ip_threat_categories.push(item);
      })
    }
    
    if (userIdentification) {
      config.spec.enable_malicious_user_detection = {};
      config.spec.user_identification = {
        "tenant": "f5-emea-workshop-dblyrrcj",
        "namespace": namespace,
        "name": userIdentification,
        "kind": "user_identification"
      }
    }

    if (botDefense) {
      config.spec.bot_defense = {
        "regional_endpoint": "EU",
        "policy": {
          "protected_app_endpoints": [
            {
              "metadata": {
                "name": "login",
                "disable": false
              },
              "http_methods": [
                "METHOD_POST"
              ],
              "undefined_flow_label": {},
              "protocol": "BOTH",
              "any_domain": {},
              "path": {
                "prefix": "/v1/login"
              },
              "web": {},
              "mitigation": {
                "block": {
                  "status": "OK",
                  "body": "string:///VGhlIHJlcXVlc3RlZCBVUkwgd2FzIHJlamVjdGVkLiBQbGVhc2UgY29uc3VsdCB3aXRoIHlvdXIgYWRtaW5pc3RyYXRvci4="
                }
              },
              "mitigate_good_bots": {}
            }
          ],
          "js_insert_all_pages": {
            "javascript_location": "AFTER_HEAD"
          },
          "js_download_path": "/common.js",
          "javascript_mode": "ASYNC_JS_NO_CACHING",
          "disable_mobile_sdk": {}
        },
        "timeout": 1000
      }
    }

    if (ddos) {
      config.spec.enable_ddos_detection = {
        enable_auto_mitigation: {}
      }
    }

    if (advertiseCustom) {
      config.spec.http = {
        "dns_volterra_managed": false
      }
      config.spec['advertise_custom'] = {
        "advertise_where": [
          {
            "site": {
              "network": "SITE_NETWORK_INSIDE_AND_OUTSIDE",
              "site": {
                "tenant": "f5-emea-workshop-dblyrrcj",
                "namespace": "system",
                "name": advertiseCustom,
                "kind": "site"
              }
            },
            "use_default_port": {}
          }
        ]
        
      }
    }

    if (routes) {
      config.spec.routes = []
      routes.forEach((item) => {
        config.spec.routes.push({          
            "simple_route": {
              "http_method": "ANY",
              "path": {
                "prefix": item.prefix
              },
              "incoming_port": {
                "no_port_match": {}
              },
              "origin_pools": [
                {
                  "pool": {
                    "tenant": "f5-emea-workshop-dblyrrcj",
                    "namespace": namespace,
                    "name": item.pool,
                    "kind": "origin_pool"
                  },
                  "weight": 1,
                  "priority": 1,
                  "endpoint_subsets": {}
                }
              ],
              "auto_host_rewrite": {}
            }          
        })


      })
    }

    return config;
<<<<<<< HEAD
}

function getStudentData(courseId) {
  // Create the container div and its internal HTML  
  var appContainer = document.createElement('div');
  appContainer.id = 'app';
  appContainer.innerHTML = `
    <label>Email:  
        <input type="text" id="email" />
    </label>
    <button id="getDataBtn">Get Data</button>
    <br/><br/>
  `;

  // Insert the container into the body of the page
  
  const currentScript = document.currentScript;
  currentScript.parentNode.insertBefore(appContainer, currentScript.nextSibling);

  // Create and insert CSS styles
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
    #app {
        font-family: Arial, sans-serif;
    }
    .output {
        background: #f8f9fa;
        border: 1px solid #ddd;
        padding: 10px;
        margin-top: 10px;
        border-radius: 4px;
    }
    .green {
        background-color: green;
        color: white;
    }
    .red {
        background-color: red;
        color: white;
    }
  `;
  document.head.appendChild(style);

  // Get references to the new elements
  var emailInput = document.getElementById('email');
  var getDataBtn = document.getElementById('getDataBtn');

  // Load the email from localStorage if available
  emailInput.value = localStorage.getItem('email') || '';

  // Define the event handlers
  emailInput.oninput = function() {
    // Logic to handle input can be added here
  };

  getDataBtn.onclick = function() {
    emailInput.disabled = true;
    getDataBtn.disabled = true;

    var email = emailInput.value;
    localStorage.setItem('email', email);

    fetch(`https://f5xclabmgmt.vltr.nginx-experience.com/v1/student/${courseId}/${btoa(email)}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem('data', JSON.stringify(data));
      getDataBtn.title = JSON.stringify(data, null, 2);
      getDataBtn.classList.remove('red', 'green'); // remove previous classes
      getDataBtn.classList.add("green");
    })
    .catch((error) => {
      console.error('Error:', error);
      getDataBtn.title = "An error occurred";
      getDataBtn.classList.remove('red', 'green'); // remove previous classes
      getDataBtn.classList.add("red");
    })
    .finally(() => {
      emailInput.disabled = false;
      getDataBtn.disabled = false;
    });
  };  
}


=======
}
>>>>>>> class4-api
