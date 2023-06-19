Class1 - F5XC WAAP Use Cases
############################

Lab Maintainers:

  Matthieu Dierick <m.dierick@f5.com>

  Sorin Boiangiu <s.boiangiu@f5.com>

|

.. note:: In this Class, you will focus mainly on the deployment models. You are going to see how you can deploy F5XC WAAP in many environments.

|

.. note:: Before you procced please enter the email that you have joined the UDF with in order to populate any dynamic content.

.. raw:: html

    <div id="app">
        <label>Email:  
            <input type="text" id="email" oninput="processEmail()" />
        </label>
        <button id="getDataBtn" onclick="saveAndLoad()">Get Data</button>        
        </br></br>
    </div>

    <script>
    var email = localStorage.getItem('email') || '';
    document.getElementById('email').value = email;
    
    function processEmail() {
        var email = document.getElementById('email').value;
    }
    
    function saveAndLoad() {
        var emailInput = document.getElementById('email');
        var getDataBtn = document.getElementById('getDataBtn');
        emailInput.disabled = true;
        getDataBtn.disabled = true;

        var email = emailInput.value;
        localStorage.setItem('email', email);
        fetch(`https://f5xclabmgmt.vltr.nginx-experience.com/v1/student/${btoa(email)}`, {
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
            localStorage.setItem('data',JSON.stringify(data));            
            getDataBtn.title = JSON.stringify(data, null, 2);
            getDataBtn.className = ''; // remove all classes
            getDataBtn.classList.add("green");
        })
        .catch((error) => {
            console.error('Error:', error);
            getDataBtn.title = "An error occurred";
            getDataBtn.className = ''; // remove all classes
            getDataBtn.classList.add("red");
        })
        .finally(() => {
            emailInput.disabled = false;
            getDataBtn.disabled = false;
        });
    }

    </script>

    <style>
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
    </style>

    </script>

    <style>
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
    </style>



.. toctree::
   :maxdepth: 2
   :glob:

   module*/module*