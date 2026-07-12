import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, maxlength: 200 },
    content: { type: String, required: true, maxlength: 100000 },
    excerpt: { type: String, default: '', maxlength: 500 },
    tags: { type: [String], default: [], maxlength: 50 },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

BlogPostSchema.index({ slug: 1 }, { unique: true });
BlogPostSchema.index({ published: 1, createdAt: -1 });

export const BlogPost = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
