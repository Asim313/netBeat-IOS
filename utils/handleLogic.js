
export const handleFormValidation = (
    rules,
    onSuccessValidation = () => {},
    onFailedValidation = () => {},
) => {
    let valid = true;
    rules.some((rule) => {
        if (!rule.isValid) {
            if (onFailedValidation) {
                onFailedValidation(rule);
            }
            valid = false;

            return true;
        }

        return false;
    });

    if (valid && onSuccessValidation) {
        onSuccessValidation();
    }
};

export const validateEmail = (Cnic) => {
    var re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,9})$/;
    return re.test(Cnic);
};

export const validateName = (name) => {
    var re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return re.test(name);
};

export const validatePhoneNumber = (phoneNumber) => {
  var patt = new RegExp(/^\+(965|966|968|971|973|974)[569]\d{6}$/);
  return patt.test(phoneNumber);
};

export const number = (phoneNumber) => {
  var re = /^([0-9])+$/;
  return re.test(phoneNumber);
};
export const numberWithCommas=(x) => {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


  