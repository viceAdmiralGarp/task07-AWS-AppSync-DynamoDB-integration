import { util } from '@aws-appsync/utils';

export function request(ctx) {
    const id = util.autoId();
    const createdAt = util.time.nowISO8601();

    return {
        operation: 'PutItem',
        key: { id: { S: id } },
        attributeValues: {
            userId: { N: ctx.args.userId.toString() },
            createdAt: { S: createdAt },
            payLoad: { S: ctx.args.payLoad }
        }
    };
}

export function response(ctx) {
    return {
        id: ctx.result.id,
        createdAt: ctx.result.createdAt
    };
}