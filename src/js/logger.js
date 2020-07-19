// This is here to intentionally cause an ESLint error
// to show that ESLint is working as expected
const logMessage = msg => console.log(msg) // eslint-disable-line no-undef

export default logMessage