export const swaggerFormat = {
  schema: {
    type: 'object',
    properties: {
      imageUrl: {
        type: 'string',
        format: 'binary',
      },
      title: {
        type: 'string',
      },
      description: {
        type: 'string',
        example: 'this is a description...',
      },
      body: {
        type: 'string',
      },
      category: {
        type: 'string',
      },
      published: {
        type: 'boolean',
      },
    },
  },
};
