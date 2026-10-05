// Connexion à la base de données partagée avec IACTEUR, avec la clé
// secrète : uniquement côté serveur (jamais dans le navigateur).
import "server-only";
import { createClient } from "@supabase/supabase-js";

export function base() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
