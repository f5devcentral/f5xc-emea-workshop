Lab 2 - Testing
###############

1. Let's see what have changed first let's make sure the good login is working

   .. code-block:: none

      curl -H "Content-Type: application/json;charset=UTF-8" --data-raw "{\"email\":\"satoshi@bitcoin.com\",\"password\":\"bitcoin\"}" http://arcadia-re-$$makeId$$.workshop.emea.f5se.com/v1/login



2. Now let's do the same but with the invalid email parameter. This time the request will get blocked.

   .. code-block:: none

      curl -H "Content-Type: application/json;charset=UTF-8" --data-raw "{\"email\":\"11223344\",\"password\":\"bitcoin\"}" http://arcadia-re-$$makeId$$.workshop.emea.f5se.com/v1/login


We just have been able to demonstrate that F5 XC is not just a basic Web Application Firewall but also has also advanced **Positive Security Policy** capabilities which greatly enhance the security of the application.