import { ISurvey } from '@surveyhorse/surveyhorse-lib';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSurveyById } from '../../api/getSurveyById';

const SurveyPage = () => {
    const { surveyId } = useParams();
    const [ survey, setSurvey ] = useState<ISurvey>();

    useEffect(() => {
        if(surveyId){
            getSurveyById(surveyId).then(survey => setSurvey(survey));
        } else {
            // Visa att det inte finns nåt id
        }
    }, [])

    return (<>
        <h1>Survey</h1>
        <p>{survey?.recipient.name}</p>
        <p>{survey?.recipient.mobileNumber}</p>

    </>)
}

export default SurveyPage;