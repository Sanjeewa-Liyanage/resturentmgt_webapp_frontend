const superbaseUrl = "https://nawrlxltaudihvvgbgbu.supabase.co";
const superKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hd3JseGx0YXVkaWh2dmdiZ2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxNTgxMTQsImV4cCI6MjA0OTczNDExNH0.Gs93qQBQ0pKSoxiW1OPcPqPrrUMLMTgacA1J6yWzf1s";
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(superbaseUrl, superKey);

export function MediaSupabase(file) {
    if (!(file instanceof File)) {
        console.error("Invalid file or file type");
        return;
    }

    const uniqueFileName = `${Date.now()}-${file.name}`; // Generate a unique file name
    return supabase.storage
        .from('images')
        .upload(uniqueFileName, file, {
            cacheControl: '3600',
            upsert: false, // Avoid overwriting files
        });
}
