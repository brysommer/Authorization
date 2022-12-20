const Ajv = require("ajv");
const ajv = new Ajv();

const mw = schema => (req, res, next) => {
    const validate = ajv.compile(schema);
    console.log(req.body)
    const valid = validate(req.body);
    console.log(valid)
    if (valid) {
        console.log('success');
        next();
        return;
    } 
    res.statusCode = 400;
    res.json({ status : validate.errors });
};

module.exports = mw;