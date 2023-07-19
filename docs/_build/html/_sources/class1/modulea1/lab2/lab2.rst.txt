Lab 2 - Testing
###############

All the previous tests and attacks can be done again against the LB that has only been deployed on the **onprem environment** and not on the **F5 XC Global Network** .

We have listed bellow a few tests that you can try out.


1. WAF Protection

   :ext_link:`https://$$ceArcadia$$/?a=%3Cscript%3Ealert(%27xss%27)`

2. Parameter inspection

   .. code-block:: none

      curl -H "Content-Type: application/json;charset=UTF-8" --data-raw "{\"email\":\"11223344\",\"password\":\"bitcoin\"}" http://arcadia-re-$$makeId$$.workshop.emea.f5se.com/v1/login
   
3. BOT Protection

   .. code-block:: none

      curl -H "Content-Type: application/json;charset=UTF-8" --data-raw "{\"email\":\"satoshi@bitcoin.com\",\"password\":\"bitcoin\"}" https://$$ceArcadia$$/v1/login
