module.exports = function(data) {
  let errors = [];
  if (data.length > 30) {
    errors.push("Username must have max 30 characters");
  }
  return {
		errors,
		isValid: errors.length === 0
	}
};