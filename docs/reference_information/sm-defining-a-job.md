---
sidebar_label: Solution Manager Defining a Job
title: Defining SAP Data Services jobs in Solution Manager
description: "Reference for the SAP Data Services job type fields in Solution Manager, including the Cancel, Ping, Start, and Track task types."
tags:
  - Reference
  - Automation Engineer
  - Jobs
---

# Defining SAP Data Services jobs using Solution Manager

## What is it?

Solution Manager includes a SAP Data Services job type to assist with the definition of SAP Data Services jobs. The job type displays fields to generate the command line for the different supported SAP Data Services commands. The SAP Data Services Connector does not create job definitions in the SAP Data Services database — it references existing jobs.

To define a job, select the **SAP Data Services** job type and then select the required task type from the list.

## Task types at a glance

| Task type | What it does |
|---|---|
| **Cancel** | Cancels a running task. |
| **Ping** | Tests the connection to the SAP system. |
| **Start** | Starts a new task. |
| **Track** | Tracks a running task. |

## Integration selection

| Field | Description |
|---|---|
| **Integrations or Integration Group** | Defines the SAP Data Services machine that is associated with the connector. |

## Common authentication fields

The following fields are required by **every** task type. Per-task tables below show only the additional, task-specific fields.

| Field | Required | Description |
|---|---|---|
| **User Name** | Yes | Name of a SAP Data Services user that has the required privileges to run the job. |
| **User Password** | Yes | Password of the defined SAP Data Services user. Use the encrypted global token capability so the value is decrypted by the Windows Agent and passed to the connector. |
| **CMS System** | Yes | Name of the Central Management Server associated with the SAP BODS installation. |
| **CMS Authentication** | Yes | Authentication mode associated with the user defined in **User Name**. Select a value from the list that matches your installation: `Enterprise`, `LDAP`, `WinAD`, or `SAPR3`. |

## Task details

### Cancel

A Cancel task cancels the last running job of the defined job name in the defined repository.

**Additional fields** (in addition to [Common authentication fields](#common-authentication-fields)):

| Field | Required | Description |
|---|---|---|
| **Job Name** | Yes | Name of the job to cancel. The connector searches for the last job ID that matches the defined job name and has a `running` status. |
| **Repository** | Yes | Name of the repository within which the job is defined. |

### Ping

A Ping task has no additional parameters apart from those needed to authenticate against SAP Data Services. Use it to test the communications link between the SAP Data Services Connector and the SAP Data Services environment. Only the [Common authentication fields](#common-authentication-fields) are required.

### Start

A Start task starts a job in the SAP Data Services environment.

**Additional fields** (in addition to [Common authentication fields](#common-authentication-fields)):

| Field | Required | Description |
|---|---|---|
| **Job Name** | Yes | Name of the job to start. |
| **Repository** | Yes | Name of the repository within which the job is defined. |
| **System Config** | No | Defines a specific system configuration environment to be used for this run. |
| **Job Server** | Conditional | Name of the server on which the job runs. Mutually exclusive with **Job Server Group**. Either **Job Server** or **Job Server Group** must be present. |
| **Job Server Group** | Conditional | Name of a Job Server Group on which the job runs. Mutually exclusive with **Job Server**. Either **Job Server** or **Job Server Group** must be present. |
| **Disable Audit** | No | When selected, submits a request to disable auditing for this run. |
| **Initial Poll Delay** | Yes | Initial poll delay (seconds) when checking for the status of the job after it has been started. |
| **Poll Delay** | Yes | Poll delay (seconds) between subsequent status checks. |

#### Substitution Parameters

Substitution Parameters pass values to the job being started.

| Action | How |
|---|---|
| Add | Select **+ AddItem** and enter the definition. |
| Update | Update the definition in place. |
| Remove | Select the **-** button to the right of the text area. |

#### Global Variables

Global Variables pass variables to the job being started. Global variables are usually defined in SAP Data Services with a preceding dollar sign (`$`) (for example, `$Variable`). Enter the variable name **without** the `$` in the OpCon job definition.

| Action | How |
|---|---|
| Add | Select **+ AddItem** and enter the definition. |
| Update | Update the definition in place. |
| Remove | Select the **-** button to the right of the text area. |

### Track

Use Track when you need to check the status of a job running in the SAP Data Services environment that was not started by an OpCon Start job type.

**Additional fields** (in addition to [Common authentication fields](#common-authentication-fields)):

| Field | Required | Description |
|---|---|---|
| **Job Name** | Yes | Name of the job to track. The connector searches for the job ID that matches the job name of the latest job which is in a running state. |
| **Job Status** | Yes | Status of the job. Select a value from the list. When tracking a job, the `running` status should be selected. |
| **Repository** | Yes | Name of the repository within which the job is defined. |
| **Initial Poll Delay** | Yes | Initial poll delay (seconds) when checking for the status. |
| **Poll Delay** | Yes | Poll delay (seconds) between subsequent status checks. |

## FAQs

**Which task types does the SAP Data Services job type support?**
Cancel, Ping, Start, and Track.

**Are Job Server and Job Server Group required for a Start task?**
One of the two is required. The fields are mutually exclusive — a Start task runs on either a single Job Server or a Job Server Group, not both.

**Why use Track instead of Start?**
Use Track to check the status of a job in SAP Data Services that was started outside of OpCon. Use Start when OpCon is responsible for starting the job.

**Should I include the dollar sign when entering global variables?**
No. The preceding `$` is added by SAP Data Services. Enter the variable name without it.

**How do I supply credentials securely?**
Use the encrypted global token capability for **User Password**. The Windows Agent decrypts the value and passes it to the connector at runtime.

## Glossary

**CMS** — Central Management Server, the SAP Business Objects component the connector authenticates against.

**Repository** — The SAP Data Services metadata store where job definitions reside.

**Job Server / Job Server Group** — The SAP Data Services execution targets where a batch job runs.

**Substitution Parameters** — Job-level parameters in SAP Data Services that can be passed at start time.

**Global Variables** — Job-level variables in SAP Data Services, defined with a preceding `$` in SAP Data Services itself but entered without the `$` in the OpCon job definition.
