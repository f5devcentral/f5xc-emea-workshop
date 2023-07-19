1 Click Config
##############


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


This is is only used quickly to do a full config of all the previous steps.

1. Create the public and onprem origin pools

   .. raw:: html   

      <script>c1m1l2a();</script>  

   .. raw:: html   

      <script>c1m9l1a();</script>


2. Create Waf policy

   .. raw:: html   

      <script>c1m2l1a();</script>  

3. Create service policies

   .. raw:: html   

      <script>c1m3l1a();</script>  


   .. raw:: html   

      <script>c1m3l1b();</script>  

4. Create the User Identification Policy

   .. raw:: html   

      <script>c1m5l1a();</script>  

5. Create the RE load balancer and apply all the config, chose **a** or **b**

a) RE LB with on prem origin pool
   
   .. raw:: html   

      <script>c1m9l1b({instructions: 'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Add HTTP Load Balancer -> JSON -> Copy paste the JSON config -> Save and Exit' });</script>  

b) RE LB with public origin pool

   .. raw:: html   

      <script>c1m9l1c({instructions: 'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Add HTTP Load Balancer -> JSON -> Copy paste the JSON config -> Save and Exit' });</script>  

6. Create the CE load balancer and apply all the config

   .. raw:: html   

      <script>c1ma1l1b();</script> 




