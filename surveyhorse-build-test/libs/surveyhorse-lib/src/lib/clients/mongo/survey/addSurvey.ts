import SurveyModel, { ISurvey } from './SurveyModel';

export const addSurvey = async (survey: ISurvey) => {
    const newSurvey = new SurveyModel(survey);
    await newSurvey.save();
    return newSurvey;
}