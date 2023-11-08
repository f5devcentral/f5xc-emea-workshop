Enable API Validation
=====================

In the previous section, we enabled AOU Protection. API Protection is based on rules (allow, deny), but API Validation goes deeper into the validation.

API Validation validates the requests and the responses, but also the content (JSON payload) based on the OpenAPI Specifications.

As a reminder, this is the difference between Protection and API Validation. 

.. image:: ../pictures/slide-api-protection.png
   :align: center
   :scale: 40%

.. note:: As an example, API Validation validates if the value of a JSON key matches the specifications (integer, string, array ...)

Example below

.. code-block:: YAML
   :emphasize-lines: 24, 36, 38

    /adjectives:
    get:
      description: List all adjectives
      tags:
        - adjectives
      responses:
        '200':
          description: a list of adjectives with their index
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Adjectives"
    post:
      description: create an adjective
      tags:
        - adjectives
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
            example:
              name: worried
      responses:
        '201':
          description: adjective created
          content:
            application/json:
              schema:
                type: object
                properties: 
                  id:
                    type: integer
                  name:
                    type: string
              example:
                id: 4
                name: worried

