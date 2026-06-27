'use client';

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold, Italic, Heading1, Heading2, List, ListOrdered,
  Code, Quote, Undo, Redo, Image, Save, Loader2, X
} from 'lucide-react';

interface BlogEditorProps {
  onClose: () => void;
  onSaved: () => void;
  editPost?: { title: string; slug: string; content: string; excerpt: string; tags: string[] };
}

export default function BlogEditor({ onClose, onSaved, editPost }: BlogEditorProps) {
  const [title, setTitle] = useState(editPost?.title || '');
  const [slug, setSlug] = useState(editPost?.slug || '');
  const [excerpt, setExcerpt] = useState(editPost?.excerpt || '');
  const [tags, setTags] = useState(editPost?.tags?.join(', ') || '');
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension,
      Placeholder.configure({ placeholder: 'Write your content here...' }),
    ],
    content: editPost?.content || '',
  });

  const handleSave = async () => {
    if (!title || !slug || !editor) return;
    setSaving(true);

    const token = sessionStorage.getItem('admin_token');
    const method = editPost ? 'PUT' : 'POST';
    const url = editPost ? `/api/blog/${editPost.slug}` : '/api/blog';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': token || '' },
      body: JSON.stringify({
        title,
        slug,
        content: editor.getHTML(),
        excerpt,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      }),
    });

    setSaving(false);
    if (res.ok) {
      onSaved();
      onClose();
    }
  };

  const addImage = () => {
    const url = prompt('Enter image URL:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) return null;

  const ToolBtn = ({ onClick, active, children }: { onClick: () => void; active?: boolean; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-all ${active ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-muted'}`}
    >
      {children}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl glass rounded-2xl border border-secondary/30 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-lg font-bold uppercase tracking-widest flex items-center gap-2">
            <Save className="w-5 h-5 text-secondary" />
            {editPost ? 'Edit Protocol' : 'New Protocol'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <input
            placeholder="Protocol Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-lg font-bold outline-none focus:border-secondary/50"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="slug-name"
              value={slug}
              onChange={e => setSlug(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm font-mono outline-none focus:border-secondary/50"
            />
            <input
              placeholder="tags: tech, security, tutorial"
              value={tags}
              onChange={e => setTags(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm font-mono outline-none focus:border-secondary/50"
            />
          </div>
          <input
            placeholder="Brief excerpt for preview cards"
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-secondary/50"
          />

          <div className="flex flex-wrap gap-1 p-2 border border-white/10 rounded-lg bg-white/5">
            <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
              <Bold className="w-4 h-4" />
            </ToolBtn>
            <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
              <Italic className="w-4 h-4" />
            </ToolBtn>
            <div className="w-px h-6 bg-white/10 mx-1" />
            <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })}>
              <Heading1 className="w-4 h-4" />
            </ToolBtn>
            <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
              <Heading2 className="w-4 h-4" />
            </ToolBtn>
            <div className="w-px h-6 bg-white/10 mx-1" />
            <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
              <List className="w-4 h-4" />
            </ToolBtn>
            <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
              <ListOrdered className="w-4 h-4" />
            </ToolBtn>
            <div className="w-px h-6 bg-white/10 mx-1" />
            <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')}>
              <Code className="w-4 h-4" />
            </ToolBtn>
            <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
              <Quote className="w-4 h-4" />
            </ToolBtn>
            <div className="w-px h-6 bg-white/10 mx-1" />
            <ToolBtn onClick={addImage}>
              <Image className="w-4 h-4" />
            </ToolBtn>
            <div className="ml-auto flex gap-1">
              <ToolBtn onClick={() => editor.chain().focus().undo().run()}>
                <Undo className="w-4 h-4" />
              </ToolBtn>
              <ToolBtn onClick={() => editor.chain().focus().redo().run()}>
                <Redo className="w-4 h-4" />
              </ToolBtn>
            </div>
          </div>

          <div className="border border-white/10 rounded-lg overflow-hidden min-h-[300px]">
            <EditorContent editor={editor} className="p-4 prose prose-invert max-w-none" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-white/10 text-muted hover:text-white transition-all text-sm font-mono">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !title || !slug}
            className="px-6 py-2 bg-secondary/20 border border-secondary/40 text-secondary rounded-lg font-bold uppercase tracking-widest hover:bg-secondary/30 transition-all text-sm disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
