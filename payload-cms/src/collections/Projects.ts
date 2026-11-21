import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Project',
    plural: 'Projects',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['orderId', 'name', 'sg', 'status', 'thumbnail'],
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
      name: 'sg',
      type: 'text',
      required: true,
      admin: {
        description: 'Scientific group slug (e.g. GameDev, AI, Biomed, Energy, Software)',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'text',
      required: true,
      admin: {
        description: 'Status (e.g. Active, Completed)',
      },
    },
    {
      name: 'thumbnail',
      type: 'text',
      admin: {
        description: 'Thumbnail path in MinIO (e.g. /projects/gamedev/Thumbnail_CyberQuest.png)',
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
    },
    {
      name: 'technologies',
      type: 'text',
      hasMany: true,
      admin: {
        description: 'Technologies used (e.g. Godot, Python, Unity, C#)',
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
            { name: 'description', type: 'textarea' },
            { name: 'links', type: 'json' },
          ],
        },
        {
          name: 'en',
          type: 'group',
          label: 'English Info',
          fields: [
            { name: 'description', type: 'textarea' },
            { name: 'links', type: 'json' },
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
