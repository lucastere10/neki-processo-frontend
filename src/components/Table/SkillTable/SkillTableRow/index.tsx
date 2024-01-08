import React, { FC, useState } from 'react';
import { MdModeEdit, MdClose, MdCheck, MdDelete } from 'react-icons/md';
import api from '@/services/api/api';
import { SubmitHandler, useForm } from 'react-hook-form';

export const SkillTableRow: FC<SkillTableRowProps> = ({
    skill,
    triggerEdit,
    setTriggerEdit
}) => {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [skillNome, setSkillNome] = useState(skill.skillNome)
    const [skillDescricao, setSkillDescricao] = useState(skill.skillDescricao)
    const [skillUrl, setSkillUrl] = useState(skill.skillUrl)

    const atualizarEvento = async (data: skillType, skillId: number) => {
        try {
            const response = await api.put(
                `/api/skills/${skillId}`,
                {
                    skillNome: data.skillNome,
                    skillDescricao: data.skillDescricao,
                    skillUrl: data.skillUrl
                }
            );
            alert('Habilidade Atualizada com Sucesso!');
            setIsEditOpen(false);
            setTriggerEdit(!triggerEdit);
        } catch (err) {
            console.log(err);
        }
    };

    const confirmarDeletarEvento = async (skillId: number) => {
        try {
            const response = await api.delete(
                `/api/skills/${skillId}`
            );
            alert('Habilidade Deletada Com Sucesso.');
            setTriggerEdit(!triggerEdit);
            setIsEditOpen(false);
            setIsDeleteModalOpen(!isDeleteModalOpen);
        } catch (err: any) {
            alert(err.response.data.message);
            console.log('Erro ao deletar habilidade:', err);
        }
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<skillType>();

    const onSubmit: SubmitHandler<skillType> = data => {
        if (data.skillNome == null || data.skillNome === '') {
            data.skillNome = skill.skillNome;
        }

        atualizarEvento(data, skill.skillId);
    };


    return isEditOpen ? (
        <tr
            key={skill.skillId}
            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
        >
            {/* ATUALIZAR VERSÃO */}
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                tabIndex={0}
            >
                <form id="editForm">
                    <input
                        {...register('skillNome')}
                        className="block p-3 text-sm text-black bg-gray-50 rounded-lg border border-gray-800 focus:border-primary dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-primary"
                        type="text"
                        onChange={(e) => setSkillNome(e.target.value)}
                        value={skillNome}
                        placeholder={skill.skillNome}
                        tabIndex={0}
                    />
                </form>
            </th>

            {/* ATUALIZAR VERSÃO */}
            <td className="px-6 py-4">
                <form id="editForm">
                    <input
                        {...register('skillDescricao')}
                        className="block p-3 text-sm text-black bg-gray-50 rounded-lg border border-gray-800 focus:border-primary dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-primary"
                        type="text"
                        onChange={(e) => setSkillDescricao(e.target.value)}
                        value={skillDescricao}
                        placeholder={skill.skillDescricao}
                        tabIndex={0}
                    />
                </form>
            </td>

            {/* ATUALIZAR VERSÃO */}
            <td className="px-6 py-4">
                <form id="editForm">
                    <input
                        {...register('skillUrl')}
                        className="block p-3 text-sm text-black bg-gray-50 rounded-lg border border-gray-800 focus:border-primary dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-primary"
                        type="text"
                        onChange={(e) => setSkillUrl(e.target.value)}
                        value={skillUrl}
                        placeholder={skill.skillUrl}
                        tabIndex={0}
                    />
                </form>
            </td>

            <td className="px-6 py-4 flex flex-row gap-3">
                <button
                    onClick={() => setIsEditOpen(false)}
                    className="rounded-full p-2 bg-light-rose-500 hover:bg-red-700"
                    type="button"
                    tabIndex={0}
                    aria-label="Botão de cancelar ação"
                >
                    <MdClose color="white" size={20} />
                </button>
                <form id="editForm" onSubmit={handleSubmit(onSubmit)}>
                    <button
                        className="rounded-full p-2 bg-light-green-500 hover:bg-green-700"
                        type="submit"
                        tabIndex={0}
                        aria-label="Botão de confirmar edição"
                    >
                        <MdCheck color="white" size={20} />
                    </button>
                </form>
                <div className="relative">
                    <button
                        className="rounded-full p-2 ml-4 hover:bg-red-800 hover:text-white"
                        id="deleteDropdown"
                        type="button"
                        onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
                        tabIndex={0}
                        aria-label="Botão de exclusão"
                    >
                        <MdDelete size={20} tabIndex={0} />
                    </button>
                    {/* SECÇÃO DE CONFIRMAR EXCLUSÃO  */}
                    {isDeleteModalOpen && (
                        <div
                            id="deleteDropdown"
                            data-dropdown-toggle="deleteDropdown"
                            className="z-40 flex gap-3 px-4 py-2 mt-2 items-center absolute left-[-270%] top-[-43%] bg-gray-50 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                        >
                            <p className="text-lg text-black dark:text-white">Excluir?</p>
                            <button
                                className="rounded-full p-2 bg-light-rose-500 hover:bg-red-500"
                                type="button"
                                onClick={() => confirmarDeletarEvento(skill.skillId)}
                                tabIndex={0}
                                aria-label="Botão de confirmar edição"
                            >
                                <MdCheck color="white" size={15} />
                            </button>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    ) : (
        <tr
            key={skill.skillId}
            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
        >
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                tabIndex={0}
            >
                {skill.skillNome}
            </th>
            <td className="px-6 py-4" tabIndex={0}>
                {skill.skillDescricao}
            </td>
            <td className="px-6 py-4" tabIndex={0}>
                {skill.skillUrl}
            </td>
            <td className="px-6 py-4">
                <button
                    onClick={() => setIsEditOpen(true)}
                    className="rounded-full p-2 hover:bg-stone-200 dark:hover:bg-stone-600"
                    type="button"
                    tabIndex={0}
                    aria-label="Botão de ações"
                >
                    <MdModeEdit size={20} tabIndex={0} />
                </button>
            </td>
        </tr>
    );
};
