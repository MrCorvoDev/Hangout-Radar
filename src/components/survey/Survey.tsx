import {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';

import useAppDispatch from '../../hooks/useAppDispatch';
import {
   useGetCountriesQuery,
   useGetSegmentsQuery,
} from '../../store/api/localDataApi';
import {resetPreferences} from '../../store/slices/userPreferenceSlice';
import {layout} from '../../styles/theme';
import em from '../../styles/utils/em';
import md from '../../styles/utils/md';
import ApiFallback from '../apiFallback';
import Button from '../form/Button';
import Modal from '../modal/Modal';
import ModalCloseButton from '../modal/ModalCloseButton';
import SurveyCountries from './SurveyCountries';
import SurveyProgress from './SurveyProgress';
import SurveySegments from './SurveySegments';
import SurveyStep from './SurveyStep';

export interface SurveyStepType {
   type: 'intro' | 'country' | 'segments';
   title: string;
   description: string;
}
const SURVEY_STEPS: SurveyStepType[] = [
   {
      type: 'intro',
      title: "Let's customize your experience",
      description: 'Please take less then a minute to complete the survey',
   },
   {
      type: 'country',
      title: 'Select countries you are interested in',
      description: "We'll show the best hangout spots in these countries",
   },
   {
      type: 'segments',
      title: 'Select your interests',
      description: "It'll help us to understand what kind of places you like",
   },
];

const ButtonBox = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: ${em(8)};
`;

const ButtonEl = styled(Button)<{$secondary?: boolean}>`
   min-width: ${em(180)};
   @media (${md(layout.md3)}) {
      min-width: 0;
      flex: 1 1 auto;
   }
   border: 2px solid ${props => props.theme.color2 as string};
   @media (hover: hover) {
      &:hover {
         border: 2px solid ${props => props.theme.color4 as string};
      }
   }
   ${({$secondary}) =>
      $secondary &&
      css`
         border: 2px solid ${props => props.theme.color4 as string};
         color: ${props => props.theme.color4 as string};
         background-color: transparent;
         @media (hover: hover) {
            &:hover {
               background-color: ${props => props.theme.color4 as string};
               color: ${props => props.theme.color1 as string};
            }
         }
      `}
`;

interface SurveyProps {
   isOpen: boolean;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Survey = ({isOpen, setIsOpen}: SurveyProps) => {
   const dispatch = useAppDispatch();
   const [progress, setProgress] = useState(0);
   const step = SURVEY_STEPS[progress];

   useEffect(() => {
      setTimeout(() => {
         if (!isOpen) setProgress(0);
      }, 300);
   }, [isOpen]);

   const {
      data: countries,
      error: countryError,
      isLoading: countryLoading,
   } = useGetCountriesQuery();
   const {
      data: segments,
      error: segmentError,
      isLoading: segmentLoading,
   } = useGetSegmentsQuery();

   const isLoading = countryLoading || segmentLoading;
   const error = countryError ?? segmentError;

   const showFallback = isLoading || error;

   return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
         <ModalCloseButton />
         <SurveyProgress progress={progress} length={SURVEY_STEPS.length} />
         <SurveyStep
            type={step.type}
            title={step.title}
            description={step.description}
         >
            {step.type !== 'intro' && showFallback && (
               <ApiFallback isLoading={isLoading} error={error} />
            )}
            {!showFallback && step.type === 'country' && countries && (
               <SurveyCountries countries={countries} />
            )}
            {!showFallback && step.type === 'segments' && segments && (
               <SurveySegments segments={segments} />
            )}
         </SurveyStep>
         <ButtonBox>
            {progress === 0 ? (
               <ButtonEl
                  $secondary
                  onClick={() => dispatch(resetPreferences())}
               >
                  Reset
               </ButtonEl>
            ) : (
               <ButtonEl
                  $secondary
                  onClick={() => setProgress(prev => prev - 1)}
               >
                  Back
               </ButtonEl>
            )}
            <ButtonEl
               onClick={() => {
                  if (progress === SURVEY_STEPS.length - 1) {
                     setIsOpen(false);
                     setTimeout(() => {
                        setProgress(0);
                     }, 300);
                  } else {
                     setProgress(prev => prev + 1);
                  }
               }}
            >
               {progress === SURVEY_STEPS.length - 1 ? 'Finish' : 'Next'}
            </ButtonEl>
         </ButtonBox>
      </Modal>
   );
};
export default Survey;
