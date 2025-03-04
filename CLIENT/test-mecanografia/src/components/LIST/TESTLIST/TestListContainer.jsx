import { useEffect, useState } from "react"
import Axios from "axios"
import { TestListDetail } from "./TestListDetail.jsx"
import { Loading } from "../../Loading.jsx"

export const TestListContainer = () => {
    const [tests, setTests] = useState([])
    const [favouriteTests, setFavouriteTests] = useState([])

    const [loading, setLoading] = useState(true)
 
    useEffect(() => {
        Axios.get("http://localhost:8080/api/tests")
        .then((res) => {
            return res.data
        })
        .then(allTests => {
            Axios.get("http://localhost:8080/api/users/logged-user")
            .then(res => {
                const user = res.data
                let favourite_tests = []
                user.favourite_tests.forEach(t => {
                    favourite_tests.push(t.test._id)
                })
                setFavouriteTests(favourite_tests)

                let public_tests = []
                allTests.forEach(test => {
                    test.state === "Public" && public_tests.push(test)
                })
                public_tests = public_tests.filter(t => t.owner.username !== user.username)
                setTests(public_tests)
            })
            .finally(() => setLoading(false))
        })
    }, [])

const handleFavourite = (action, id) => {
    let favourite_tests = [...favouriteTests]
    action == "remove" ? favourite_tests = favourite_tests.filter(t => t != id) : favourite_tests.push(id)

    setFavouriteTests(favourite_tests)

    action == "add" ? Axios.put("http://localhost:8080/api/users/add-favourite/tests", { id }) : Axios.put("http://localhost:8080/api/users/remove-favourite/tests", { id })
}

return (
    <>
        {
            loading?
                <Loading/>
            :

                <div id="tests-list-container">
                    <div id="tests-list-detail">
                        <TestListDetail tests={tests} favouriteTests={favouriteTests} handleFavourite={handleFavourite} />
                    </div>
                </div>
        }
    </>
)
}
