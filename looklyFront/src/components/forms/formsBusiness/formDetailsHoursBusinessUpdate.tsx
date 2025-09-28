import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, CheckCircle2Icon } from "lucide-react"
import api from "@/lib/axios"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

function FormDetailsHoursBusinessUpdate({ locationId }: { locationId: number }) {
    const [data, setData] = useState({
        opening_time: "",
        closing_time: "",
        available_days: [] as number[],
    })
    const [loading, setLoading] = useState(false)
    const [successHour, setSuccessHour] = useState(false)


    const daysOfWeek = [
        { id: 0, name: "Lunes", short: "L" },
        { id: 1, name: "Martes", short: "M" },
        { id: 2, name: "Miércoles", short: "Mi" },
        { id: 3, name: "Jueves", short: "J" },
        { id: 4, name: "Viernes", short: "V" },
        { id: 5, name: "Sábado", short: "S" },
        { id: 6, name: "Domingo", short: "D" },
    ]

    // cargar horarios actuales
    useEffect(() => {
        api.get(`/companies/locations/${locationId}/`)
            .then(res => {
                setData({
                    opening_time: res.data.opening_time.slice(0, 5),
                    closing_time: res.data.closing_time.slice(0, 5),
                    available_days: res.data.available_days
                        ? res.data.available_days.split(',').map(d => Number(d)) // convertir string a array de números
                        : [],
                });
            })
            .catch(err => console.error("Error al cargar datos:", err));
    }, [locationId]);

    const handleDayToggle = (dayId: number, checked: boolean) => {
        setData((prev) => ({
            ...prev,
            available_days: checked
                ? [...prev.available_days, dayId]
                : prev.available_days.filter((d) => d !== dayId),
        }));
    }

    const handleSave = async () => {
        setLoading(true)
        try {
            await api.patch(
                `/companies/locations/${locationId}/`,
                {
                    opening_time: data.opening_time,
                    closing_time: data.closing_time,
                    available_days: data.available_days.join(','),
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                }
            )
            setSuccessHour(true);
            setTimeout(() => setSuccessHour(false), 3000);
        } catch (err) {
            console.error("Error actualizando horarios:", err)
            alert("❌ Error al actualizar horarios")
        } finally {
            setLoading(false)
        }
    }


    return (
        <Card className="border shadow-sm bg-white border-gray-300">
            <CardContent className="p-6 space-y-6">

                {successHour && (
                    <Alert className="mt-4 border-green-300 bg-green-50 text-green-800">
                        <CheckCircle2Icon className="h-5 w-5 text-green-600" />
                        <AlertTitle>¡Éxito!</AlertTitle>
                        <AlertDescription>
                            El horario fue actualizado correctamente.
                        </AlertDescription>
                    </Alert>
                )}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="opening_time">Hora de Apertura</Label>
                        <Input
                            className="mt-3 h-8 focus:ring-[#6c63ff] focus:border-[#6c63ff] border border-gray-300"
                            id="opening_time"
                            type="time"
                            value={data.opening_time}
                            onChange={(e) => setData(prev => ({ ...prev, opening_time: e.target.value }))}
                        />
                    </div>
                    <div>
                        <Label htmlFor="closing_time">Hora de Cierre</Label>
                        <Input
                            className="mt-3 h-8 focus:ring-[#6c63ff] focus:border-[#6c63ff] border border-gray-300"
                            id="closing_time"
                            type="time"
                            value={data.closing_time}
                            onChange={(e) => setData(prev => ({ ...prev, closing_time: e.target.value }))}
                        />
                    </div>
                </div>

                <Label className="flex items-center gap-2 text-lg font-medium">
                    <Calendar className="w-5 h-5 text-[#6c63ff]" />
                    Días Laborales
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {daysOfWeek.map(day => (
                        <div key={day.id} className="flex items-center gap-2">
                            <Checkbox
                                id={`day-${day.id}`}
                                checked={data.available_days.includes(day.id)}
                                onCheckedChange={(checked) => handleDayToggle(day.id, checked === true)}
                            />
                            <Label htmlFor={`day-${day.id}`}>{day.name}</Label>
                        </div>
                    ))}
                </div>

                <Button onClick={handleSave} disabled={loading} className="bg-[#6c63ff] hover:bg-[#6c63ff]/90 text-neutral-50  px-6">
                    {loading ? "Guardando..." : "Guardar Cambios"}
                </Button>
            </CardContent>
        </Card>
    )
}

export default FormDetailsHoursBusinessUpdate;