Parameter Inspection
####################

The capabilities of the F5 XC platform are one of the most robust. 

One of them is the capability to enforece rules on **POST parameters**.

This is done by checking the parameter value against pre defined rules. For example blocking the request if a specific parameter allowed value is numbers but when inspected it has charachters.

We will protect the login URL **/v1/login** to allow the **email parameter** value only if it follows the **regular email format**.


**Module 3 - All sections**

.. toctree::
   :maxdepth: 1
   :glob:

   lab*/lab*

