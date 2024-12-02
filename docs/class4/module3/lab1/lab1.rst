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

    eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImUyYmI0MTJiODNmZmQwNDJjOTczYmFmNmE4MmFlNGQyIn0.eyJpc3MiOiJGNVhDIEpXVCBkZW1vIiwic3ViIjoic2FAZjUuY29tIiwiYXVkIjoibXlsYi1mNXhjLmY1c2UuY29tIiwiaWF0IjoxNzEzNTM4NTAxLCJleHAiOjE5ODUyNjg2MzQsIkdpdmVuTmFtZSI6IkJvYiIsIkxhc3ROYW1lIjoiVGhlU3BvbmdlIiwiRW1haWwiOiJib2JAZjUuY29tIiwiUm9sZSI6IlNBIn0.WA7_DP40VK1kP76-S68qxadnTyRnaKXX9QvRL5Jhhq9tIJdNE8ULY27JY8-lpJ69F2Ne1bupoKv5Eu3QSWjOK5Etqe_pfqKhN_Yh5iyG7TmAE95h1yqehuRnPsvjaMXju7MY0nl_SGe774eXScOs-8GzkdXOVp--GMbERWsEjHTkbBlVrT4Mp2DmI3I7gKJoFGkYeSCf3MLI0rrIqMNzqrCy4cWoO2_Ttm17pfmDzcHgeyuYwN1p4m5Unq9_0SLIIg_CbrQLev2bKzft_n_-VWZaPz1VI1paqCeah5r7QIrTRRJjCJPGR9SSTMia8gvqnlDO5nnDami7y431VooiNwII5M3GVO9Uw7WHUw7lHG0HBfsvknC6-hfQbws-I5X3DhU2suKhCl_cNrST9nHLDS49uaF5c75yAEpUWgfukqQbZmaHvu7itFX8LoC1qhQWIHtFj-pkAvFTR82YwLsi8RrpGp4UNvUjxiISfXOr_SyvEvtp4wal2CMHIHea3bSv

For this lab, we customised the Payload with several Claims. We will work with the Claims in the Access Control section.

.. code-block:: JSON

    {
        "iss": "F5XC JWT demo",
        "sub": "sa@f5.com",
        "aud": "mylb-f5xc.f5se.com",
        "iat": 1713538501,
        "exp": 1985268634,
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
              "alg": "RS256",
              "e": "AQAB",
              "kty": "RSA",
              "n": "vS3RS_OLjGZKt7-UfdJH0N0yRC9JB64WeHUUmc-CeSh__E0SCZKu7oV0munxfKZmH7JPnKb1w8RnQaPfW0-pqKZgTNXlzqeSfEwL1bkmEZ8xyUBdN9zHDo7nioHUUPZKimJUIZDFhbic2VOh9oLI4wp2ucRk9uOgFbxFoAjtG_4cL2wKTAD-E0OB7qgw0f1mfKP5KeiSZCex8V7vnVA8jFqCY8rQMsNiC40H1odi-n6cvFI3LpwLN7GYTvKtwTWvw5CBTvAOjEK8avh7QzZyEVq9tNDuSywpdfQOkZjw0ThN25KmVRgYq_5igtDABRt54GLb9phyyDVeZjfBFh-r70H4rsfYlYqFmNCD8A6EwBlpOjO8gtmGQxXPM1GxLHOy-CnccmgzLduE8dDRnTssJ4TguG9Y41QYyrxIXJoyN4MaHOJwZc8qVHDEB2eP5MF8s1TltxKQwprxaV3XIBlHc7XaZCkJ7Dc9-Zrpi5bRlXoILRlL-bnovPglWfRvYlNv",
              "use": "sig",
              "kid": "e2bb412b83ffd042c973baf6a82ae4d2"
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

    curl -H "Content-Type: application/json;charset=UTF-8" --location 'http://sentence-re-$$makeId$$.workshop.emea.f5se.com/api/locations' --header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImUyYmI0MTJiODNmZmQwNDJjOTczYmFmNmE4MmFlNGQyIn0.eyJpc3MiOiJGNVhDIEpXVCBkZW1vIiwic3ViIjoic2FAZjUuY29tIiwiYXVkIjoibXlsYi1mNXhjLmY1c2UuY29tIiwiaWF0IjoxNzEzNTM4NTAxLCJleHAiOjE5ODUyNjg2MzQsIkdpdmVuTmFtZSI6IkJvYiIsIkxhc3ROYW1lIjoiVGhlU3BvbmdlIiwiRW1haWwiOiJib2JAZjUuY29tIiwiUm9sZSI6IlNBIn0.WA7_DP40VK1kP76-S68qxadnTyRnaKXX9QvRL5Jhhq9tIJdNE8ULY27JY8-lpJ69F2Ne1bupoKv5Eu3QSWjOK5Etqe_pfqKhN_Yh5iyG7TmAE95h1yqehuRnPsvjaMXju7MY0nl_SGe774eXScOs-8GzkdXOVp--GMbERWsEjHTkbBlVrT4Mp2DmI3I7gKJoFGkYeSCf3MLI0rrIqMNzqrCy4cWoO2_Ttm17pfmDzcHgeyuYwN1p4m5Unq9_0SLIIg_CbrQLev2bKzft_n_-VWZaPz1VI1paqCeah5r7QIrTRRJjCJPGR9SSTMia8gvqnlDO5nnDami7y431VooiNwII5M3GVO9Uw7WHUw7lHG0HBfsvknC6-hfQbws-I5X3DhU2suKhCl_cNrST9nHLDS49uaF5c75yAEpUWgfukqQbZmaHvu7itFX8LoC1qhQWIHtFj-pkAvFTR82YwLsi8RrpGp4UNvUjxiISfXOr_SyvEvtp4wal2CMHIHea3bSv'

  * It **passes** because JWT is valid (signature is valid)

* Send the same request, but this time with a wrong JWT signature. As a reminder, the JWT signature is the last section of the JWT. We intentionally remove some characters from the signature section of the JWT.

  .. code-block:: bash

    curl -H "Content-Type: application/json;charset=UTF-8" --location 'http://sentence-re-$$makeId$$.workshop.emea.f5se.com/api/locations' --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJGNVhDIEpXVCBkZW1vIiwic3ViIjoic2FAZjUuY29tIiwiYXVkIjoibXlsYi1mNXhjLmY1c2UuY29tIiwiaWF0IjoxNzEzNTM4NTAxLCJleHAiOjE3MTM1MzkxMDEsIkdpdmVuTmFtZSI6IkJvYiIsIkxhc3ROYW1lIjoiVGhlU3BvbmdlIiwiRW1haWwiOiJib2JAZjUuY29tIiwiUm9sZSI6IlNBIn0.bz6XTCLN6Nioz56pzs8nJTJ4OExkNsYNiGmHa23BEbcWRA4O3UFPBfII110yd4l2wbYuaaWbEWXZLkkqRb-0LJHyOMg1TvI15HZKvwqVN7nj4g-qtSpfnrmd4w2pAyRvMeqxt_r2apAzmyjvTrwFamxKtZ9IDhQ7CB1O8XsT0yJB2lpU9tS09PrM3kJNbbr5yzgVCk1eSOGE0Uh7qhcgrnDqpHcGVd0pm_Z2R-mZH-DMN99jwcgrFlOW28XYo9YWodHpwBAe3ZxWqnxDjIberk55EkfqlEPaFj6GK2IyzEsLbazMQuQB2meK'

  * It **doesn't** pass

* Now, go to the ``Security Analytics`` tab to check your API Security Events.

  * You can see API events with 401, 403 ... and more details in the JSON section of the Log Event. 

  .. code-block:: bash

    "jwt_status": "Jwt is missing",
    "jwt_status": "Jwt verification fails",    

* Please see one detailed JSON example below.

  .. image:: ../pictures/jwt-verification-fails.png
    :align: center
    :scale: 50%

JWT Access Control
------------------

JWT control checks if a Claim is present and if the value matches a requirement.

In our lab, we check if the user has a VP role. As a reminder, in the JWT token, the user has a SA role. We want to allow access to /api/locations only to VP. 

Enable JWT Access Control
^^^^^^^^^^^^^^^^^^^^^^^^^

.. note:: JWT Access Control is part of Service Policy.

* Go to ``Service Policies`` and create a new Service Policy

* Name: sp-jwt-access

* Rules: Custom Rule List

* Under ``Rules`` click configure and add a new rule to allow the VP role

  * Name: role-vp

  * Action: Allow
  
  .. image:: ../pictures/role-vp.png
    :align: center
    :scale: 50%

  * Scroll down to ``Request Match``

  * HTTP Path:

    Click ``Configure`` and add /api/locations as ``Prefix Values``
  
  .. image:: ../pictures/prefix-values.png
    :align: center
    :scale: 50%

  * Enable "Show Advanced Fields" for ``Request Match`` and add a new item under ``JWT Claims``
  
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

  * Go to ``Common Security Controls`` > ``Service Policies`` > Select ``Apply Specified Service Policies``
  
  .. image:: ../pictures/common-security-controls.png
    :align: center
    :scale: 70%
  
* Click Configure for Policies and select your service policy sp-jwt-access
  
  .. image:: ../pictures/service-policy.png
    :align: center
    :scale: 70%
  

Test JWT Access Control
^^^^^^^^^^^^^^^^^^^^^^^

* Start by sending a request to /api/animals. This endpoint is not protected with JWT validation.

  .. code-block:: bash

    curl -H "Content-Type: application/json;charset=UTF-8" --location 'http://sentence-re-$$makeId$$.workshop.emea.f5se.com/api/animals'

  * It still **passes**

* Send a request to /api/locations but with a wrong Role. We send the same request as before, where the Role is SA.

  .. code-block:: bash

    curl -H "Content-Type: application/json;charset=UTF-8" --location 'http://sentence-re-$$makeId$$.workshop.emea.f5se.com/api/locations' --header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImUyYmI0MTJiODNmZmQwNDJjOTczYmFmNmE4MmFlNGQyIn0.eyJpc3MiOiJGNVhDIEpXVCBkZW1vIiwic3ViIjoic2FAZjUuY29tIiwiYXVkIjoibXlsYi1mNXhjLmY1c2UuY29tIiwiaWF0IjoxNzEzNTM4NTAxLCJleHAiOjE5ODUyNjg2MzQsIkdpdmVuTmFtZSI6IkJvYiIsIkxhc3ROYW1lIjoiVGhlU3BvbmdlIiwiRW1haWwiOiJib2JAZjUuY29tIiwiUm9sZSI6IlNBIn0.WA7_DP40VK1kP76-S68qxadnTyRnaKXX9QvRL5Jhhq9tIJdNE8ULY27JY8-lpJ69F2Ne1bupoKv5Eu3QSWjOK5Etqe_pfqKhN_Yh5iyG7TmAE95h1yqehuRnPsvjaMXju7MY0nl_SGe774eXScOs-8GzkdXOVp--GMbERWsEjHTkbBlVrT4Mp2DmI3I7gKJoFGkYeSCf3MLI0rrIqMNzqrCy4cWoO2_Ttm17pfmDzcHgeyuYwN1p4m5Unq9_0SLIIg_CbrQLev2bKzft_n_-VWZaPz1VI1paqCeah5r7QIrTRRJjCJPGR9SSTMia8gvqnlDO5nnDami7y431VooiNwII5M3GVO9Uw7WHUw7lHG0HBfsvknC6-hfQbws-I5X3DhU2suKhCl_cNrST9nHLDS49uaF5c75yAEpUWgfukqQbZmaHvu7itFX8LoC1qhQWIHtFj-pkAvFTR82YwLsi8RrpGp4UNvUjxiISfXOr_SyvEvtp4wal2CMHIHea3bSv'

  * It **doesn't** pass because the Role claim is not VP

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

