---
sidebar_label: 'Overview'
title: Installation overview
description: "Overview of the components installed when setting up the SAP Data Services Connector, including software requirements."
tags:
  - Conceptual
  - System Administrator
  - Installation
---

# Installation overview

## What is it?

The SAP Data Services Connector installation consists of installing multiple components that are required to complete the installation successfully. This consists of:

* Installing a Windows Agent
* The SAP Data Services Connector
* Configuring the SAP Data Services Connector
* Installing the SAP Data Services Windows job subtype
* Installing the ACSSAPDataServices job subtype

The SAP Data Services Connector can be installed on the OpCon server or on a separate Windows server. When installing on a separate Windows server, an OpCon Windows Agent must be installed on the server.

## Requirements

The following software levels are required to implement the SAP Data Services Connector:

* SAP Data Services 4.2 or higher.
* OpCon Release 19 or higher.
* Uses embedded Open Java 1.8.
* ACSSAPDataServices requires OpCon 25.0.3 or higher.

## FAQs

**Can the connector be installed on the OpCon server?**
Yes. The connector can be installed on the OpCon server or on a separate Windows server. A Windows Agent must be present on the host where the connector runs.

**Do I need to install Java separately?**
No. The connector uses an embedded Open Java 1.8 distribution, so there is no reliance on installed Java versions.

**Which OpCon version is required for the ACSSAPDataServices subtype?**
ACSSAPDataServices requires OpCon 25.0.3 or higher. The Enterprise Manager subtype is supported on OpCon Release 19 or higher.

## Glossary

**ACSSAPDataServices** — The Solution Manager job subtype for SAP Data Services, distributed as an ACS plugin.

**Job subtype** — A specialization of a Windows job that exposes SAP Data Services-specific fields in the OpCon job definition UI.

**Windows Agent** — The OpCon agent that runs on a Windows server and starts the SAP Data Services Connector batch program.
