import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"


interface ConfirmacionProps {
    id: number;
    value: boolean;
    open: boolean;
    setOpen: (open: boolean) => void;
    onActualizar: (servicioActualizado: any) => void;
}

function Confirmacion({ id, value, open, setOpen, onActualizar }: ConfirmacionProps) {
    const [status, setStatus] = useState(false);

    useEffect(() => {
        setStatus(!value);
    }, [value]);

    const handleConfirm = async () => {
        try {
            const res = await fetch(`http://localhost:8000/services/services/${id}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access")}`
                },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            onActualizar(data);
            setOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="w-90 bg-white border-none">
                <DialogHeader>
                    <DialogTitle>¿Estás seguro?</DialogTitle>
                    <DialogDescription>
                        ¿Desea realizar este cambio en su servicio?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="sm:justify-end">
                    <Button className="hover:bg-[#6c63ff] hover:text-white hover:border-none" variant="outline" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button
                        variant="default"
                        className="bg-[#6c63ff] hover:bg-[#6c63ff]/90 text-white"
                        onClick={handleConfirm}
                    >
                        Confirmar y enviar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default Confirmacion;