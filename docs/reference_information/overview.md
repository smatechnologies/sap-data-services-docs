---
sidebar_label: 'Overview'
title: Reference information overview
description: "Overview of the SAP Data Services Connector reference content, including job definition references for Enterprise Manager and Solution Manager and the connector logging reference."
tags:
  - Reference
  - Automation Engineer
  - Connectors
---

# Reference information overview

## What is it?

The reference information section describes the SAP Data Services Connector's job definition fields and logging output. Use these pages when defining a SAP Data Services job or troubleshooting a job run.

## Pages in this section

- [Defining SAP Data Services jobs in Enterprise Manager](./em-defining-a-job.md) — field-level reference for the SAP Data Services job subtype in Enterprise Manager, including the CANCEL, PING, START, and TRACK job types.
- [Defining SAP Data Services jobs in Solution Manager](./sm-defining-a-job.md) — field-level reference for the SAP Data Services job type in Solution Manager, including the Cancel, Ping, Start, and Track task types.
- [Logging and job output](./logging-job-output.md) — where the connector writes log files and how OpCon job output captures the SAP Data Services Trace Log.

## FAQs

**Where do I look for field-level descriptions of a SAP Data Services job?**
Open the page for the UI you are using: Enterprise Manager or Solution Manager. Each page lists the job-type fields and their meaning.

**Where are the connector log files documented?**
See [Logging and job output](./logging-job-output.md). The page describes the log file location, rotation count, and a sample log entry that includes the SAP Data Services Trace Log.

## Glossary

**Enterprise Manager** — The legacy OpCon administrative client. Uses a Windows job subtype to define SAP Data Services jobs.

**Solution Manager** — The browser-based OpCon UI. Uses a SAP Data Services job type with Cancel, Ping, Start, and Track task types.

**JORS** — Job Output Retrieval Service. The OpCon component that retrieves job output from agents back to the OpCon server.
