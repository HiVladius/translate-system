import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './AvatarModal.module.css';

interface AvatarModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (file: File) => void;
    currentAvatarUrl?: string;
}

export const AvatarModal: React.FC<AvatarModalProps> = ({ isOpen, onClose, onSave, currentAvatarUrl }) => {
    
    const [preview, setPreview] = useState<string | null>(currentAvatarUrl || null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Limpiar objectURL al desmontar o cambiar preview
    useEffect(() => {
        // Solo limpiar URLs que hemos creado, no URLs externas
        return () => {
            if (preview && preview !== currentAvatarUrl) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview, currentAvatarUrl]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setSelectedFile(file);
            // Revocar URL anterior si existe y no es el currentAvatarUrl
            if (preview && preview !== currentAvatarUrl) {
                URL.revokeObjectURL(preview);
            }
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    }, [preview, currentAvatarUrl]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        },
        maxFiles: 1
    });

    const handleSave = () => {
        if (selectedFile) {
            onSave(selectedFile);
            onClose();
        }
    };

    const handleCancel = () => {
        // Revocar URL de preview si no es el currentAvatarUrl
        if (preview && preview !== currentAvatarUrl) {
            URL.revokeObjectURL(preview);
        }
        setPreview(currentAvatarUrl || null);
        setSelectedFile(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Change Avatar</h2>
                    <button className={styles.closeButton} onClick={handleCancel}>×</button>
                </div>
                
                <div className={styles.modalBody}>
                    <div className={styles.dropzoneContainer} {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            preview ? (
                                <div className={styles.previewContainer}>
                                    <img src={preview} alt="Avatar preview" className={styles.avatarPreview} />
                                    <p>Drag a new image or click to replace</p>
                                </div>
                            ) : (
                                <div className={styles.dropzonePrompt}>
                                    {isDragActive ? (
                                        <p>Drop the image here ...</p>
                                    ) : (
                                        <p>Drag and drop an image here, or click to select an image</p>
                                    )}
                                </div>
                            )
                        }
                    </div>
                </div>
                
                <div className={styles.modalFooter}>
                    <button 
                        className={styles.cancelButton} 
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button 
                        className={styles.saveButton} 
                        onClick={handleSave}
                        disabled={!selectedFile}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

