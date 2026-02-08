export const beautifyHtml = (html: string): string => {
    if (!html) return '';
    let formatted = '';
    const reg = /(>)(<)(\/*)/g;
    const xml = html.replace(reg, '$1\r\n$2$3');
    let pad = 0;

    const nodes = xml.split('\r\n');

    nodes.forEach((node) => {
        let indent = 0;

        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            const tagMatch = node.match(/^<(\w+)/);
            const tag = tagMatch ? tagMatch[1].toLowerCase() : '';
            const isVoid = /^(area|base|br|col|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i.test(tag);
            if (!isVoid) {
                indent = 1;
            }
        } else {
            indent = 0;
        }

        let padding = '';
        for (let i = 0; i < pad; i++) {
            padding += '  ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted.trim();
};
