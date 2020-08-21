//enums for validator type
const VALIDATOR_TYPE = {
	REQUIRE: 'REQUIRE',
	MINLENGTH: 'MINLENGTH',
	MAXLENGTH: 'MAXLENGTH',
	MIN: 'MIN',
	MAX: 'MAX',
	EMAIL: 'EMAIL',
	FILE: 'FILE'
};

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE.REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE.EMAIL });
export const VALIDATOR_MINLENGTH = (val) => ({
	type: VALIDATOR_TYPE.MINLENGTH,
	val: val
});
export const VALIDATOR_MAXLENGTH = (val) => ({
	type: VALIDATOR_TYPE.MAXLENGTH,
	val: val
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE.MINLENGTH, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE.MAXLENGTH, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE.EMAIL });

export const validate = (value, validators) => {
	let isValid = true;

	//switches through different validation
	const switchValidator = (validator) => {
		switch (validator.type) {
			case VALIDATOR_TYPE.REQUIRE:
				isValid = isValid && value.trim().length > 0;
				break;
			case VALIDATOR_TYPE.MINLENGTH:
				isValid = isValid && value.trim().length >= validator.val;
				break;
			case VALIDATOR_TYPE.MAXLENGTH:
				isValid = isValid && value.trim().length <= validator.val;
				break;
			case VALIDATOR_TYPE.MIN:
				isValid = isValid && +value >= validator.val;
				break;
			case VALIDATOR_TYPE.MAX:
				isValid = isValid && +value <= validator.val;
				break;
			case VALIDATOR_TYPE.EMAIL:
				isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
				break;
			default:
				isValid = true;
				break;
		}
	};

	for (const validator of validators) {
		switchValidator(validator);
	}
	return isValid;
};
