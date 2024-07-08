export const TestResults = ({results}) => {
    return (
        <div id='test-results'>
            <div className='result'>
                <h4>TIME</h4>
                <p>{results.time.minutes < 10 ? '0' + results.time.minutes : results.time.minutes}:{results.time.seconds < 10 ? '0' + results.time.seconds : results.time.seconds}</p>
            </div>

            <div className='result'>
                <h4>WPM</h4>
                <p>{results.wpm.toFixed(0)}</p>
            </div>

            <div className='result'>
                <h4>ACCURACY</h4>
                <p>{results.accuracy.toFixed(0)}%</p>
            </div>
        </div>
    )
}
