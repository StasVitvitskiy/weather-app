const defaultState = {
    weatherType: '',
    windSpeed: undefined,
    city: undefined,
    temp: undefined,
    cTemp: undefined,
    fTemp: undefined,
    tempIn: 'C',
    time: '',
    timeObj: null
};

const LOAD_DATA = 'LOAD_DATA';
const TOGGLE_TEMP_TYPE = 'TOGGLE_TEMP_TYPE';
const SET_TIME = 'SET_TIME';

export function loadData(data) {
    return {
        type: LOAD_DATA,
        data
    }
}

export function toggleTempType() {
    return {
        type: TOGGLE_TEMP_TYPE
    }
}

export function setTime(time) {
    return {
        type: SET_TIME,
        time
    }
}

export default function (state = defaultState, action) {
    switch (action.type) {
        case LOAD_DATA:
        {
            const data = action.data;
            data.temp = data.cTemp;
            return {
                ...state,
                ...data
            };
        }
        case TOGGLE_TEMP_TYPE:
        {
            if(state.tempIn == 'C') {
                return {
                    ...state,
                    temp: state.fTemp,
                    tempIn: 'F'
                }
            } else {
                return {
                    ...state,
                    temp: state.cTemp,
                    tempIn: 'C'
                }
            }
        }
        case SET_TIME:
            return {
                ...state,
                timeObj: action.time,
                time: action.time.toLocaleString().split(',')[1]
            };
        default:
            return state
    }
}