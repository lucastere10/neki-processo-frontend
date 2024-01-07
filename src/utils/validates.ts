export function handleCheckConfirmPassword(
    alm_senha: string,
    alm_confirmar_senha: string
) {
    if (alm_senha !== alm_confirmar_senha) {
        return false;
    }

    return true;
}

export function handleStrongPassword (value: string) {
    if (value.length < 6) {
        return false;
    }

    return true
}