import { util } from '@aws-appsync/utils';

export function request(ctx) {
    const { userId, payLoad } = ctx.args;
    const id = util.autoId();
    const createdAt = util.time.nowISO8601();

    try {
        const payloadObj = JSON.parse(payLoad);
        if (!payloadObj.meta || typeof payloadObj.meta.key1 !== 'number' || typeof payloadObj.meta.key2 !== 'string') {
            util.error('Invalid payload structure', 'ValidationError');
        }
    } catch (e) {
        util.error('Invalid JSON payload', 'ValidationError');
    }

    return {
        operation: 'PutItem',
        key: util.dynamodb.toMapValues({ id }),
        attributeValues: util.dynamodb.toMapValues({
            userId,
            createdAt,
            payLoad
        })
    };
}

export function response(ctx) {
    return {
        id: ctx.result.id,
        createdAt: ctx.result.createdAt
    };
}