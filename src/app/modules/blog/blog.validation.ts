import { z } from 'zod';
// Validation Schema For createBlog
// Zod schema definition
const createBlogSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    category: z.string({ required_error: 'Category is required' }),
    content: z.string({ required_error: 'Content is required' }),
    photo: z.string({ required_error: 'Photo is required' }),
  }),
});

// Exporting validation schemas
export const blogValidation = {
  createBlogSchema,
};

