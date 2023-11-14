Expose the modern API application on F5XC
=========================================

In this lab, we will use a modern application based on API first.
You can find more details about this app, on Github : https://github.com/f5devcentral/sentence-demo-app

In a nutshell, this application is composed of multiple technology frameworks.

This app will generate a sentence :)

.. image:: ../pictures/sentence-demo-app.png
   :align: center

App Documentation
-----------------

Every ``WORD`` pod delivers a list of ``WORDS``. Then, the ``GENERATOR`` select one ``WORD`` per POD, and generates a ``SENTENCE`` in a JSON format

.. image:: ../pictures/topology.png
   :align: center

.. code-block:: JSON

    {
        "adjectives": "proud",
        "animals": "lion",
        "colors": "blue",
        "locations": "park"
    }


Then, the frontend web application will ``display`` all the ``words`` in a ``sentence``. If one micro-service is not deployed, the word is not displayed.

In term of micro-services, this is how there are used by the Webapp frontend.

.. image:: ../pictures/webapp-containers.png
   :align: center


Expose the application on your F5 Distributed Cloud Namespace
-------------------------------------------------------------

For this lab, we will use the following configuration

1. Create the Origin Pool targeting Sentence public app
 
a) Web App & API Protection -> Load Balancers -> Origin Pool -> Add Origin Pool -> Fill the bellow data

   .. table:: 
      :widths: auto

      ==============================    ========================================================================================
      Object                            Value
      ==============================    ========================================================================================
      **Name**                          sentence-public-endpoint
      
      **Port**                          80

      **TLS**                           Disable
      ==============================    ========================================================================================

b) In the same screen -> Origin Servers -> Add Item -> Fill the bellow data -> Apply -> Save and exit

   .. table:: 
      :widths: auto

      ====================    ========================================================================================
      Object                  Value
      ====================    ========================================================================================
      **DNS name**            sentence.emea.f5se.com
      ====================    ========================================================================================


1. Create the HTTP LB

a) Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Add HTTP Load Balancer -> Fill the bellow data -> Save and exit

   .. table:: 
      :widths: auto

      ====================================    =================================================================================================
      Object                                  Value
      ====================================    =================================================================================================
      **Name**                                sentence-re-lb
                     
      **Domains**                             sentence-re-$$makeId$$.workshop.emea.f5se.com

      **Load Balancer Type**                  HTTP
                                                                                 
      **Automatically Manage DNS Records**    Enable 

      **Origin Pools**                        Click **Add Item**, for the **Origin Pool** select $$namespace$$/sentence-public-endpoint -> Apply
      ====================================    =================================================================================================


1. So far, Sentence application is not protected but exposed all over the world on all F5XC RE. 
Check your Sentence application is exposed and reachable from the F5XC Global Network by browsing to :ext_link:`http://sentence-re-$$makeId$$.workshop.emea.f5se.com`

.. warning:: Some Service Providers have a very long recursive cache. It can take several minutes to get a DNS response. You can change your DNS server to 1.1.1.1 or 8.8.8.8 to fix that.