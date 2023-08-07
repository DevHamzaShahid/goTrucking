// reducers.js
const initialState = {
    shipment_Id: null,
  };
  
  const shipmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SHIPMENT_ID':
        return { ...state, shipment_Id: action.payload };
      default:
        return state;
    }
  };
  
  export default shipmentReducer;