#!/bin/bash
# ============================================
# Script de Deploy — MejoraSM Edge Functions
# Ejecutar: bash scripts/deploy.sh
# ============================================

set -e

PROJECT_REF="exnjyxwmxknvzploeaex"

echo "🚀 Deploy de Edge Functions — MejoraSM"
echo "======================================="

# 1. Verificar login
echo ""
echo "1. Verificando login en Supabase..."
if ! npx supabase projects list &>/dev/null; then
  echo "❌ No estás logueado. Ejecutá:"
  echo "   npx supabase login"
  echo "   (te dará un token, pegalo acá)"
  exit 1
fi
echo "✅ Login OK"

# 2. Link al proyecto
echo ""
echo "2. Linkeando al proyecto $PROJECT_REF..."
npx supabase link --project-ref "$PROJECT_REF" 2>/dev/null || echo "Ya linkeado"

# 3. Deploy Edge Functions
echo ""
echo "3. Deployando Edge Functions..."

echo "  → ai-gateway..."
npx supabase functions deploy ai-gateway --project-ref "$PROJECT_REF"

echo "  → orchestrator..."
npx supabase functions deploy orchestrator --project-ref "$PROJECT_REF"

echo "  → vault-process..."
npx supabase functions deploy vault-process --project-ref "$PROJECT_REF"

echo ""
echo "✅ Las 3 Edge Functions están deployadas!"

# 4. Verificar
echo ""
echo "4. Verificando endpoints..."
SUPABASE_URL="https://${PROJECT_REF}.supabase.co"

for fn in ai-gateway orchestrator vault-process; do
  status=$(curl -s -o /dev/null -w "%{http_code}" \
    "$SUPABASE_URL/functions/v1/$fn" \
    -H "apikey: dummy" 2>/dev/null)
  if [ "$status" = "401" ] || [ "$status" = "405" ]; then
    echo "  ✅ $fn — endpoint activo (HTTP $status)"
  elif [ "$status" = "404" ]; then
    echo "  ❌ $fn — NO encontrado (HTTP 404)"
  else
    echo "  ⚠️  $fn — HTTP $status (verificar manualmente)"
  fi
done

echo ""
echo "======================================="
echo "✅ Deploy completo!"
echo ""
echo "Próximo paso: configurar API keys:"
echo "  npx supabase secrets set GROQ_API_KEY=tu_key --project-ref $PROJECT_REF"
echo "  npx supabase secrets set DEEPSEEK_API_KEY=tu_key --project-ref $PROJECT_REF"
echo "  npx supabase secrets set HF_API_KEY=tu_key --project-ref $PROJECT_REF"
