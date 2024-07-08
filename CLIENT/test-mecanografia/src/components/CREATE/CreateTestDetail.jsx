import { CreateTestForm } from './CreateTestForm.jsx'
import { CreateTestBtns } from './CreateTestBtns.jsx'

export const CreateTestDetail = ({createTest, formData, errors, handleOnChange}) => {
    return (
        <>
            <div id='create-test-form'>
                <CreateTestForm formData={formData} errors={errors} handleOnChange={handleOnChange}/>
            </div>
            <div id='create-test-btns'>
                <CreateTestBtns createTest={createTest}/>
            </div>
        </>
    )
}
