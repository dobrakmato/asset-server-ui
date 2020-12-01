/**
 * Returns a filter function that can used to `.filter(fn)` assets.
 * @param filter
 * @return {function(*=): boolean}
 */
export const searchFilter = (filter) => {
    const tokens = filter.toLowerCase().split(' ');
    const fullTextTokens = [];
    const filters = [];

    for (const token of tokens) {

        // parse special tokens
        if (token.startsWith('tag:')) {
            const tagName = token.substring(4).trim()
            filters.push(q => q.tags.some(tag => tag.toLowerCase() === tagName));
        } else if (token.startsWith('type:')) {
            const type = token.substring(5).trim()
            filters.push(q => q.type.toLowerCase() === type);
        } else if (token.startsWith('dirty:')) {
            filters.push(q => !!q.dirty);
        } else if (token.startsWith('updated:')) {

        } else {
            fullTextTokens.push(token.trim())
        }
    }

    return (asset) => {
        // reject all assets that are not matched by requested filters
        for (const filter of filters) {
            if (!filter(asset)) {
                return false;
            }
        }

        if (fullTextTokens.length === 0) return true;

        // fuzzy string contains for other tokens
        for (const fullTextToken of fullTextTokens) {

            // match in asset name
            if (asset.name.toLowerCase().includes(fullTextToken)) {
                return true;
            }

            // match in any tag name
            if (asset.tags.some(tag => tag.toLowerCase().includes(fullTextToken))) {
                return true;
            }

            // match in type
            if (asset.type.toLowerCase().includes(fullTextToken)) {
                return true;
            }

            // match in input_path
            if (asset?.input_path?.toLowerCase()?.includes(fullTextToken)) {
                return true;
            }

            // match start or end of uuid
            if (fullTextToken.length > 3 &&
                (asset.uuid.toLowerCase().startsWith(fullTextToken) || asset.uuid.toLowerCase().endsWith(fullTextToken))
            ) {
                return true;
            }
        }


        return false;
    }
};
