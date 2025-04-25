import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import { useController } from 'react-hook-form';
import {
    FaBold,
    FaItalic,
    FaList,
    FaRedo,
    FaUnderline,
    FaUndo,
} from 'react-icons/fa';

// Custom toolbar button component
const ToolbarButton = ({ onClick, active, children }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`mr-1 rounded p-2 ${
                active
                    ? 'bg-info text-white dark:text-white'
                    : 'bg-gray-200 text-black dark:bg-transparent dark:text-white'
            }`}
        >
            {children}
        </button>
    );
};

// The Tiptap editor component that integrates with React Hook Form
const TiptapEditor = ({ name, control, defaultValue = '' }) => {
    // Using the useController hook from react-hook-form to register the editor
    const { field } = useController({
        name,
        control,
        defaultValue,
    });

    // Initialize the editor with desired extensions
    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: defaultValue,
        onUpdate: ({ editor }) => {
            // Update the form field value when editor content changes
            field.onChange(editor.getHTML());
        },
    });

    // Update editor content if the form field value changes externally
    useEffect(() => {
        if (editor && field.value !== editor.getHTML()) {
            editor.commands.setContent(field.value);
        }
    }, [editor, field.value]);

    // If editor isn't loaded yet, show a loading placeholder
    if (!editor) {
        return <div>Loading editor...</div>;
    }

    return (
        <div className="rounded border dark:border-gray-600">
            {/* Toolbar */}
            <div className="flex border-b bg-gray-50 p-2 dark:border-gray-600 dark:bg-transparent">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive('bold')}
                >
                    <FaBold />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive('italic') ? 'is-active' : ''}
                >
                    <FaItalic />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                    active={editor.isActive('underline')}
                >
                    <FaUnderline />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    active={editor.isActive('bulletList')}
                >
                    <FaList />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    active={false}
                >
                    <FaUndo />
                </ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    active={false}
                >
                    <FaRedo />
                </ToolbarButton>
            </div>

            {/* Editor content area */}
            <div className="p-2">
                <EditorContent
                    editor={editor}
                    className="focus:shadow-none dark:text-white"
                />
            </div>
        </div>
    );
};

export default TiptapEditor;
