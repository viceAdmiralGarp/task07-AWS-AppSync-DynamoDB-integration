import { util } from '@aws-appsync/utils';

export function request(ctx) {
    const id = util.autoId();
    const createdAt = util.time.nowISO8601();

    return {
        operation: 'PutItem',
        key: util.dynamodb.toMapValues({ id }),
        attributeValues: util.dynamodb.toMapValues({
            userId: ctx.args.userId,
            createdAt,
            payLoad: ctx.args.payLoad
        })
    };
}

export function response(ctx) {
    return ctx.result;
}