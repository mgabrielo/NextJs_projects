export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'url',
      validation: (Rule: any) => Rule.required().uri(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required().min(20),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
        slugify: (input: any) => input.toLowerCase().replace(/\s+/g, '-'),
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
}
