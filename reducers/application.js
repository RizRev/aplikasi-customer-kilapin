import * as actionTypes from '@actions/actionTypes';

const initialState = {
  language: 'id',
  order: [],
  image: null,
  address: null,
  postalcode: null,
  voucher: [],
  orderType: null,
  code: null,
  size: null,
  time: null,
  discount:null,
  floor:null,
  lat: null,
  lng: null,
  min_trans: null,
  max_discount: null
  // define here for future initialState 
};

export default (state = initialState, action = {}) => {
  // use switch case (prepare for future state)
  switch (action.type) {
    case actionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    case actionTypes.ADD_ORDER:
      return {
        ...state,
        order: action.order,
      };
    case actionTypes.ADD_IMAGE:
      return {
        ...state,
        image: action.image,
      };
    case actionTypes.ADD_ADDRESS:
      return {
        ...state,
        address: action.address,
      };
    case actionTypes.ADD_POSTAL_CODE:
      return {
        ...state,
        postalcode: action.postalcode,
      };
    case actionTypes.LIST_VOUCHER:
      return {
        ...state,
        voucher: action.voucher,
      };
    case actionTypes.CHANGE_ORDER_TYPE:
      return {
        ...state,
        orderType: action.orderType,
      };
    case actionTypes.CLEAR_IMAGE:
      return {
        ...state,
        image: null,
      };
    case actionTypes.CLEAR_ORDER:
      return {
        ...state,
        order: [],
      };
    case actionTypes.CLEAR_VOUCHER:
      return {
        ...state,
        voucher: [],
      };
    case actionTypes.CLEAR_ADDRESS:
      return {
        ...state,
        address: null,
      };
    case actionTypes.CLEAR_POSTAL_CODE:
      return {
        ...state,
        postalcode: null,
      };
    case actionTypes.USE_VOUCHER:
      return {
        ...state,
        code: action.code
      };
    case actionTypes.SIZE_ORDER:
      return {
        ...state,
        size: action.size
      };
    case actionTypes.TIME_ORDER:
      return {
        ...state,
        time: action.time
      };
    case actionTypes.VOUCHER_DISCOUNT:
      return {
        ...state,
        discount: action.discount
      };
    case actionTypes.CLEAR_DISCOUNT:
      return {
        ...state,
        code: null,
        discount: null
      };
    case actionTypes.ORDER_ADDON:
      return {
        ...state,
        floor: action.floor,
      };
    case actionTypes.FETCH_MEMBERSHIP:
      return {
        ...state,
        membership: action.membership,
      };
      case actionTypes.ADD_LAT:
      return {
        ...state,
        lat: action.lat,
      };
    case actionTypes.ADD_LNG:
      return {
        ...state,
        lng: action.lng,
      };
    case actionTypes.CLEAR_LAT:
      return {
        ...state,
        lat: null,
      };
    case actionTypes.CLEAR_LNG:
      return {
        ...state,
        lng: null,
      };
    case actionTypes.MINTRANS_VOUCHER:
      return {
        ...state,
        min_trans: action.min_trans
      };
    case actionTypes.MAX_DISCOUNT:
      return {
        ...state,
        max_discount: action.max_discount
      };
    case actionTypes.CLEAR_CODE_VOUCHER:
      return {
        ...state,
        code: null,
      };
    case actionTypes.CLEAR_PROFILE:
      return {
        ...state,
        order: [],
        image: null,
        address: null,
        postalcode: null,
        voucher: [],
        orderType: null,
        code: null,
        size: null,
        time: null,
        discount:null,
        floor:null,
        lat: null,
        lng: null,
        min_trans: null,
        max_discount: null
      }
    default:
      return state;
  }
};
