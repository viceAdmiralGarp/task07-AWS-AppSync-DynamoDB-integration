import { util } from '@aws-appsync/utils';

export function request(ctx) {
    return {
        operation: 'GetItem',
        key: { id: { S: ctx.args.id } }
    };
}

export function response(ctx) {
    if (!ctx.result) {
        util.error('Event not found', 'NotFound');
    }

    const payload = JSON.parse(ctx.result.payLoad.S);
    return {
        id: ctx.result.id.S,
        userId: parseInt(ctx.result.userId.N),
        createdAt: ctx.result.createdAt.S,
        payLoad: {
            meta: {
                key1: payload.meta.key1,
                key2: payload.meta.key2
            }
        }
    };
}