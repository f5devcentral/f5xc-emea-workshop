Lab 2 - Testing
###############


1. In order to test we are going to run a simple **curl** command to the **Login** API endpoint

   .. code-block:: none

      curl -H "Content-Type: application/json;charset=UTF-8" --data-raw "{\"email\":\"satoshi@bitcoin.com\",\"password\":\"bitcoin\"}" http://arcadia-re-$$makeId$$.workshop.emea.f5se.com/v1/login

2. The request will be blocked.

