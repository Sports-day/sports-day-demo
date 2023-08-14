import {microsoftAccountRepository, MicrosoftAccountRepository} from "../repositories/MicrosoftAccountRepository";
import {mockMicrosoftAccountRepository} from "../repositories/mock/MicrosoftAccountRepository";

export type MicrosoftAccount = {
    id: number,
    email: string,
    name: string,
    mailAccountName: string | null,
    role: Role,
    userId: number | null,
    linkLater: boolean,
    firstLogin: string,
    lastLogin: string
}

export type Role = "ADMIN" | "USER"

export const microsoftAccountFactory = (repo?: MicrosoftAccountRepository) => {
    const repository = mockMicrosoftAccountRepository

    return {
        index: async (): Promise<MicrosoftAccount[]> => {
            return await repository.getMicrosoftAccounts()
        },
        show: async (id: number | "me"): Promise<MicrosoftAccount> => {
            return await repository.getMicrosoftAccount(id)
        },
        delete: async (id: number | "me"): Promise<void> => {
            return await repository.deleteMicrosoftAccount(id)
        },
        setRole: async (id: number | "me", role: string): Promise<MicrosoftAccount> => {
            return await repository.setMicrosoftAccountRole(id, role)
        },
        linkUser: async (id: number | "me", userId: number): Promise<void> => {
            return await repository.linkMicrosoftAccount(id, userId)
        },
        unlinkUser: async (id: number | "me"): Promise<void> => {
            return await repository.unlinkMicrosoftAccount(id)
        },
        linkLater: async (id: number | "me"): Promise<void> => {
            return await repository.linkLaterMicrosoftAccount(id)
        }
    }
}