export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(4),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required().min(20),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'object',
      fields: [
        {
          title: 'Image File',
          name: 'file',
          type: 'file',
          options: {accept: 'image/*'},
        },
        {
          title: 'Image URL',
          name: 'URL',
          type: 'url',
        },
      ],
      validation: (Rule: any) =>
        Rule.required().custom((value: any) => {
          if (!value.file || !value.url) {
            return 'Please Provide an image or an image URL'
          }
          return true
        }),
    },
    {
      name: 'isFeatured',
      title: 'Is Featured',
      type: 'boolean',
      validation: (Rule: any) => Rule.required(),
      options: {
        layout: 'checkbox',
      },
      initialValue: false,
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
      options: {
        default: new Date().toISOString(),
      },
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: '100',
        slugify: (input: any) => input.toLowerCase().replace(/\s+/g, '-'),
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [
        {
          type: 'category',
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [
        {
          type: 'author',
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
  ],
}
