import NextAuth from "next-auth";

declare module 'next-auth' {
    interface Session {
        token: string;
        usuario: {
            id: number,
            nome: string,
            telefone: string,
            email: string,
            perfil: string,
            imagemUrl: string,
            dataCadastro: string,
        }
    }
}