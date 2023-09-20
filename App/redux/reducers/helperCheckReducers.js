// reducers.js
const initialState = {
    continueBtn: false,
  };
  
  const showContinueBtnWhenAllPickedUp = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CONTINUE_BTN':
        return { ...state, continueBtn: action.payload };
      default:
        return state;
    }
  };
  
  export default showContinueBtnWhenAllPickedUp;