import { async } from "@firebase/util";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import FirebaseStorageService from "../FirebaseStorageService";
import { ImageUploadPreviewContainer, ImagePreview, ImageUpload } from "./style/ImageUploadPreview.styled";

const ImageUploadPreview = ({
  basePath,
  existingImageUrl,
  handleUploadFinish,
  handleUploadCancel,
}) => {
  const [uploadProgress, setUploadProgress] = useState(-1);
  const [imageUrl, setImageUrl] = useState("");

  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const file = files[0];

    if (!file) {
      alert("file select failed. Pleas try agian.");
      return;
    }

    const generetedFileId = uuidv4();

    try {
      const downloadUrl = await FirebaseStorageService.uploadFile(
        file,
        `${basePath}/${generetedFileId}`,
        setUploadProgress
      );

      setImageUrl(downloadUrl);
      handleUploadFinish(downloadUrl);
    } catch (error) {
      setUploadProgress(-1);
      fileInputRef.current.value = null;
      console.log("this alert");
      alert(error.message);
      throw error;
    }
  };

  const handleCancelImageClick = () => {
    FirebaseStorageService.deleteFile(imageUrl);
    if (fileInputRef.current !== null) {
      fileInputRef.current.value = null;
      setImageUrl("");
      handleUploadCancel();
    }
  };

  useEffect(() => {
    if (existingImageUrl) {
      setImageUrl(existingImageUrl);
    } else {
      if (fileInputRef.current !== null) {
        setUploadProgress(-1);
        setImageUrl("");
        fileInputRef.current.value = null;
      }
    }
  }, [existingImageUrl]);

  return (
    <ImageUploadPreviewContainer>


      {!imageUrl && uploadProgress > -1 ? (
        <div>
          <label htmlFor="file">Upload progress:</label>
          <progress id="file" value={uploadProgress} max="100">
            {uploadProgress}%
          </progress>
          <span>{uploadProgress}%</span>
        </div>
      ) : null}
      {imageUrl ? (
        <ImagePreview>
          <img src={imageUrl} alt={imageUrl} className="image" />
          <button
            type="button"
            onClick={handleCancelImageClick}
            className="primary-button"
          >
            Cancel Image
          </button>
        </ImagePreview>
      ) : <ImageUpload>
        Select Image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          hidden={uploadProgress > -1 || imageUrl}
        />
      </ImageUpload>}
    </ImageUploadPreviewContainer>
  );
};

export default ImageUploadPreview;
