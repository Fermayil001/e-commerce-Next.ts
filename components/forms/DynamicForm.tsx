import { Formik, Form, ErrorMessage } from 'formik';
import LoadingSpinner from '../ui/LoadingSpinner';
import CsButton from '../ui/CsButton';
import CsInput from '../navbar/CsInput';
import { CsTextarea } from '../ui/CsTextarea';

export interface FieldConfig {
    name: string;
    type: 'text' | 'password' | 'file' | 'number' | 'email' | 'tel' | 'textarea';
    accept?: string;
    colSpan?: number;
    placeholder?: string;
}

interface DynamicFormProps {
    fields: FieldConfig[];
    fieldLabels: Record<string, string>;
    validationSchema: any;
    initialValues: any;
    onSubmit: (values: any) => Promise<void>;
    submitLabel?: string;
    multiple?: boolean;
}

const DynamicForm = ({
    fields,
    fieldLabels,
    validationSchema,
    initialValues,
    onSubmit,
    multiple = false,
    submitLabel = 'Yadda saxla',
}: DynamicFormProps) => {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} enableReinitialize={true} onSubmit={onSubmit}>
            {({ setFieldValue, isSubmitting, values }) => (
                <Form className="flex flex-col gap-4!">
                    {fields.map(({ name, type, accept, colSpan = 1, placeholder }) => (
                        <div
                            key={name}
                            className={`flex flex-col ${colSpan === 2 ? 'sm:col-span-2' : ''}`}
                        >
                            <label htmlFor={name} className="mb-1 text-csblack">
                                {fieldLabels[name]}
                            </label>

                            {type === 'file' ? (
                                <input
                                    id={name}
                                    name={name}
                                    type="file"
                                    multiple={multiple}
                                    accept={accept}
                                    onChange={(e) => {
                                        if (e.currentTarget.files) {
                                            setFieldValue(name, multiple ? e.currentTarget.files : e.currentTarget.files[0]);
                                        }
                                    }}
                                    className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2C4B9B] file:text-white hover:file:bg-[#1e3576] transition"
                                />
                            ) : (
                                type === 'textarea' ? <CsTextarea
                                    id={name}
                                    name={name}
                                    placeholder={fieldLabels[name]}
                                    rows={4}
                                />
                                    : <CsInput
                                        id={name}
                                        name={name}
                                        type={type}
                                        value={values[name]}
                                        onChange={(e) => setFieldValue(name, e.target.value)}
                                        placeholder={type === 'tel' ? '+994501112233' : placeholder ? placeholder : fieldLabels[name]}
                                    />
                            )}
                            <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                    ))}

                    <CsButton className='w-full mt-2' type="submit" variant='primary' disabled={isSubmitting}>
                        {isSubmitting ? <LoadingSpinner className='border-cswhite! h-5! w-5! ' /> : submitLabel}
                    </CsButton>
                </Form>
            )}
        </Formik>
    );
};

export default DynamicForm;
