import styled from 'styled-components';

/* eslint-disable-next-line */
export interface SurveyHorseUiProps {}

const StyledSurveyHorseUi = styled.div`
  color: pink;
`;

export function SurveyHorseUi(props: SurveyHorseUiProps) {
  return (
    <StyledSurveyHorseUi>
      <h1>Welcome to SurveyHorseUi!</h1>
    </StyledSurveyHorseUi>
  );
}

export default SurveyHorseUi;
