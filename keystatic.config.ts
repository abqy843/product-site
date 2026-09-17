import { config, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'abqy843',
      name: 'product-site',
    },
  },
  collections: {
    products: collection({
      label: '产品',
      slugField: 'name',
      path: 'src/content/products/*',
      format: { data: 'json' },
      schema: {
        name: {
          label: '产品名称',
          type: 'slug',
          validation: { length: { min: 1 } },
        },
        category: {
          label: '分类',
          type: 'text',
          validation: { length: { min: 1 } },
        },
        description: {
          label: '简短描述',
          type: 'text',
          validation: { length: { min: 1 } },
        },
        details: {
          label: '详细说明',
          type: 'text',
          validation: { length: { min: 1 } },
        },
        price: {
          label: '价格（元）',
          type: 'integer',
          validation: { min: 0 },
        },
        image: {
          label: '图片路径',
          type: 'text',
          defaultValue: '/products/placeholder.jpg',
        },
        specs: {
          label: '产品规格',
          type: 'object',
          fields: {
            spec1Key: { label: '规格1名称', type: 'text' },
            spec1Value: { label: '规格1值', type: 'text' },
            spec2Key: { label: '规格2名称', type: 'text' },
            spec2Value: { label: '规格2值', type: 'text' },
            spec3Key: { label: '规格3名称', type: 'text' },
            spec3Value: { label: '规格3值', type: 'text' },
            spec4Key: { label: '规格4名称', type: 'text' },
            spec4Value: { label: '规格4值', type: 'text' },
          },
        },
      },
    }),
  },
});
