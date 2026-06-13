import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Upload, RotateCcw } from 'lucide-react';

interface ImageUploadProps {
  storageKey: string;
  defaultSrc: string;
  imgClassName?: string;
  alt?: string;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  wrapperClassName?: string;
}

export default function ImageUpload({
  storageKey,
  defaultSrc,
  imgClassName = '',
  alt = '',
  imgProps = {},
  wrapperClassName = '',
}: ImageUploadProps) {
  // Listen to a custom window event for instant edit mode state matching
  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    // Modo de edição disponível apenas em desenvolvimento
    if (!import.meta.env.DEV) return false;
    if (typeof window !== 'undefined') {
      const searchParam = new URLSearchParams(window.location.search).get('edit');
      if (searchParam === '1') {
        localStorage.setItem('image_edit_mode', 'true');
        return true;
      }
      return localStorage.getItem('image_edit_mode') === 'true';
    }
    return false;
  });

  const [imageSrc, setImageSrc] = useState<string>(defaultSrc);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when custom event triggers
  useEffect(() => {
    const handleModeChange = () => {
      setIsEditMode(localStorage.getItem('image_edit_mode') === 'true');
    };
    window.addEventListener('image_edit_mode_changed', handleModeChange);
    return () => {
      window.removeEventListener('image_edit_mode_changed', handleModeChange);
    };
  }, []);

  // Load image from localStorage on mount or key change
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setImageSrc(saved);
      } else {
        setImageSrc(defaultSrc);
      }
    } catch (e) {
      console.error('Failed to access localStorage:', e);
    }
  }, [storageKey, defaultSrc]);

  // Handle outside edit mode: Render ONLY the <img> with zero wrapping markup
  if (!isEditMode) {
    return (
      <img
        src={imageSrc}
        className={imgClassName}
        alt={alt}
        {...imgProps}
      />
    );
  }

  const hasSubstitution = imageSrc !== defaultSrc;

  // Process file and save to localStorage as base64
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      console.warn('Formato selecionado inválido (selecione apenas arquivos de imagem).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Limita a largura/altura máxima para 1000px para economizar muito espaço em imagens do corpo/perfil
        const MAX_DIM = 1000;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Comprimir para JPEG com qualidade de 0.7 para manter alta nitidez e tamanho extremamente otimizado
          const base64Compressed = canvas.toDataURL('image/jpeg', 0.7);
          try {
            localStorage.setItem(storageKey, base64Compressed);
            setImageSrc(base64Compressed);
          } catch (err) {
            console.error('Erro de limite ao salvar imagem no localStorage:', err);
            // Backup com resolução ainda menor se falhar
            try {
              const miniCanvas = document.createElement('canvas');
              miniCanvas.width = Math.round(width / 2);
              miniCanvas.height = Math.round(height / 2);
              const miniCtx = miniCanvas.getContext('2d');
              if (miniCtx) {
                miniCtx.drawImage(img, 0, 0, miniCanvas.width, miniCanvas.height);
                const superCompressed = miniCanvas.toDataURL('image/jpeg', 0.4);
                localStorage.setItem(storageKey, superCompressed);
                setImageSrc(superCompressed);
              }
            } catch (retryErr) {
              console.error('Falha crítica na tentativa de recuperação do upload:', retryErr);
            }
          }
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const restoreOriginal = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.removeItem(storageKey);
      setImageSrc(defaultSrc);
    } catch (err) {
      console.error(err);
    }
  };

  // Drag and Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative group ${wrapperClassName}`}
    >
      {/* The <img> inside editing mode */}
      <img
        src={imageSrc}
        className={imgClassName}
        alt={alt}
        {...imgProps}
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* EDIT/TROCAR Badge (Requirement 5) */}
      <div className="absolute top-2 right-2 bg-[#D4AF37] text-black text-[9px] font-sans font-bold px-1.5 py-0.5 tracking-wider uppercase shadow-md select-none pointer-events-none z-40 rounded-sm">
        TROCAR
      </div>

      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 p-3 text-center transition-opacity duration-300 z-30 ${
          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={triggerFileSelect}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-sans font-bold text-xs tracking-wider uppercase transition-colors duration-200 cursor-pointer shadow-md rounded-none"
        >
          <Upload className="w-3.5 h-3.5" />
          Trocar Imagem
        </button>

        {hasSubstitution && (
          <button
            type="button"
            onClick={restoreOriginal}
            className="flex items-center gap-1.5 px-2.5 py-1 text-white/80 hover:text-white font-sans text-[11px] tracking-wide transition-colors duration-200 cursor-pointer bg-transparent border-0 hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            Restaurar original
          </button>
        )}

        <span className="font-sans text-[10px] text-white/50 tracking-wide pointer-events-none select-none">
          ou arraste aqui
        </span>
      </div>

      {/* Drag Overlay with custom styling */}
      {isDragging && (
        <div className="absolute inset-0 bg-black/90 border-2 border-dashed border-[#D4AF37] flex flex-col items-center justify-center p-4 text-center z-50 pointer-events-none">
          <Upload className="w-8 h-8 text-[#D4AF37] animate-bounce mb-2" />
          <span className="font-sans text-xs text-[#FAF9F6] font-bold tracking-wider uppercase">
            Solte para trocar
          </span>
        </div>
      )}
    </div>
  );
}
