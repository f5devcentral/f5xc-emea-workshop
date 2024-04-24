JWT validation and access control
=================================

JSON Web Token (JWT) validation is the process of verifying the authenticity and integrity of a JWT. A JWT is a JSON object that is used to represent a set of claims. It consists of a header, a payload, and a signature, and is typically used to transmit information that can be verified and trusted.

JWT validation is typically used to authenticate requests to an API. When a client wants to make an authenticated request to an API, it sends a JWT in the request header. The API verifies the JWT to ensure that it has not been tampered with and that it was issued by a trusted party. If the JWT is valid, the API processes the request; if it is not valid, the API returns an error.

There are several steps involved in JWT validation:

* **Decode the JWT:** The first step in JWT validation is to decode the JWT to extract the header, payload, and signature
* **Obtain the signing key:** In order to validate the signature, you will need to obtain the signing key that was used to create the JWT. This key is typically a secret that is shared between the client and the API
* **Recreate the signature:** Using the signing key and the header and payload of the JWT, recreate the signature using the same algorithm that was used to create the original signature
* **Compare the signatures:** Compare the original signature that is contained in the JWT with the signature that you recreated. If the signatures are the same, the JWT has not been tampered with and the signature is considered to be valid. If the signatures are different, the JWT has been tampered with and the signature is not considered to be valid
* **Validate the claims:** After the signature has been validated, the claims contained in the JWT payload should be checked to ensure that they are valid and have not expired
* **Check for authorization:** Finally, the JWT should be checked to ensure that the client is authorized to perform the requested action
 
JWT Validation
--------------

Pre-requisites
^^^^^^^^^^^^^^

First of all, you need several inputs

* A JWT token signed with one of these algorithms: RS256, RS384, RS512, PS256, PS384, PS512 or ES256
* A RSA public key, and RSA private key
* A JWKS (an array with the public key)

In order to keep this lab easy, we **don't** explain how to generate a JWT or JWKS. In a nutshell, the JWT is signed with the private key, and the JWKS is composed of the public key to verify the signature.

The JWT to use in this lab
^^^^^^^^^^^^^^^^^^^^^^^^^^

In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are:

* Header (Algo and Type)
* Payload (Claims, issuer, audience, timestamp)
* Signature

This is the JWT we will use. You can copy / paste this JWT into https://jwt.io to decode it.

.. code-block:: bash

    eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJGNVhDIEpXVCBkZW1vIiwic3ViIjoic2FAZjUuY29tIiwiYXVkIjoibXlsYi1mNXhjLmY1c2UuY29tIiwiaWF0IjoxNzEzNTM4NTAxLCJleHAiOjE3MTM1MzkxMDEsIkdpdmVuTmFtZSI6IkJvYiIsIkxhc3ROYW1lIjoiVGhlU3BvbmdlIiwiRW1haWwiOiJib2JAZjUuY29tIiwiUm9sZSI6IlNBIn0.bz6XTCLN6Nioz56pzs8nJTJ4OExkNsYNiGmHa23BEbcWRA4O3UFPBfII110yd4l2wbYuaaWbEWXZLkkqRb-0LJHyOMg1TvI15HZKvwqVN7nj4g-qtSpfnrmd4w2pAyRvMeqxt_r2apAzmyjvTrwFamxKtZ9IDhQ7CB1O8XsT0yJB2lpU9tS09PrM3kJNbbr5yzgVCk1eSOGE0Uh7qhcgrnDqpHcGVd0pm_Z2R-mZH-DMN99jwcgrFlOW28XYo9YWodHpwBAe3ZxWqnxDjIberk55EkfqlEPaFj6GK2IyzEsLbazMQuQB2meKeaPPsmcVeT9E7BAK_6aBZuA3mZwL-Q

For this lab, we customised the Payload with several Claims. We will work with the Claims in the Access Control section.

.. code-block:: JSON

    {
        "iss": "F5XC JWT demo",
        "sub": "sa@f5.com",
        "aud": "mylb-f5xc.f5se.com",
        "iat": 1713538501,
        "exp": 1713539101,
        "GivenName": "Bob",
        "LastName": "TheSponge",
        "Email": "bob@f5.com",
        "Role": "SA"
    }


The JWKS to use in this lab
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The JWKS is an array required by F5XC to check the JWT signature. For the lab we use the JWKS below. We used https://mkjwk.org/ to generate it.

.. code-block:: JSON

    {
        "keys": [
            {
                "kty": "RSA",
                "e": "AQAB",
                "use": "sig",
                "kid": "AbkXtSo-G6BFmDUWqUiA-I8qkUl7mpL-aOw6N1dCnQY",
                "alg": "RS256",
                "n": "spXVIAhMBZfwxz1ORtnfb_Dg8DM2aZxTmKTDw-_xaSXMWXSDs2Sh18VtCL46pKhwPLCvhre9xplDyLgPn1HlLZ9yHiLWj8HSz-f1pI98fVw3kgwCSslB-y0DYN8JWR0ivb-3Meg2y0kGyaDC7gnnDyxi_lXe7i_VL9oCVeWsd01C7sxTPNkFO_DwGVsewU7207FKHgLWWyVEDRF81atkqD4VlUeVpE1asmxJaSGwAxOFo2U_LRMSC7gpR7bVydouF2IXtE6-mnbtdZ9JF3bTQzFZUziVW5zOjAQJYQKlarJbrqzjfp5UqyqSJU4zmHzUOhU4_L6hWyRLJOsQylAUsQ"
            }
        ]
    }


Enable JWT validation on your HTTP LB
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Edit your HTTP LB and go to the API Protection section
* In JWT Validation, click configure
* We don't enable JWT validation for all endpoints, only for the /api/locations endpoint
  
  * Target : Base Paths
  
    * Prefix : /api/locations
  
  * Token location : Bearer Token
  
  * Action : Block
  
  * JSON Web Key Set (JWKS) : Click Configure and Paste the JWKS from the previous section
  
  * Issuer : Exact Match
  
    * Exact Match : F5XC JWT demo
  
  * Audience : Disable
  
  * Validate Period : Disable

* Click Apply
* Save and Exit

  .. image:: ../pictures/config-jwt.png
    :align: center
    :scale: 50%


Test your configuration with cURL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Use cURL to test your configuration
  
* Send the request below (without JWT) to /api/animals. As a reminder, we **haven't** enabled JWT validation on this endpoint.

  .. code-block:: bash

    curl -H "Content-Type: application/json;charset=UTF-8" --location 'http://sentence-re-$$makeId$$.workshop.emea.f5se.com/api/animals'

  * It **passes** without any JWT because JWT Validation is only enabled on /locations

* Send the request below (without JWT) to /api/locations. As a reminder, we **have** enabled JWT validation on this endpoint.

  .. code-block:: bash

    curl -H "Content-Type: application/json;charset=UTF-8" --location 'http://sentence-re-$$makeId$$.workshop.emea.f5se.com/api/locations'

  * It **doesn't** pass because JWT validation is enabled on /locations

* Send the request below (with JWT) to /api/locations.

  .. code-block:: bash

    curl -H "Content-Type: application/json;charset=UTF-8" --location 'http://sentence-re-$$makeId$$.workshop.emea.f5se.com/api/locations' --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJGNVhDIEpXVCBkZW1vIiwic3ViIjoic2FAZjUuY29tIiwiYXVkIjoibXlsYi1mNXhjLmY1c2UuY29tIiwiaWF0IjoxNzEzNTM4NTAxLCJleHAiOjE3MTM1MzkxMDEsIkdpdmVuTmFtZSI6IkJvYiIsIkxhc3ROYW1lIjoiVGhlU3BvbmdlIiwiRW1haWwiOiJib2JAZjUuY29tIiwiUm9sZSI6IlNBIn0.bz6XTCLN6Nioz56pzs8nJTJ4OExkNsYNiGmHa23BEbcWRA4O3UFPBfII110yd4l2wbYuaaWbEWXZLkkqRb-0LJHyOMg1TvI15HZKvwqVN7nj4g-qtSpfnrmd4w2pAyRvMeqxt_r2apAzmyjvTrwFamxKtZ9IDhQ7CB1O8XsT0yJB2lpU9tS09PrM3kJNbbr5yzgVCk1eSOGE0Uh7qhcgrnDqpHcGVd0pm_Z2R-mZH-DMN99jwcgrFlOW28XYo9YWodHpwBAe3ZxWqnxDjIberk55EkfqlEPaFj6GK2IyzEsLbazMQuQB2meKeaPPsmcVeT9E7BAK_6aBZuA3mZwL-Q'

  * It **passes** because JWT is valid (signature is valid)

* Send the same request, but this time with a wrong JWT signature. As a reminder, the JWT signature is the last section of the JWT. We intentionally remove some characters from the signature section of the JWT.

  .. code-block:: bash

    curl -H "Content-Type: application/json;charset=UTF-8" --location 'http://sentence-re-$$makeId$$.workshop.emea.f5se.com/api/locations' --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJGNVhDIEpXVCBkZW1vIiwic3ViIjoic2FAZjUuY29tIiwiYXVkIjoibXlsYi1mNXhjLmY1c2UuY29tIiwiaWF0IjoxNzEzNTM4NTAxLCJleHAiOjE3MTM1MzkxMDEsIkdpdmVuTmFtZSI6IkJvYiIsIkxhc3ROYW1lIjoiVGhlU3BvbmdlIiwiRW1haWwiOiJib2JAZjUuY29tIiwiUm9sZSI6IlNBIn0.bz6XTCLN6Nioz56pzs8nJTJ4OExkNsYNiGmHa23BEbcWRA4O3UFPBfII110yd4l2wbYuaaWbEWXZLkkqRb-0LJHyOMg1TvI15HZKvwqVN7nj4g-qtSpfnrmd4w2pAyRvMeqxt_r2apAzmyjvTrwFamxKtZ9IDhQ7CB1O8XsT0yJB2lpU9tS09PrM3kJNbbr5yzgVCk1eSOGE0Uh7qhcgrnDqpHcGVd0pm_Z2R-mZH-DMN99jwcgrFlOW28XYo9YWodHpwBAe3ZxWqnxDjIberk55EkfqlEPaFj6GK2IyzEsLbazMQuQB2meK'

  * It **doesn't** pass

* Now, go to the ``Security Analytics`` tab to check your API Security Events.

  * You can see API events with 401, 403 ... and more details in the JSON section of the Log Event. Please see the example béelow. 

  .. code-block:: bash

    "jwt_status": "Jwt is missing",
    "jwt_status": "Jwt verification fails",    

  .. image:: ../pictures/jwt-verification-fails.png
    :align: center
    :scale: 50%

JWT Access Control
------------------

JWT control checks if a Claim is present and if the value matches a requirement.

In our lab, we check if the user has a VP role. As a reminder, in the JWT token, the user has a SA role. We want to allow access to /api/locations only to VP. 

Enable JWT Access Control
^^^^^^^^^^^^^^^^^^^^^^^^^

JWT Access Control is part of Service Policy.

* Create a new Service Policy

* Name: sp-jwt-access

* Rules: Custom Rule List

* Click configure and add a new rule to allow VP role

  * Name: role-vp

  * Action: Allow
  
  * Request Match, click on the right Trottle to show Advanced Fields

  * HTTP Path:

    * Add Prefix Values : /api/locations
  
  * JWT claims (if you can't see it, click on top right corner Shpw Advanced Fields), add a new item
  
    * JWT claim Name: Role
    
    * Match Options: Match Values

    * Exact Values: VP

      .. image:: ../pictures/claim-vp.png
        :align: center
        :scale: 70%

    * Save the rule

* Create a **second rule** to block request on /api/locations with a wrong role

  * Name: role-not-vp

  * Action: Deny
  
  * HTTP Path:

    * Add Prefix Values : /api/locations

  * Save the rule

* Create a **third rule** to allow the rest. By default, a Service Policy finishes by a DENY All

  * Name: allow-all

  * Action: Allow

  * Save the rule

.. image:: ../pictures/sp-rules.png
  :align: center
  :scale: 70%

* Save your Service Policy

* Edit your HTTP LB, and assign this Service Policy

  * Common Security Services > Service Policies > Apply Specified Service Policies

  * Select your Service Policy names sp-jwt-access


Test JWT Access Control
^^^^^^^^^^^^^^^^^^^^^^^

* Start by sending a request to /api/animals. This endpoint is not protected with JWT validation.

  .. code-block:: bash

    curl -H "Content-Type: application/json;charset=UTF-8" --location 'http://sentence-re-$$makeId$$.workshop.emea.f5se.com/api/animals'

  * It still **passes**

* Send a request to /api/locations but with a wrong Role. We send the same request as before, where the Role is SA.

  .. code-block:: bash

    curl -H "Content-Type: application/json;charset=UTF-8" --location 'http://sentence-re-$$makeId$$.workshop.emea.f5se.com/api/locations' --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJGNVhDIEpXVCBkZW1vIiwic3ViIjoic2FAZjUuY29tIiwiYXVkIjoibXlsYi1mNXhjLmY1c2UuY29tIiwiaWF0IjoxNzEzNTM4NTAxLCJleHAiOjE3MTM1MzkxMDEsIkdpdmVuTmFtZSI6IkJvYiIsIkxhc3ROYW1lIjoiVGhlU3BvbmdlIiwiRW1haWwiOiJib2JAZjUuY29tIiwiUm9sZSI6IlNBIn0.bz6XTCLN6Nioz56pzs8nJTJ4OExkNsYNiGmHa23BEbcWRA4O3UFPBfII110yd4l2wbYuaaWbEWXZLkkqRb-0LJHyOMg1TvI15HZKvwqVN7nj4g-qtSpfnrmd4w2pAyRvMeqxt_r2apAzmyjvTrwFamxKtZ9IDhQ7CB1O8XsT0yJB2lpU9tS09PrM3kJNbbr5yzgVCk1eSOGE0Uh7qhcgrnDqpHcGVd0pm_Z2R-mZH-DMN99jwcgrFlOW28XYo9YWodHpwBAe3ZxWqnxDjIberk55EkfqlEPaFj6GK2IyzEsLbazMQuQB2meKeaPPsmcVeT9E7BAK_6aBZuA3mZwL-Q'

  * It **doesn't** because the Role claim is not VP

* Send a new request with the Role VP

  .. code-block:: bash

    curl -H "Content-Type: application/json;charset=UTF-8" --location 'http://sentence-re-$$makeId$$.workshop.emea.f5se.com/api/locations' --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJGNVhDIEpXVCBkZW1vIiwic3ViIjoic2FAZjUuY29tIiwiYXVkIjoibXlsYi1mNXhjLmY1c2UuY29tIiwiaWF0IjoxNzEzNTM4NTAxLCJleHAiOjE3MTM1MzkxMDEsIkdpdmVuTmFtZSI6IkJvYiIsIkxhc3ROYW1lIjoiVGhlU3BvbmdlIiwiRW1haWwiOiJib2JAZjUuY29tIiwiUm9sZSI6IlZQIn0.JAp4x3PWnV9Xbn4nNC0ug775UD-Jc0UngguA64VyAIC9olMImrkVhaMTJhlJMMtxsNhDAL8JDfihJ4isfYTuDN-L4e0RJb68YyRQ9mBFBDQcpEzJDyaYwLV9agavM3qCqeHz8l1VPFqjhiUJKbrGYLTiLZYfthRLrIw2rSO-lcBexnwMMcL9g3pekKuK0e-M_a3Z5OKuNpaY4Iaa3RIwCS_zFATssTzEhYsMbcKgWZqNchbe4C0l7dbz7n-xhpPHiemfZxIeCY-HIz2Gy6XVJxsBksgtML70_Z-lTOknoFEg-ufeZpy6_wHEHU-4Hzc0gGjQVLTpiMN5zAQHV68c8g'

  * It **passes** because the Role claim is VP


Check API events
----------------

* In Overview Security Dashboard, click on your HTTP LB

* Click on Security Analytics

* Find an API event and expand it

  * If you want to see more details of the blocking, switch to JSON view

  .. image:: ../pictures/event-view.png
    :align: center
    :scale: 80%

