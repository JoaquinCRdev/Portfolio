import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useMarkdownFile(path) {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = supabase.storage
        .from("content")
        .getPublicUrl(path);

      const text = await fetch(data.publicUrl).then(r => r.text());

      setMarkdown(text);
      setLoading(false);
    }

    load();
  }, [path]);

  return { markdown, loading };
}