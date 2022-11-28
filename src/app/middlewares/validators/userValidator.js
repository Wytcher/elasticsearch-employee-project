import { body, validationResult } from "express-validator";
import { ValidatorError } from "../../errorHandler/errors.js";
import User from "../../model/User.js";

const userCreateValidationFields = [
    body('firstName')
        .exists().withMessage("The field firstName must be informed")
        .isLength({ min: 3 }).withMessage("The field firstName must contain at leats 3 characters"),
    body('lastName')
        .exists().withMessage("The field lastName must be informed")
        .isLength({ min: 3 }).withMessage("The field lastName must contain at leats 3 characters"),
    body('password')
        .exists().withMessage("The field password must be informed")
        .isLength({ min: 8 }).withMessage("The field password must contain at leats 8 characters"),
    body('cpf')
        .exists().withMessage("The field cpf must be informed")
        .notEmpty().withMessage("The field cpf must be informed"),
    body('gender')
        .exists().withMessage("The field gender must be informed")
        .notEmpty().withMessage("The field gender must be informed"),
    body('cellPhone')
        .exists().withMessage("The field cellPhone must be informed")
        .notEmpty().withMessage("The field cellPhone must be informed"),
    body('email')
        .isEmail().withMessage("The field email must be a valid email")
        .custom(async email => {
            if (!email) {
                return Promise.reject('The field e-mail must be informed');
            }
            const emailExists = await User.findOne({ where: { email: email } })
            if (emailExists) {
                return Promise.reject('This email is already registered');
            }
            return true
        }),
    body('address.zipcode')
        .exists().withMessage("The field zipcode must be informed")
        .isNumeric().withMessage("The field zipcode must be numeric")
        .isLength({ min: 8 }).trim().withMessage("The zipcode must contain 8 characters"),
    body('address.street')
        .exists().withMessage("The field street must be informed")
        .notEmpty().withMessage("The field street must be informed"),
    body('address.number')
        .exists().withMessage("The field number must be informed")
        .notEmpty().withMessage("The field number must be informed"),
    body('address.district')
        .exists().withMessage("The field district must be informed")
        .notEmpty().withMessage("The field district must be informed"),
    body('address.city')
        .exists().withMessage("The field city must be informed")
        .notEmpty().withMessage("The field city must be informed"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidatorError({ message: "Invalid Parameters", parameters: errors.array() });
        }
        next();
    }
];

export default userCreateValidationFields;