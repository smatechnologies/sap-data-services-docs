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

The SAP Data Services Connector is delivered as a zip file. To install it, you extract the contents to a new `SAPDataServices` directory under your OpCon installation path. The connector runs as a Windows batch program started by the Windows Agent, so it must be installed on a host where a Windows Agent is available.

## Before you start

Make sure the following are in place before installing:

- A Windows Agent is installed on the host that will run the connector. The connector runs as a Windows batch job and cannot run without an agent.
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
| Connector executable | The SAP Data Services Connector program. |
| Encryption executable | Used to encrypt SAP Data Services credentials. |
| `Connector.config` | Connector configuration file. |
| `JAVA` directory | Embedded OpenJDK 1.8. No separate Java install is required. |
| `WSDL` directory | The `BODS_WSDL.wsdl` and supporting XML used by the connector. |
| `emplugins` directory | The Enterprise Manager job subtype JAR. |

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
Yes. The connector runs as a Windows batch program, so a Windows Agent must be present on the host that runs the connector.

**Can I install the connector on the SAP Data Services server itself?**
Yes. The connector can be installed on a central OpCon server or on the SAP Data Services server, provided a Windows Agent is installed on that server.

**Do I need to install Java?**
No. The connector uses an embedded OpenJDK 1.8 distribution in the `JAVA` directory.

## Glossary

**OpConxps** — The default OpCon installation directory on Windows.

**SAPDataServices directory** — The directory you create under `OpConxps` that holds the connector executable, configuration, embedded Java, WSDL files, and Enterprise Manager plugin.

**emplugins** — The directory in the connector distribution that holds the Enterprise Manager job subtype JAR file.
