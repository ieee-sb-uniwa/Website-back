import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Council: CollectionConfig = {
  slug: 'council',
  labels: {
    singular: 'Council Member',
    plural: 'Council',
  },
  admin: {
    useAsTitle: 'photo',
    defaultColumns: ['orderId', 'photo'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'orderId',
      type: 'number',
      label: 'ID (Backend id field)',
      admin: {
        description: 'Numeric ID matching backend format (e.g. 0, 1, 2)',
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            return data?.id ?? data?.orderId
          },
        ],
        beforeChange: [
          ({ value, data }) => {
            if (value !== undefined && data) {
              data.id = value
            }
            return value
          },
        ],
      },
    },
    {
      name: 'photo',
      type: 'text',
      required: true,
      admin: {
        description: 'Photo path in MinIO (e.g. /people/spyros-saridakis.jpg)',
      },
    },
    {
      name: 'photoMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload or pick media from MinIO. Auto-populates photo path.',
      },
    },
    {
      name: 'socials',
      type: 'array',
      fields: [
        { name: 'id', type: 'number' },
        { name: 'type', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'info',
      type: 'group',
      fields: [
        {
          name: 'gr',
          type: 'group',
          label: 'Greek Info',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'role', type: 'text', required: true },
          ],
        },
        {
          name: 'en',
          type: 'group',
          label: 'English Info',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'role', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data.photoMedia) {
          try {
            const mediaId =
              typeof data.photoMedia === 'object' ? data.photoMedia.id : data.photoMedia
            const doc = await req.payload.findByID({ collection: 'media', id: mediaId })
            if (doc?.filename) {
              data.photo = `/${doc.filename}`
            }
          } catch (e) {}
        }
        return data
      },
    ],
  },
}
