import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const ThirdParty: CollectionConfig = {
  slug: 'thirdparty',
  labels: {
    singular: 'Third Party Event',
    plural: 'Third Party Events',
  },
  admin: {
    useAsTitle: 'thumbnail',
    defaultColumns: ['orderId', 'thumbnail', 'date'],
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
      name: 'date',
      type: 'text',
      required: true,
      label: 'Start Date (ISO format, e.g. 2025-05-10T10:30:00)',
    },
    {
      name: 'end_date',
      type: 'text',
      label: 'End Date (ISO format)',
    },
    {
      name: 'registration_deadline',
      type: 'text',
      label: 'Registration Deadline',
    },
    {
      name: 'registration_form',
      type: 'text',
    },
    {
      name: 'thumbnail',
      type: 'text',
      required: true,
      admin: {
        description: 'Thumbnail path in MinIO (e.g. /events/Level-Up.jpg)',
      },
    },
    {
      name: 'thumbnailMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload or pick media from MinIO. Auto-populates thumbnail path.',
      },
    },
    {
      name: 'images',
      type: 'text',
      hasMany: true,
      admin: {
        description: 'Image paths in MinIO',
      },
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
            { name: 'title', type: 'text', required: true },
            { name: 'location', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            { name: 'keywords', type: 'text', hasMany: true },
            {
              name: 'links',
              type: 'json',
              label: 'Links JSON',
            },
          ],
        },
        {
          name: 'en',
          type: 'group',
          label: 'English Info',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'location', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            { name: 'keywords', type: 'text', hasMany: true },
            {
              name: 'links',
              type: 'json',
              label: 'Links JSON',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data.thumbnailMedia) {
          try {
            const mediaId =
              typeof data.thumbnailMedia === 'object' ? data.thumbnailMedia.id : data.thumbnailMedia
            const doc = await req.payload.findByID({ collection: 'media', id: mediaId })
            if (doc?.filename) {
              data.thumbnail = `/${doc.filename}`
            }
          } catch (e) {}
        }
        return data
      },
    ],
  },
}
