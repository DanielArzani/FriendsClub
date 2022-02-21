// Filters what comes from the req.body
// Will return an array containing all fields that users are allowed to POST values with
module.exports = filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
