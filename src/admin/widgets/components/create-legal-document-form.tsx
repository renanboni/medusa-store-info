import { Input, toast } from "@medusajs/ui"
import { InformationCircleSolid } from "@medusajs/icons"
import { Tooltip } from "@medusajs/ui"
import { Label } from "@medusajs/ui"
import { Heading } from "@medusajs/ui"
import { Text } from "@medusajs/ui"
import { Button } from "@medusajs/ui"
import { FocusModal } from "@medusajs/ui"
import { z } from "zod"
import { useForm, FormProvider, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import RichTextEditor from "./rich-text-editor"
import { useEffect } from "react"
import { useCreateStoreInfo, useUpdateStoreInfo } from "../../lib/hooks/api/store-info"
import { DocumentType, StoreInfo } from "../../../types"

export type CreateLegalDocumentFormProps = {
    storeInfo: StoreInfo | null
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const schema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    key: z.string().min(1, "Chave é obrigatória"),
    value: z.string().min(1, "Conteúdo é obrigatório"),
})

export const CreateLegalDocumentForm = ({ storeInfo, isOpen, setIsOpen }: CreateLegalDocumentFormProps) => {
    const { createStoreInfo, isPending } = useCreateStoreInfo()
    const { updateStoreInfo, isPending: isUpdating } = useUpdateStoreInfo()

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: storeInfo?.name || "",
            key: storeInfo?.key || "",
            value: storeInfo?.value || "",
        },
    })

    useEffect(() => {
        if (storeInfo) {
            form.reset({
                key: storeInfo.key || "",
                name: storeInfo.name || "",
                value: storeInfo.value || "",
            })
        }
    }, [storeInfo, form])

    const watchedName = form.watch("name")

    useEffect(() => {
        if (watchedName) {
            const keyValue = watchedName.toLowerCase().replace(/\s+/g, "_")
            form.setValue("key", keyValue, { shouldValidate: true })
        }
    }, [watchedName, form])

    useEffect(() => {
        if (!isOpen) {
            form.reset()
        }
    }, [isOpen, form])

    const onSubmit = (data: z.infer<typeof schema>) => {
        if (storeInfo) {
            updateStoreInfo({
                id: storeInfo.id,
                data: {
                    ...data,
                    type: DocumentType.MARKDOWN,
                },
            }, {
                onSuccess: () => {
                    setIsOpen(false)
                    form.reset()
                },
                onError: () => {
                    toast.error("Error updating document")
                },
            })
        } else {
            createStoreInfo({
                ...data,
                type: DocumentType.MARKDOWN,
            }, {
                onSuccess: () => {
                    setIsOpen(false)
                    form.reset()
                },
                onError: () => {
                    toast.error("Error creating document")
                },
            })
        }
    }

    return (
        <FocusModal open={isOpen} onOpenChange={setIsOpen}>
            <FocusModal.Content>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FocusModal.Header>
                            <Button type="submit" disabled={isPending || isUpdating} isLoading={isPending || isUpdating}>Salvar</Button>
                        </FocusModal.Header>
                        <FocusModal.Body className="flex flex-col items-center py-16 overflow-y-auto max-h-[80vh]">
                            <div className="flex flex-col w-full max-w-6xl px-4 gap-y-8">
                                <div className="flex flex-col gap-y-1">
                                    <Heading>Legal Document</Heading>
                                    <Text className="text-ui-fg-subtle">
                                        Add a legal document to the store
                                    </Text>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Controller
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => {
                                            return (
                                                <div className="flex flex-col space-y-2 ">
                                                    <Label>Name</Label>
                                                    <Input
                                                        {...field}
                                                        placeholder="Whatsapp"
                                                    />
                                                </div>
                                            )
                                        }}
                                    />

                                    <Controller
                                        control={form.control}
                                        name="key"
                                        render={({ field }) => {
                                            return (
                                                <div className="flex flex-col space-y-2">
                                                    <div className="flex items-center gap-x-1">
                                                        <Label>Key</Label>
                                                        <Tooltip content="The key is used to identify the information in the store.">
                                                            <InformationCircleSolid />
                                                        </Tooltip>
                                                    </div>
                                                    <Input
                                                        {...field}
                                                        placeholder="whatsapp"
                                                    />
                                                </div>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="w-full h-full">
                                    <Controller
                                        control={form.control}
                                        name="value"
                                        render={({ field }) => (
                                            <RichTextEditor
                                                onChange={(content) => field.onChange(content)}
                                                defaultValue={field.value}
                                            />
                                        )}
                                    />
                                </div>

                                {form.formState.errors.value && (
                                    <span className="text-sm text-red-500">
                                        {form.formState.errors.value.message}
                                    </span>
                                )}
                            </div>
                        </FocusModal.Body>
                    </form>
                </FormProvider>
            </FocusModal.Content>
        </FocusModal>
    )
}