/**
 * Sends a request to the attached data source
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the request
 */
export function request(ctx) {
    const { userId, payLoad } = ctx.args;
    const id = util.autoId();
    const createdAt = util.time.nowISO8601();

    return {
        operation: 'PutItem',
        key: {
            id: { S: id }
        },
        attributeValues: {
            userId: { N: userId.toString() },
            createdAt: { S: createdAt },
            payLoad: { S: payLoad }
        }
    };
}

/**
 * Returns the resolver result
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the result
 */
export function response(ctx) {
    const { id, createdAt } = ctx.result;
    return {
        id,
        createdAt
    };
}