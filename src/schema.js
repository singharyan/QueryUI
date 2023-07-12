export const fileSchema = {
    title: 'attachs schema',
    version: 0,
    type: 'object',
    primaryKey: 'id',
    properties: {
        id: {
            type: 'string',
            maxLength: 100 // <- the primary key must have set maxLength
        },
        data:{
            type:'string'
        },
        date: {
            type:'string'
        }
    },
    required: ['id'],
    indexes: []
    // attachments: {
    //     encrypted: true // if true, the attachment-data will be encrypted with the db-password
    // }
};