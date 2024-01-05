interface ProfileInfoProps {
    profileInfo: usuarioType;
}

interface ProfileTableProps {
    profileSkills: any[];
    triggerEdit: boolean
    setTriggerEdit: (value: boolean) => void;
}

interface SkillTableProps {
    skills: any[];
    triggerEdit: boolean
    setTriggerEdit: (value: boolean) => void;
}

interface ProfileTableRowProps {
    profileSkill: profileSkillType;
    triggerEdit: boolean
    setTriggerEdit: (value: boolean) => void;
}

interface SkillTableRowProps {
    skill: skillType;
    triggerEdit: boolean
    setTriggerEdit: (value: boolean) => void;
}


// MODAIS

interface NewProfileSkillModalProps {
    isOpen: boolean;
    triggerEdit: boolean
    onClose: () => void;
    setTriggerEdit: (value: boolean) => void;
}

interface NewSkillModalProps {
    isOpen: boolean;
    triggerEdit: boolean
    onClose: () => void;
    setTriggerEdit: (value: boolean) => void;
}