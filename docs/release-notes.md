---
sidebar_label: 'Release Notes'
title: SAP Data Services Connector release notes
description: "Version history and change details for the SAP Data Services Connector, including new features, improvements, and bug fixes."
tags:
  - Reference
  - System Administrator
  - Connectors
---

# SAP Data Services Connector release notes

## 21

### 21.00.0000

2021 December

### What's new

:eight_spoked_asterisk: **CONNUTIL-540**: CVE-2021-44228 adjustment removing log4j as the logging component.

:eight_spoked_asterisk: **CONNUTIL-541**: Log file does not switch on defined values.

### Why this matters

Removing log4j as the logging component addresses the CVE-2021-44228 (Log4Shell) vulnerability. The fix to log file rotation ensures that log files now switch on the defined values, preventing log files from growing unbounded.

### Migration considerations

This release includes the new format installer where the files are extracted from the zip file into the desired directory. It contains an embedded Java version for the connector so there is no reliance on installed Java versions.

The configuration file has also been renamed from **Agent.config** to **Connector.config**.

The user password defined in the job definition should be changed from an Enterprise Manager encrypted value to using encrypted global properties. This means that the associated Windows Agent must support the EncryptedTokens feature.

There is no need to upgrade the job-subtype.
