#!/bin/bash
# ============================================
# Health Check — MejoraSM
# Ejecutar: bash scripts/health-check.sh
# ============================================

PROJECT_REF="exnjyxwmxknvzploeaex"
SUPABASE_URL="https://${PROJECT_REF}.supabase.co"

echo "🏥 Health Check — MejoraSM"
echo "=========================="

# Necesita la anon key como argumento o variable de entorno
ANON_KEY="${1:-$VITE_SUPABASE_PUBLISHABLE_KEY}"

if [ -z "$ANON_KEY" ]; then
  echo ""
  echo "Uso: bash scripts/health-check.sh TU_ANON_KEY"
  echo "O:   VITE_SUPABASE_PUBLISHABLE_KEY=xxx bash scripts/health-check.sh"
  exit 1
fi

echo ""

# 1. Conexión a Supabase
echo -n "1. Conexión a Supabase... "
code=$(curl -s -o /dev/null -w "%{http_code}" "$SUPABASE_URL/rest/v1/" -H "apikey: $ANON_KEY")
[ "$code" = "200" ] && echo "✅ OK (HTTP $code)" || echo "❌ FAIL (HTTP $code)"

# 2. Verificar tablas
for table in documents doc_chunks agent_config dialogue_sessions dialogue_messages proposals calendar_events metrics success_rules; do
  echo -n "2. Tabla '$table'... "
  resp=$(curl -s "$SUPABASE_URL/rest/v1/${table}?select=id&limit=1" \
    -H "apikey: $ANON_KEY" \
    -H "Authorization: Bearer $ANON_KEY" 2>/dev/null)
  if echo "$resp" | grep -q "PGRST205"; then
    echo "❌ NO RECONOCIDA por PostgREST"
  elif echo "$resp" | grep -q "\["; then
    echo "✅ OK"
  else
    echo "⚠️  Respuesta: ${resp:0:80}"
  fi
done

# 3. Verificar Edge Functions
echo ""
for fn in ai-gateway orchestrator vault-process; do
  echo -n "3. Edge Function '$fn'... "
  code=$(curl -s -o /dev/null -w "%{http_code}" \
    "$SUPABASE_URL/functions/v1/$fn" \
    -H "apikey: $ANON_KEY" 2>/dev/null)
  case "$code" in
    401|405|400) echo "✅ Activo (HTTP $code — necesita POST con body)" ;;
    404)         echo "❌ NO deployada (HTTP 404)" ;;
    *)           echo "⚠️  HTTP $code" ;;
  esac
done

# 4. Verificar Storage
echo ""
echo -n "4. Storage bucket 'vault'... "
resp=$(curl -s "$SUPABASE_URL/storage/v1/bucket" \
  -H "apikey: $ANON_KEY" \
  -H "Authorization: Bearer $ANON_KEY" 2>/dev/null)
echo "$resp" | grep -q "vault" && echo "✅ OK" || echo "❌ No encontrado"

# 5. Verificar función SQL match_documents
echo ""
echo -n "5. Función SQL 'match_documents'... "
resp=$(curl -s "$SUPABASE_URL/rest/v1/rpc/match_documents" \
  -X POST \
  -H "apikey: $ANON_KEY" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query_embedding": [0.1, 0.2], "match_count": 1}' 2>/dev/null)
if echo "$resp" | grep -q "dimension"; then
  echo "⚠️  Función existe pero dimensión incorrecta (esperado: 384)"
elif echo "$resp" | grep -q "error\|Error"; then
  echo "⚠️  ${resp:0:80}"
else
  echo "✅ OK"
fi

echo ""
echo "=========================="
echo "Health check completo."
