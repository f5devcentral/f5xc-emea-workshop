resource "azurerm_resource_group" "aks_resources" {
  name     = "${var.resource_prefix}-${var.cluster_name}-rg"
  location = var.location
}

resource "azurerm_kubernetes_cluster" "aks_cluster" {
  name                = var.cluster_name
  location            = azurerm_resource_group.aks_resources.location
  resource_group_name = azurerm_resource_group.aks_resources.name
  dns_prefix          = var.cluster_name

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = var.vm_size
  }

  identity {
    type = "SystemAssigned"
  }

  addon_profile {
    aci_connector_linux {
      enabled = false
    }

    azure_policy {
      enabled = false
    }

    http_application_routing {
      enabled = false
    }

    oms_agent {
      enabled = false
    }
  }
}