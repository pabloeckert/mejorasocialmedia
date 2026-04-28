import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Image, CalendarDays, Clock, Zap, ArrowRight } from "lucide-react";
import { useDocuments } from "@/hooks/useVault";
import { useDialogueSessions } from "@/hooks/useDialogue";
import { usePendingProposals, useProposals } from "@/hooks/useProposals";
import { useCalendarEvents } from "@/hooks/useMetrics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Dashboard() {
  return (
    <ErrorBoundary>
      <DashboardContent />
    </ErrorBoundary>
  );
}

function DashboardContent() {
  const { data: documents } = useDocuments();
  const { data: sessions } = useDialogueSessions();
  const { data: proposals } = useProposals();
  const { data: pendingProposals } = usePendingProposals();
  const { data: calendarEvents } = useCalendarEvents();

  const hasData = (documents?.length ?? 0) > 0 || (sessions?.length ?? 0) > 0;

  const stats = [
    { label: "Documentos en Bóveda", value: String(documents?.length ?? 0), icon: FileText, href: "/boveda" },
    { label: "Diálogos creados", value: String(sessions?.length ?? 0), icon: MessageSquare, href: "/mesa" },
    { label: "Contenidos generados", value: String(proposals?.length ?? 0), icon: Image, href: "/laboratorio" },
    { label: "Publicaciones programadas", value: String(calendarEvents?.length ?? 0), icon: CalendarDays, href: "/laboratorio" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Centro de control del Estratega Digital Autónomo
        </p>
      </div>

      {/* Quick start banner for new users */}
      {!hasData && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Empezá subiendo documentos de marca</p>
              <p className="text-sm text-muted-foreground">
                Los agentes necesitan contexto sobre tu marca para generar contenido estratégico.
              </p>
            </div>
            <Link to="/boveda">
              <Button>
                Subir documentos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.href}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pending approvals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Aprobaciones pendientes</CardTitle>
          {pendingProposals && pendingProposals.length > 0 && (
            <Badge variant="secondary">{pendingProposals.length}</Badge>
          )}
        </CardHeader>
        <CardContent>
          {!pendingProposals || pendingProposals.length === 0 ? (
            <div className="flex flex-col items-center py-8">
              <Clock className="mb-3 h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                No hay contenido pendiente de aprobación.
              </p>
              {hasData && (
                <Link to="/mesa" className="mt-3">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Crear nueva sesión
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {pendingProposals.slice(0, 5).map((p: any) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium">{p.title || "Sin título"}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.dialogue_sessions?.topic || "Sin tema"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{p.format || "post"}</Badge>
                    <Link to="/laboratorio">
                      <Button variant="ghost" size="sm">
                        Ver
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
              {pendingProposals.length > 5 && (
                <Link to="/laboratorio">
                  <Button variant="ghost" size="sm" className="w-full">
                    Ver todas ({pendingProposals.length})
                  </Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Calendario de contenido</CardTitle>
        </CardHeader>
        <CardContent>
          {!calendarEvents || calendarEvents.length === 0 ? (
            <div className="flex h-48 flex-col items-center justify-center">
              <CalendarDays className="mb-3 h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                No hay publicaciones programadas.
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Creá contenido en la Mesa de Diálogo y programalo desde ahí.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {calendarEvents.slice(0, 7).map((e: any) => (
                <div key={e.id} className="flex items-center gap-3 rounded-lg border p-3">
                  <CalendarDays className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">{e.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(e.date).toLocaleDateString("es-AR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
