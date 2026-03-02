import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class PortfolioExperience extends LightningElement {
    @api recordId;
    workExperienceList;

    renderedCallback() {
        this.workExperienceList?.forEach((work, index) => {
            const logoContainer = this.template.querySelectorAll('.logo')[index];
            if (logoContainer && work.CompanyLogo) {
                logoContainer.innerHTML = work.CompanyLogo;
            }
        });
    }

    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'WorkExperience__r',
        sortBy: ['-WorkExperience__c.JobStartDate__c'],
        fields:['WorkExperience__c.JobStartDate__c',
            'WorkExperience__c.JobEndDate__c',
            'WorkExperience__c.Role__c',
            'WorkExperience__c.CompanyName__c',
            'WorkExperience__c.WorkLocation__c',
            'WorkExperience__c.Description__c',
            'WorkExperience__c.IsCurrent__c',
            'WorkExperience__c.CompanyLogo__c',
            'WorkExperience__c.Tech_Stack__c'
        ]
    })WorkExperienceHandler({data, error}){
        if (data) {
            console.log("WorkExperience Data", data);
            this.formatExperience(data);
            console.log('Success Response: '+JSON.stringify(data));
        }
        if (error) {
            console.log('Error Response: '+JSON.stringify(error));
        }
    }

    formatExperience(data){
        this.workExperienceList = data.records.map(item => {
            const {
                JobStartDate__c,
                JobEndDate__c,
                Role__c,
                CompanyName__c,
                WorkLocation__c,
                Description__c,
                IsCurrent__c,
                CompanyLogo__c,
                Tech_Stack__c
            } = item.fields;

            return {
                id: item.id,
                JobStartDate: this.getValue(JobStartDate__c),
                JobEndDate: this.getValue(JobEndDate__c),
                Role: this.getValue(Role__c),
                CompanyName: this.getValue(CompanyName__c),
                WorkLocation: this.getValue(WorkLocation__c),
                Description: this.getValue(Description__c),
                IsCurrent: this.getValue(IsCurrent__c),
                CompanyLogo: this.getValue(CompanyLogo__c),
                TechStack: this.getValue(Tech_Stack__c)?.split(',').map(item => item.trim())
            };
        });
    }

    getValue(data){
        return data && (data.displayValue || data.value);
    }
}