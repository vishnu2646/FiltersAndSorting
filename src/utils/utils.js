export const parseCurrencyString = (value, decimal) => {
    value = `${value || 0}`;
    decimal = decimal || ".";

    // Build regex to strip out everything except digits, decimal point and minus sign:
    const regex = new RegExp(`[^0-9-${decimal}]`, "g");

    let v = value
        .replace(/[\s\\n\\t]/gi, "")        // cleanup by removing \n, \t
        .replace(/\((?=\d+)(.*)\)/, "-$1"); // replace bracketed values with negatives

    // console.log(v);

    v = v.split(decimal)                    // to handle cases where more than one decimal character found in the string e.g: Rs.1,999.00
        .filter(a => isNaN(parseFloat(a.replace(regex, ""))) ? false : a)
        .join(decimal)
        .replace(regex, "")                 // strip out any cruft
        .replace(decimal, ".");             // make sure decimal point is standard

    // console.log(v);

    const parsedNumber = parseFloat(v);


    let symbol = value
            .replace(/[\d][\.,][\d]/g, "")  // replace decimal the dot or comma
            .replace(/[\d,\s]/g, "");       // replace all digits and comma

    if(symbol == null || symbol == ""){
        symbol = process.env.DEFAULT_PRICE_SYMBOL;
    }

    return { value: !isNaN(parsedNumber) ? parsedNumber : 0, symbol };
}
