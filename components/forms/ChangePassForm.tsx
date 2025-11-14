import * as Yup from 'yup'
import DynamicForm, { FieldConfig } from "./DynamicForm"

const ChangePassForm = () => {

    const fields: FieldConfig[] = [
        { name: 'oldPassword', type: 'password' },
        { name: 'newPassword', type: 'password' },
        { name: 'confirmPassword', type: 'password' },
    ];

    const fieldLabels = {
        oldPassword: 'Köhnə şifrə',
        newPassword: 'Yeni şifrə',
        confirmPassword: 'Yeni şifrəni təkrar daxil edin',
    };

    const validationSchema = Yup.object({
        oldPassword: Yup.string().required('Eski Şifrə vacibdir'),
        newPassword: Yup.string().required('Yeni Şifrə vacibdir'),
        confirmPassword: Yup.string().required('Yeni Şifrəni Daxil Edin vacibdir').oneOf([Yup.ref('newPassword')], 'Şifrələr eyni deyil'),
    });

    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    const handleSubmit = async (values: any) => {
        console.log(values)
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

export default ChangePassForm