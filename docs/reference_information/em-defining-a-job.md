---
sidebar_label: Enterprise Manager Defining a Job
title: Defining SAP Data Services jobs in Enterprise Manager
description: "Reference for the SAP Data Services job subtype fields in Enterprise Manager, including the CANCEL, PING, START, and TRACK job types."
tags:
  - Reference
  - Automation Engineer
  - Jobs
---

# Defining SAP Data Services jobs using Enterprise Manager

## What is it?

Enterprise Manager includes job subtype definitions for the SAP Data Services Scheduler. The subtype is available in the job subtype list when the **Windows** job type is selected. The SAP Data Services Connector does not create job definitions in the SAP Data Services database — it references existing jobs.

## Job types at a glance

Pick the job type that matches what you want OpCon to do in SAP Data Services. Each type uses a different set of tabs in the job definition screen.

| Job type | What it does | Tabs available |
|---|---|---|
| **CANCEL** | Cancels the last running job that matches a job name in the defined repository. | **Cancel**, **Failure Criteria** |
| **PING** | Tests the communications link between the connector and the SAP Data Services environment. No additional parameters. | (none beyond common fields) |
| **START** | Starts a job in the SAP Data Services environment. | **Start**, **Substitution Parameters**, **Global Variables**, **Failure Criteria** |
| **TRACK** | Checks the status of a job that was not started by an OpCon START. | **Track**, **Failure Criteria** |

## Job definition screen

The screen below appears when you select the **SAP Data Services** subtype on a Windows job. The fields described in [Common fields](#common-fields) apply to every job type.

![Job Definition Screen](../../static/img/SAPDS_JobDefinitionScreen.png)

## Common fields

Every CANCEL, PING, START, and TRACK job uses the following fields.

| Field | Required | Description |
|---|---|---|
| **Connector Path** | Yes | Installed location of the SAP Data Services Connector. Should not be changed; the location should be defined in the **BODSPath** property. If more than one SAP Data Services Connector is installed on the same system, define a new Global Property and update this field to use it. |
| **Function** | Yes | The function to run. Select **CANCEL**, **PING**, **START**, or **TRACK** from the list. The selected value determines which tabs are available. |
| **User Name** | Yes | Name of a SAP Data Services user that has the required privileges to run the job. |
| **User Password** | Yes | Password of the defined SAP Data Services user. Use the encrypted global token capability so the value is decrypted by the Windows Agent and passed to the connector. |
| **CMS System** | Yes | Name of the Central Management Server associated with the SAP BODS installation. |
| **CMS Authentication** | Yes | Authentication mode associated with the user defined in **User Name**. Select a value from the list that matches your installation: `Enterprise`, `LDAP`, `WinAD`, or `SAPR3`. |

## Job type details

### CANCEL

The CANCEL job type cancels the last running job of the defined job name in the defined repository.

![Cancel Job Screen](../../static/img/cancel.png)

| Field | Required | Description |
|---|---|---|
| **Job Name** | Yes | Name of the job to cancel. The connector searches for the last job ID that matches the defined job name and has a `running` status. |
| **Repository** | Yes | Name of the repository within which the job is defined. |

### PING

A PING job type has no additional parameters and is used to test the communications link between the SAP Data Services Connector and the SAP Data Services environment. Only the [Common fields](#common-fields) are required.

### START

The START job type starts a job in the SAP Data Services environment. The **Start**, **Substitution Parameters**, **Global Variables**, and **Failure Criteria** tabs are available, with the **Start** tab displayed.

![Start Job Details](../../static/img/start.png)

| Field | Required | Description |
|---|---|---|
| **Job Name** | Yes | Name of the job to start. |
| **Repository** | Yes | Name of the repository within which the job is defined. |
| **System Config** | No | A file that contains configuration information for a specific SAP Data Services installation. Mapped to the `job_system_profile` field. |
| **Job Server** | Conditional | Name of a defined server on which the job runs. Mutually exclusive with **Job Server Group**. Either **Job Server** or **Job Server Group** must be present. |
| **Job Server Group** | Conditional | Name of a defined Job Server Group on which the job runs. Mutually exclusive with **Job Server**. Either **Job Server** or **Job Server Group** must be present. |
| **Initial Poll Delay** | Yes | Initial poll delay (seconds) when checking for the status of the job after it has been started. |
| **Poll Delay** | Yes | Poll delay (seconds) between subsequent status checks. |

#### Global Variables tab

The **Global Variables** tab passes global variables to the job to be started. Global variables are usually defined in SAP Data Services with a preceding dollar sign (`$`) (for example, `$Variable`).

![Global Variables Screen](../../static/img/global_prop.png)

:::note
It is **NOT** necessary to add the preceding `$` when entering the field in the **Global Variables** Variable List.
:::

| Button | Purpose |
|---|---|
| **Add** | Adds a Global Variable to the Variable List. Enter a value in the **Variable Name** field and the **Value** field, then select **Add**. |
| **Update** | Updates a Global Variable. Select the variable in the list, modify it, then select **Update**. |
| **Remove** | Removes a Global Variable from the Variable List. Select the variable in the list, then select **Remove**. |

### TRACK

Use TRACK when you need to check the status of a job running in the SAP Data Services environment that was not started by an OpCon START.

![Track Job Screen](../../static/img/track.png)

| Field | Required | Description |
|---|---|---|
| **Job Name** | Yes | Name of the job to track. The connector searches for the job ID that matches the job name of the latest job which is in a running state. |
| **Job Status** | Yes | Status of the job. Select a value from the list. When tracking a job, the `running` status should be selected. |
| **Repository** | Yes | Name of the repository within which the job is defined. |
| **Initial Poll Delay** | Yes | Initial poll delay (seconds) when checking for the status. |
| **Poll Delay** | Yes | Poll delay (seconds) between subsequent status checks. |

## Failure Criteria

The CANCEL, PING, START, and TRACK job types all require a Failure Criteria definition. SAP Data Services scheduled tasks return the following codes:

| Return code | Meaning |
|---|---|
| `0` | `FINISHED_OK` — the job completed processing. |
| `1` | `ERRORED` — an exception occurred during job processing. A returned warning from SAP Data Services is logged and mapped to `ERRORED`. |

To check for a successful completion, set Failure Criteria to NE (Not Equal) to `0`.

![Failure Criteria](../../static/img/failure_crit.png)

## FAQs

**Which job type should I use to cancel a SAP Data Services job?**
CANCEL. It cancels the last running job that matches the defined job name in the defined repository.

**Why are Job Server and Job Server Group mutually exclusive?**
A START job runs on either a single Job Server or a Job Server Group, not both. The connector requires one of the two fields to be set.

**Should I include the dollar sign when entering global variables?**
No. The preceding `$` is added by SAP Data Services. Enter the variable name without it on the **Global Variables** tab.

**What Failure Criteria should I use to detect a successful job?**
Set Failure Criteria to NE (Not Equal) to `0`. Return code `0` indicates `FINISHED_OK`; return code `1` indicates `ERRORED`. SAP Data Services warnings are mapped to `ERRORED`.

**How do I supply credentials securely?**
Use the encrypted global token capability for **User Password**. The Windows Agent decrypts the value and passes it to the connector at runtime.

## Glossary

**CMS** — Central Management Server, the SAP Business Objects component the connector authenticates against.

**Repository** — The SAP Data Services metadata store where job definitions reside.

**Job Server / Job Server Group** — The SAP Data Services execution targets where a batch job runs. A job is sent to one or the other, not both.

**Substitution Parameters** — Job-level parameters in SAP Data Services that can be passed at start time.

**Global Variables** — Job-level variables in SAP Data Services, defined with a preceding `$` in SAP Data Services itself but entered without the `$` in the OpCon job definition.
