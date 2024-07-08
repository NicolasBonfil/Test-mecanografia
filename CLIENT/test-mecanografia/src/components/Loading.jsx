import Spinner from 'react-bootstrap/Spinner';

export const Loading = () => {
    return (
        <div className="loading">
            <Spinner animation="border" role="status" className='spinner'>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h1>Loading data</h1>
        </div>
    )
}
