import { util } from '@aws-appsync/utils';

export function request(ctx) {
    // Validate payload structure before saving
    try {
        const payload = JSON.parse(ctx.args.payLoad);
        if (!payload.meta || typeof payload.meta.key1 !== 'number' ||
            typeof payload.meta.key2 !== 'string') {
            util.error('Invalid payload structure', 'ValidationError');
        }
    } catch (e) {
        util.error('Invalid JSON payload', 'ValidationError');
    }

    return {
        operation: 'PutItem',
        key: util.dynamodb.toMapValues({ id: util.autoId() }),
        attributeValues: util.dynamodb.toMapValues({
            userId: ctx.args.userId,
            createdAt: util.time.nowISO8601(),
            payLoad: ctx.args.payLoad
        })
    };
}

export function response(ctx) {
    return {
        id: ctx.result.id,
        createdAt: ctx.result.createdAt
    };
}