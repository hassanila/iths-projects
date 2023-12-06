import { render } from '@testing-library/react';

import SurveyHorseUi from './surveyhorse-ui';

describe('SurveyHorseUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SurveyHorseUi />);
    expect(baseElement).toBeTruthy();
  });
});
