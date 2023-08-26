import * as actionTypes from './actionTypes';

const changeLanguage = language => {
    return {
        type: actionTypes.CHANGE_LANGUAGE,
        language,
    };
};

const addOrder = order => {
    return {
        type: actionTypes.ADD_ORDER,
        order,
    };
};

const clearOrder = () => {
    return {
        type: actionTypes.CLEAR_ORDER,
    };
};

const addImage = image => {
    return {
        type: actionTypes.ADD_IMAGE,
        image,
    };
};

const clearImage = () => {
    return {
        type: actionTypes.CLEAR_IMAGE
    };
};

const addAddress = address => {
    return {
        type: actionTypes.ADD_ADDRESS,
        address,
    };
};

const clearAddress = () => {
    return {
        type: actionTypes.CLEAR_ADDRESS
    };
};

const addPostalCode = postalcode => {
    return {
        type: actionTypes.ADD_POSTAL_CODE,
        postalcode,
    };
};

const clearPostalCode = () => {
    return {
        type: actionTypes.CLEAR_POSTAL_CODE
    };
};

const addListVoucher = voucher => {
    return {
        type: actionTypes.LIST_VOUCHER,
        voucher,
    };
};

const clearListVoucher = () => {
    return {
        type: actionTypes.CLEAR_VOUCHER
    };
};

const changeOrderType = orderType => {
    return {
        type: actionTypes.CHANGE_ORDER_TYPE,
        orderType,
    };
};

const useVoucher = code => {
    return {
        type: actionTypes.USE_VOUCHER,
        code,
    };
};

const clearVoucher = () => {
    return {
        type: actionTypes.CLEAR_DISCOUNT,
    };
};

const timeOrder = time => {
    return {
        type: actionTypes.TIME_ORDER,
        time,
    };
};

const sizeOrder = size => {
    return {
        type: actionTypes.SIZE_ORDER,
        size,
    };
};

const voucherDiscount = discount => {
    return {
        type: actionTypes.VOUCHER_DISCOUNT,
        discount,
    };
};

const maxDiscount = max_discount => {
    return {
        type: actionTypes.MAX_DISCOUNT,
        max_discount,
    };
};

const minTrans = min_trans => {
    return {
        type: actionTypes.MINTRANS_VOUCHER,
        min_trans,
    };
};

const addon = floor => {
    return {
        type: actionTypes.ORDER_ADDON,
        floor
    }
}
const addMembership = membership => {
    return {
        type: actionTypes.FETCH_MEMBERSHIP,
        membership
    }
}

const addLng = lng => {
    return {
        type: actionTypes.ADD_LNG,
        lng
    }
}

const addLat = lat => {
    return {
        type: actionTypes.ADD_LAT,
        lat
    }
}

const clearLng = () => {
    return {
        type: actionTypes.CLEAR_LNG,
    }
}

const clearLat = () => {
    return {
        type: actionTypes.CLEAR_LAT,
    }
}

const clearCodeVoucher = () => {
    return {
        type: actionTypes.CLEAR_CODE_VOUCHER,
    }
}
const clearProfile = () => {
    return {
        type: actionTypes.CLEAR_PROFILE,
    }
}


export const onChangeLanguage = language => dispatch => {
    dispatch(changeLanguage(language));
};

export const onAddOrder = order => dispatch => {
    dispatch(addOrder(order));
};

export const onclearOrder = () => dispatch => {
    dispatch(clearOrder());
}

export const onAddImage = image => dispatch => {
    dispatch(addImage(image));
};

export const onClearImage = () => dispatch => {
    dispatch(clearImage());
};

export const onAddAddress = address => dispatch => {
    dispatch(addAddress(address));
};

export const onClearAddress = () => dispatch => {
    dispatch(clearAddress());
};

export const onAddPostalCode = postalcode => dispatch => {
    dispatch(addPostalCode(postalcode));
};

export const onClearPostalCode = () => dispatch => {
    dispatch(clearPostalCode());
};

export const onAddListVoucher = voucher => dispatch => {
    dispatch(addListVoucher(voucher));
};

export const onClearListVoucher = () => dispatch => {
    dispatch(clearListVoucher());
};

export const onChangeOrderType = orderType => dispatch => {
    dispatch(changeOrderType(orderType));
};

export const onuseVoucher = code => dispatch => {
    dispatch(useVoucher(code))
}

export const onclearCodeVoucher = () => dispatch => {
    dispatch(clearCodeVoucher())
}

export const ontimeOrder = time => dispatch => {
    dispatch(timeOrder(time))
}

export const onsizeOrder = size => dispatch => {
    dispatch(sizeOrder(size))
}

export const onvoucherDiscount = discount => dispatch => {
    dispatch(voucherDiscount(discount))
}

export const onclearVoucher = () => dispatch => {
    dispatch(clearVoucher())
}

export const onaddon = floor => dispatch => {
    dispatch(addon(floor))
}

export const onaddMembership = membership => dispatch => {
    dispatch(addMembership(membership))
}

export const onAddLat = lat => dispatch => {
    dispatch(addLat(lat))
}

export const onClearLat = () => dispatch => {
    dispatch(clearLat())
}

export const onAddLng = lng => dispatch => {
    dispatch(addLng(lng))
}

export const onClearLng = () => dispatch => {
    dispatch(clearLng())
}

export const onmaxDiscount = max_discount => dispatch => {
    dispatch(maxDiscount(max_discount))
}

export const onminTrans = min_trans => dispatch => {
    dispatch(minTrans(min_trans))
}

export const onclearProfile = () => dispatch => {
    dispatch(clearProfile())
}