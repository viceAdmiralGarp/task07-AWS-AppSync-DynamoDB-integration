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

    // Parse and validate the stored payload
    let payload;
    try {
        payload = JSON.parse(ctx.result.payLoad);
        if (!payload.meta) throw new Error();
    } catch {
        util.error('Invalid payload format', 'DataError');
    }

    // Return EXACT structure matching schema
    return {
        id: ctx.result.id,
        userId: parseInt(ctx.result.userId),
        createdAt: ctx.result.createdAt,
        payLoad: {
            meta: {
                key1: Number(payload.meta.key1), // Ensure number type
                key2: String(payload.meta.key2)  // Ensure string type
            }
        }
    };
}