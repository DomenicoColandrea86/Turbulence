
export function handleError(err) {
  const errors = {};

  try {
    err.validation.keys.forEach((key) => {
      errors[key] = err.message;
    });
  } catch (x) {
    errors.unknown = err.message;
  }

  return errors;
}

export function createFormData(data) {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  return formData;
}

export function validate(validationResults) {
  const errors = {};

  if (validationResults.error) {
    errors[validationResults.error.details[0].path] = validationResults.error.details[0].message;
  }

  return errors;
}
