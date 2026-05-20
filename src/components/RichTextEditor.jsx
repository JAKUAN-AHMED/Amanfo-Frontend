import { useEffect, useRef } from 'react';
import {
  Bold, Italic, Underline, List, ListOrdered, Heading1, Heading2,
  Link as LinkIcon, Quote, Undo2, Redo2, AlignLeft, AlignCenter, AlignRight, Strikethrough,
} from 'lucide-react';

function ToolbarButton({ icon, title, onMouseDown }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        onMouseDown();
      }}
      className="w-8 h-8 inline-flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-100"
    >
      {icon}
    </button>
  );
}

function Divider() {
  return <span className="w-px h-5 bg-gray-200 mx-1" />;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Write something…', minHeight = 160 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && value !== ref.current.innerHTML) {
      ref.current.innerHTML = value || '';
    }
  }, [value]);

  const exec = (cmd, arg) => {
    document.execCommand(cmd, false, arg);
    if (ref.current) onChange?.(ref.current.innerHTML);
  };

  const promptLink = () => {
    const url = prompt('Enter URL');
    if (url) exec('createLink', url);
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-brand/30">
      <div className="flex items-center flex-wrap gap-0.5 px-2 py-1.5 border-b border-gray-200">
        <ToolbarButton title="Heading 1" icon={<Heading1 size={16} />} onMouseDown={() => exec('formatBlock', '<h1>')} />
        <ToolbarButton title="Heading 2" icon={<Heading2 size={16} />} onMouseDown={() => exec('formatBlock', '<h2>')} />
        <Divider />
        <ToolbarButton title="Bold (Ctrl+B)" icon={<Bold size={16} />} onMouseDown={() => exec('bold')} />
        <ToolbarButton title="Italic (Ctrl+I)" icon={<Italic size={16} />} onMouseDown={() => exec('italic')} />
        <ToolbarButton title="Underline (Ctrl+U)" icon={<Underline size={16} />} onMouseDown={() => exec('underline')} />
        <ToolbarButton title="Strikethrough" icon={<Strikethrough size={16} />} onMouseDown={() => exec('strikeThrough')} />
        <Divider />
        <ToolbarButton title="Bulleted list" icon={<List size={16} />} onMouseDown={() => exec('insertUnorderedList')} />
        <ToolbarButton title="Numbered list" icon={<ListOrdered size={16} />} onMouseDown={() => exec('insertOrderedList')} />
        <ToolbarButton title="Quote" icon={<Quote size={16} />} onMouseDown={() => exec('formatBlock', '<blockquote>')} />
        <Divider />
        <ToolbarButton title="Align left" icon={<AlignLeft size={16} />} onMouseDown={() => exec('justifyLeft')} />
        <ToolbarButton title="Align center" icon={<AlignCenter size={16} />} onMouseDown={() => exec('justifyCenter')} />
        <ToolbarButton title="Align right" icon={<AlignRight size={16} />} onMouseDown={() => exec('justifyRight')} />
        <Divider />
        <ToolbarButton title="Insert link" icon={<LinkIcon size={16} />} onMouseDown={promptLink} />
        <Divider />
        <ToolbarButton title="Undo" icon={<Undo2 size={16} />} onMouseDown={() => exec('undo')} />
        <ToolbarButton title="Redo" icon={<Redo2 size={16} />} onMouseDown={() => exec('redo')} />
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange?.(e.currentTarget.innerHTML)}
        data-placeholder={placeholder}
        className="rte-editor px-4 py-3 text-sm text-gray-800 focus:outline-none"
        style={{ minHeight }}
      />
      <style>{`
        .rte-editor:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        .rte-editor h1 { font-size: 1.5rem; font-weight: 700; margin: 0.4rem 0; }
        .rte-editor h2 { font-size: 1.25rem; font-weight: 700; margin: 0.4rem 0; }
        .rte-editor ul { list-style: disc; padding-left: 1.25rem; }
        .rte-editor ol { list-style: decimal; padding-left: 1.25rem; }
        .rte-editor blockquote {
          border-left: 3px solid #d1d5db;
          padding-left: 0.75rem;
          color: #4b5563;
          margin: 0.4rem 0;
        }
        .rte-editor a { color: #0F7A3D; text-decoration: underline; }
      `}</style>
    </div>
  );
}
