import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { motion } from 'framer-motion';
import { Eye, Save, X, Image as ImageIcon, Layout, Code } from 'lucide-react';
import DOMPurify from 'dompurify';

interface BlogEditorProps {
    initialData?: any;
    onSave: (data: any) => Promise<void>;
    onCancel: () => void;
    handleUpload: (file: File) => Promise<string>;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ initialData, onSave, onCancel, handleUpload }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [category, setCategory] = useState(initialData?.category || '');
    const [author, setAuthor] = useState(initialData?.author || 'Admin');
    const [image, setImage] = useState(initialData?.image || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [isHtmlMode, setIsHtmlMode] = useState(false);
    const [showPreview, setShowPreview] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const quillRef = useRef<any>(null);

    // Custom Image Handler for Quill to upload to server instead of Base64
    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files ? input.files[0] : null;
            if (file) {
                try {
                    const url = await handleUpload(file);
                    const quill = quillRef.current.getEditor();
                    const range = quill.getSelection();
                    quill.insertEmbed(range.index, 'image', url);
                } catch (err) {
                    console.error('Image upload failed', err);
                    alert('Image upload failed');
                }
            }
        };
    };

    // Custom Toolbar for ReactQuill to match dark theme
    const modules = React.useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image', 'video'],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        },
        clipboard: {
            matchVisual: false,
        }
    }), []);

    const handleSave = async () => {
        if (!title || !content) {
            alert("Title and Content are required!");
            return;
        }

        setIsSaving(true);
        try {
            await onSave({
                id: initialData?.id,
                title,
                category,
                author,
                image,
                content,
                date: initialData?.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            });
        } catch (error) {
            console.error(error);
            alert("Save failed");
        } finally {
            setIsSaving(false);
        }
    };

    const onImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const url = await handleUpload(file);
                setImage(url);
            } catch (err) {
                alert("Image upload failed");
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col">
            {/* Header / Toolbar */}
            <div className="h-16 border-b border-white/10 flex justify-between items-center px-6 bg-[#0a0a0a] shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                    <h1 className="font-bold text-lg">{initialData ? 'Edit Post' : 'New Post'}</h1>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className={`p-2 rounded flex items-center gap-2 text-sm font-bold transition-colors ${showPreview ? 'bg-purple-600/20 text-purple-400' : 'hover:bg-white/10 text-gray-400'}`}
                    >
                        <Layout size={18} /> {showPreview ? 'Split View' : 'Editor Only'}
                    </button>
                    <div className="w-px h-6 bg-white/20 mx-2" />
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-full font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                        {isSaving ? 'Saving...' : 'Publish'}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Editor Column */}
                <div className={`flex-1 flex flex-col overflow-y-auto border-r border-white/10 ${showPreview ? 'max-w-[50%]' : 'max-w-full'}`}>
                    <div className="p-8 max-w-3xl mx-auto w-full space-y-6">
                        {/* Meta Fields */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <input
                                    type="text"
                                    placeholder="Post Title"
                                    className="w-full bg-transparent text-4xl font-black placeholder-gray-700 border-none focus:ring-0 p-0 leading-tight"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-1 font-bold tracking-wider">Category</label>
                                <input
                                    className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-sm focus:border-purple-500 outline-none transition-colors"
                                    placeholder="e.g. Music, Tech, News"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-1 font-bold tracking-wider">Author</label>
                                <input
                                    className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-sm focus:border-purple-500 outline-none transition-colors"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs uppercase text-gray-500 mb-1 font-bold tracking-wider">Cover Image</label>
                                <div className="relative group rounded-xl overflow-hidden bg-[#111] border border-white/10 h-48 flex items-center justify-center cursor-pointer">
                                    {image ? (
                                        <img src={image} alt="Cover" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center text-gray-600 gap-2">
                                            <ImageIcon size={32} />
                                            <span className="text-sm font-bold">Click to upload cover</span>
                                        </div>
                                    )}
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={onImageUpload} />
                                </div>
                            </div>
                        </div>

                        {/* Content Editor */}
                        <div className="pt-6 border-t border-white/10">
                            <div className="flex justify-between items-center mb-4">
                                <label className="block text-xs uppercase text-purple-400 font-bold tracking-wider">Content</label>
                                <button
                                    onClick={() => setIsHtmlMode(!isHtmlMode)}
                                    className="text-xs flex items-center gap-1 text-gray-500 hover:text-white transition-colors"
                                >
                                    <Code size={12} /> {isHtmlMode ? 'Visual Editor' : 'HTML Source'}
                                </button>
                            </div>

                            <div className="bg-[#111] rounded-xl border border-white/10 overflow-hidden min-h-[500px] text-gray-200">
                                {isHtmlMode ? (
                                    <textarea
                                        className="w-full h-full min-h-[500px] bg-transparent p-4 font-mono text-sm leading-relaxed outline-none resize-none"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                ) : (
                                    <ReactQuill
                                        theme="snow"
                                        ref={quillRef}
                                        value={content}
                                        onChange={setContent}
                                        modules={modules}
                                        className="h-full min-h-[450px] dark-quill"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Preview Column */}
                {showPreview && (
                    <div className="flex-1 overflow-y-auto bg-black relative">
                        <div className="absolute inset-0 pointer-events-none opacity-50 bg-[url('/noise.png')] mix-blend-overlay"></div>
                        <div className="max-w-2xl mx-auto py-20 px-8 relative z-10">
                            <div className="mb-12">
                                <span className="inline-block px-3 py-1 rounded-full bg-purple-600/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-500/20">
                                    {category || 'Uncategorized'}
                                </span>
                                <h1 className="text-5xl font-black text-white leading-tight mb-6">{title || 'Your Post Title'}</h1>
                                <div className="flex items-center gap-3 text-sm text-gray-400 font-bold uppercase tracking-widest">
                                    <span>{new Date().toLocaleDateString()}</span>
                                    <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                                    <span>{author}</span>
                                </div>
                            </div>

                            {image && (
                                <div className="mb-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/10">
                                    <img src={image} alt="Preview" className="w-full h-auto" />
                                </div>
                            )}

                            <div
                                className="prose prose-invert prose-purple prose-lg max-w-none 
                                [&>p]:mb-6 [&>p]:text-gray-300 [&>p]:leading-loose
                                [&>h1]:text-4xl [&>h1]:font-black [&>h1]:text-white [&>h1]:mb-6 
                                [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mb-4 
                                [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mb-3
                                [&>blockquote]:border-l-4 [&>blockquote]:border-purple-500 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-gray-400 [&>blockquote]:bg-white/5 [&>blockquote]:p-4 [&>blockquote]:rounded-r-lg
                                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:text-gray-300
                                [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6
                                [&>img]:rounded-xl [&>img]:border [&>img]:border-white/10 [&>img]:my-8
                                [&>a]:text-purple-400 [&>a]:underline [&>a]:decoration-purple-500/30 [&>a]:underline-offset-4 hover:[&>a]:decoration-purple-400"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(content, {
                                        ADD_TAGS: ['iframe', 'style', 'script', 'div', 'span'],
                                        ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target', 'class', 'src', 'width', 'height', 'id', 'name', 'title', 'style']
                                    })
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Custom Styles for Quill in Dark Mode */}
            <style>{`
                .dark-quill .ql-toolbar {
                    border: none !important;
                    border-bottom: 1px solid rgba(255,255,255,0.1) !important;
                    background: #161616;
                    border-radius: 12px 12px 0 0;
                }
                .dark-quill .ql-container {
                    border: none !important;
                    background: transparent;
                    font-size: 16px;
                    color: #e5e5e5;
                }
                .dark-quill .ql-editor {
                    min-height: 450px;
                    padding: 24px;
                }
                .ql-stroke { stroke: #a0a0a0 !important; }
                .ql-fill { fill: #a0a0a0 !important; }
                .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {
                    right: 0px !important;
                }
                .ql-picker-label { color: #a0a0a0 !important; }
            `}</style>
        </div>
    );
};

export default BlogEditor;
