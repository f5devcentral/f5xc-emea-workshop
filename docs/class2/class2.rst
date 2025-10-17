Class 2 - Multi Cloud Networking
################################

Lab Maintainers:

  Matthieu Dierick <m.dierick@f5.com>

  Sorin Boiangiu <s.boiangiu@f5.com>   

|

Welcome to the Multi Cloud Networking ( MCN ) F5 XC class.

.. note:: If you have reached this stage after finishing **Class 1** you can simply continue if not go to the **1 Click** section of **Class 1** and run throught the configuration.

For this lab, we will use the **Arcadia Crypto** application.

This application is a modern application simulating a crypto trading platform app where you can buy and sell crypto currency.

The following components are used within the application:

* **Frontend** - serves the non dynamic content for like html, js, css and images
* **Login** - in in charge of dealing with anything related to the login user functionality
* **Users** - all user data interaction is done through this microservice only
* **Stocks** - connects to external resources to get the latest crypto data and serves it to the application clients
* **Stocks Transaction** - Deal with all related to buying or selling crypto currencies. It interact with other microservices like Users and Stocks
* **Database** - Database were all information is stored


Our on prem infrastracture is no longer able to handle the load of our application which boomed due to mass crypto currency addoption.

We need to quickly expand and this can be done with any of the cloud providers while keeping the same level of application security and workflows.

During this class we will:

* Explore expanding parts of our service to AWS
* Providing connectivity for communication between different data centers



.. image:: ./module1/pictures/class1.gif
   :align: center

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
        fetch(`https://f5xclabmgmt.emea-ent.f5demos.com/v1/student/f5xcemeaworkshop/${btoa(email)}`, {
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