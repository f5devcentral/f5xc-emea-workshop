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

