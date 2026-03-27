"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { Bold, Italic, Strikethrough, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Heading1, Heading2, AlignJustify } from 'lucide-react';
import { useEffect } from 'react';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-[#d4c5b9] bg-[#fdfaf6] rounded-t-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-[#eaddd1] text-[#4A3728] ${editor.isActive('bold') ? 'bg-[#eaddd1]' : ''}`}
        title="Bold"
      >
        <Bold size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-[#eaddd1] text-[#4A3728] ${editor.isActive('italic') ? 'bg-[#eaddd1]' : ''}`}
        title="Italic"
      >
        <Italic size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded hover:bg-[#eaddd1] text-[#4A3728] ${editor.isActive('strike') ? 'bg-[#eaddd1]' : ''}`}
        title="Strikethrough"
      >
        <Strikethrough size={18} />
      </button>

      <div className="w-px h-6 bg-[#d4c5b9] mx-1 my-auto"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-[#eaddd1] text-[#4A3728] ${editor.isActive('heading', { level: 1 }) ? 'bg-[#eaddd1]' : ''}`}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-[#eaddd1] text-[#4A3728] ${editor.isActive('heading', { level: 2 }) ? 'bg-[#eaddd1]' : ''}`}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </button>

      <div className="w-px h-6 bg-[#d4c5b9] mx-1 my-auto"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-[#eaddd1] text-[#4A3728] ${editor.isActive('bulletList') ? 'bg-[#eaddd1]' : ''}`}
        title="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-[#eaddd1] text-[#4A3728] ${editor.isActive('orderedList') ? 'bg-[#eaddd1]' : ''}`}
        title="Ordered List"
      >
        <ListOrdered size={18} />
      </button>

      <div className="w-px h-6 bg-[#d4c5b9] mx-1 my-auto"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded hover:bg-[#eaddd1] text-[#4A3728] ${editor.isActive({ textAlign: 'left' }) ? 'bg-[#eaddd1]' : ''}`}
        title="Align Left"
      >
        <AlignLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded hover:bg-[#eaddd1] text-[#4A3728] ${editor.isActive({ textAlign: 'center' }) ? 'bg-[#eaddd1]' : ''}`}
        title="Align Center"
      >
        <AlignCenter size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded hover:bg-[#eaddd1] text-[#4A3728] ${editor.isActive({ textAlign: 'right' }) ? 'bg-[#eaddd1]' : ''}`}
        title="Align Right (RTL Support)"
      >
        <AlignRight size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`p-2 rounded hover:bg-[#eaddd1] text-[#4A3728] ${editor.isActive({ textAlign: 'justify' }) ? 'bg-[#eaddd1]' : ''}`}
        title="Justify"
      >
        <AlignJustify size={18} />
      </button>
    </div>
  );
};

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content || '<p>Mulai menulis deskripsi acara di sini...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-stone max-w-none focus:outline-none min-h-[300px] p-4 text-[#3e2723]',
        dir: 'auto', // Auto direction for Arabic text support
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when content prop changes (e.g. initial load)
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="border border-[#d4c5b9] rounded-lg shadow-sm bg-white overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
