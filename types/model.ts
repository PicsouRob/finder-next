export type User = {
    id:            string;    
    name:          string;
    email:         string;    
    password:      string;
    type:          string;    
    phoneNumber:   string;
    avatar:        string;
    position:      string;
    skills:        string[]
    hourlyRate:    number;
    facebookUrl:   string;
    instagramUrl:  string;
    xUrl:          string;
    githubUrl:     string;
    availableFor:  string;    
    salaryRange:   string;
    backdropImage: string;
    description:   string;
    websiteUrl:    string;
    location:      string;    
    dateCreated:   Date;  
    dateUpdated:   Date; 
}

export type UserProject = {
    id?:                string,
    title:              string,
    type:               string,
    description:        string,
    images:             string[],
    createdByUserId:    string,
    dateCreated:        Date,
    dateUpdated:        Date,
}

export type UserReview = {
    id?:                string,
    userId:             string,
    createdByUserId:    string,
    comment:            string,
    dateCreated:        Date,
    dateUpdated:        Date,
    rating:             number,
}

export type ProjectReview = {
    id?:                string,
    projectId:          string,
    createdByUserId:    string,
    comment:            string,
    dateCreated:        Date,
    dateUpdated:        Date,
    rating:             number,
}

export type Job = {
    id?:            string,   
    dateCreated:    Date, 
    dateUpdated:    Date,
    description:    string,
    images:         string[],
    title:          string,
    type:           string,
    createdByUserId:string
}

export type JobReview = {
    id?: string;
    jobId: string;
    createdByUserId: string;
    comment: string;
    dateCreated: Date;
    dateUpdated: Date;
}