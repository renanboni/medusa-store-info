"use client"

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import { useState } from "react"
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    AlignLeft,
    AlignCenter,
    AlignRight,
    LinkIcon,
    Code,
    Quote,
    Undo,
    Redo,
    Strikethrough,
} from "lucide-react"
import { Button, clx, Input, Label, Popover } from "@medusajs/ui"
import { Separator } from "../../components/separator"

export default function RichTextEditor() {
    const [linkUrl, setLinkUrl] = useState("")

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Start writing...",
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-primary underline",
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content: "<p>Hello, this is a rich text editor built with Tiptap!</p>",
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none max-w-none",
            },
        },
    })

    if (!editor) {
        return null
    }


    const setLink = () => {
        if (linkUrl) {
            // Check if the URL has a protocol, if not add https://
            const url = linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`

            // If text is selected, convert it to a link
            if (editor.state.selection.empty) {
                editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
            } else {
                editor.chain().focus().setLink({ href: url }).run()
            }

            setLinkUrl("")
        } else {
            editor.chain().focus().unsetLink().run()
        }
    }

    return (
        <div className="border rounded-lg shadow-sm bg-background">
            <div className="flex flex-wrap items-center gap-1 p-2 border-b">
                <Button
                    variant="transparent"
                    size="base"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={clx("p-2", editor.isActive("bold") && "bg-ui-bg-base-pressed")}
                >
                    <Bold className="w-4 h-4" />
                    <span className="sr-only">Bold</span>
                </Button>

                <Button
                    variant="transparent"
                    size="small"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={clx(editor.isActive("italic") ? "bg-ui-bg-base-pressed" : "")}
                >
                    <Italic className="w-4 h-4" />
                    <span className="sr-only">Italic</span>
                </Button>

                <Button
                    variant="transparent"
                    size="small"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={clx(editor.isActive("strike") ? "bg-ui-bg-base-pressed" : "")}
                >
                    <Strikethrough className="w-4 h-4" />
                    <span className="sr-only">Strikethrough</span>
                </Button>

                <Separator orientation="vertical" className="h-6" />

                <Button
                    variant="transparent"
                    size="small"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={clx(editor.isActive("heading", { level: 1 }) ? "bg-ui-bg-base-pressed" : "")}
                >
                    <Heading1 className="w-4 h-4" />
                    <span className="sr-only">Heading 1</span>
                </Button>

                <Button
                    variant="transparent"
                    size="small"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={clx(editor.isActive("heading", { level: 2 }) ? "bg-ui-bg-base-pressed" : "")}
                >
                    <Heading2 className="w-4 h-4" />
                    <span className="sr-only">Heading 2</span>
                </Button>

                <Button
                    variant="transparent"
                    size="small"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={clx(editor.isActive("heading", { level: 3 }) ? "bg-ui-bg-base-pressed" : "")}
                >
                    <Heading3 className="w-4 h-4" />
                    <span className="sr-only">Heading 3</span>
                </Button>

                <Separator orientation="vertical" className="h-6" />

                <Button
                    variant="transparent"
                    size="small"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={clx(editor.isActive("bulletList") ? "bg-ui-bg-base-pressed" : "")}
                >
                    <List className="w-4 h-4" />
                    <span className="sr-only">Bullet List</span>
                </Button>

                <Button
                    variant="transparent"
                    size="small"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={clx(editor.isActive("orderedList") ? "bg-ui-bg-base-pressed" : "")}
                >
                    <ListOrdered className="w-4 h-4" />
                    <span className="sr-only">Ordered List</span>
                </Button>

                <Button
                    variant="transparent"
                    size="small"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={clx(editor.isActive("codeBlock") ? "bg-ui-bg-base-pressed" : "")}
                >
                    <Code className="w-4 h-4" />
                    <span className="sr-only">Code Block</span>
                </Button>

                <Button
                    variant="transparent"
                    size="small"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={clx(editor.isActive("blockquote") ? "bg-ui-bg-base-pressed" : "")}
                >
                    <Quote className="w-4 h-4" />
                    <span className="sr-only">Blockquote</span>
                </Button>

                <Separator orientation="vertical" className="h-6" />

                <Button
                    variant="transparent"
                    size="small"
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    className={clx(editor.isActive({ textAlign: "left" }) ? "bg-ui-bg-base-pressed" : "")}
                >
                    <AlignLeft className="w-4 h-4" />
                    <span className="sr-only">Align Left</span>
                </Button>

                <Button
                    variant="transparent"
                    size="small"
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    className={clx(editor.isActive({ textAlign: "center" }) ? "bg-ui-bg-base-pressed" : "")}
                >
                    <AlignCenter className="w-4 h-4" />
                    <span className="sr-only">Align Center</span>
                </Button>

                <Button
                    variant="transparent"
                    size="small"
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    className={clx(editor.isActive({ textAlign: "right" }) ? "bg-ui-bg-base-pressed" : "")}
                >
                    <AlignRight className="w-4 h-4" />
                    <span className="sr-only">Align Right</span>
                </Button>

                <Separator orientation="vertical" className="h-6" />

                <Popover>
                    <Popover.Trigger asChild>
                        <Button variant="transparent" size="small" data-active={editor.isActive("link")}>
                            <LinkIcon className="w-4 h-4" />
                            <span className="sr-only">Add Link</span>
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content className="p-4 w-80">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Insert Link</h4>
                                <p className="text-sm text-muted-foreground">Add a URL to create a link</p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="link">URL</Label>
                                <Input
                                    id="link"
                                    placeholder="https://example.com"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                />
                            </div>
                            <Button onClick={setLink}>{editor.isActive("link") ? "Update Link" : "Add Link"}</Button>
                        </div>
                    </Popover.Content>
                </Popover>

                <div className="flex items-center gap-1 ml-auto">
                    <Button
                        variant="transparent"
                        size="small"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                    >
                        <Undo className="w-4 h-4" />
                        <span className="sr-only">Undo</span>
                    </Button>

                    <Button
                        variant="transparent"
                        size="small"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                    >
                        <Redo className="w-4 h-4" />
                        <span className="sr-only">Redo</span>
                    </Button>
                </div>
            </div>

            {editor && (
                <BubbleMenu
                    editor={editor}
                    tippyOptions={{ duration: 100 }}
                    className="flex gap-1 p-1 border rounded-md shadow-md bg-background"
                >
                    <Button
                        variant="transparent"
                        size="small"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        data-active={editor.isActive("bold")}
                    >
                        <Bold className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="transparent"
                        size="small"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        data-active={editor.isActive("italic")}
                    >
                        <Italic className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="transparent"
                        size="small"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        data-active={editor.isActive("strike")}
                    >
                        <Strikethrough className="w-4 h-4" />
                    </Button>
                    <Popover>
                        <Popover.Trigger asChild>
                            <Button variant="transparent" size="small" data-active={editor.isActive("link")}>
                                <LinkIcon className="w-4 h-4" />
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content className="p-4 w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Insert Link</h4>
                                    <p className="text-sm text-muted-foreground">Add a URL to create a link</p>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="bubble-link">URL</Label>
                                    <Input
                                        id="bubble-link"
                                        placeholder="https://example.com"
                                        value={linkUrl}
                                        onChange={(e) => setLinkUrl(e.target.value)}
                                    />
                                </div>
                                <Button onClick={setLink}>{editor.isActive("link") ? "Update Link" : "Add Link"}</Button>
                            </div>
                        </Popover.Content>
                    </Popover>
                </BubbleMenu>
            )}

            <div className="p-4">
                <EditorContent editor={editor} className="min-h-[200px] focus:outline-none" />
            </div>
        </div>
    )
}
