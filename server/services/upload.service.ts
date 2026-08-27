import storage from "@/config/storage";
import { randomUUID } from "crypto";

export class UploadService {
  private getFileType(base64String: string): string | null {
    const match = base64String.match(/^data:(.*?);base64,/);
    if (match && match[1]) {
      return match[1].split("/")[1];
    }
    return null;
  }

  async uploadFile(base64: string, storageFolder: string): Promise<string> {
    const bucket = storage.bucket("thao-porfolio");

    return new Promise((resolve, reject) => {
      try {
        const base64Data = base64.split(",")[1];
        const fileData = Buffer.from(base64Data, "base64");

        const uniqueFileName = `${randomUUID()}.${this.getFileType(base64)}`;
        const file = bucket.file(`${storageFolder}/${uniqueFileName}`);
        const uploadStream = file.createWriteStream();

        uploadStream.on("error", reject);
        uploadStream.on("finish", async () => {
          try {
            await file.makePublic();
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${storageFolder}/${uniqueFileName}`;
            resolve(publicUrl);
          } catch (error) {
            reject(error);
          }
        });
        uploadStream.end(fileData);
      } catch (error) {
        reject(error);
      }
    });
  }
}
