/**
 * Sends a request to the attached data source
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the request
 */
export function request(ctx) {
    const { id } = ctx.args;
    return {
        operation: 'GetItem',
        key: {
            id: { S: id }
        }
    };
}

/**
 * Returns the resolver result
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the result
 */
export function response(ctx) {
    if (!ctx.result) {
        util.error('Event not found', 'NotFound');
    }

    const { id, userId, createdAt, payLoad } = ctx.result;
    return {
        id,
        userId: parseInt(userId.N),
        createdAt,
        payLoad: JSON.parse(payLoad.S)
    };
}