### Add Admin
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "org.crime.control.Admin",
   "email": "a1",
   "names": "a1",
   "password": "a1"
}' 'http://localhost:3000/api/org.crime.control.Admin'
```
### Add AgencyJudge
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "org.crime.control.AgencyJudge", 
    "email": "ag1", 
    "names": "ag1", 
    "password": "ag1" 
}' 'http://localhost:3000/api/org.crime.control.AgencyJudge'
```
### Add People
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "org.crime.control.People", 
    "email": "pe1", 
    "names": "pe1", 
    "password": "pe1" 
}' 'http://localhost:3000/api/org.crime.control.People'
```
### Add Ploice

```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "org.crime.control.Police", 
    "wallet": "xannaiasncinaciadwudnsjnja", 
    "walletType": "BITCOIN", 
    "email": "po1", 
    "names": "po1", 
    "password": "po1" 
}' 'http://localhost:3000/api/org.crime.control.Police'
```
### Add Whistle Blower
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "org.crime.control.WhistleBlower", 
    "wallet": "sncjnsajhduamsjcbuassj", 
    "walletType": "BITCOIN", 
    "email": "wb1", 
    "names": "wb1", 
    "password": "wb1" 
}' 'http://localhost:3000/api/org.crime.control.WhistleBlower'
```
### Add Case by WhistlerBlower
(defined catagories)

 * ASSAULT
 * FALSE_IMPRISONMENT
 * KIDNAPPING
 * HOMICIDE
 * RAPE
 * BATTERY 

```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "org.crime.control.Case", 
    "caseId": "ca1", 
    "description": "case 1 description", 
    "category": { 
      "$class": "org.crime.control.Category", 
      "type": "ASSAULT" 
    }, 
    "creationDate": "2018-08-24T14:47:18.008Z", 
    "whistleBlowerCaseCreator": "resource:org.crime.control.WhistleBlower#wb1" 
}' 'http://localhost:3000/api/org.crime.control.Case'
```
### Add Case by Police
(defined catagories)

 * ASSAULT
 * FALSE_IMPRISONMENT
 * KIDNAPPING
 * HOMICIDE
 * RAPE
 * BATTERY 
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "org.crime.control.Case", 
    "caseId": "ca2", 
    "description": "case 1 description", 
    "category": { 
      "$class": "org.crime.control.Category", 
      "type": "ASSAULT" 
    }, 
    "creationDate": "2018-08-24T14:47:18.008Z", 
    "policeCaseCreator": "resource:org.crime.control.Police#po1" 
}' 'http://localhost:3000/api/org.crime.control.Case'
```
### Add Case with (other) catagory
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "org.crime.control.Case", 
    "caseId": "ca3", 
    "description": "case 3 description", 
    "category": { 
      "$class": "org.crime.control.Category", 
      "other": "other catagory name by user" 
 }, 
    "creationDate": "2018-08-24T14:56:45.370Z", 
    "whistleBlowerCaseCreator": "resource:org.crime.control.WhistleBlower#wb1" 
}' 'http://localhost:3000/api/org.crime.control.Case'
```
### Assign Police to Case by JudgeAgency
judge/agency assign ploice to case & change the case status to "POLICE_ASSIGNED". only one police can be assigned in single transaction.
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "org.crime.control.AssignPolice", 
    "casee": "resource:org.crime.control.Case#ca1", 
    "police": "resource:org.crime.control.Police#po1", 
    "agencyJudge": "resource:org.crime.control.AgencyJudge#ag1" 
}' 'http://localhost:3000/api/org.crime.control.AssignPolice'
```
### Add Evidence to case by Whistle blower
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "org.crime.control.AddEvidence", 
    "evidence": { 
    "$class": "org.crime.control.Evidence", 
      "evidenceId": "ev1", 
      "details": "adding evidence description", 
      "images": ["optional image1", "optional image2"], 
      "files": ["optional file1", "optional file2"], 
      "whistleBlower": "resource:org.crime.control.WhistleBlower#wb1" 
    }, 
    "casee": "resource:org.crime.control.Case#ca1" 
}' 'http://localhost:3000/api/org.crime.control.Evidence'
```
### Add Evidence to case by Police
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
   "$class": "org.crime.control.AddEvidence", 
    "evidence": { 
      "$class": "org.crime.control.Evidence", 
      "evidenceId": "ev2", 
      "details": "details of evidence 2", 
      "images": ["optional image 1","optional image 2"], 
      "files": ["optional file 1","optional file 2"], 
      "police": "resource:org.crime.control.Police#po1" 
    }, 
    "casee": "resource:org.crime.control.Case#ca1" 
}' 'http://localhost:3000/api/org.crime.control.Evidence'
```
### Mark case as Rejected
judge/agency changed the case status to "REJECTED"(invalid) after processing case & its edivences.
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "org.crime.control.UpdateCaseStatusRejected", 
    "casee": "resource:org.crime.control.Case#ca1", 
    "agencyJudge": "resource:org.crime.control.AgencyJudge#ag1" 
}' 'http://localhost:3000/api/org.crime.control.UpdateCaseStatusRejected'
```
### Mark case as Terminated
judge/agency changed the case status to "TERMINATED" coz of no evidence
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "org.crime.control.UpdateCaseStatusTerminated", 
    "casee": "resource:org.crime.control.Case#ca1", 
    "agencyJudge": "resource:org.crime.control.AgencyJudge#ag1" 
}' 'http://localhost:3000/api/org.crime.control.UpdateCaseStatusTerminated'
```
### Mark case as Solved
judge/agency changed the case status to "SOLVED" (action taken) after processing case & its edivences. and an invoice is created that contains the police(s) and whistleBlowers who are awarded amount for their evidences or case creation. agency/judge has to choose and mention them as mebers with their earned amount in member array of invoice.

```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "org.crime.control.UpdateCaseStatusSolved", 
    "invoice": { 
      "$class": "org.crime.control.Invoice", 
      "invoiceId": "in1", 
      "members": [ 
        { 
        "amount":20, 
        "police": "resource:org.crime.control.Police#po1" 
        }, 
 
        { 
        "amount":60, 
        "police": "resource:org.crime.control.Police#po" 
        }, 
 
        { 
        "amount":10, 
        "whistleBlower": "resource:org.crime.control.WhistleBlower#wb1" 
        } 
      ] 
    }, 
    "casee": "resource:org.crime.control.Case#ca1", 
    "agencyJudge": "resource:org.crime.control.AgencyJudge#ag1" 
}' 'http://localhost:3000/api/org.crime.control.UpdateCaseStatusSolved'
```
### Mark case as Solved
Admin changed the Invoide status to "DONE" after transfering the amount to member's wallets.
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "org.crime.control.UpdateInvoiceStatusDone", 
    "invoice": "resource:org.crime.control.Invoice#in1", 
    "admin": "resource:org.crime.control.Admin#a1" 
}' 'http://localhost:3000/api/org.crime.control.UpdateInvoiceStatusDone'
```
### Check case duration
Checks the case duration and updates durationStatus accordingly.If case is more than 3 months old then chnage the durationStatus to "PENDING". (call this transaction each day using frontend logic).
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "org.crime.control.CheckCaseDuration", 
    "casee": "resource:org.crime.control.Case#ca1" 
}' 'http://localhost:3000/api/org.crime.control.CheckCaseDuration'
```

