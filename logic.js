/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * AddEvidence transaction
 * @param {org.crime.control.AddEvidence} addEvidence
 * @transaction
 */
async function AddEvidence(addEvidence) {
    
    let evidence = addEvidence.evidence;
    let casee = addEvidence.casee;
    var evidenceNew = null;

    var factory = getFactory();
    evidenceNew = factory.newResource('org.crime.control', 'Evidence', evidence.evidenceId);
    evidenceNew.details = evidence.details;
    if(evidence.images && evidence.images.length>0){
        evidenceNew.images = evidence.images;
    }
    if(evidence.files && evidence.files.length>0){
        evidenceNew.files = evidence.files;
    }
    if(evidence.whistleBlower && evidence.whistleBlower != null){
        evidenceNew.whistleBlower = evidence.whistleBlower;
    }
    if(evidence.police && evidence.police != null){
        evidenceNew.police = evidence.police;
    }

    if (!casee.evidences) {
        casee.evidences = [];
    } 
    casee.evidences.push(evidenceNew);

    const assetRegistry = await getAssetRegistry('org.crime.control.Evidence');
    await assetRegistry.add(evidenceNew);

    const assetRegistry1 = await getAssetRegistry('org.crime.control.Case');
    await assetRegistry1.update(casee);

   
}

/**
 * AssignPolice transaction
 * @param {org.crime.control.AssignPolice} assignPolice
 * @transaction
 */
async function AssignPolice(assignPolice) {
    
    let casee = assignPolice.casee;
    let police = assignPolice.police;
    let agencyJudge = assignPolice.agencyJudge;

    

    if (!casee.police) {
        casee.police = [];
    } 
    casee.police.push(police);

    casee.status = 'POLICE_ASSIGNED';

    if (!police.assignedCases) {
        police.assignedCases = [];
    } 
    police.assignedCases.push(assignPolice);

  
    const assetRegistry = await getAssetRegistry('org.crime.control.Case');
    await assetRegistry.update(casee);

    const participantRegistry = await getParticipantRegistry('org.crime.control.Police');
    await participantRegistry.update(police);

   
}

/**
 * UpdateCaseStatusTerminated transaction
 * @param {org.crime.control.UpdateCaseStatusTerminated} updateCaseStatusTerminated
 * @transaction
 */
async function UpdateCaseStatusTerminated(updateCaseStatusTerminated) {
    
    let casee = updateCaseStatusTerminated.casee;
    let agencyJudge = updateCaseStatusTerminated.agencyJudge;

    if (casee.status == 'TERMINATED') {
        throw new Error('Case already TERMINATED');
    }

    casee.status = 'TERMINATED';

  
    const assetRegistry = await getAssetRegistry('org.crime.control.Case');
    await assetRegistry.update(casee);

   
}

/**
 * UpdateCaseStatusRejected transaction
 * @param {org.crime.control.UpdateCaseStatusRejected} updateCaseStatusRejected
 * @transaction
 */
async function UpdateCaseStatusRejected(updateCaseStatusRejected) {
    
    let casee = updateCaseStatusRejected.casee;
    let agencyJudge = updateCaseStatusRejected.agencyJudge;

    if (casee.status == 'REJECTED') {
        throw new Error('Case already REJECTED');
    }

    casee.status = 'REJECTED';

  
    const assetRegistry = await getAssetRegistry('org.crime.control.Case');
    await assetRegistry.update(casee);

   
}

/**
 * UpdateCaseStatusSolved transaction
 * @param {org.crime.control.UpdateCaseStatusSolved} updateCaseStatusSolved
 * @transaction
 */
async function UpdateCaseStatusSolved(updateCaseStatusSolved) {
    
    let invoice = updateCaseStatusSolved.invoice;
    let casee = updateCaseStatusSolved.casee;
    let agencyJudge = updateCaseStatusSolved.agencyJudge;
    var invoiceNew = null;

    var factory = getFactory();
    invoiceNew = factory.newResource('org.crime.control', 'Invoice', invoice.invoiceId);
    invoiceNew.status = invoice.status;
    if(invoice.members && invoice.members.length>0){
        invoiceNew.members = invoice.members;
    }
    
    if (casee.status == 'SOLVED') {
        throw new Error('Case already SOLVED');
    }
    casee.status = 'SOLVED';

    const assetRegistry = await getAssetRegistry('org.crime.control.Invoice');
    await assetRegistry.add(invoiceNew);

    const assetRegistry1 = await getAssetRegistry('org.crime.control.Case');
    await assetRegistry1.update(casee);

   
}


/**
 * CheckCaseDuration transaction
 * @param {org.crime.control.CheckCaseDuration} CheckCaseDuration
 * @transaction
 */
async function CheckCaseDuration(CheckCaseDuration) {
    
    let casee = CheckCaseDuration.casee;

    if (casee.durationStatus == 'PENDING') {
        throw new Error('casee already PENDING');
    }

   
    let currentDate = new Date();
  	let creationDate= casee.creationDate;
    let cDate = new Date(creationDate);
    let ccDate = new Date(creationDate);
    cDate.setMonth(cDate.getMonth()+3);
    var oneDay = 24*60*60*1000;
    var diffDays = Math.round(Math.abs((currentDate.getTime() - ccDate.getTime())/(oneDay)));
    if (currentDate.valueOf() >= cDate.valueOf()) {
    casee.durationStatus = 'PENDING';
    }
    casee.duration = diffDays +" Days.";
    const assetRegistry = await getAssetRegistry('org.crime.control.Case');
    await assetRegistry.update(casee);

   
}


/**
 * UpdateInvoiceStatusDone transaction
 * @param {org.crime.control.UpdateInvoiceStatusDone} updateInvoiceStatusDone
 * @transaction
 */
async function UpdateInvoiceStatusDone(updateInvoiceStatusDone) {
    
    let invoice = updateInvoiceStatusDone.invoice;
    let admin = updateInvoiceStatusDone.admin;

    if (invoice.status == 'DONE') {
        throw new Error('Invoice already DONE');
    }

    invoice.status = 'DONE';

  
    const assetRegistry = await getAssetRegistry('org.crime.control.Invoice');
    await assetRegistry.update(invoice);

   
}