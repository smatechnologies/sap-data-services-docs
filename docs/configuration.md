---
sidebar_label: 'SAPDS Connector Configuration'
title: SAP Data Services Connector configuration
description: "Configure the Connector.config file so the SAP Data Services Connector can reach the web services endpoint and the BODS WSDL definition."
tags:
  - Procedural
  - System Administrator
  - Connectors
---

# SAP Data Services Connector configuration

## What is it?

The `Connector.config` file tells the SAP Data Services Connector where to send web service calls and where to find the WSDL that describes those calls. It is a plain text INI-style file with two sections: `[CONNECTOR]` and `[DATA SERVICES]`. After you install the connector, you must edit this file before any SAP Data Services job will run.

## Before you start

Make sure the following are in place before editing the file:

- The connector is installed at `<OpConxps>\SAPDataServices`. See [SAP Data Services Connector installation](./installation/installation.md).
- You know the address (host and port) of the SAP Data Services web server.
- You know whether your SAP Data Services installation uses the default web services endpoint (`/DataServices/servlet/webservices?ver=2.1`) or a custom one.

## Configure the file

To configure the connector, complete the following steps:

1. Open `Connector.config` in the connector installation directory in a text editor.
2. In the `[CONNECTOR]` section, leave `CONNECTOR_NAME` unchanged. This value should not be changed from its delivered setting.
3. In the `[CONNECTOR]` section, set `DEBUG`:

    | Value | When to use |
    |---|---|
    | `OFF` | Normal operation. This is the default. |
    | `ON` | Only when requested to capture an error condition. |

4. In the `[DATA SERVICES]` section, set `DATA_SERVICES_SERVER_ADDRESS` to the address of the web server hosting the SAP Data Services web service (for example, `http://VM-SAP-DS:8080`). This value overrides the web server address in the supplied WSDL.
5. In the `[DATA SERVICES]` section, set `DATA_SERVICES_WEB_SERVICES_ENDPOINT`. Use the default value `/DataServices/servlet/webservices?ver=2.1` unless the endpoint was changed during the SAP Data Services installation.
6. In the `[DATA SERVICES]` section, leave `DATA_SERVICES_WSDL_LOCATION` unchanged. This value should not be changed.
7. Save the file.

`Connector.config` is now ready for the connector to use on the next job run.

## File template

The empty file has the following structure:

```ini
[CONNECTOR]
CONNECTOR_NAME=
DEBUG=

[DATA SERVICES]
DATA_SERVICES_SERVER_ADDRESS=
DATA_SERVICES_WEB_SERVICES_ENDPOINT=
DATA_SERVICES_WSDL_LOCATION=
```

## Settings reference

### `[CONNECTOR]` section

| Setting | Description | Default | Notes |
|---|---|---|---|
| `CONNECTOR_NAME` | The name of the connector. | (delivered value) | Do not change. |
| `DEBUG` | Connector debug mode. | `OFF` | Set to `ON` only when requested to capture an error condition. |

### `[DATA SERVICES]` section

| Setting | Description | Default | Notes |
|---|---|---|---|
| `DATA_SERVICES_SERVER_ADDRESS` | Address of the web server that hosts the SAP Data Services web service. | (none) | The value here overrides the web server address in the supplied WSDL. |
| `DATA_SERVICES_WEB_SERVICES_ENDPOINT` | Endpoint for the SAP Data Services web services. | `/DataServices/servlet/webservices?ver=2.1` | Use the default unless the endpoint was changed during the SAP Data Services installation. |
| `DATA_SERVICES_WSDL_LOCATION` | Location of `BODS_WSDL.wsdl` relative to the connector installation directory. | `wsdl/BODS_WSDL.wsdl` | Do not change. |

## Example

:::tip Example
A typical `Connector.config`:

```ini
[CONNECTOR]
CONNECTOR_NAME=SAP Data Services Connector
DEBUG=ON

[DATA SERVICES]
DATA_SERVICES_SERVER_ADDRESS=http://VM-SAP-DS:8080
DATA_SERVICES_WEB_SERVICES_ENDPOINT=/DataServices/servlet/webservices?ver=2.1
DATA_SERVICES_WSDL_LOCATION=wsdl/BODS_WSDL.wsdl
```
:::

## Next steps

After the file is saved, continue with:

- [Set up the SAP Data Services Global Property](./installation/sap-gp-configuration.md) to make the connector path easy to reference from jobs.
- Install the job subtype for your UI: [Enterprise Manager](./installation/em-sapds-subtype.md) or [Solution Manager](./installation/sm-sapds-subtype.md).
- [Define a SAP Data Services job](./reference_information/em-defining-a-job.md) and run a `PING` to verify the configuration end-to-end.

## FAQs

**When should I enable DEBUG?**
Enable DEBUG (`ON`) only when requested to capture an error condition. The connector should otherwise run with DEBUG disabled (`OFF`).

**Do I need to change the WSDL location?**
No. `DATA_SERVICES_WSDL_LOCATION` should not be changed.

**What if my Data Services installation uses a different endpoint?**
The default `/DataServices/servlet/webservices?ver=2.1` should be used unless the endpoint has been changed during the SAP Data Services installation. If it has, enter the customized endpoint value in `DATA_SERVICES_WEB_SERVICES_ENDPOINT`.

**Why does `DATA_SERVICES_SERVER_ADDRESS` need to be set if it's already in the WSDL?**
The value in `Connector.config` overrides the address that ships in `BODS_WSDL.wsdl`. Setting it here means you do not have to edit the WSDL when the SAP Data Services host or port changes.

**How do I verify the configuration works?**
Define a job with the `PING` job type and run it. PING tests the communications link between the connector and the SAP Data Services environment without running a batch job.

## Glossary

**Connector.config** — The configuration file for the SAP Data Services Connector. Renamed from `Agent.config` in version 21.

**Endpoint** — The URL path on the Data Services web server where the connector sends web service requests.

**WSDL** — Web Services Description Language file. The connector uses `BODS_WSDL.wsdl` to define the web service operations it can call against SAP Data Services.

**PING job type** — A connector job type that has no parameters and is used to test the communication path between the connector and SAP Data Services.
