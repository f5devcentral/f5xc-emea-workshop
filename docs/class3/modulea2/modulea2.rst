1 Click Config
##############

If you have reached this stage after finishing **Class 2** you can simply continue if not go to the **1 Click** sections of **Class 1** and **Class 2** and run throught the 1 Click configuration.

.. note:: Before you procced to the lab it is mandatory to enter the email that you have joined the UDF with in order to populate any dynamic content. If all good the button will turn green.

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
        fetch(`https://f5xclabmgmt.emea-ent.f5demos.com/v1/student/${btoa(email)}`, {
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


This is is only used quickly to do a full config of all the previous steps.

1. Deploy the workload on vK8s

   .. raw:: html   

      <script>c3m1l1a();</script>  

2. Create the vK8s origin pool

   .. raw:: html 

      <script>c3m2l1a();</script>   

3. Change the routing of the **arcadia-re-lb** LB

   .. raw:: html   

      <script>c3m2l1b();</script>  

