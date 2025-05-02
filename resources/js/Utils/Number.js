import numeral from 'numeral';

export const formatNumber = (number, format = '0,0.00') => {
    return numeral(number).format(format);
};
