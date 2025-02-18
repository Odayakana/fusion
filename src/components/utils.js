export const findObjectByKeyValue = (array, key, value) => {
    return array.find(item => item[key] === value);
};