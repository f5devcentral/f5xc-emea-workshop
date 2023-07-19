Lab 4 - Manage False Positive
#############################

In the previous lab, we generated ``violations`` matching ``signatures`` like XSS or SQLi. In this lab, we will see how to create an ``Exclusion for these signatures IDs``

Create the WAF exclusion rule
*****************************

* Generate a new attack (for instance ``' or 1=1#``). You can run this attack in any field, but make sure you get a Blocking Response Page.
* Look at your Security Event and click on the ``...`` on the top right of the row, and select ``Create WAF Exclusion rule``

  .. image:: ../pictures/lab4/3dot.png
    :align: center
    :scale: 50%

* As you can notice, the WAF Exclusion is automatically created (except the Method set to ANY - RFE/BUG) 

  .. image:: ../pictures/lab4/exclusion.png
    :align: center
    :scale: 50%

* Apply, Save and Exit
* Make a new try, you attack should pass.

.. note:: If you have a look into your HTTP LB, you can see now a new WAF Exclusion Rules configuration under the WAAP configuration frame.