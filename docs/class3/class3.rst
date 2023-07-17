Class 3 - Virtual Kubernetes
############################

Lab Maintainers:

  Matthieu Dierick <m.dierick@f5.com>

  Sorin Boiangiu <s.boiangiu@f5.com>   

|

Welcome to the Virtual Kubernetes F5 XC class.

If you have reached this stage after finishing **Class 2** you can simply continue if not go to the **1 Click** sections of **Class 1** and **Class 2** and run throught the 1 Click configuration.



For this lab, we will use the **Arcadia Crypto** application.

This application is a modern application simulating a crypto trading platform app where you can buy and sell crypto currency.

The following components are used within the application:

* **Frontend** - serves the non dynamic content for like html, js, css and images
* **Login** - in in charge of dealing with anything related to the login user functionality
* **Users** - all user data interaction is done through this microservice only
* **Stocks** - connects to external resources to get the latest crypto data and serves it to the application clients
* **Stocks Transaction** - Deal with all related to buying or selling crypto currencies. It interact with other microservices like Users and Stocks
* **Database** - Database were all information is stored


F5 XC can provide a distributed Virtual Kubernetes environment where we can deploy our application containers in any of the F5 XC Regional Edges or Customer Edges.

This allows us to run our application code very close to the client and provide very fast responses.

During this class we will:

* Explore the F5 XC Virtual Kubernetes capabilities




.. image:: ./module1/pictures/Slide1.png
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