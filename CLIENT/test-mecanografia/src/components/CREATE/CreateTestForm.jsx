export const CreateTestForm = ({formData, errors, handleOnChange}) => {
    return (
        <>
            <div id='create-test-title'>
                <input type="text" name='title' value={formData.title} onChange={handleOnChange} placeholder='Title...' />
                <p className="error-message">{errors.title && errors.title}</p>
            </div>
            <div id='create-test-text'>
                <textarea type="text" name='text' value={formData.text} onChange={handleOnChange} placeholder='Text...' />
                <p className="error-message">{errors.text && errors.text}</p>
            </div>
        </>
    )
}
