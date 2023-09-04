export default {
  name: 'author',
  title: 'author',
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
      validation: (Rule: any) =>
        Rule.required().custom((value: string) => {
          if (!/^https?:\/\/\S+\.\S+/i.test(value)) {
            return 'Image Must Be a Valid URL'
          }
          return true
        }),
    },
  ],
}
