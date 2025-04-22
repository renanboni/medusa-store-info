import { Button, Heading, Input, Label, Text, Tooltip, toast } from "@medusajs/ui"
import { FocusModal } from "@medusajs/ui"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { InformationCircleSolid } from "@medusajs/icons"
import { useCreateStoreInfo } from "../../lib/hooks/api/store-info"
import { useEffect } from "react"
import { DocumentType } from "../../../types"
const schema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    value: z.string().min(1, "Valor é obrigatório"),
    key: z.string().min(1, "Chave é obrigatória"),
})

export type CreateStoreInfoFormProps = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}


export const CreateStoreInfoForm = ({ isOpen, setIsOpen }: CreateStoreInfoFormProps) => {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            value: "",
            key: "",
        },
    })

    const { createStoreInfo, isPending } = useCreateStoreInfo()

    const watchedName = form.watch("name")

    useEffect(() => {
        if (watchedName) {
            const keyValue = watchedName.toLowerCase().replace(/\s+/g, "_")
            form.setValue("key", keyValue, { shouldValidate: true })
        }
    }, [watchedName, form])

    const onSubmit = (data: z.infer<typeof schema>) => {
        createStoreInfo({
            ...data,
            type: DocumentType.TEXT,
        }, {
            onSuccess: () => {
                setIsOpen(false)
                form.reset()
            },
            onError: () => {
                toast.error("Erro ao criar informação da loja")
            }
        })
    }

    return (
        <FocusModal open={isOpen} onOpenChange={setIsOpen}>
            <FocusModal.Content>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FocusModal.Header>
                            <Button type="submit" disabled={isPending} isLoading={isPending}>Salvar</Button>
                        </FocusModal.Header>
                        <FocusModal.Body className="flex flex-col items-center py-16 overflow-y-auto max-h-[80vh]">
                            <div className="flex flex-col w-full max-w-lg gap-y-8">
                                <div className="flex flex-col gap-y-1">
                                    <Heading>Informações da loja</Heading>
                                    <Text className="text-ui-fg-subtle">
                                        Adicione informações que serão exibidas na loja
                                    </Text>
                                </div>
                            </div>
                            <div className="flex flex-col w-full max-w-lg mt-8 gap-y-4">
                                <Controller
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => {
                                        return (
                                            <div className="flex flex-col space-y-2">
                                                <Label>Nome</Label>
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
                                    name="value"
                                    render={({ field }) => {
                                        return (
                                            <div className="flex flex-col space-y-2">
                                                <Label>Valor</Label>
                                                <Input
                                                    {...field}
                                                    placeholder="https://wa.me/5511999999999"
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
                                                    <Label>Chave</Label>
                                                    <Tooltip content="A chave é utilizada para identificar a informação na loja.">
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
                        </FocusModal.Body>
                    </form>
                </FormProvider>
            </FocusModal.Content>
        </FocusModal>
    )
}