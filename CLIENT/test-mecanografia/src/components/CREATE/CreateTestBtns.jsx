export const CreateTestBtns = ({createTest}) => {
    return (
        <>
            <button className='create-test-btn' onClick={() => createTest("Public")}>Crear Texto Publico</button>
            <button className='create-test-btn' onClick={() => createTest("Private")}>Crear Texto Privado</button>
        </>
    )
}
