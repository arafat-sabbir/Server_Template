import { z } from "zod";

// Validation Schema For createBlog
const createBlogSchema = z.object({
  body:z.object({

  })
})

export const blogValidation = {
  createBlogSchema
}