import * as React from 'react';

type Section = {
  hash: string;
  text: string;
};

interface FeedbackState {
  section: Section | null;
  isOpen: boolean;
}

type Actions =
  | { type: 'SET_SECTION'; payload: Section }
  | { type: 'UPDATE_OPEN'; payload: boolean };

const FeedbackContext = React.createContext<{
  state: FeedbackState;
  dispatch: React.Dispatch<Actions>;
}>({
  state: { section: null, isOpen: false },
  dispatch: () => {
    throw new Error('Forgot to wrap component in `FeedbackProvider`');
  },
});

if (process.env.NODE_ENV !== 'production') {
  FeedbackContext.displayName = 'FeedbackContext';
}

export const FeedbackProvider = (props: any) => {
  const { children } = props;

  const [state, dispatch] = React.useReducer(
    (prevState: FeedbackState, action: Actions): FeedbackState => {
      switch (action.type) {
        case 'SET_SECTION':
          return {
            section: action.payload,
            isOpen: true,
          };
        case 'UPDATE_OPEN':
          return { ...prevState, isOpen: action.payload };
        default:
          throw new Error(`Unrecognized type ${(action as any).type}`);
      }
    },
    { section: null, isOpen: false },
  );

  return (
    <FeedbackContext.Provider value={{ state, dispatch }}>{children}</FeedbackContext.Provider>
  );
};

export function useOpenSectionFeedback() {
  const { dispatch } = React.useContext(FeedbackContext);
  return React.useCallback(
    (section: Section) => dispatch({ type: 'SET_SECTION', payload: section }),
    [dispatch],
  );
}

export function useFeedbackState() {
  const { state, dispatch } = React.useContext(FeedbackContext);
  const setIsOpen = React.useCallback(
    (newIsOpen: boolean) => dispatch({ type: 'UPDATE_OPEN', payload: newIsOpen }),
    [dispatch],
  );
  const updateSection = React.useCallback(
    (section: Section) => dispatch({ type: 'SET_SECTION', payload: section }),
    [dispatch],
  );

  return { ...state, setIsOpen, updateSection };
}
