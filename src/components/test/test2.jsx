import { useState } from "react";
import { MediaSupabase, supabase } from "../../utils/imgupload2";

export function UploadImgC() {
    const [file, setFile] = useState(null);
    const [publicUrl, setPublicUrl] = useState(""); // To store the public URL

    const handleClick = async () => {
        if (!file) {
            console.error("No file selected");
            return;
        }
    
        try {
            // Upload the file
            const { data: uploadData, error: uploadError } = await MediaSupabase(file);
            if (uploadError) {
                console.error("Upload failed:", uploadError);
                return;
            }
            console.log("Upload successful:", uploadData);
    
            // Retrieve the public URL
            const filePath = uploadData?.path || file.name; // Ensure correct file path
            console.log("File Path:", filePath);
    
            const { data: publicUrlData, error: publicUrlError } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);
    
            if (publicUrlError) {
                console.error("Error fetching public URL:", publicUrlError);
            } else {
                console.log("Public URL:", publicUrlData?.publicUrl);
                setPublicUrl(publicUrlData?.publicUrl); // Update state
            }
        } catch (err) {
            console.error("Error during upload or URL retrieval:", err);
        }
    };
    

    return (
        <div>
            <h1>Upload Image</h1>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <button onClick={handleClick}>Upload</button>

            {publicUrl && (
                <div>
                    <p>Image uploaded successfully!</p>
                    <a href={publicUrl} target="_blank" rel="noopener noreferrer">
                        View Image
                    </a>
                </div>
            )}
        </div>
    );
}
