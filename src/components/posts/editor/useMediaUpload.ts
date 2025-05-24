import { useToast } from "@/hooks/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";

export interface Attachment {
  file: File;
  mediaId?: string;
  isUploading: boolean;
}

export default function useMediaUpload() {
  const { toast } = useToast();

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>();

  const { startUpload, isUploading } = useUploadThing("attachment", {
    onBeforeUploadBegin(files) {
      console.log("Начинаем загрузку файлов:", files);

      const renamedFiles = files.map((file) => {
        const extension = file.name.split(".").pop();

        return new File(
          [file],
          `attachment_${crypto.randomUUID()}.${extension}`,
          {
            type: file.type,
          },
        );
      });

      setAttachments((prev) => [
        ...prev,
        ...renamedFiles.map((file) => ({ file, isUploading: true })),
      ]);

      console.log("Переименованные файлы для загрузки:", renamedFiles);

      return renamedFiles;
    },

    onUploadProgress(progress) {
      console.log(`Прогресс загрузки: ${progress}%`);
      setUploadProgress(progress);
    },

    onClientUploadComplete(res) {
      console.log("Загрузка завершена. Результат сервера:", res);

      setAttachments((prev) =>
        prev.map((a) => {
          const uploadResult = res.find((r) => r.name === a.file.name);

          if (!uploadResult) {
            console.warn(`Не найден результат загрузки для файла ${a.file.name}`);
            return a;
          }

          console.log(`Файл ${a.file.name} загружен с mediaId:`, uploadResult.serverData.mediaId);

          return {
            ...a,
            mediaId: uploadResult.serverData.mediaId,
            isUploading: false,
          };
        }),
      );
    },

    onUploadError(e) {
      console.error("Ошибка загрузки:", e);
      setAttachments((prev) => prev.filter((a) => !a.isUploading));
      toast({
        variant: "destructive",
        description: e.message,
      });
    },
  });

  function handleStartUpload(files: File[]) {
    console.log("Запуск загрузки файлов:", files);

    if (isUploading) {
      toast({
        variant: "destructive",
        description: "Подождите пока текущая загрузка не завершится",
      });

      return;
    }

    if (attachments.length + files.length > 5) {
      toast({
        variant: "destructive",
        description: "Вы можете загрузить не более 5 вложений",
      });

      return;
    }

    startUpload(files);
  }

  function removeAttachment(fileName: string) {
    console.log("Удаляем файл из вложений:", fileName);
    setAttachments((prev) => prev.filter((a) => a.file.name !== fileName));
  }

  function reset() {
    console.log("Сбрасываем загрузки и вложения");
    setAttachments([]);
    setUploadProgress(undefined);
  }

  return {
    startUpload: handleStartUpload,
    attachments,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset,
  };
}
