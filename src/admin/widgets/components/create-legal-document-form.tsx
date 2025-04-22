import { Input } from "@medusajs/ui"
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

export type CreateLegalDocumentFormProps = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const schema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    key: z.string().min(1, "Chave é obrigatória"),
})

export const CreateLegalDocumentForm = ({ isOpen, setIsOpen }: CreateLegalDocumentFormProps) => {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })

    const onSubmit = (data: z.infer<typeof schema>) => {
        console.log(data)
    }

    return (
        <FocusModal open={isOpen} onOpenChange={setIsOpen}>
            <FocusModal.Content>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FocusModal.Header>
                            <Button type="submit">Salvar</Button>
                        </FocusModal.Header>
                        <FocusModal.Body className="flex flex-col items-center py-16 overflow-y-auto max-h-[80vh]">
                            <div className="flex flex-col w-full max-w-6xl px-4 gap-y-8">
                                <div className="flex flex-col gap-y-1">
                                    <Heading>Documento legal</Heading>
                                    <Text className="text-ui-fg-subtle">
                                        Adicione um documento legal para a loja
                                    </Text>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Controller
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => {
                                            return (
                                                <div className="flex flex-col space-y-2 ">
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

                                <div className="w-full h-full">
                                    <RichTextEditor />
                                </div>
                            </div>
                        </FocusModal.Body>
                    </form>
                </FormProvider>
            </FocusModal.Content>
        </FocusModal>
    )
}