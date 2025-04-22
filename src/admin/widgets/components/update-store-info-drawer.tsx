import { Button, Heading, Input, Label, toast } from "@medusajs/ui"
import { Drawer } from "@medusajs/ui"
import { useUpdateStoreInfo } from "../../lib/hooks/api/store-info"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { Controller } from "react-hook-form"
import { StoreInfo } from "../../../types"
import { useEffect } from "react"

export type UpdateStoreInfoDrawerProps = {
    storeInfo: StoreInfo | null
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const schema = z.object({
    key: z.string().min(1, "Chave é obrigatória"),
    name: z.string().min(1, "Nome é obrigatório"),
    value: z.string().min(1, "Valor é obrigatório"),
})


export const UpdateStoreInfoDrawer = ({ storeInfo, isOpen, setIsOpen }: UpdateStoreInfoDrawerProps) => {
    const { updateStoreInfo, isPending } = useUpdateStoreInfo()

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            key: storeInfo?.key || "",
            name: storeInfo?.name || "",
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

    const onSubmit = (data: z.infer<typeof schema>) => {
        updateStoreInfo({
            id: storeInfo?.id || "",
            data,
        }, {
            onSuccess: () => {
                setIsOpen(false)
                form.reset()
            },
            onError: () => {
                toast.error("Erro ao atualizar informação da loja")
            }
        })
    }

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <Drawer.Content>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
                        <Drawer.Header>
                            <Heading className="capitalize">Editar Informação da Loja</Heading>
                        </Drawer.Header>

                        <Drawer.Body className="flex flex-col flex-1 max-w-full overflow-y-auto gap-y-4">
                            <div className="flex flex-col gap-y-2">
                                <Label>Chave</Label>
                                <Controller control={form.control} name="key" render={({ field }) => <Input {...field} />} />
                            </div>

                            <div className="flex flex-col gap-y-2">
                                <Label>Nome</Label>
                                <Controller control={form.control} name="name" render={({ field }) => <Input {...field} />} />
                            </div>

                            <div className="flex flex-col gap-y-2">
                                <Label>Valor</Label>
                                <Controller control={form.control} name="value" render={({ field }) => <Input {...field} />} />
                            </div>
                        </Drawer.Body>

                        <Drawer.Footer>
                            <div className="flex items-center justify-end gap-x-2">
                                <Drawer.Close asChild>
                                    <Button size="small" variant="secondary">
                                        Cancelar
                                    </Button>
                                </Drawer.Close>
                                <Button isLoading={isPending} size="small" type="submit">
                                    Salvar
                                </Button>
                            </div>
                        </Drawer.Footer>
                    </form>
                </FormProvider>
            </Drawer.Content>
        </Drawer>
    )
}