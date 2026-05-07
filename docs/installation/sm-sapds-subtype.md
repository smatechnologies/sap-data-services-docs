---
sidebar_label: 'Solution Manager Subtype Set-up'
title: SAP Data Services subtype installation for Solution Manager
description: "Install the ACSSAPDataServices plugin, create the supporting script type, script runner, and config script, and define the SAP Data Services agent in Solution Manager."
tags:
  - Procedural
  - System Administrator
  - Installation
---

# SAP Data Services subtype installation for Solution Manager

## What is it?

The Solution Manager SAP Data Services subtype lets users define SAP Data Services jobs in Solution Manager. Setup has three parts:

1. **Install the plugin** — copy the ACSSAPDataServices files into the OpCon (or Relay) `plugins` directory and restart services.
2. **Create supporting scripts** — define a script type, a script runner, and the script that holds the connector's `Connector.config` content.
3. **Define the agent** — register the SAP Data Services agent in Solution Manager and link it to the config script.

All interactions with the Solution Manager subtype must be completed in Solution Manager.

## Before you start

Make sure the following are in place before installing:

- You have the `ACSSAPDataServices.zip` file. It is available on the FTP site at **OpCon Releases\\Integrations\\SapDataServices**.
- You know whether you are installing into an OpCon installation, a Relay installation, or both. The plugin path and service names differ.
- You have the contents of the `Connector.config` file you want the agent to use. See [SAP Data Services Connector configuration](../configuration.md) for the file format.

## Install the plugin

To install the plugin files, complete the following steps:

1. Extract `ACSSAPDataServices.zip`.
2. Copy the extracted **ACSSAPDataServices** directory into the appropriate plugin location:

    | Installation | Destination |
    |---|---|
    | OpCon | `\\SAM\\plugins` |
    | Relay | `\\SAM\\plugins` |

3. Restart the services for the installation type:

    | Installation | Services to restart |
    |---|---|
    | OpCon | **SMA OpCon RestAPI** and **SMA OpCon Service Manager** |
    | Relay | **Relay Service** |

The plugin is now loaded and ready to use.

## Create the supporting scripts

When using the Solution Manager subtype, two scripts must be created. The first script contains the `Connector.config` information and the second script contains the list information. The steps below cover the script type, script runner, and the `Connector.config` script.

### Step 1 — Create the script type

To create the script type, complete the following steps:

1. In Solution Manager, go to **Library** and select **Scripts**.
2. Select **Script Types** in the upper right hand corner.
3. Select **+ Add**.
4. Enter the following values:

    | Field | Value |
    |---|---|
    | **Name** | `ACSSAPDataServices` |
    | **File Extension** | `txt` |
    | **Description** | `Used for ACSSAPDataServices Integration` |

5. Select the **Save** button. The script type is created.

### Step 2 — Create the script runner

To create the script runner, complete the following steps:

1. In Solution Manager, go to **Library** and select **Scripts**.
2. Select **Script Runners** in the upper right hand corner.
3. Select **+ Add**.
4. Enter the following values:

    | Field | Value |
    |---|---|
    | **Name** | `ACSSAPDataServices` |
    | **OS** | `SAP Data Services` (selected from the list) |
    | **Type** | `ACSSAPDataServices` (selected from the list) |
    | **Command** | `cmd.exe /c` |

5. Select the **Save** button. The script runner is created.

### Step 3 — Create the Connector.config script

To create the script that holds the `Connector.config` content, complete the following steps:

1. In Solution Manager, go to **Library** and select **Scripts**.
2. Select **Scripts** in the upper right hand corner.
3. Select **+ Add**.
4. In the **Name** field, enter a name for the script. We recommend using the proposed agent name with `_config` appended (for example, `MyAgent_config`).
5. In the **Type** field, select **ACSSAPDataServices** from the list.
6. Assign the required roles.
7. In the **Script** area, paste the contents of the `Connector.config` file you prepared.
8. Select the **Save** button. The config script is created and ready to be referenced by the agent.

## Create the SAP Data Services agent definition

To register the agent in Solution Manager, complete the following steps:

1. In Solution Manager, go to **Library** and select **Agents**.
2. Select **+ Add**.
3. In the **Name** field, enter the name of the agent.
4. In the **Type** field, select **SAP Data Services** from the list.
5. In the **SAP Data Services Settings** section, enter the required information.
6. In the **Client Information** section, enter the following values:

    | Field | Value |
    |---|---|
    | **Directory** | The installation directory of the SAP Data Services Connector |
    | **Name** | `bods.exe` (default) |
    | **Config File Name** | `Connector.config` (default) |

7. In the **Config Script** section, enter the following values:

    | Field | Value |
    |---|---|
    | **Script Runner** | `ACSSAPDataServices` |
    | **Script** | The config script you created in [Step 3 — Create the Connector.config script](#step-3--create-the-connectorconfig-script) |

8. Select the **Save** button. The agent appears in the agent list and is ready to run SAP Data Services jobs.

## Next steps

After the agent is defined, you can:

- [Define a SAP Data Services job in Solution Manager](../reference_information/sm-defining-a-job.md) to start using the connector.
- Review [Logging and job output](../reference_information/logging-job-output.md) to learn where the connector writes log files.

## FAQs

**Where do I download the Solution Manager subtype?**
Download the `ACSSAPDataServices.zip` file from the FTP site under **OpCon Releases\\Integrations\\SapDataServices**.

**Where do I copy the extracted ACSSAPDataServices directory?**
Copy it into `\\SAM\\plugins` for OpCon and Relay installations.

**Which services do I restart after copying the plugin?**
For OpCon installations, restart the **SMA OpCon RestAPI** and **SMA OpCon Service Manager** services. For Relay installations, restart the **Relay Service**.

**Why do I need a separate script type and script runner?**
The script type registers `ACSSAPDataServices` as a recognized type in Solution Manager. The script runner tells Solution Manager how to run scripts of that type (`cmd.exe /c` against the `SAP Data Services` OS). Together they let the connector pick up the config script at job runtime.

**Where does the agent get its `Connector.config` content?**
From the script you reference in the **Config Script** section of the agent definition. The agent uses that script's contents as its `Connector.config`.

## Glossary

**ACSSAPDataServices** — The Solution Manager job subtype name and the script type/runner name used by the integration.

**Script Type** — A Solution Manager object that registers a category of scripts (here, `ACSSAPDataServices`) and the file extension to use.

**Script Runner** — A Solution Manager object that defines how a script of a given type is run, including the OS and command.

**Config Script** — A script in Solution Manager that holds the `Connector.config` content for the agent.

**SAM plugins directory** — The OpCon or Relay folder (`\\SAM\\plugins`) where ACS plugin packages are placed so they are loaded at service startup.
