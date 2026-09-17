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

## 24

### 24.3.0

**Released:** 2026 May

#### What's new

- **CON-1330**: Removed vulnerability CVE-2022-41404 by replacing the ini4j library with the Apache Commons Configuration library.

## 21

### 21.00.0000

**Released:** 2021 December

#### What's new

- **CONNUTIL-540**: CVE-2021-44228 adjustment removing log4j as the logging component.

- **CONNUTIL-541**: Log file does not switch on defined values.

#### Why this matters

Removing log4j as the logging component addresses the CVE-2021-44228 (Log4Shell) vulnerability. The fix to log file rotation means each log file now switches at its configured size limit instead of growing without bound.

Note that completed log files are retained indefinitely, so the `log` directory itself still grows until you remove old files. See [Logging and job output](./reference_information/logging-job-output.md).

#### Migration considerations

This release includes the new format installer where the files are extracted from the zip file into the desired directory. It contains an embedded Java version for the connector so there is no reliance on installed Java versions.

The configuration file has also been renamed from **Agent.config** to **Connector.config**.

The user password defined in the job definition should be changed from an Enterprise Manager encrypted value to using encrypted global properties. This means that the associated Windows Agent must support the EncryptedTokens feature.

There is no need to upgrade the job-subtype.
