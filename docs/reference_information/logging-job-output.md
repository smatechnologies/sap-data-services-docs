---
sidebar_label: 'Logging and Job Output'
title: SAP Data Services Connector logging and job output
description: "Where the SAP Data Services Connector writes log files and how OpCon job output captures the SAP Data Services Trace Log."
tags:
  - Reference
  - System Administrator
  - Connectors
---

# Logging and job output

## What is it?

The SAP Data Services Connector writes its own log files locally on the host. Job output retrieved through OpCon (using JORS) includes the same connector entries plus the SAP Data Services Trace Log returned by SAP Data Services.

This page describes where to look for each, what they contain, and how to read the entries.

## At a glance

| Item | Where it lives | Notes |
|---|---|---|
| Connector log files | `<media>\log` directory on the connector host | `<media>` is the connector installation directory. |
| Log file naming | `Agent.log` through `Agent.log.5` | Default cycle is a maximum of five rotated files. New entries are appended. |
| OpCon job output | Retrieved via OpCon's JORS capability | Includes the same connector entries plus the embedded SAP Data Services Trace Log. |
| SAP Data Services Trace Log | Embedded inside the connector job output | Shown indented in the example below. |

## How to read a connector log entry

Each connector log entry has this shape:

```
<timestamp> [<thread>] INFO  AgentLog - [<component>] DEBUG : <message>
```

Common components you will see:

| Component | What it logs |
|---|---|
| `BODSConnector` | Connector startup, configuration values, and final return code. |
| `BODSConnectionFactory` | Logon, logout, RunBatchJob, getBatchJob, and getJobTraceLog web service calls, including the WSDL location and endpoint address. |
| `BODSJobExecutorImpl` | The high-level connector flow for the requested function (START, TRACK, CANCEL, PING), including extracted parameters and the embedded SAP Data Services Trace Log. |

The SAP Data Services Trace Log itself appears indented under the `JOB TRACE LOG` banner inside the `BODSJobExecutorImpl` output.

## Log example

The following is a complete `Agent.log` entry for a successful `START` of a job named `HelloWorld`. The indented block under `JOB TRACE LOG` is the SAP Data Services Trace Log.

```
2014-12-09 09:46:28,404 [main] INFO  AgentLog - [BODSJobExecutorImpl] -----------------------------------------------------------
2014-12-09 09:46:28,404 [main] INFO  AgentLog - [BODSJobExecutorImpl] DEBUG : Performing Logout
2014-12-09 09:46:28,405 [main] INFO  AgentLog - [BODSConnectionFactory] DEBUG : Processing logout Request
2014-12-09 09:46:28,405 [main] INFO  AgentLog - [BODSConnectionFactory] DEBUG : END POINT ADDRESS {http://VM-BVH-OPCON45:8080/DataServices/servlet/webservices?ver=2.1}
2014-12-09 09:46:28,430 [main] INFO  AgentLog - [BODSConnectionFactory] DEBUG : logout return Status {Logout complete}
2014-12-09 09:46:28,430 [main] INFO  AgentLog - [BODSConnector] Operation return code : JOB_FINNISHED_OK
2014-12-09 09:46:58,735 [main] INFO  AgentLog - [BODSConnector] SMA BODS Connector       : 5.20.01.03
2014-12-09 09:46:58,737 [main] INFO  AgentLog - [BODSConnector] ------------------------------------------------------------------
2014-12-09 09:46:58,737 [main] INFO  AgentLog - [BODSConnector] DEBUG : Starting Connector
2014-12-09 09:46:58,737 [main] INFO  AgentLog - [BODSConnector] DEBUG : BUSINESS_OBJECTS_SERVER_ADDRESS {http://VM-BVH-OPCON45:8080}
2014-12-09 09:46:58,737 [main] INFO  AgentLog - [BODSConnector] DEBUG : BUSINESS_OBJECTS_WSDL_LOCATION {wsdl/BODS_WSDL.wsdl}
2014-12-09 09:46:58,738 [main] INFO  AgentLog - [BODSJobExecutorImpl] DEBUG : Processing START request  :  user {Administrator} cmssystem {VM-BVH-OPCON45} cmsauthentication {secEnterprise} jobname {HelloWorld} repository {Repo_VM-BAVH-OPCON45} jobserver {JobServer_1} server group {null} initial poll delay {5} poll delay {5} parameters {RefFilesAddressCleanse='E:/Program Files (x86)/SAP BusinessObjects/Data Services/DataQuality/reference'} global variables {VAR1=VALUE,VAR2=VALUE2,VAR3=VALUE3}
2014-12-09 09:46:58,739 [main] INFO  AgentLog - [BODSConnectionFactory] DEBUG : Processing logon Request
2014-12-09 09:46:58,739 [main] INFO  AgentLog - [BODSConnectionFactory] DEBUG : wsdl location {file:/C:/java_projects/SMA%20OpCon%20SAP%20BODS%20Connector/code/bods.connector/wsdl/BODS_WSDL.wsdl}
2014-12-09 09:46:58,740 [main] INFO  AgentLog - [BODSConnectionFactory] DEBUG : END POINT ADDRESS {http://VM-BVH-OPCON45:8080/DataServices/servlet/webservices?ver=2.1}
2014-12-09 09:47:01,761 [main] INFO  AgentLog - [BODSConnectionFactory] DEBUG : logon return Session ID {14612561-E54F-0576-F516-6C97FF424D7F}
2014-12-09 09:47:01,761 [main] INFO  AgentLog - [BODSJobExecutorImpl] DEBUG : Returned Session ID  {14612561-E54F-0576-F516-6C97FF424D7F}
2014-12-09 09:47:01,761 [main] INFO  AgentLog - [BODSJobExecutorImpl] DEBUG : Extracting global variables  {VAR1=VALUE,VAR2=VALUE2,VAR3=VALUE3}
2014-12-09 09:47:01,761 [main] INFO  AgentLog - [BODSJobExecutorImpl] DEBUG : Processing global variable  {VAR1=VALUE}
2014-12-09 09:47:01,761 [main] INFO  AgentLog - [BODSJobExecutorImpl] DEBUG : Adding global variable  name {VAR1} value {VALUE}
2014-12-09 09:47:01,761 [main] INFO  AgentLog - [BODSJobExecutorImpl] DEBUG : Processing global variable  {VAR2=VALUE2}
2014-12-09 09:47:01,761 [main] INFO  AgentLog - [BODSJobExecutorImpl] DEBUG : Adding global variable  name {VAR2} value {VALUE2}
2014-12-09 09:47:01,761 [main] INFO  AgentLog - [BODSJobExecutorImpl] DEBUG : Processing global variable  {VAR3=VALUE3}
2014-12-09 09:47:01,762 [main] INFO  AgentLog - [BODSJobExecutorImpl] DEBUG : Adding global variable  name {VAR3} value {VALUE3}
2014-12-09 09:47:01,762 [main] INFO  AgentLog - [BODSJobExecutorImpl] DEBUG : Extracting subtitution parameters  {RefFilesAddressCleanse='E:/Program Files (x86)/SAP BusinessObjects/Data Services/DataQuality/reference'}
2014-12-09 09:47:01,762 [main] INFO  AgentLog - [BODSJobExecutorImpl] DEBUG : Processing subtitution parameter  {RefFilesAddressCleanse='E:/Program Files (x86)/SAP BusinessObjects/Data Services/DataQuality/reference'}
2014-12-09 09:47:01,762 [main] INFO  AgentLog - [BODSJobExecutorImpl] DEBUG : Adding subtitution parameter  name {RefFilesAddressCleanse} value {'E:/Program Files (x86)/SAP BusinessObjects/Data Services/DataQuality/reference'}
2014-12-09 09:47:01,762 [main] INFO  AgentLog - [BODSConnectionFactory] DEBUG : Processing RunBatchJob Request
2014-12-09 09:47:01,762 [main] INFO  AgentLog - [BODSConnectionFactory] DEBUG : wsdl location {file:/C:/java_projects/SMA%20OpCon%20SAP%20BODS%20Connector/code/bods.connector/wsdl/BODS_WSDL.wsdl}
2014-12-09 09:47:01,762 [main] INFO  AgentLog - [BODSConnectionFactory] DEBUG : END POINT ADDRESS {http://VM-BVH-OPCON45:8080/DataServices/servlet/webservices?ver=2.1}
2014-12-09 09:47:05,162 [main] INFO  AgentLog - [BODSConnectionFactory] DEBUG : RunBatchJob return CID {4} PID {2720} RID {30} Error Message {}
2014-12-09 09:47:05,162 [main] INFO  AgentLog - [BODSJobExecutorImpl] DEBUG : Get Status of job Runid  {30}
2014-12-09 09:47:10,164 [pool-2-thread-1] INFO  AgentLog - [BODSConnectionFactory] DEBUG : Processing getBatchJob Request : runid {30} repository {Repo_VM-BAVH-OPCON45}
2014-12-09 09:47:10,164 [pool-2-thread-1] INFO  AgentLog - [BODSConnectionFactory] DEBUG : wsdl location {file:/C:/java_projects/SMA%20OpCon%20SAP%20BODS%20Connector/code/bods.connector/wsdl/BODS_WSDL.wsdl}
2014-12-09 09:47:10,165 [pool-2-thread-1] INFO  AgentLog - [BODSConnectionFactory] DEBUG : END POINT ADDRESS {http://VM-BVH-OPCON45:8080/DataServices/servlet/webservices?ver=2.1}
2014-12-09 09:47:10,908 [pool-2-thread-1] INFO  AgentLog - [BODSConnectionFactory] DEBUG : getBatchJobStatus return Code {0} Status {succeeded}
2014-12-09 09:47:10,908 [pool-2-thread-1] INFO  AgentLog - [BODSJobExecutorImpl] DEBUG : Status of batch job {succeeded}
2014-12-09 09:47:10,914 [main] INFO  AgentLog - [BODSConnectionFactory] DEBUG : Processing getJobTraceLog Request : runid {30} repository {Repo_VM-BAVH-OPCON45}
2014-12-09 09:47:10,915 [main] INFO  AgentLog - [BODSConnectionFactory] DEBUG : wsdl location {file:/C:/java_projects/SMA%20OpCon%20SAP%20BODS%20Connector/code/bods.connector/wsdl/BODS_WSDL.wsdl}
2014-12-09 09:47:10,915 [main] INFO  AgentLog - [BODSConnectionFactory] DEBUG : END POINT ADDRESS {http://VM-BVH-OPCON45:8080/DataServices/servlet/webservices?ver=2.1}
2014-12-09 09:47:11,056 [main] INFO  AgentLog - [BODSJobExecutorImpl] ------------------------------------------------------------
2014-12-09 09:47:11,056 [main] INFO  AgentLog - [BODSJobExecutorImpl] JOB TRACE LOG
2014-12-09 09:47:11,056 [main] INFO  AgentLog - [BODSJobExecutorImpl] ------------------------------------------------------------
2014-12-09 09:47:11,056 [main] INFO  AgentLog - [BODSJobExecutorImpl] (14.2) 11-01-14 09:47:02 (2720:4392)      JOB: Reading job <49e15d53_602c_4fd9_8ddd_2f2cebc4a833> from the repository; Server version is <14.2.1.224>; Repository version is
                                               <14.2.1.0000>.
    (14.2) 11-01-14 09:47:02 (2720:4392)      JOB: Current directory of job <49e15d53_602c_4fd9_8ddd_2f2cebc4a833> is <E:\Program Files (x86)\SAP BusinessObjects\Data
                                               Services\bin>.
    (14.2) 11-01-14 09:47:03 (2720:4392)      JOB: Starting job on job server host <VM-BVH-OPCON45>, port <3500>.
    (14.2) 11-01-14 09:47:03 (2720:4392)      JOB: Job <HelloWorld> of runid <2014110109470327204392> is initiated by user <SYSTEM>.
    (14.2) 11-01-14 09:47:03 (2720:4392)      JOB: Processing job <HelloWorld>.
    (14.2) 11-01-14 09:47:03 (2720:4392)      JOB: Optimizing job <HelloWorld>.
    (14.2) 11-01-14 09:47:03 (2720:4392)      JOB: Job <HelloWorld> is started.
    (14.2) 11-01-14 09:47:03 (2720:4392)  PRINTFN: Hello Guys !
    (14.2) 11-01-14 09:47:03 (2720:4392)      JOB: Job <HelloWorld> is completed successfully. 
2014-12-09 09:47:11,056 [main] INFO  AgentLog - [BODSJobExecutorImpl] ------------------------------------------------------------
2014-12-09 09:47:11,056 [main] INFO  AgentLog - [BODSJobExecutorImpl] DEBUG : Performing Logout
2014-12-09 09:47:11,056 [main] INFO  AgentLog - [BODSConnectionFactory] DEBUG : Processing logout Request
2014-12-09 09:47:11,056 [main] INFO  AgentLog - [BODSConnectionFactory] DEBUG : END POINT ADDRESS {http://VM-BVH-OPCON45:8080/DataServices/servlet/webservices?ver=2.1}
2014-12-09 09:47:11,091 [main] INFO  AgentLog - [BODSConnectionFactory] DEBUG : logout return Status {Logout complete}
2014-12-09 09:47:11,091 [main] INFO  AgentLog - [BODSConnector] Operation return code : JOB_FINNISHED_OK
```

## FAQs

**Where are the connector log files stored?**
In the `<media>\log` directory, where `<media>` is the connector installation directory.

**How many log files does the connector keep?**
The default cycle is a maximum of five log files: `Agent.log` through `Agent.log.5`. New entries are appended.

**How do I retrieve job output for a SAP Data Services job?**
Use OpCon's JORS capability. The job output includes the SAP Data Services Trace Log content embedded in the connector log entries.

**Where is the SAP Data Services Trace Log in the output?**
Indented under the `JOB TRACE LOG` banner inside the `BODSJobExecutorImpl` output.

**How do I increase the amount of detail in the connector log?**
Set `DEBUG=ON` in `Connector.config`. See [SAP Data Services Connector configuration](../configuration.md). Set it back to `OFF` once the issue is captured.

## Glossary

**JORS** — Job Output Retrieval Service. The OpCon component that retrieves job output from agents back to the OpCon server.

**Trace Log** — The execution log produced by SAP Data Services for each job run. The connector includes the Trace Log content in the OpCon job output.

**Agent.log** — The connector's log file. Up to five rotated files (`Agent.log` through `Agent.log.5`) are kept in `<media>\log`.

**`<media>`** — The connector installation directory (for example, `C:\Program Files\OpConxps\SAPDataServices`). Used in log path references on this page.
