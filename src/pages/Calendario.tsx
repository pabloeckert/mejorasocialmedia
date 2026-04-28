import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarDays,
  Plus,
  Loader2,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useCalendarEvents, useCreateCalendarEvent } from "@/hooks/useMetrics";
import { usePendingProposals, useApproveProposal, useRejectProposal } from "@/hooks/useProposals";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { toast } from "@/components/ui/use-toast";

export default function Calendario() {
  return (
    <ErrorBoundary>
      <CalendarioContent />
    </ErrorBoundary>
  );
}

function CalendarioContent() {
  const { data: events, isLoading } = useCalendarEvents();
  const { data: pendingProposals } = usePendingProposals();
  const createEvent = useCreateCalendarEvent();
  const approveProposal = useApproveProposal();
  const rejectProposal = useRejectProposal();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    format: "post",
  });
  const [rejectTarget, setRejectTarget] = useState<string | null>(null);

  const handleCreateEvent = () => {
    if (!newEvent.title.trim() || !selectedDate) return;

    createEvent.mutate(
      {
        title: newEvent.title,
        description: newEvent.description,
        date: selectedDate.toISOString(),
        format: newEvent.format,
      },
      {
        onSuccess: () => {
          setNewEvent({ title: "", description: "", format: "post" });
          setDialogOpen(false);
          toast({ title: "Evento creado", description: "Se agregó al calendario editorial." });
        },
      }
    );
  };

  const handleApprove = (proposalId: string) => {
    approveProposal.mutate(proposalId, {
      onSuccess: () => {
        toast({ title: "Propuesta aprobada", description: "Pasó a pendiente de publicación." });
      },
    });
  };

  const handleReject = () => {
    if (rejectTarget) {
      rejectProposal.mutate(
        { id: rejectTarget, reason: "Rechazada desde calendario" },
        {
          onSettled: () => setRejectTarget(null),
        }
      );
    }
  };

  // Get events for selected date
  const eventsForDate = events?.filter((e: any) => {
    if (!selectedDate) return false;
    const eventDate = new Date(e.date);
    return (
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getDate() === selectedDate.getDate()
    );
  });

  // Get dates with events for highlighting
  const eventDates = events?.map((e: any) => new Date(e.date)) || [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendario Editorial</h1>
          <p className="mt-1 text-muted-foreground">
            Programá y aprobá contenido para publicar.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo evento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nuevo evento en el calendario</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  placeholder="Ej: Post sobre liderazgo"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Descripción (opcional)</Label>
                <Textarea
                  placeholder="Detalles del contenido..."
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Formato</Label>
                <Select
                  value={newEvent.format}
                  onValueChange={(v) => setNewEvent({ ...newEvent, format: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="post">Post</SelectItem>
                    <SelectItem value="carrusel">Carrusel</SelectItem>
                    <SelectItem value="historia">Historia</SelectItem>
                    <SelectItem value="reel">Reel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-lg border p-3 text-sm text-muted-foreground">
                📅 Fecha seleccionada: {selectedDate?.toLocaleDateString("es-AR") || "Ninguna"}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreateEvent}
                  disabled={!newEvent.title.trim() || createEvent.isPending}
                >
                  {createEvent.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Crear evento
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                hasEvent: eventDates,
              }}
              modifiersStyles={{
                hasEvent: {
                  fontWeight: "bold",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Events for selected date */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {selectedDate
                ? selectedDate.toLocaleDateString("es-AR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Seleccioná una fecha"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : !eventsForDate || eventsForDate.length === 0 ? (
              <div className="flex flex-col items-center py-8">
                <CalendarDays className="mb-3 h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  No hay eventos para este día.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => setDialogOpen(true)}
                >
                  <Plus className="mr-2 h-3 w-3" />
                  Agregar evento
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {eventsForDate.map((event: any) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <CalendarDays className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{event.title}</p>
                        {event.description && (
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{event.format}</Badge>
                      <Badge
                        variant={
                          event.status === "published"
                            ? "default"
                            : event.status === "cancelled"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {event.status === "published"
                          ? "Publicado"
                          : event.status === "cancelled"
                          ? "Cancelado"
                          : "Programado"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pending approvals section */}
      {pendingProposals && pendingProposals.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                Propuestas pendientes de aprobación
              </CardTitle>
              <Badge variant="secondary">{pendingProposals.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingProposals.map((p: any) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm font-medium">{p.title || "Sin título"}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.dialogue_sessions?.topic || "Sin tema"} · {p.format || "post"}
                    </p>
                    {p.hook && (
                      <p className="mt-1 text-xs text-muted-foreground italic line-clamp-1">
                        Hook: {p.hook}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(p.id)}
                      disabled={approveProposal.isPending}
                    >
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Aprobar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setRejectTarget(p.id)}
                    >
                      <XCircle className="mr-1 h-3 w-3" />
                      Rechazar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <ConfirmDialog
        open={!!rejectTarget}
        onOpenChange={(open) => !open && setRejectTarget(null)}
        title="Rechazar propuesta"
        description="¿Estás seguro de que querés rechazar esta propuesta? Se guardará el motivo para aprendizaje futuro."
        confirmText="Rechazar"
        variant="destructive"
        onConfirm={handleReject}
      />
    </div>
  );
}
