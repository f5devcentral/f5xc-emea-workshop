JWT validation and access control
=================================

JSON Web Token (JWT) validation is the process of verifying the authenticity and integrity of a JWT. A JWT is a JSON object that is used to represent a set of claims. It consists of a header, a payload, and a signature, and is typically used to transmit information that can be verified and trusted.

JWT validation is typically used to authenticate requests to an API. When a client wants to make an authenticated request to an API, it sends a JWT in the request header. The API verifies the JWT to ensure that it has not been tampered with and that it was issued by a trusted party. If the JWT is valid, the API processes the request; if it is not valid, the API returns an error.

There are several steps involved in JWT validation:

* Decode the JWT: The first step in JWT validation is to decode the JWT to extract the header, payload, and signature
* Obtain the signing key: In order to validate the signature, you will need to obtain the signing key that was used to create the JWT. This key is typically a secret that is shared between the client and the API
* Recreate the signature: Using the signing key and the header and payload of the JWT, recreate the signature using the same algorithm that was used to create the original signature
* Compare the signatures: Compare the original signature that is contained in the JWT with the signature that you recreated. If the signatures are the same, the JWT has not been tampered with and the signature is considered to be valid. If the signatures are different, the JWT has been tampered with and the signature is not considered to be valid
* Validate the claims: After the signature has been validated, the claims contained in the JWT payload should be checked to ensure that they are valid and have not expired
* Check for authorization: Finally, the JWT should be checked to ensure that the client is authorized to perform the requested action
 
JWT Validation
--------------

Pre-requisites
^^^^^^^^^^^^^^

First of all, you need several inputs

* A JWT token signed with one of these algo RS256, RS384, RS512, PS256, PS384, PS512, and ES256
* A RSA public key, and RSA private key
* A JWKS (an array with the public key)

In order to keep this lab easy, we will **NOT** explain how to generate a JWT or JWKS. In an netshell, the JWT is signed with the private key, and the JWKS is composed of the public key to verify the signature.

The JWT to use for this lab
^^^^^^^^^^^^^^^^^^^^^^^^^^^

In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are:

* Header (Algo and Type)
* Payload (Claims, issuer, audiance, timestamp)
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


The JWKS to use for this lab
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The JWKS is an array required by F5XC to check the JWT signature. The JWKS to use is below. We use https://mkjwk.org/ to generate it.

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

* Edit your HTTP LB and go to section API Protection
* In API Validation, click configure
* We will not enable JWT validation on all endpoints, but only on /locations endpoint
   * Target : Base Patch
      * Prefix : /api/locations
   * Token location : Bearer Token
   * Action : Block
   * Json Web Key Set (JWKS) : Click Configure and Paste the JWKS from the previous section
   * Issuer : Exact Match
      * Exact Match : F5XC JWT demo
   * Audience : Disable
   * Validate Period : Disable
* Click Apply
* Save and Exit

   .. image:: ../pictures/config-jwt.png
      :align: center

Open Postman and test your JWT Validation

* In Postman, select the Collection JWT Validation
* Click on GET /api/animals request. As you can see, there is no Authentcation applied. Send the request.
   * It passes without any JWT because JWT Validation is only enabled on /locations
* Click on GET /api/locations request. The JWT is already into the Authentication tab. Check it and send the request.
   * It passes because JWT is valid (signature is valid)


JWT Access Control
------------------


sub title
^^^^^^^^^