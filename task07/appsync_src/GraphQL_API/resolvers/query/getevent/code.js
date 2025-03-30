import { util } from '@aws-appsync/utils';

export function request(ctx) {
    return {
        operation: 'GetItem',
        key: util.dynamodb.toMapValues({ id: ctx.args.id })
    };
}

export function response(ctx) {
    if (!ctx.result) {
        util.error('Event not found', 'NotFound');
    }

    const payload = JSON.parse(ctx.result.payLoad);
    return {
        id: ctx.result.id,
        userId: ctx.result.userId,
        createdAt: ctx.result.createdAt,
        payLoad: payload
    };
}