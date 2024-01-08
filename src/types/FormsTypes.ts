interface usuarioType {
    nome: string;
    telefone: string;
    email: string;
    perfil: string;
    dataCadastro: string;
}

interface usuarioCreateType {
    nome: string;
    senha: string;
    email: string;
}

interface usuarioInfoType {
    id:number,
    nome: string;
    telefone: string;
    email: string;
    perfil: string;
    dataCadastro: string;
    senha: string
}

interface usuarioCardType {
    id: number;
    nome: string;
    telefone: string;
    email: string;
    perfil: string;
    dataCadastro: string;
    imagemUrl:string;
}

interface skillType {
    skillId: number;
    skillNome: string;
    skillDescricao: string;
    skillUrl: string;
};

interface skillCreateType {
    skillNome: string;
    skillDescricao: string;
    skillUrl: string;
};

interface profileSkillType {
    perfilSkillId: number;
    perfilSkillVersao: string;
    skillNome: string;
    usuario: usuarioCreateType;
    skill: skillCreateType;
}

interface profileSkillCreateType {
    perfilSkillVersao: string;
    skillNome: string;
    usuario: usuarioCreateType;
    skill: skillCreateType;
}

interface CardType {
    perfilSkillVersao: string;
    perfilSkillId: number;
    skillNome: string;
    usuario: usuarioCardType;
    skill: skillCreateType;
}