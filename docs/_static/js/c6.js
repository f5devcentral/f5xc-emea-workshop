

function c6m1l1a() {    
        
    const config = {
        "metadata": {
          "name": "arcadia-public-endpoint",
          "namespace": info.namespace,
          "labels": {},
          "annotations": {},
          "disable": false
        },
        "spec": {
          "origin_servers": [
            {
              "public_name": {
                "dns_name": info.hostArcadia
              },
              "labels": {}
            }
          ],
          "use_tls": {
            "use_host_header_as_sni": {},
            "tls_config": {
              "default_security": {}
            },
            "skip_server_verification": {},
            "no_mtls": {}
          },
          "port": 443,
          "same_as_endpoint_port": {},
          "healthcheck": [],
          "loadbalancer_algorithm": "LB_OVERRIDE",
          "endpoint_selection": "LOCAL_PREFERRED"
        }
      }
    displayJSON(config,'Web App & API Protection -> Load Balancers -> Origin Pool -> Add Origin Pool -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c6m1l1b() {
    
    const config = lbConfig({
      name: 'arcadia-re-lb',
      namespace: info.namespace,
      poolName: 'arcadia-public-endpoint',
      domains: [`arcadia-re-${info.makeId}.workshop.emea.f5se.com`]
    });
    
    displayJSON(config,'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Add HTTP Load Balancer -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c6m3l1a() {
  
  const config = {
    "metadata": {
      "name": "arcadia-waf",
      "namespace": info.namespace,
      "labels": {},
      "annotations": {},
      "disable": false
    },
    "spec": {
      "blocking": {},
      "default_detection_settings": {},
      "default_bot_setting": {},
      "allow_all_response_codes": {},
      "default_anonymization": {},
      "use_default_blocking_page": {}
    }
  }
    displayJSON(config,'Web App & API Protection -> App Firewall -> Add App Firewall -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c6m3l1b() {
  
  const config = {
    "metadata": {
      "name": "arcadia-api-definition",
      "namespace": info.namespace,
      "disable": false
    },
    "spec": {
      "swagger_specs": [
        "https://f5-emea-workshop.console.ves.volterra.io/api/object_store/namespaces/shared/stored_objects/swagger/arcadia-crypto-oas/v5-24-09-04"
      ],
      "strict_schema_origin": {}
    }
  }
    displayJSON(config,'Web App & API Protection -> API Management -> API Definition -> Add API Definition ->JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c6m3l1c({ instructions } = { instructions: 'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the arcadia-re-lb row -> Manage Configuration -> Edit Configuration -> JSON -> Copy paste the JSON config -> Save and Exit' }) {
  

  const config = lbConfig({
    name: 'arcadia-re-lb',
    namespace: info.namespace,
    poolName: 'arcadia-public-endpoint',
    domains: [`arcadia-re-${info.makeId}.workshop.emea.f5se.com`],
    wafPolicy: 'arcadia-waf',        
  });

  config.spec.bot_defense = {
    "regional_endpoint": "EU",
    "policy": {
      "protected_app_endpoints": [
        {
          "metadata": {
            "name": "chatbot",
            "disable": false
          },
          "http_methods": [
            "METHOD_POST"
          ],
          "undefined_flow_label": {},
          "protocol": "BOTH",
          "any_domain": {},
          "path": {
            "prefix": "/v1/ai/chat"
          },
          "web": {},
          "mitigation": {
            "block": {
              "status": "OK",
              "body": "string:///VGhlIHJlcXVlc3RlZCBVUkwgd2FzIHJlamVjdGVkLiBQbGVhc2UgY29uc3VsdCB3aXRoIHlvdXIgYWRtaW5pc3RyYXRvci4="
            }
          },
          "mitigate_good_bots": {}
        }
      ],
      "js_insert_all_pages": {
        "javascript_location": "AFTER_HEAD"
      },
      "js_download_path": "/common.js",
      "javascript_mode": "ASYNC_JS_CACHING",
      "disable_mobile_sdk": {}
    },
    "timeout": 1000,
    "disable_cors_support": {}
  }

  config.spec.api_specification = {
    "api_definition": {
      "tenant": "f5-emea-workshop-dblyrrcj",
      "namespace": info.namespace,
      "name": "arcadia-api-definition",
      "kind": "api_definition"
    },
    "validation_all_spec_endpoints": {
      "validation_mode": {
        "validation_mode_active": {
          "enforcement_block": {},
          "request_validation_properties": [
            "PROPERTY_PATH_PARAMETERS",
            "PROPERTY_QUERY_PARAMETERS",
            "PROPERTY_HTTP_HEADERS",
            "PROPERTY_CONTENT_TYPE",
            "PROPERTY_COOKIE_PARAMETERS",
            "PROPERTY_HTTP_BODY",
            "PROPERTY_SECURITY_SCHEMA"
          ]
        },
        "skip_response_validation": {}
      },
      "fall_through_mode": {
        "fall_through_mode_custom": {
          "open_api_validation_rules": [
            {
              "metadata": {
                "name": "api-only",
                "disable": false
              },
              "action_block": {},
              "base_path": "/v1"
            }
          ]
        }
      },
      "settings": {
        "oversized_body_skip_validation": {},
        "property_validation_settings_default": {}
      }
    }
  }

  config.spec.enable_api_discovery = {
    "disable_learn_from_redirect_traffic": {},
    "discovered_api_settings": {
      "purge_duration_for_inactive_discovered_apis": 2
    }
  }
    displayJSON(config, instructions );    
}