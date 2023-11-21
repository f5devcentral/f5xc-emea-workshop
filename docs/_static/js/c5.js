function c5m1l2a() {        
    const config = {
      "metadata": {
        "name": info.ceOnPrem.clusterName,
        "disable": false
      },
      "spec": {
        "volterra_certified_hw": "kvm-voltstack-combo",
        "master_node_configuration": [
          {
            "name": "master"
          }
        ],
        "no_bond_devices": {},
        "default_network_config": {},
        "default_storage_config": {},
        "disable_gpu": {},
        "coordinates": {
          "latitude": 40,
          "longitude": 40
        },
        "k8s_cluster": {
          "tenant": "f5-emea-workshop-dblyrrcj",
          "namespace": "system",
          "name": "k8s",
          "kind": "k8s_cluster"
        },
        "logs_streaming_disabled": {},
        "deny_all_usb": {},
        "disable_vm": {},
        "default_blocked_services": {},
        "sw": {
          "default_sw_version": {}
        },
        "os": {
          "default_os_version": {}
        },
        "offline_survivability_mode": {
          "no_offline_survivability_mode": {}
        },
        "default_sriov_interface": {}
      }
    }
    
    displayJSON(config, 'Multi-Cloud Network Connect -> Site Management -> App Stack Sites -> Add App Stack Site -> JSON -> Copy paste the JSON config -> Save and Exit');    
}



function c5m1l3a() {        
    const config = {
        "metadata": {
          "name": "arcadia-hc",
          "disable": false
        },
        "spec": {
          "http_health_check": {
            "use_origin_server_name": {},
            "path": "/healthz",
            "use_http2": false,
            "expected_status_codes": [
              "200"
            ]
          },
          "timeout": 3,
          "interval": 15,
          "unhealthy_threshold": 1,
          "healthy_threshold": 3,
          "jitter_percent": 30
        }
    }
    displayJSON(config,'Multi-Cloud App Connect -> Manage -> Load Balancers -> Health Checks -> Add Health Check -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c5m1l3b({name,serviceName}) {        
    const config = {
        "metadata": {
          "name": name,
          "disable": false
        },
        "spec": {
          "origin_servers": [
            {
              "k8s_service": {
                "service_name": serviceName,
                "site_locator": {
                  "site": {
                    "tenant": "f5-emea-workshop-dblyrrcj",
                    "namespace": "system",
                    "name": info.ceOnPrem.clusterName,
                    "kind": "site"
                  }
                },
                "outside_network": {}
              }
            }
          ],
          "no_tls": {},
          "port": 80,
          "same_as_endpoint_port": {},
          "healthcheck": [
            {
              "tenant": "f5-emea-workshop-dblyrrcj",
              "namespace": info.namespace,
              "name": "arcadia-hc",
              "kind": "healthcheck"
            }
          ],
          "loadbalancer_algorithm": "LB_OVERRIDE",
          "endpoint_selection": "LOCAL_PREFERRED"
        }
    }
    displayJSON(config,'Multi-Cloud App Connect -> Manage -> Load Balancers -> Origin Pools -> Add Origin Pool -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c5m1l3c() {
  
    const config = lbConfig({
      name: 'arcadia-ce-k8s-lb',
      namespace: info.namespace,
      poolName: 'arcadia-frontend',
      domains: [`arcadia-ce-k8s-${info.makeId}.workshop.emea.f5se.com`],                  
      routes:[
        {
            prefix: '/v1/user',
            pool: 'arcadia-users'
        },
        {
            prefix: '/v1/login',
            pool: 'arcadia-login'
        },
        {
          prefix: '/v1/stock/',
          pool: 'arcadia-stocks'
        },
        {
          prefix: '/v1/stockt',
         pool: 'arcadia-stock-transaction'
        }
      ]
    });
    
    displayJSON( config, 'Multi-Cloud App Connect -> Manage -> Load Balancers -> HTTP Load Balancers -> Add HTTP Load Balancer -> JSON -> Copy paste the JSON config -> Save and Exit' );    
  }



function c5m2l1a() {
  
    const config = {
        "metadata": {
          "name": info.vk8sName,
          "disable": false
        },
        "spec": {
          "disabled": {}
        }
    };
    
    displayJSON( config, 'Distributed Apps -> Applications -> Virtual K8s -> Add Virtual K8s -> JSON -> Copy paste the JSON config -> Save and Exit' );    
  }  
  
function c5m2l1b() {        
    const config = {
      "metadata": {
        "name": "arcadia-stocks",
        "disable": false
      },
      "spec": {
        "service": {
          "num_replicas": 1,
          "containers": [
            {
              "name": "stocks",              
              "image": {
                "name": "registry.hub.docker.com/sorinboiaf5/arcadia-stocks:ocp",
                "container_registry": {
                    "tenant": "f5-emea-workshop-dblyrrcj",
                    "namespace": "shared",
                    "name": "emeaworkshops",
                    "kind": "container_registry"
                  },
                "pull_policy": "IMAGE_PULL_POLICY_DEFAULT"
              },
              "init_container": false,
              "flavor": "CONTAINER_FLAVOR_TYPE_TINY"
            }
          ],
          "deploy_options": {
            "deploy_re_sites": {
              "site": [
                {
                  "tenant": "ves-io",
                  "namespace": "system",
                  "name": "tn2-lon",
                  "kind": "site"
                }
              ]
            }
          },
          "advertise_options": {
            "advertise_in_cluster": {
              "port": {
                "info": {
                  "port": 80,
                  "protocol": "PROTOCOL_TCP",
                  "target_port": 8080
                }
              }
            }
          }
        }
      }
    }
    displayJSON(config,'Distributed Apps -> Applications -> Virtual K8s -> Click on vk8s-....-..... -> Workloads -> Add VK8s Workload -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c5m2l1c() {        
    const config = {
      "metadata": {
        "name": "arcadia-stocks-vk8s",
        "disable": false
      },
      "spec": {
        "origin_servers": [
          {
            "k8s_service": {
              "service_name": `arcadia-stocks.${info.namespace}`,
              "site_locator": {
                "virtual_site": {
                  "tenant": "ves-io",
                  "namespace": "shared",
                  "name": "ves-io-all-res",
                  "kind": "virtual_site"
                }
              },
              "vk8s_networks": {}
            }
          }
        ],
        "no_tls": {},
        "port": 80,
        "same_as_endpoint_port": {},
        "loadbalancer_algorithm": "LB_OVERRIDE",
        "endpoint_selection": "LOCAL_PREFERRED"
      }
    }
    displayJSON(config,'Multi-Cloud App Connect -> Manage -> Load Balancers -> Origin Pools -> Add Origin Pool -> JSON -> Copy paste the JSON config -> Save and Exit');    
  }

function c5m2l1d() {
  
    const config = lbConfig({
      name: 'arcadia-ce-k8s-lb',
      namespace: info.namespace,
      poolName: 'arcadia-frontend',
      domains: [`arcadia-ce-k8s-${info.makeId}.workshop.emea.f5se.com`],                  
      routes:[
        {
            prefix: '/v1/user',
            pool: 'arcadia-users'
        },
        {
            prefix: '/v1/login',
            pool: 'arcadia-login'
        },
        {
          prefix: '/v1/stock/',
          pool: 'arcadia-stocks-vk8s'
        },
        {
          prefix: '/v1/stockt',
         pool: 'arcadia-stock-transaction'
        }
      ]
    });
    
    displayJSON( config, 'Multi-Cloud App Connect -> Manage -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the arcadia-ce-k8s-lb row -> Manage Configuration -> Edit Configuration -> -> JSON -> Copy paste the JSON config -> Save and Exit' );    
  }

function c5m3l1a() {
  
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


function c5m3l1b() {
  
    const config = lbConfig({
      name: 'arcadia-ce-k8s-lb',
      namespace: info.namespace,
      poolName: 'arcadia-frontend',
      domains: [`arcadia-ce-k8s-${info.makeId}.workshop.emea.f5se.com`],                  
      wafPolicy: 'arcadia-waf',
      routes:[
        {
            prefix: '/v1/user',
            pool: 'arcadia-users'
        },
        {
            prefix: '/v1/login',
            pool: 'arcadia-login'
        },
        {
          prefix: '/v1/stock/',
          pool: 'arcadia-stocks-vk8s'
        },
        {
          prefix: '/v1/stockt',
         pool: 'arcadia-stock-transaction'
        }
      ]
    });
    
    displayJSON( config, 'Multi-Cloud App Connect -> Manage -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the arcadia-ce-k8s-lb row -> Manage Configuration -> Edit Configuration -> -> JSON -> Copy paste the JSON config -> Save and Exit' );    
  }  


  function c5m4l2a({name,serviceName}) {        
    const config = {
        "metadata": {
          "name": name,
          "disable": false
        },
        "spec": {
          "origin_servers": [
            {
              "k8s_service": {
                "service_name": serviceName,
                "site_locator": {
                  "site": {
                    "tenant": "f5-emea-workshop-dblyrrcj",
                    "namespace": "system",
                    "name": info.ceOnPrem.clusterName,
                    "kind": "site"
                  }
                },
                "vk8s_networks": {}
              }
            }
          ],
          "no_tls": {},
          "port": 80,
          "same_as_endpoint_port": {},
          "healthcheck": [
            {
              "tenant": "f5-emea-workshop-dblyrrcj",
              "namespace": info.namespace,
              "name": "arcadia-hc",
              "kind": "healthcheck"
            }
          ],
          "loadbalancer_algorithm": "LB_OVERRIDE",
          "endpoint_selection": "LOCAL_PREFERRED"
        }
    }
    displayJSON(config,'Multi-Cloud App Connect -> Manage -> Load Balancers -> Origin Pools -> Add Origin Pool -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c5m4l2b() {
  
  const config = lbConfig({
    name: 'arcadia-ce-appstack-lb',
    namespace: info.namespace,
    poolName: 'arcadia-frontend-appstack',
    domains: [`arcadia-ce-appstack-${info.makeId}.workshop.emea.f5se.com`],                  
    routes:[
      {
          prefix: '/v1/user',
          pool: 'arcadia-users-appstack'
      },
      {
          prefix: '/v1/login',
          pool: 'arcadia-login-appstack'
      },
      {
        prefix: '/v1/stock/',
        pool: 'arcadia-stocks-appstack'
      },
      {
        prefix: '/v1/stockt',
       pool: 'arcadia-stock-transaction-appstack'
      }
    ]
  });
  
  displayJSON( config, 'Multi-Cloud App Connect -> Manage -> Load Balancers -> HTTP Load Balancers -> Add HTTP Load Balancer -> JSON -> Copy paste the JSON config -> Save and Exit' );    
}


function c5m5l2a({name,serviceName}) {        
  const config = {
      "metadata": {
        "name": name,
        "disable": false
      },
      "spec": {
        "origin_servers": [
          {
            "k8s_service": {
              "service_name": serviceName,
              "site_locator": {
                "site": {
                  "tenant": "f5-emea-workshop-dblyrrcj",
                  "namespace": "system",
                  "name": info.cek8s,
                  "kind": "site"
                }
              },
              "vk8s_networks": {}
            }
          }
        ],
        "no_tls": {},
        "port": 80,
        "same_as_endpoint_port": {},
        "healthcheck": [
          {
            "tenant": "f5-emea-workshop-dblyrrcj",
            "namespace": info.namespace,
            "name": "arcadia-hc",
            "kind": "healthcheck"
          }
        ],
        "loadbalancer_algorithm": "LB_OVERRIDE",
        "endpoint_selection": "LOCAL_PREFERRED"
      }
  }
  displayJSON(config,'Multi-Cloud App Connect -> Manage -> Load Balancers -> Origin Pools -> Add Origin Pool -> JSON -> Copy paste the JSON config -> Save and Exit');    
}


function c5m5l2b() {
  
  const config = lbConfig({
    name: 'arcadia-ce-cek8s-lb',
    namespace: info.namespace,
    poolName: 'arcadia-frontend-cek8s',
    domains: [`arcadia-ce-appstack-${info.makeId}.workshop.emea.f5se.com`],                  
    routes:[
      {
          prefix: '/v1/user',
          pool: 'arcadia-users-cek8s'
      },
      {
          prefix: '/v1/login',
          pool: 'arcadia-login-cek8s'
      },
      {
        prefix: '/v1/stock/',
        pool: 'arcadia-stocks-cek8s'
      },
      {
        prefix: '/v1/stockt',
       pool: 'arcadia-stock-transaction-cek8s'
      }
    ]
  });

  displayJSON( config, 'Multi-Cloud App Connect -> Manage -> Load Balancers -> HTTP Load Balancers -> Add HTTP Load Balancer -> JSON -> Copy paste the JSON config -> Save and Exit' );    
}