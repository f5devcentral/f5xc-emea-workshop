Class 5 - F5 XC K8s - UNDER CONSTRUCTION
########################################

Lab Maintainers:

  Sorin Boiangiu <s.boiangiu@f5.com>   

|

For this lab, we will use the **Arcadia Crypto** application.

This application is a modern application simulating a crypto trading platform app where you can buy and sell crypto currency.

The following components are used within the application:

* **Frontend** - serves the non dynamic content for like html, js, css and images
* **Login** - in in charge of dealing with anything related to the login user functionality
* **Users** - all user data interaction is done through this microservice only
* **Stocks** - connects to external resources to get the latest crypto data and serves it to the application clients
* **Stocks Transaction** - Deal with all related to buying or selling crypto currencies. It interact with other microservices like Users and Stocks
* **Database** - Database were all information is stored



During this class we will explore how F5 XC can help publish Kubernetes deployed application while making sure they are fast and secure.


.. image:: ./module1/pictures/class1.gif
   :align: center

.. note:: Before you procced to the lab it is mandatory to enter the email that you have joined the UDF with in order to populate any dynamic content. If all good the button will turn green.

.. raw:: html
    
    <script>getStudentData('f5xcemeak8sworkshop');</script>


.. toctree::
   :maxdepth: 2
   :glob:

   module*/module*