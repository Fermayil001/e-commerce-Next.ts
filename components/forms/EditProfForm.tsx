import * as Yup from 'yup'
import DynamicForm, { FieldConfig } from "./DynamicForm";
import { User } from '@prisma/client';
import { useUpdateUser } from '@/hooks/user/useUpdateUser';
import { toast } from 'react-toastify';

interface EditProfFormProps {
    user: User
    closeModal: () => void;
}
const EditProfForm = ({ user, closeModal }: EditProfFormProps) => {

    const { mutateAsync: updateUser } = useUpdateUser();

    const fields: FieldConfig[] = [
        { name: 'name', type: 'text' },
        { name: 'surname', type: 'text' },
        { name: 'phone', type: 'tel' },
    ];

    const fieldLabels = {
        name: 'Ad',
        surname: 'Soyad',
        phone: 'Mobil Nömrə',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Ad vacibdir'),
        surname: Yup.string().required('Soyad vacibdir'),
        // phone: Yup.string().required('Mobil Nömrə vacibdir'),
    });

    const initialValues = {
        name: user?.name?.split(' ')[0] || '',
        surname: user?.name?.split(' ')[1] || '',
        phone: user?.phone || '',
    };

    const handleSubmit = async (values: any) => {
        const name = values.name + ' ' + values.surname;
        try {
            await updateUser({
                id: user.id,
                name,
                phone: values.phone
            });
            toast.success("Profiliniz uğurla yeniləndi");
            closeModal()
        } catch (error) {
            toast.error(`Profiliniz yenilənərkən xəta baş verdi: ${error}`)
        }
    }

    return (
        <DynamicForm
            fields={fields}
            fieldLabels={fieldLabels}
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
        />
    )
}

export default EditProfForm