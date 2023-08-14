import {ImageRepository, imageRepository} from "../repositories/ImageRepository";
import {mockImageRepository} from "../repositories/mock/ImageRepository";

export type Image = {
    id: number,
    name: string,
    attachment: string,
    createdAt: string,
    createdBy: number,
}

export const imageFactory = (repo?: ImageRepository) => {
    const repository = mockImageRepository

    return {
        index: async (): Promise<Image[]> => {
            return await repository.getImages()
        },
        show: async (id: number): Promise<Image> => {
            return await repository.getImage(id)
        },
        delete: async (id: number): Promise<void> => {
            return await repository.deleteImage(id)
        },
        create: async (omittedImage: Omit<Image, "id" | "createdAt" | "createdBy">): Promise<Image> => {
            return await repository.createImage(omittedImage)
        }
    }
}