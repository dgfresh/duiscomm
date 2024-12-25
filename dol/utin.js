function domainCaption(locale, scale, opt) {
    // Default options
    const defaultOpt = {
        captionPrefix: '',
        captionSuffix: '',
        formatFunction: null // Custom formatting function if needed
    };

    // Merge provided options with default options
    const options = { ...defaultOpt, ...opt };

    // Generate the domain caption based on the scale type
    let caption = '';

    if (scale.type === 'linear' || scale.type === 'log') {
        const domain = scale.domain();
        const formatter = options.formatFunction || (value => value.toLocaleString(locale));
        
        caption = `${options.captionPrefix}${formatter(domain[0])} - ${formatter(domain[1])}${options.captionSuffix}`;
    } else if (scale.type === 'ordinal') {
        const domain = scale.domain();
        const formatter = options.formatFunction || (value => value.toLocaleString(locale));

        caption = `${options.captionPrefix}${domain.map(formatter).join(', ')}${options.captionSuffix}`;
    } else {
        throw new Error(`Unsupported scale type: ${scale.type}`);
    }

    return caption;
}

// Example usage:
const scaleLinear = {
    type: 'linear',
    domain: () => [0, 100]
};

const scaleOrdinal = {
    type: 'ordinal',
    domain: () => ['A', 'B', 'C']
};

const linearCaption = domainCaption('en-US', scaleLinear, {
    captionPrefix: 'Range: ',
    captionSuffix: ' (units)',
    formatFunction: value => value.toFixed(2)
});

const ordinalCaption = domainCaption('en-US', scaleOrdinal, {
    captionPrefix: 'Categories: ',
    captionSuffix: '',
    formatFunction: value => value
});

console.log(linearCaption);  // Output: "Range: 0.00 - 100.00 (units)"
console.log(ordinalCaption);  // Output: "Categories: A, B, C"
