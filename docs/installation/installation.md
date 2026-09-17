---
sidebar_label: 'Installation'
title: SAP Data Services Connector installation
description: "Steps to extract and install the SAP Data Services Connector on the OpCon server or on a Windows host with a Windows Agent."
tags:
  - Procedural
  - System Administrator
  - Installation
---

# SAP Data Services Connector installation

## What is it?

The SAP Data Services Connector is delivered as a zip file. To install it, you extract the contents to a new `SAPDataServices` directory under your OpCon installation path. The connector is a Java program that the Windows Agent starts, so it must be installed on a host where a Windows Agent is available.

## Before you start

Make sure the following are in place before installing:

- A Windows Agent is installed on the host that will run the connector. The agent starts the connector, so it cannot run without one.
- You have the `SAPDSConnector-win.zip` distribution file.
- You know the OpCon installation path on the target host. The default is `C:\Program Files\OpConxps`.

:::note
The connector can be installed on a central server (the OpCon server) or directly on the SAP Data Services server. In either case, a Windows Agent must be present on that host.
:::

## Install the connector

To install the connector, complete the following steps:

1. Go to the `OpConxps` installation directory on the target host (default: `C:\Program Files\OpConxps`).
2. Create a new directory called `SAPDataServices`.
3. Extract the contents of `SAPDSConnector-win.zip` into the new `SAPDataServices` directory.

The connector files are now in place at `<OpConxps>\SAPDataServices`.

## What you get

After extraction, the `SAPDataServices` directory contains:

| Item | Purpose |
|---|---|
| `bods.exe` | The SAP Data Services Connector program. |
| `Encrypt.exe` | Utility that encodes a value for use in a configuration file. It is not used for SAP Data Services credentials — see the note below. |
| `Connector.config` | Connector configuration file. |
| `JAVA` directory | Embedded OpenJDK 1.8. No separate Java install is required. |
| `WSDL` directory | The `BODS_WSDL.wsdl` and supporting XML used by the connector. |
| `emplugins` directory | The Enterprise Manager job subtype JAR. |

:::note

SAP Data Services credentials are not stored in `Connector.config`. They are entered in each job definition and supplied to the connector by the Windows Agent using encrypted global properties. See [Defining SAP Data Services jobs in Enterprise Manager](../reference_information/em-defining-a-job.md) or [Defining SAP Data Services jobs in Solution Manager](../reference_information/sm-defining-a-job.md).

:::

## Next steps

After the connector files are in place, complete the following:

1. [Set up the SAP Data Services Global Property](./sap-gp-configuration.md) so jobs can reference the connector path.
2. [Configure `Connector.config`](../configuration.md) with your SAP Data Services server address and web service endpoint.
3. Install the job subtype for your UI:
    - [Enterprise Manager Subtype Set-up](./em-sapds-subtype.md)
    - [Solution Manager Subtype Set-up](./sm-sapds-subtype.md)

## FAQs

**Where should I extract the connector files?**
Extract them into a new `SAPDataServices` directory under the OpCon installation path (`OpConxps`) on the host that runs the Windows Agent.

**Does the connector require a Windows Agent?**
Yes. The agent is what starts the connector, so a Windows Agent must be present on the host that runs it.

**Can I install the connector on the SAP Data Services server itself?**
Yes. The connector can be installed on a central OpCon server or on the SAP Data Services server, provided a Windows Agent is installed on that server.

**Do I need to install Java?**
No. The connector uses an embedded OpenJDK 1.8 distribution in the `JAVA` directory.

## Glossary

**OpConxps** — The default OpCon installation directory on Windows.

**SAPDataServices directory** — The directory you create under `OpConxps` that holds the connector executable, configuration, embedded Java, WSDL files, and Enterprise Manager plugin.

**emplugins** — The directory in the connector distribution that holds the Enterprise Manager job subtype JAR file.
