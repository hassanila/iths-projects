import { ISurvey } from "@surveyhorse/surveyhorse-lib";

export const getSurveyById = async ( surveyId: string): Promise<ISurvey> => {
    console.log(surveyId);
    return (await fetch(`http://localhost:4200/api/survey/${surveyId}`)).json();
}