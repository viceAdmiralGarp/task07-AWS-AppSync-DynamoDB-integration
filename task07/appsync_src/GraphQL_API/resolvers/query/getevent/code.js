import { util } from '@aws-appsync/utils';

export function request(ctx) {
    const { id } = ctx.args;
    return {
        operation: 'GetItem',
        key: util.dynamodb.toMapValues({ id })
    };
}

export function response(ctx) {
    if (!ctx.result) {
        util.error('Event not found', 'NotFound');
    }

    const payload = JSON.parse(ctx.result.payLoad);

    return {
        id: ctx.result.id,
        userId: parseInt(ctx.result.userId),
        createdAt: ctx.result.createdAt,
        payLoad: {
            meta: {
                key1: payload.meta.key1,
                key2: payload.meta.key2
            }
        }
    };
}