import SurveyModel, { ISurveyResponse } from './SurveyModel';

export const addResponseToSurvey = async (surveyId: string, surveyResponse: ISurveyResponse) => {
    const survey = await SurveyModel.findById(surveyId);
    if (!survey || survey.response) {
        throw "404";
    }
    survey.response = surveyResponse;
    await survey.save();
    return survey;
}