function c1m1l2a() {    
    
    const info = JSON.parse(localStorage.getItem('data'));
    
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

function c1m1l2b() {
    const info = JSON.parse(localStorage.getItem('data'));
    const config = {
        "metadata": {
          "name": "arcadia-re-lb",
          "namespace": info.namespace,
          "labels": {},
          "annotations": {},
          "disable": false
        },
        "spec": {
          "domains": [
            `arcadia-re-${info.makeId}.workshop.emea.f5se.com`
          ],
          "http": {
            "dns_volterra_managed": true,
            "port": 80
          },
          "downstream_tls_certificate_expiration_timestamps": [],
          "advertise_on_public_default_vip": {},
          "default_route_pools": [
            {
              "pool": {
                "tenant": "f5-emea-workshop-dblyrrcj",
                "namespace": info.namespace,
                "name": "arcadia-public-endpoint",
                "kind": "origin_pool"
              },
              "weight": 1,
              "priority": 1,
              "endpoint_subsets": {}
            }
          ]
        }
      }
      displayJSON(config,'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Add HTTP Load Balancer -> JSON -> Copy paste the JSON config -> Save and Exit');    
}